"use client";

import { useState } from "react";
import { createProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await createProduct(formData);
      router.push("/admin/productos");
    } catch (error) {
      console.error(error);
      alert("Error al crear producto");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/productos" className="p-2 bg-white rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </Link>
        <h1 className="text-3xl font-bold text-zinc-900">Añadir Nuevo iPhone</h1>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Modelo</label>
              <select name="model" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
                <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                <option value="iPhone 15">iPhone 15</option>
                <option value="iPhone 14 Pro Max">iPhone 14 Pro Max</option>
                <option value="iPhone 14 Pro">iPhone 14 Pro</option>
                <option value="iPhone 13">iPhone 13</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Capacidad</label>
              <select name="capacity" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
                <option value="1TB">1TB</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Color</label>
              <input type="text" name="color" required placeholder="Ej. Titanio Natural" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Salud de Batería</label>
              <input type="text" name="battery" required placeholder="Ej. 100%" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Estado</label>
              <select name="condition" required className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Como nuevo">Como nuevo</option>
                <option value="Buen estado">Buen estado</option>
                <option value="Con detalles">Con detalles</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700">Precio (€)</label>
              <input type="number" name="price" required placeholder="Ej. 850" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-zinc-700">Fotos del producto</label>
            <input type="file" name="files" multiple required accept="image/*" className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white" />
            <p className="text-xs text-zinc-500">Puedes seleccionar varias fotos. Se subirán automáticamente al servidor.</p>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publicar en Catálogo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
