import React from "react";
import { statusLabel } from "../utils/status.js";

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700">
      {children}
    </span>
  );
}

export default function DocumentList({ documents }) {
  return (
    <div className="mt-4 space-y-4">
      {documents.map((d) => (
        <div key={d.id} className="rounded-2xl bg-white border border-slate-200 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{d.documento}</Chip>
            <div className="ml-auto text-sm text-slate-700">{d.dependencia}</div>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="text-slate-500">Área</div>
              <div className="text-slate-900 font-medium">{d.area}</div>
            </div>
            <div>
              <div className="text-slate-500">Estatus</div>
              <div className="text-slate-900 font-medium">{statusLabel(d.estatus)}</div>
            </div>
            <div>
              <div className="text-slate-500">Vencimiento</div>
              <div className="text-slate-900 font-medium">{d.fechaVencimiento || "—"}</div>
            </div>
          </div>
        </div>
      ))}

      {documents.length === 0 && (
        <div className="rounded-2xl bg-white border border-slate-200 p-10 text-center text-slate-600">
          No results found. Please adjust your filter.
        </div>
      )}
    </div>
  );
}
