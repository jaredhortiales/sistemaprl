import { normalizeStatus } from "../utils/status.js";

const raw = [
  { area: "LEGAL", dependencia: "LEGAL", documento: "Acta Constitutiva", periodo: "2025-11", estatus: "CUMPLIDO / CONCLUIDO" },
  { area: "LEGAL", dependencia: "LEGAL", documento: "Licencia de Terminación de Obra", periodo: "2025-11", estatus: "NO CUMPLIDO / NO HAY AVANCES" },
  { area: "LEGAL", dependencia: "LEGAL", documento: "REPSE", periodo: "2025-11", estatus: "" }, // vacío => NO APLICA
  { area: "ENVIRONMENT", dependencia: "SMADS", documento: "Reporte Annual de RME", periodo: "2025-11", estatus: "NO CUMPLIDO / NO HAY AVANCES" },
  { area: "ENVIRONMENT", dependencia: "CESPT", documento: "Contrato de Tratamiento Conjunto de aguas residuales", periodo: "2025-11", estatus: "CUMPLIDO / CONCLUIDO" },
  { area: "SAFETY", dependencia: "BOMBEROS Y PROTECCION CIVIL", documento: "Certificado de Medidas Preventivas de Bomberos", periodo: "2025-11", estatus: "CUMPLIDO / CONCLUIDO" },
  { area: "LABORAL", dependencia: "LABORAL", documento: "Reconocimiento y evaluacion de los niveles de ruido", periodo: "2025-11", estatus: "NO CUMPLIDO / NO HAY AVANCES" }
];

export const initialDocuments = raw.map((r, idx) => ({
  id: `doc_${idx + 1}`,
  area: r.area,
  dependencia: r.dependencia,
  documento: r.documento,
  periodo: r.periodo,
  estatus: normalizeStatus(r.estatus),
  fechaVencimiento: "",      // se llenará en el formulario
  fechaCarga: "",
  archivoMeta: null,
  fueJustificado: false,
  justificacion: ""
}));
