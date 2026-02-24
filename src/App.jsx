import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DocumentosSubidos from "./pages/DocumentosSubidos.jsx";
import DocumentosValidados from "./pages/DocumentosValidados.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/documentos-subidos" element={<DocumentosSubidos />} />
            <Route path="/documentos-validados" element={<DocumentosValidados />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
