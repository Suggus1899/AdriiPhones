import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Base */}
      <nav className="border-b border-zinc-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-zinc-900" />
            <span className="font-bold text-xl tracking-tight text-zinc-900">iPhonizatechabal</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/catalogo" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Comprar</Link>
            <Link href="/vender" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Vender</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900">
            Tu iPhone, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              al mejor precio.
            </span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Compramos tu iPhone usado de forma rápida y segura, y te ofrecemos los mejores modelos reacondicionados del mercado.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/vender" 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-medium transition-all"
            >
              Tasá tu iPhone
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/catalogo" 
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-full font-medium transition-all"
            >
              Ver Catálogo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
