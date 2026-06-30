"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, DevicePhoneMobileIcon, InboxArrowDownIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { DevicePhoneMobileIcon as DevicePhoneMobileIconSolid } from "@heroicons/react/24/solid";
import SignOutForm from "@/components/SignOutForm";
import clsx from "clsx";

const navLinks = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon, exact: true },
  { name: "Catálogo", href: "/admin/productos", icon: DevicePhoneMobileIcon, exact: false },
  { name: "Ofertas (Leads)", href: "/admin/leads", icon: InboxArrowDownIcon, exact: false },
  { name: "Pedidos", href: "/admin/pedidos", icon: UserGroupIcon, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-900 p-6 flex flex-col hidden md:flex text-zinc-300">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <DevicePhoneMobileIconSolid className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-2xl tracking-tight text-white">AdriiPhones</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navLinks.map(({ name, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-200 group",
                isActive
                  ? "bg-zinc-800 text-white border border-zinc-700/60 shadow-inner"
                  : "hover:bg-zinc-900/50 hover:text-white text-zinc-400"
              )}
            >
              <Icon
                className={clsx(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                )}
              />
              {name}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      <SignOutForm />
    </aside>
  );
}
