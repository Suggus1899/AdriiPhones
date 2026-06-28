import { getProducts, deleteProduct, updateProductStatus } from "@/lib/actions";
import Link from "next/link";
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  CheckCircleIcon 
} from "@heroicons/react/24/solid";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Catálogo</h1>
          <p className="text-zinc-500">Gestiona tu inventario de iPhones.</p>
        </div>
        <Link 
          href="/admin/productos/nuevo" 
          className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30 flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2 text-white" />
          Añadir iPhone
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Modelo</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Estado / Batería</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Precio</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Status</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                  No hay productos en el catálogo. Añade el primero.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                        <DevicePhoneMobileIcon className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{product.model}</p>
                        <p className="text-xs text-zinc-500">{product.capacity} • {product.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-zinc-900">{product.condition}</p>
                    <p className="text-xs text-zinc-500">Batería: {product.battery}</p>
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-900">
                    {product.price}€
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      product.status === "AVAILABLE" ? "bg-emerald-100 text-emerald-700" :
                      product.status === "RESERVED" ? "bg-amber-100 text-amber-700" :
                      "bg-zinc-100 text-zinc-700"
                    }`}>
                      {product.status === "AVAILABLE" ? "Disponible" :
                       product.status === "RESERVED" ? "Reservado" :
                       "Vendido"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {product.status === "AVAILABLE" && (
                        <form action={updateProductStatus.bind(null, product.id, "SOLD")}>
                          <button type="submit" title="Marcar como vendido" className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-colors">
                            <CheckCircleIcon className="w-5 h-5" />
                          </button>
                        </form>
                      )}
                      <button className="p-2.5 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <form action={deleteProduct.bind(null, product.id)}>
                        <button type="submit" className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
