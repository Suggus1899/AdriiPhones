import { PrismaClient } from "@prisma/client";
import { ShoppingBagIcon, TruckIcon } from "@heroicons/react/24/solid";

const prisma = new PrismaClient();

export default async function AdminPedidosPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: true },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Pedidos</h1>
        <p className="text-zinc-500">Compras directas y reservas realizadas en la web.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Fecha</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Producto</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Cliente</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Importe</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Tipo</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Pago</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-zinc-500">
                  Aún no hay pedidos. Aparecerán aquí cuando alguien compre o reserve desde el catálogo.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-zinc-500 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                        <ShoppingBagIcon className="w-4 h-4 text-zinc-500" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{order.product.model}</p>
                        <p className="text-xs text-zinc-500">{order.product.capacity} · {order.product.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-zinc-900">{order.shippingName}</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                      <TruckIcon className="w-3 h-3" />
                      {order.shippingAddress}, {order.shippingZip}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-bold text-zinc-900">
                    {order.amount}€
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      order.type === "DIRECT_BUY"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {order.type === "DIRECT_BUY" ? "Compra" : "Reserva"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      order.paymentSt === "PAID"
                        ? "bg-emerald-50 text-emerald-700"
                        : order.paymentSt === "FAILED"
                        ? "bg-red-50 text-red-700"
                        : "bg-zinc-100 text-zinc-600"
                    }`}>
                      {order.paymentSt === "PAID" ? "Pagado" : order.paymentSt === "FAILED" ? "Fallido" : "Pendiente"}
                    </span>
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
