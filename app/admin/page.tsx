import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { 
  DevicePhoneMobileIcon, 
  InboxArrowDownIcon, 
  ArrowTrendingUpIcon, 
  ChartBarIcon 
} from "@heroicons/react/24/solid";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
  const session = await auth();

  // Fetch actual data
  const products = await prisma.product.count({ where: { status: "AVAILABLE" } });
  const soldProducts = await prisma.product.count({ where: { status: { in: ["SOLD", "RESERVED"] } } });
  const leads = await prisma.lead.count({ where: { status: "NEW" } });

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Panel General</h1>
      <p className="text-zinc-500 mb-8">Bienvenido de nuevo, Adri. Aquí tienes un resumen de tu negocio.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <DevicePhoneMobileIcon className="w-24 h-24 text-blue-600 transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <DevicePhoneMobileIcon className="w-6 h-6" />
            </div>
            <h3 className="text-zinc-500 font-medium mb-1">iPhones Disponibles</h3>
            <p className="text-5xl font-extrabold text-zinc-900 tracking-tighter">{products}</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <InboxArrowDownIcon className="w-24 h-24 text-indigo-600 transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
              <InboxArrowDownIcon className="w-6 h-6" />
            </div>
            <h3 className="text-zinc-500 font-medium mb-1">Ofertas Nuevas (Leads)</h3>
            <p className="text-5xl font-extrabold text-zinc-900 tracking-tighter">{leads}</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-3xl shadow-lg relative overflow-hidden group text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ArrowTrendingUpIcon className="w-24 h-24 text-white transform translate-x-4 -translate-y-4" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
              <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-zinc-300 font-medium mb-1">Ventas / Reservas</h3>
            <p className="text-5xl font-extrabold text-white tracking-tighter">{soldProducts}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900">Actividad Reciente</h2>
        </div>
        <div className="text-center py-16 bg-zinc-50/50 rounded-2xl border border-zinc-100 border-dashed">
          <p className="text-zinc-500 font-medium">Aún no hay actividad reciente.</p>
          <p className="text-sm text-zinc-400 mt-1">Empieza añadiendo stock al catálogo o comparte el enlace de tasación.</p>
        </div>
      </div>
    </div>
  );
}
