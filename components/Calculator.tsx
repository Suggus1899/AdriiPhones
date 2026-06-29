"use client";

import { useState } from "react";
import { ChevronRight, Smartphone, Battery, Package, Plug, CheckCircle2, BatteryFull, BatteryMedium, BatteryLow, BatteryWarning } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

// Mock data for pricing (Precios de compra / tasación en euros - 2026)
const BASE_PRICES: Record<string, number> = {
  "iPhone 17 Pro Max": 950,
  "iPhone 17 Pro": 800,
  "iPhone 17 Plus": 720,
  "iPhone 17": 600,
  "iPhone 16 Pro Max": 750,
  "iPhone 16 Pro": 650,
  "iPhone 16 Plus": 550,
  "iPhone 16": 480,
  "iPhone 15 Pro Max": 600,
  "iPhone 15 Pro": 520,
  "iPhone 15 Plus": 450,
  "iPhone 15": 400,
  "iPhone 14 Pro Max": 480,
  "iPhone 14 Pro": 420,
  "iPhone 14 Plus": 350,
  "iPhone 14": 310,
  "iPhone 13 Pro Max": 380,
  "iPhone 13 Pro": 330,
  "iPhone 13": 270,
  "iPhone 13 mini": 220,
  "iPhone 12 Pro Max": 260,
  "iPhone 12 Pro": 230,
  "iPhone 12": 190,
  "iPhone 12 mini": 150,
  "iPhone 11 Pro Max": 180,
  "iPhone 11 Pro": 150,
  "iPhone 11": 130,
  "iPhone SE (3ª gen)": 160,
  "iPhone SE (2ª gen)": 80,
  "iPhone XS Max": 100,
  "iPhone XS": 80,
  "iPhone XR": 70,
  "iPhone X": 50,
};

const CAPACITY_MULTIPLIERS: Record<string, number> = {
  "128GB": 1,
  "256GB": 1.1,
  "512GB": 1.25,
  "1TB": 1.4,
};

const BATTERY_MULTIPLIERS: Record<string, number> = {
  "95-100%": 1,
  "85-94%": 0.9,
  "80-84%": 0.8,
  "<80%": 0.65,
};

const BOX_BONUS = 20;
const CHARGER_BONUS = 15;

export default function Calculator() {
  const [model, setModel] = useState<string | null>(null);
  const [searchModel, setSearchModel] = useState<string>("");
  const [capacity, setCapacity] = useState<string | null>(null);
  const [battery, setBattery] = useState<string | null>(null);
  const [hasBox, setHasBox] = useState(false);
  const [hasCharger, setHasCharger] = useState(false);

  // Filter models based on search
  const filteredModels = Object.keys(BASE_PRICES).filter(m => 
    m.toLowerCase().includes(searchModel.toLowerCase())
  );

  // Calculate estimated price
  let estimatedPrice = 0;
  if (model && capacity && battery) {
    const base = BASE_PRICES[model] || 500;
    const capMult = CAPACITY_MULTIPLIERS[capacity] || 1;
    const batMult = BATTERY_MULTIPLIERS[battery] || 1;
    
    estimatedPrice = base * capMult * batMult;
    if (hasBox) estimatedPrice += BOX_BONUS;
    if (hasCharger) estimatedPrice += CHARGER_BONUS;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white/50 backdrop-blur-xl border border-zinc-200 rounded-3xl shadow-2xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
          Calcula el valor de tu iPhone
        </h2>
        <p className="text-zinc-500 text-lg">Responde unas sencillas preguntas para obtener una tasación al instante.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Form */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Section 1: Model */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h3 className="text-xl font-semibold flex items-center text-zinc-800">
                <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                ¿Qué modelo es?
              </h3>
              <div className="relative w-full sm:w-64">
                <input 
                  type="text" 
                  placeholder="Buscar iPhone..." 
                  value={searchModel}
                  onChange={(e) => setSearchModel(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-xl border border-zinc-200 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
                <svg className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {filteredModels.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                No hemos encontrado ningún modelo con ese nombre.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[170px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredModels.map((m) => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className={clsx(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
                    model === m
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700"
                  )}
                >
                  {m}
                </button>
                ))}
              </div>
            )}
          </section>

          {/* Section 2: Capacity */}
          <section className={clsx("transition-opacity duration-300", !model && "opacity-40 pointer-events-none")}>
            <h3 className="text-xl font-semibold mb-4 text-zinc-800">Capacidad</h3>
            <div className="grid grid-cols-4 gap-3">
              {Object.keys(CAPACITY_MULTIPLIERS).map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapacity(cap)}
                  className={clsx(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
                    capacity === cap
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                      : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700"
                  )}
                >
                  {cap}
                </button>
              ))}
            </div>
          </section>

          {/* Section 3: Battery */}
          <section className={clsx("transition-opacity duration-300", (!model || !capacity) && "opacity-40 pointer-events-none")}>
            <h3 className="text-xl font-semibold mb-4 flex items-center text-zinc-800">
              <Battery className="w-5 h-5 mr-2 text-blue-600" />
              Salud de la batería
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(BATTERY_MULTIPLIERS).map((bat) => {
                let Icon = BatteryMedium;
                let iconColor = "text-zinc-400";
                
                if (bat === "95-100%") {
                  Icon = BatteryFull;
                  iconColor = "text-green-500";
                } else if (bat === "85-94%") {
                  Icon = BatteryMedium;
                  iconColor = "text-yellow-500";
                } else if (bat === "80-84%") {
                  Icon = BatteryLow;
                  iconColor = "text-orange-500";
                } else if (bat === "<80%") {
                  Icon = BatteryWarning;
                  iconColor = "text-red-500";
                }

                const isSelected = battery === bat;

                return (
                  <button
                    key={bat}
                    onClick={() => setBattery(bat)}
                    className={clsx(
                      "flex items-center p-4 rounded-2xl border transition-all duration-200 text-left",
                      isSelected
                        ? "border-blue-600 bg-blue-50 shadow-sm ring-1 ring-blue-600/20"
                        : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                    )}
                  >
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-3 shrink-0 transition-colors",
                      isSelected ? "bg-white shadow-sm" : "bg-zinc-100"
                    )}>
                      <Icon className={clsx("w-5 h-5", isSelected ? iconColor : "text-zinc-500")} />
                    </div>
                    <div>
                      <p className={clsx("font-bold text-sm", isSelected ? "text-blue-900" : "text-zinc-800")}>{bat}</p>
                      <p className={clsx("text-xs mt-0.5", isSelected ? "text-blue-600" : "text-zinc-500")}>
                        {bat === "95-100%" ? "Excelente estado" :
                         bat === "85-94%" ? "Buen estado" :
                         bat === "80-84%" ? "Uso normal" : "Requiere cambio"}
                      </p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Section 4: Extras */}
          <section className={clsx("transition-opacity duration-300", (!model || !capacity || !battery) && "opacity-40 pointer-events-none")}>
            <h3 className="text-xl font-semibold mb-4 text-zinc-800">Accesorios incluidos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setHasBox(!hasBox)}
                className={clsx(
                  "flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 text-left",
                  hasBox
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center">
                  <Package className={clsx("w-5 h-5 mr-3", hasBox ? "text-blue-600" : "text-zinc-400")} />
                  <div>
                    <p className={clsx("font-medium", hasBox ? "text-blue-700" : "text-zinc-700")}>Caja original</p>
                    <p className="text-xs text-zinc-500">+20€ valor extra</p>
                  </div>
                </div>
                {hasBox && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </button>

              <button
                onClick={() => setHasCharger(!hasCharger)}
                className={clsx(
                  "flex items-center justify-between px-5 py-4 rounded-xl border transition-all duration-200 text-left",
                  hasCharger
                    ? "border-blue-600 bg-blue-50 shadow-sm"
                    : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                )}
              >
                <div className="flex items-center">
                  <Plug className={clsx("w-5 h-5 mr-3", hasCharger ? "text-blue-600" : "text-zinc-400")} />
                  <div>
                    <p className={clsx("font-medium", hasCharger ? "text-blue-700" : "text-zinc-700")}>Cargador original</p>
                    <p className="text-xs text-zinc-500">+15€ valor extra</p>
                  </div>
                </div>
                {hasCharger && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </button>
            </div>
          </section>
        </div>

        {/* Right column: Results/Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-zinc-900 text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>
            
            <h4 className="text-lg font-medium text-zinc-300 mb-6">Tu tasación estimada</h4>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between items-center border-b border-zinc-700/50 pb-3">
                <span className="text-zinc-400">Modelo</span>
                <span className="font-medium">{model || "—"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-700/50 pb-3">
                <span className="text-zinc-400">Capacidad</span>
                <span className="font-medium">{capacity || "—"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-zinc-700/50 pb-3">
                <span className="text-zinc-400">Batería</span>
                <span className="font-medium">{battery || "—"}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-zinc-400">Extras</span>
                <span className="font-medium text-right">
                  {!hasBox && !hasCharger && "Ninguno"}
                  {hasBox && "Caja "}
                  {hasBox && hasCharger && "+ "}
                  {hasCharger && "Cargador"}
                </span>
              </div>
            </div>

            <div className="mt-8 mb-8">
              <p className="text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2">Valor Estimado</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-bold tracking-tight">
                  {estimatedPrice > 0 ? `€${Math.round(estimatedPrice)}` : "€0"}
                </span>
              </div>
              <p className="text-zinc-500 text-xs mt-2">*Precio orientativo sujeto a revisión visual de posibles daños estéticos.</p>
            </div>

            <Link
              href={(!model || !capacity || !battery) ? "#" : `/vender/detalles?model=${model}&capacity=${capacity}&battery=${battery}&price=${estimatedPrice}`}
              className={clsx(
                "w-full py-4 px-6 rounded-xl font-medium transition-colors flex justify-center items-center group",
                (!model || !capacity || !battery) 
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50 pointer-events-none" 
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              )}
            >
              Continuar oferta
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
