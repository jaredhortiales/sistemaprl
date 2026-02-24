import React, { useMemo, useState } from "react";
import { initialDocuments } from "../data/documents.mock.js";
import { loadDocuments, saveDocuments } from "../utils/storage.js";
import { classifyForCounters } from "../utils/status.js";
import StatCards from "../components/StatCards.jsx";
import AreaSummaryTable from "../components/AreaSummaryTable.jsx";

function computeCounts(docs) {
  let porSubir = 0, subidosValidos = 0, noAplica = 0;
  for (const d of docs) {
    const c = classifyForCounters(d.estatus);
    if (c === "POR_SUBIR") porSubir++;
    else if (c === "SUBIDOS_VALIDOS") subidosValidos++;
    else noAplica++;
  }
  return { porSubir, subidosValidos, noAplica };
}

export default function Dashboard() {
  const [docs] = useState(() => loadDocuments() ?? initialDocuments);
  const [picked, setPicked] = useState(null);

  // (opcional) garantiza que exista en storage para consistencia entre páginas:
  React.useEffect(() => {
    const current = loadDocuments();
    if (!current) saveDocuments(docs);
  }, [docs]);

  const counts = useMemo(() => computeCounts(docs), [docs]);

  const areaRows = useMemo(() => {
    const areas = ["LEGAL", "LABORAL", "SAFETY", "ENVIRONMENT"];
    return areas.map((area) => {
      const subset = docs.filter((d) => d.area === area);
      const c = computeCounts(subset);
      const total = subset.length;
      return { area, ...c, total };
    });
  }, [docs]);

  return (
    <div>
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-prl-full.png`}
              alt="PR&L"
              className="max-h-24 object-contain"
            />
            <div className="mt-6 text-2xl font-semibold text-slate-900">BIENVENIDO</div>
            <div className="text-sm text-slate-600">
              En este portal podrás subir y revisar tu estatus actual de documentos.
            </div>
          </div>

          <div className="w-full lg:w-[420px]">
            <StatCards counts={counts} onPick={setPicked} />
            {picked && (
              <div className="mt-3 text-xs text-slate-500">
                Filtro seleccionado: <b>{picked}</b> (en esta vista es solo informativo)
              </div>
            )}
          </div>
        </div>
      </div>

      <AreaSummaryTable rows={areaRows} />
    </div>
  );
}
