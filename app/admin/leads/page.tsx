import { getLeads } from "@/lib/actions";
import { UserIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

export default async function AdminLeadsPage() {
  const leads = await getLeads();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-2">Ofertas Recibidas</h1>
        <p className="text-zinc-500">Gestión de usuarios que quieren vender su iPhone.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Fecha</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Contacto</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Dispositivo (Valoración)</th>
              <th className="px-6 py-4 font-semibold text-zinc-500 text-sm">Estado</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                  No hay ofertas pendientes.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 mt-1">
                        <UserIcon className="w-4 h-4 text-indigo-500" />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900">{lead.contact.split(" - ")[0]}</p>
                        <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                          <EnvelopeIcon className="w-3 h-3 text-zinc-400" /> {lead.contact.split(" - ")[1]}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-zinc-900">{lead.model}</p>
                    <p className="text-sm font-semibold text-green-600 mt-1">
                      Oferta estimada: {lead.targetPrice > 0 ? `${lead.targetPrice}€` : "Pendiente"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={lead.status}
                      className="text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl px-4 py-2 cursor-pointer outline-none hover:bg-indigo-100 transition-colors"
                    >
                      <option value="NEW">✨ Nuevo</option>
                      <option value="CONTACTED">💬 Contactado</option>
                      <option value="REJECTED">❌ Rechazado</option>
                      <option value="BOUGHT">✅ Comprado</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
