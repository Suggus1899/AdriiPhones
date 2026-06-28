"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Home, Loader2, Smartphone } from "lucide-react";
import { updateProductStatus } from "@/lib/actions";

function SuccessContent() {
  const searchParams = useSearchParams();
  
  const sessionId = searchParams?.get("session_id");
  const productId = searchParams?.get("product_id");
  
  const [loading, setLoading] = useState(!!(productId && sessionId));

  useEffect(() => {
    if (productId && sessionId) {
      // Si la URL contiene product_id, marcamos como vendido.
      // En una app real de producción, esto se haría con un Webhook de Stripe en el servidor
      // para evitar que el usuario manipule la URL. 
      // Para este MVP, lo marcamos desde el frontend llamando al server action.
      updateProductStatus(productId, "SOLD")
        .then(() => setLoading(false))
        .catch(console.error);
    }
  }, [productId, sessionId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="text-zinc-600">Procesando tu pedido...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
        ¡Pago completado con éxito!
      </h1>
      <p className="text-lg text-zinc-600 mb-8 max-w-md mx-auto">
        Acabamos de procesar tu pedido. En breve recibirás un correo con la confirmación y el número de seguimiento de tu iPhone.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/catalogo"
          className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-xl transition-colors"
        >
          <Smartphone className="w-5 h-5 mr-2" />
          Seguir comprando
        </Link>
        <Link 
          href="/"
          className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-white hover:bg-zinc-50 text-zinc-900 font-medium rounded-xl border border-zinc-200 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center py-20 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12 max-w-2xl w-full">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-zinc-600">Cargando...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  );
}
