import React, { useMemo, useState } from "react";
import { loadDocuments, saveDocuments } from "../utils/storage.js";
import { initialDocuments } from "../data/documents.mock.js";
import DependencySelect from "../components/DependencySelect.jsx";
import DocumentList from "../components/DocumentList.jsx";
import { Status } from "../utils/status.js";

export default function DocumentosSubidos() {
  const [docs] = useState(() => {
    const stored = loadDocuments();
    if (stored) return stored;
    saveDocuments(initialDocuments);
    return initialDocuments;
  });

  const [dep, setDep] = useState("");

  const dependencies = useMemo(() => {
    const set = new Set(docs.map((d) => d.dependencia).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [docs]);

  const filtered = useMemo(() => {
    // "Subidos" = cumplidos (concluidos u observaciones)
    const subidos = docs.filter(
      (d) => d.estatus === Status.CUMPLIDO_CONCLUIDO || d.estatus === Status.CUMPLIDO_CON_OBSERVACIONES
    );
    if (!dep) return subidos;
    return subidos.filter((d) => d.dependencia === dep);
  }, [docs, dep]);

  return (
    <div>
      <div className="text-2xl font-semibold text-slate-900">DOCUMENTOS SUBIDOS</div>

      <div className="mt-4">
        <DependencySelect value={dep} onChange={setDep} options={dependencies} />
      </div>

      <DocumentList documents={filtered} />
    </div>
  );
}
