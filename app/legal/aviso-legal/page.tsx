import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AvisoLegalPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8 md:p-12 prose prose-zinc max-w-none">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">Aviso Legal</h1>
          <p>
            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa que este sitio web es propiedad de iPhonizatechabal.
          </p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. Identidad del titular</h2>
          <ul>
            <li>Nombre comercial: iPhonizatechabal</li>
            <li>Email de contacto: hola@iphonizatechabal.es</li>
          </ul>
          <h2 className="text-xl font-bold mt-8 mb-4">2. Condiciones de uso</h2>
          <p>
            El usuario se compromete a hacer un uso adecuado y lícito del sitio web. Nos reservamos el derecho de modificar el contenido de esta web sin previo aviso.
          </p>
        </div>
      </div>
    </main>
  );
}
