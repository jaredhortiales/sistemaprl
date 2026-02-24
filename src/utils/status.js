export const Status = Object.freeze({
  CUMPLIDO_CONCLUIDO: "CUMPLIDO_CONCLUIDO",
  CUMPLIDO_CON_OBSERVACIONES: "CUMPLIDO_CON_OBSERVACIONES",
  NO_CUMPLIDO_SIN_AVANCES: "NO_CUMPLIDO_SIN_AVANCES",
  NO_APLICA: "NO_APLICA"
});

export function normalizeStatus(raw) {
  const v = (raw ?? "").toString().trim();
  if (!v) return Status.NO_APLICA;

  const upper = v.toUpperCase();

  if (upper.includes("CUMPLIDO") && upper.includes("OBSERV")) return Status.CUMPLIDO_CON_OBSERVACIONES;
  if (upper.includes("CUMPLIDO")) return Status.CUMPLIDO_CONCLUIDO;
  if (upper.includes("NO CUMPLIDO") || upper.includes("NO HAY AVANCES")) return Status.NO_CUMPLIDO_SIN_AVANCES;
  if (upper.includes("NO APLICA")) return Status.NO_APLICA;

  // fallback conservador:
  return Status.NO_APLICA;
}

export function classifyForCounters(status) {
  if (status === Status.NO_CUMPLIDO_SIN_AVANCES) return "POR_SUBIR";
  if (status === Status.CUMPLIDO_CONCLUIDO || status === Status.CUMPLIDO_CON_OBSERVACIONES) return "SUBIDOS_VALIDOS";
  return "NO_APLICA";
}

export function statusLabel(status) {
  switch (status) {
    case Status.CUMPLIDO_CONCLUIDO:
      return "CUMPLIDO / CONCLUIDO";
    case Status.CUMPLIDO_CON_OBSERVACIONES:
      return "CUMPLIDO / CON OBSERVACIONES";
    case Status.NO_CUMPLIDO_SIN_AVANCES:
      return "NO CUMPLIDO / NO HAY AVANCES";
    default:
      return "NO APLICA";
  }
}
