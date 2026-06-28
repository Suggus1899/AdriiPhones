import Link from "next/link";
import { Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-zinc-900 rounded-xl flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-zinc-900">AdriiPhones</span>
            </Link>
            <p className="text-zinc-500 max-w-xs text-sm leading-relaxed">
              La forma más rápida, segura y premium de tasar, vender y comprar tu próximo iPhone.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 mb-4">Servicios</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                  Tasar mi iPhone
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                  Comprar un iPhone
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/legal/aviso-legal" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/legal/privacidad" className="text-zinc-500 hover:text-zinc-900 text-sm transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-400">
            © {new Date().getFullYear()} AdriiPhones. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-zinc-400">Hecho en España 🇪🇸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
