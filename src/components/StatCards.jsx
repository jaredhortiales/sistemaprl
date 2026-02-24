import React from "react";

function Card({ title, value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow transition"
    >
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
    </button>
  );
}

export default function StatCards({ counts, onPick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Documentos por subir" value={counts.porSubir} onClick={() => onPick("POR_SUBIR")} />
      <Card title="Subidos / validados" value={counts.subidosValidos} onClick={() => onPick("SUBIDOS_VALIDOS")} />
      <Card title="No aplica" value={counts.noAplica} onClick={() => onPick("NO_APLICA")} />
    </div>
  );
}
