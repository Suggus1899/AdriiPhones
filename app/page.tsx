import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Star, Package, CreditCard, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-60 -left-40 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-blue-500" />
            +500 iPhones vendidos en España
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
            Compra o vende tu iPhone{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              sin rollos.
            </span>
          </h1>

          <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Compramos tu iPhone al instante con tasación online. También tenemos el mejor catálogo de iPhones originales revisados y garantizados en España.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/catalogo"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full font-semibold transition-all shadow-lg shadow-zinc-900/20 hover:shadow-zinc-900/30"
            >
              Ver catálogo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/vender"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-900 rounded-full font-semibold transition-all"
            >
              Tasar mi iPhone
            </Link>
          </div>

          {/* Trust bar inline */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Pago 100% seguro
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-500" />
              Tasación en 30 segundos
            </span>
            <span className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-blue-500" />
              Envío en 24/48h
            </span>
          </div>
        </div>
      </section>

      {/* ─── CÓMO FUNCIONA ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-zinc-500 text-lg max-w-xl mx-auto">
              Tanto si quieres vender como comprar, el proceso es sencillo y rápido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vender */}
            <div className="bg-white rounded-3xl border border-zinc-100 p-8 shadow-sm">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">Vender tu iPhone</p>
              <div className="space-y-6">
                {[
                  { n: "1", t: "Tasa online", d: "Rellena el formulario con el modelo, batería y accesorios. En segundos tienes el precio." },
                  { n: "2", t: "Te contactamos", d: "Revisamos tu oferta y acordamos la recogida o envío. Sin esperas, sin regateos." },
                  { n: "3", t: "Cobras al instante", d: "Bizum, transferencia o en mano. Rápido y seguro." },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {n}
                    </div>
                    <div>
                      <p className="font-bold text-zinc-900">{t}</p>
                      <p className="text-zinc-500 text-sm mt-0.5">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/vender"
                className="mt-8 w-full flex items-center justify-center py-3.5 px-6 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl font-semibold transition-all"
              >
                Tasar mi iPhone
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Comprar */}
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 shadow-lg text-white">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Comprar un iPhone</p>
              <div className="space-y-6">
                {[
                  { n: "1", t: "Elige tu iPhone", d: "Navega el catálogo con stock real. Cada unidad es única, revisada y fotografiada." },
                  { n: "2", t: "Reserva o compra", d: "Paga online con Stripe, Apple Pay, Google Pay o PayPal. También puedes reservar con señal." },
                  { n: "3", t: "Lo recibes en casa", d: "Envío asegurado en 24/48h o recogida en persona si estás en la zona." },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {n}
                    </div>
                    <div>
                      <p className="font-bold text-white">{t}</p>
                      <p className="text-zinc-400 text-sm mt-0.5">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/catalogo"
                className="mt-8 w-full flex items-center justify-center py-3.5 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-semibold transition-all"
              >
                Ver catálogo
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">
              ¿Por qué confiar en AdriiPhones?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                color: "bg-green-50 text-green-600",
                title: "Equipos verificados",
                desc: "Cada iPhone pasa una revisión técnica antes de publicarse en el catálogo.",
              },
              {
                icon: CreditCard,
                color: "bg-blue-50 text-blue-600",
                title: "Pago seguro",
                desc: "Stripe, Apple Pay, Google Pay, PayPal y Klarna. Tú eliges cómo pagar.",
              },
              {
                icon: Zap,
                color: "bg-yellow-50 text-yellow-600",
                title: "Proceso rápido",
                desc: "Tasación en segundos, pago el mismo día y envío en 24/48h.",
              },
              {
                icon: MessageCircle,
                color: "bg-purple-50 text-purple-600",
                title: "Atención directa",
                desc: "Sin bots. Hablas directamente con la persona que gestiona tu operación.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">
            ¿Tienes un iPhone que no usas?
          </h2>
          <p className="text-zinc-400 text-lg">
            Tásalo ahora y recibe una oferta en segundos. Sin compromiso.
          </p>
          <Link
            href="/vender"
            className="inline-flex items-center px-10 py-4 bg-white text-zinc-900 rounded-full font-bold hover:bg-zinc-100 transition-all shadow-xl shadow-black/20"
          >
            Tasar mi iPhone gratis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
