import Link from "next/link";
import { ArrowLeft, Shield, Battery, Box } from "lucide-react";
import { getProductById } from "@/lib/actions";
import CheckoutButtons from "@/components/CheckoutButtons";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const images = product.images ? product.images.split(",") : ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"];

  return (
    <main className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/catalogo" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Columna Izquierda: Galería (Mock simple) */}
            <div className="space-y-4">
              <div className="aspect-[4/5] md:aspect-square bg-zinc-100 rounded-3xl overflow-hidden relative">
                <img 
                  src={images[0]} 
                  alt={product.model}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className={`aspect-square bg-zinc-100 rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${idx === 0 ? 'ring-2 ring-blue-600 ring-offset-2' : ''}`}>
                      <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

          {/* Columna Derecha: Info del producto */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full tracking-wide">
                  DISPONIBLE
                </span>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-full tracking-wide">
                  {product.condition}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-2">
                {product.model}
              </h1>
              <p className="text-lg text-zinc-500">
                {product.capacity} • {product.color}
              </p>
            </div>

            <div className="text-4xl font-bold text-zinc-900 mb-8">
              {product.price}€
            </div>

            {/* Grid de especificaciones */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-zinc-50 rounded-2xl p-4 flex items-start gap-3 border border-zinc-100">
                <Battery className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase">Batería</p>
                  <p className="text-sm font-semibold text-zinc-900">{product.battery} Salud</p>
                </div>
              </div>
              <div className="bg-zinc-50 rounded-2xl p-4 flex items-start gap-3 border border-zinc-100">
                <Box className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500 font-medium uppercase">Accesorios</p>
                  <p className="text-sm font-semibold text-zinc-900 leading-tight">Sí (Ver detalles)</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-900 mb-3">Sobre este equipo</h3>
              <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                {product.description || "Equipo garantizado y revisado profesionalmente. Listo para su uso."}
              </p>
              
              <div className="mt-4 pt-4 border-t border-zinc-100">
                <p className="text-sm text-zinc-600">
                  <span className="font-semibold text-zinc-900">Incluye:</span> {product.accessories || "Sin información adicional"}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-auto pt-6 flex flex-col gap-3">
              <CheckoutButtons productId={product.id} />
              <p className="text-center text-xs text-zinc-500 mt-3 flex items-center justify-center gap-1.5">
                <Shield className="w-4 h-4" /> Pago 100% seguro y envío en 24/48h
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
