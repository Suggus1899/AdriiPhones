"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function CatalogoFilters() {
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

  return (
    <div className="flex flex-wrap gap-2">
      <select
        defaultValue={searchParams.get("modelo") ?? ""}
        onChange={(e) => handleChange("modelo", e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
      >
        <option value="">Cualquier modelo</option>
        <option value="17">iPhone 17 Series</option>
        <option value="16">iPhone 16 Series</option>
        <option value="15">iPhone 15 Series</option>
        <option value="14">iPhone 14 Series</option>
        <option value="13">iPhone 13 Series</option>
        <option value="12">iPhone 12 Series</option>
        <option value="11">iPhone 11 Series</option>
        <option value="SE">iPhone SE</option>
      </select>

      <select
        defaultValue={searchParams.get("estado") ?? ""}
        onChange={(e) => handleChange("estado", e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
      >
        <option value="">Cualquier estado</option>
        <option value="Como nuevo">Como nuevo</option>
        <option value="Buen estado">Buen estado</option>
        <option value="Con detalles">Con detalles</option>
      </select>

      <select
        defaultValue={searchParams.get("orden") ?? ""}
        onChange={(e) => handleChange("orden", e.target.value)}
        className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
      >
        <option value="">Más recientes</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
      </select>
    </div>
  );
}
