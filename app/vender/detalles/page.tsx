"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createLead } from "@/lib/actions";
import { ArrowLeft, UploadCloud, Send } from "lucide-react";

function FormContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const model = searchParams?.get("model") || "";
  const capacity = searchParams?.get("capacity") || "";
  const battery = searchParams?.get("battery") || "";
  const price = searchParams?.get("price") || "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await createLead(formData);
      
      // Simular envío de email
      console.log("Mock: Email enviado al admin informando de nueva oferta");
      
      alert("¡Oferta enviada correctamente! Nos pondremos en contacto contigo pronto.");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar tu oferta. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Link href="/vender" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver a la calculadora
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-zinc-100 p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">Últimos detalles</h1>
          <p className="text-zinc-500">Necesitamos algunas fotos y tus datos de contacto para cerrar la tasación de tu iPhone.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="hidden" name="model" value={model} />
          <input type="hidden" name="capacity" value={capacity} />
          <input type="hidden" name="battery" value={battery} />
          <input type="hidden" name="targetPrice" value={price} />
          
          {/* Fotos */}
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Fotos del dispositivo</h3>
            <div className="border-2 border-dashed border-zinc-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-zinc-50 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="font-medium text-zinc-900 mb-1">Sube al menos 3 fotos</p>
              <p className="text-sm text-zinc-500 max-w-sm">
                Frontal encendido, parte trasera y bordes. Formatos: JPG, PNG o HEIC (Max. 5MB c/u).
              </p>
              <input type="file" name="files" multiple className="hidden" accept="image/*" id="file-upload" />
              <label htmlFor="file-upload" className="mt-6 px-6 py-2 bg-white border border-zinc-200 text-zinc-700 rounded-xl font-medium text-sm hover:border-zinc-300 cursor-pointer">
                Seleccionar archivos
              </label>
            </div>
          </section>

          {/* Datos de contacto */}
          <section>
            <h3 className="text-lg font-semibold text-zinc-900 mb-4">Datos de contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Nombre completo *</label>
                <input type="text" name="contactName" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Ej: Laura García" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Ciudad *</label>
                <input type="text" name="city" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Ej: Madrid" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Email *</label>
                <input type="email" name="contactEmail" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="tucorreo@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Teléfono (WhatsApp)</label>
                <input type="tel" name="phone" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="+34 600 000 000" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-zinc-700 mb-1">Usuario de Instagram / TikTok (Opcional)</label>
                <input type="text" name="social" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="@tuusuario" />
              </div>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-4 border-t border-zinc-100 flex flex-col items-center">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-colors flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? "Enviando oferta..." : "Enviar oferta"}
              {!isSubmitting && <Send className="w-5 h-5 ml-2" />}
            </button>
            <p className="text-xs text-zinc-400 mt-4 text-center">
              Al enviar esta oferta aceptas nuestra Política de Privacidad. <br/>Nos pondremos en contacto contigo en un plazo de 24 horas.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default function VenderDetallesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Suspense fallback={<div className="text-center py-20">Cargando formulario...</div>}>
          <FormContent />
        </Suspense>
      </div>
    </main>
  );
}
