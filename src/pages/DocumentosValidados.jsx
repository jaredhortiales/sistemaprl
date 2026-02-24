import React, { useMemo, useState } from "react";
import { loadDocuments, saveDocuments } from "../utils/storage.js";
import { initialDocuments } from "../data/documents.mock.js";
import UploadForm from "../components/UploadForm.jsx";
import DocumentList from "../components/DocumentList.jsx";
import { Status } from "../utils/status.js";

export default function DocumentosValidados() {
  const [docs, setDocs] = useState(() => {
    const stored = loadDocuments();
    if (stored) return stored;
    saveDocuments(initialDocuments);
    return initialDocuments;
  });

  const validated = useMemo(() => {
    // "Validados" (en esta maqueta): cumplidos (con o sin observaciones)
    return docs.filter(
      (d) => d.estatus === Status.CUMPLIDO_CONCLUIDO || d.estatus === Status.CUMPLIDO_CON_OBSERVACIONES
    );
  }, [docs]);

  function onSubmitUpdate(payload) {
    // Encuentra el primer documento por nombre (en un sistema real sería por ID)
    const idx = docs.findIndex((d) => d.documento === payload.documento);
    if (idx === -1) return;

    const updated = [...docs];
    updated[idx] = {
      ...updated[idx],
      ...payload
    };

    setDocs(updated);
    saveDocuments(updated);
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-2xl font-semibold text-slate-900">Documentos Validados</div>
        <div className="text-sm text-slate-600">Procura no repetir los documentos que están enlistados a continuación</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <UploadForm documents={docs} onSubmitUpdate={onSubmitUpdate} />

        <div className="lg:pt-2">
          <DocumentList documents={validated} />
        </div>
      </div>
    </div>
  );
}
