"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

interface CatalogoFiltersProps {
  models: string[];
  conditions: string[];
  currentModelo: string;
  currentEstado: string;
  currentOrden: string;
}

export default function CatalogoFilters({
  models,
  conditions,
  currentModelo,
  currentEstado,
  currentOrden,
}: CatalogoFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (name: string, value: string) => {
    router.push(pathname + "?" + createQueryString(name, value));
  };

  const selectClass =
    "px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-zinc-800 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-default";

  return (
    <div className="flex flex-wrap gap-2">
      <select
        value={currentModelo}
        onChange={(e) => handleChange("modelo", e.target.value)}
        className={selectClass}
        disabled={models.length === 0}
      >
        <option value="">Todos los modelos</option>
        {models.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={currentEstado}
        onChange={(e) => handleChange("estado", e.target.value)}
        className={selectClass}
        disabled={conditions.length === 0}
      >
        <option value="">Cualquier estado</option>
        {conditions.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={currentOrden}
        onChange={(e) => handleChange("orden", e.target.value)}
        className={selectClass}
      >
        <option value="">Más recientes</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
      </select>
    </div>
  );
}
