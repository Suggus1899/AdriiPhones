"use client";

import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutButtons({ productId }: { productId: string }) {
  const [loading, setLoading] = useState<"BUY" | "RESERVE" | null>(null);
  const router = useRouter();

  const handleCheckout = async (type: "BUY" | "RESERVE") => {
    setLoading(type);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, type }),
      });
      const data = await res.json();
      
      if (data.url) {
        // Redirigir a Stripe Checkout (o a success en local MVP)
        router.push(data.url);
      } else {
        alert(data.error || "Error al procesar el pago");
        setLoading(null);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
      setLoading(null);
    }
  };

  return (
    <>
      <button 
        onClick={() => handleCheckout("BUY")}
        disabled={loading !== null}
        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading === "BUY" ? <Loader2 className="w-5 h-5 animate-spin" /> : (
          <>
            <Zap className="w-5 h-5 fill-current" />
            Comprar ahora (Stripe)
          </>
        )}
      </button>
      <button 
        onClick={() => handleCheckout("RESERVE")}
        disabled={loading !== null}
        className="w-full bg-white border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-900 py-4 rounded-2xl font-bold text-lg transition-colors disabled:opacity-50"
      >
        {loading === "RESERVE" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reservar por 50€"}
      </button>
    </>
  );
}
