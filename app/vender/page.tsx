import Calculator from "@/components/Calculator";

export const metadata = {
  title: "Vender mi iPhone - iPhonizatechabal",
  description: "Calcula al instante cuánto te pagamos por tu iPhone.",
};

export default function VenderPage() {
  return (
    <main className="min-h-screen bg-zinc-50 relative overflow-hidden py-20">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-100/50 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4">
        <Calculator />
      </div>
    </main>
  );
}
