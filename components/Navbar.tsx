"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Smartphone, Menu, X } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Vender", href: "/" },
    { name: "Comprar", href: "/catalogo" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-lg border-b border-zinc-200/50 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-zinc-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900">AdriiPhones</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "text-sm font-semibold transition-colors",
                    isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/admin"
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-900"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-500 hover:text-zinc-900 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block px-3 py-4 rounded-xl text-base font-medium",
                    isActive ? "bg-zinc-50 text-zinc-900" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link 
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 rounded-xl text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
