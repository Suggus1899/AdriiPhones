import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" as any }) 
  : null;

export async function POST(req: Request) {
  try {
    const { productId, type } = await req.json(); // type: "BUY" or "RESERVE"

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product || product.status !== "AVAILABLE") {
      return NextResponse.json({ error: "Producto no disponible" }, { status: 404 });
    }

    const host = req.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;

    // Si Stripe no está configurado, simulamos el checkout
    if (!stripe) {
      console.warn("STRIPE_SECRET_KEY no encontrada. Simulando checkout...");
      // Cambiamos estado para simular success
      await prisma.product.update({
        where: { id: productId },
        data: { status: type === "RESERVE" ? "RESERVED" : "SOLD" }
      });
      return NextResponse.json({ 
        url: `${origin}/checkout/success?session_id=mock_session_${product.id}&product_id=${product.id}` 
      });
    }

    // Configuración real de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'], // Se puede habilitar en Stripe Dashboard
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${product.model} - ${product.capacity} (${product.color})`,
              description: `Batería: ${product.battery} | Estado: ${product.condition}`,
            },
            unit_amount: Math.round(product.price * 100), // Stripe espera céntimos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&product_id=${product.id}`,
      cancel_url: `${origin}/catalogo/${product.id}`,
      metadata: {
        productId: product.id,
        type: type || "BUY"
      }
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
