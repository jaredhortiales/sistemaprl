import React from "react";

export default function AreaSummaryTable({ rows }) {
  return (
    <div className="mt-6 rounded-2xl bg-white border border-slate-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="text-sm font-semibold text-slate-900">Resumen por área</div>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium text-slate-600">Área</th>
              <th className="px-4 py-3 font-medium text-slate-600">Por subir</th>
              <th className="px-4 py-3 font-medium text-slate-600">Subidos/validados</th>
              <th className="px-4 py-3 font-medium text-slate-600">No aplica</th>
              <th className="px-4 py-3 font-medium text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.area} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{r.area}</td>
                <td className="px-4 py-3">{r.porSubir}</td>
                <td className="px-4 py-3">{r.subidosValidos}</td>
                <td className="px-4 py-3">{r.noAplica}</td>
                <td className="px-4 py-3 font-semibold">{r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
