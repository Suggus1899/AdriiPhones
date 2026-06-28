import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { 
  HomeIcon, 
  DevicePhoneMobileIcon, 
  UserGroupIcon, 
  InboxArrowDownIcon 
} from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon as DevicePhoneMobileIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import SignOutForm from "@/components/SignOutForm";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar - Premium Dark Mode */}
      <aside className="w-72 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col hidden md:flex text-zinc-300">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <DevicePhoneMobileIconSolid className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">AdriiPhones</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-zinc-900/50 text-white font-medium border border-zinc-800/50 shadow-inner group transition-all">
            <HomeIcon className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            Dashboard
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-zinc-900/50 hover:text-white font-medium transition-all duration-200 group">
            <DevicePhoneMobileIcon className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            Catálogo
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-zinc-900/50 hover:text-white font-medium transition-all duration-200 group">
            <InboxArrowDownIcon className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            Ofertas (Leads)
          </Link>
          <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-zinc-900/50 hover:text-white font-medium transition-all duration-200 group">
            <UserGroupIcon className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            Pedidos
          </Link>
        </nav>

        <SignOutForm />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}
