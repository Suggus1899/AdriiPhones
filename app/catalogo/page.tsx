import Link from "next/link";
import { Smartphone, ChevronRight } from "lucide-react";
import { getProducts } from "@/lib/actions";
import CatalogoFilters from "@/components/CatalogoFilters";
import { Suspense } from "react";

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ modelo?: string; estado?: string; orden?: string }>;
}) {
  const { modelo, estado, orden } = await searchParams;
  const allProducts = await getProducts();

  const uniqueModels = [...new Set(allProducts.map((p) => p.model))].sort();
  const uniqueConditions = [...new Set(allProducts.map((p) => p.condition))].sort();

  let products = [...allProducts];

  if (modelo) {
    products = products.filter((p) => p.model.includes(modelo));
  }
  if (estado) {
    products = products.filter((p) => p.condition === estado);
  }
  if (orden === "precio-asc") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (orden === "precio-desc") {
    products = products.sort((a, b) => b.price - a.price);
  }

  const available = products.filter((p) => p.status === "AVAILABLE");
  const unavailable = products.filter((p) => p.status !== "AVAILABLE");
  const sorted = [...available, ...unavailable];

  return (
    <main className="min-h-screen bg-zinc-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Catálogo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">
              Catálogo de iPhones
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl">
              Equipos únicos, revisados y garantizados. Encuentra tu próximo iPhone al mejor precio.
            </p>
          </div>
          
          <Suspense fallback={null}>
            <CatalogoFilters
              models={uniqueModels}
              conditions={uniqueConditions}
              currentModelo={modelo ?? ""}
              currentEstado={estado ?? ""}
              currentOrden={orden ?? ""}
            />
          </Suspense>
        </div>

        {/* Grid de Productos */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-100">
            <h2 className="text-xl font-bold text-zinc-900 mb-2">
              {allProducts.length === 0 ? "Catálogo vacío" : "Sin resultados"}
            </h2>
            <p className="text-zinc-500">
              {allProducts.length === 0
                ? "Pronto añadiremos nuevo stock. Vuelve pronto."
                : "Prueba con otros filtros o elimínalos para ver todo el stock."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => (
            <Link 
              href={`/catalogo/${product.id}`} 
              key={product.id}
              className="group bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col"
            >
              {/* Imagen */}
              <div className="aspect-[4/5] bg-zinc-100 relative overflow-hidden">
                <img 
                  src={product.images.split(",")[0] || "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop"} 
                  alt={product.model}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-zinc-800">
                  {product.condition}
                </div>
              </div>
              
              {/* Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 mb-2">
                  <Smartphone className="w-4 h-4" />
                  Batería {product.battery}
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 mb-1">{product.model}</h3>
                <p className="text-sm text-zinc-500 mb-4">{product.capacity} • {product.color}</p>
                
                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-0.5">Precio</p>
                    <p className="text-2xl font-bold text-zinc-900">{product.price}€</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
