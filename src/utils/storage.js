const KEY = "prl_documents_v1";

export function loadDocuments() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveDocuments(docs) {
  localStorage.setItem(KEY, JSON.stringify(docs));
}
