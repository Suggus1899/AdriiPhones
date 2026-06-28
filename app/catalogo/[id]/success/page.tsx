import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getProductById } from "@/lib/actions";

export default async function SuccessPage({ params, searchParams }: { params: { id: string }, searchParams: { type: string } }) {
  const product = await getProductById(params.id);
  const isReserve = searchParams.type === "RESERVE";

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-zinc-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">
          ¡Pago Completado!
        </h1>
        <p className="text-zinc-600 mb-8 text-lg">
          {isReserve 
            ? `Has reservado con éxito el ${product?.model}. Hemos guardado tus 50€ de señal.`
            : `Has comprado con éxito el ${product?.model}. Te enviaremos un email con los detalles del envío.`
          }
        </p>
        
        <div className="bg-zinc-50 rounded-2xl p-4 mb-8 text-left border border-zinc-100">
          <p className="text-sm text-zinc-500 mb-1">ID del Pedido</p>
          <p className="font-mono text-zinc-900">ORD-{crypto.randomUUID().split("-")[0].toUpperCase()}</p>
        </div>

        <Link 
          href="/catalogo"
          className="inline-block bg-zinc-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-zinc-800 transition-colors"
        >
          Volver al catálogo
        </Link>
      </div>
    </main>
  );
}
