import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8 md:p-12 prose prose-zinc max-w-none">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">Política de Privacidad</h1>
          <p>
            En iPhonizatechabal respetamos tu privacidad y protegemos tus datos personales conforme al Reglamento General de Protección de Datos (RGPD).
          </p>
          <h2 className="text-xl font-bold mt-8 mb-4">1. Recopilación de datos</h2>
          <p>
            Recopilamos únicamente los datos necesarios para procesar la compra o la tasación de tu dispositivo (nombre, email, ciudad, teléfono).
          </p>
          <h2 className="text-xl font-bold mt-8 mb-4">2. Uso de la información</h2>
          <p>
            La información se utiliza exclusivamente para contactarte acerca de tu solicitud. No vendemos ni compartimos tus datos con terceros para fines comerciales.
          </p>
          <h2 className="text-xl font-bold mt-8 mb-4">3. Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición enviando un correo a hola@iphonizatechabal.es.
          </p>
        </div>
      </div>
    </main>
  );
}
