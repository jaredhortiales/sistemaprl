import React, { useMemo, useState } from "react";
import { Status } from "../utils/status.js";

const statusOptions = [
  { value: Status.CUMPLIDO_CONCLUIDO, label: "CUMPLIDO / CONCLUIDO" },
  { value: Status.CUMPLIDO_CON_OBSERVACIONES, label: "CUMPLIDO / CON OBSERVACIONES QUE SOLVENTAR" },
  { value: Status.NO_CUMPLIDO_SIN_AVANCES, label: "NO CUMPLIDO / NO HAY AVANCES" },
  { value: Status.NO_APLICA, label: "NO APLICA" }
];

export default function UploadForm({ documents, onSubmitUpdate }) {
  const docOptions = useMemo(() => {
    // evita duplicados por nombre
    const seen = new Set();
    return documents
      .map((d) => d.documento)
      .filter((n) => {
        const k = n.trim().toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .sort((a, b) => a.localeCompare(b));
  }, [documents]);

  const [documento, setDocumento] = useState("");
  const [fueJustificado, setFueJustificado] = useState(false);
  const [justificacion, setJustificacion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [estatus, setEstatus] = useState(Status.NO_APLICA);
  const [file, setFile] = useState(null);

  const todayISO = new Date().toISOString().slice(0, 10);

  function validate() {
    if (!documento) return "Seleccione un documento.";
    if (!fechaVencimiento) return "Seleccione la fecha de vencimiento del trámite.";
    if (fechaVencimiento < todayISO) return "La fecha de vencimiento no puede ser anterior a hoy.";
    if (fueJustificado && !justificacion.trim()) return "Si fue justificado, capture la justificación.";
    return null;
  }

  const error = validate();

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return;

    const fileMeta = file
      ? { name: file.name, size: file.size, type: file.type }
      : null;

    onSubmitUpdate({
      documento,
      fueJustificado,
      justificacion: fueJustificado ? justificacion.trim() : (justificacion.trim() || "NO"),
      fechaVencimiento,
      estatus,
      archivoMeta: fileMeta,
      fechaCarga: todayISO
    });

    // reset parcial
    setFueJustificado(false);
    setJustificacion("");
    setFechaVencimiento("");
    setEstatus(Status.NO_APLICA);
    setFile(null);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-slate-200 p-6 max-w-xl">
      <div className="text-lg font-semibold text-slate-900">Apartado para subir documentos</div>
      <div className="mt-1 text-sm text-slate-600">
        (si no necesitas justificar solo coloca <b>NO</b> y marca la casilla)
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-700">Documento *</label>
          <select
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="">Seleccione…</option>
            {docOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Estatus *</label>
          <select
            value={estatus}
            onChange={(e) => setEstatus(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Fecha de vencimiento del trámite *</label>
          <input
            type="date"
            value={fechaVencimiento}
            min={todayISO}
            onChange={(e) => setFechaVencimiento(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="just"
            type="checkbox"
            checked={fueJustificado}
            onChange={(e) => setFueJustificado(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="just" className="text-sm font-medium text-slate-700">¿Fue justificado? *</label>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Justificación *</label>
          <textarea
            value={justificacion}
            onChange={(e) => setJustificacion(e.target.value)}
            placeholder="Complete este campo"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm min-h-28"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Documento subido</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
          />
          <div className="mt-1 text-xs text-slate-500">
            (Sin backend: se guarda solo metadata del archivo en el navegador)
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!!error}
          className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
            error ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
