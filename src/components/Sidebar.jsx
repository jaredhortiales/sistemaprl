import React from "react";
import { NavLink } from "react-router-dom";

function LinkItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-5 py-5">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}assets/logo-prl.png`}
            alt="PR&L"
            className="h-10 w-10 object-contain"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">PR&L</div>
            <div className="text-xs text-slate-500">Compliance and Legal Services</div>
          </div>
        </div>
      </div>

      <nav className="px-4 space-y-1">
        <LinkItem to="/dashboard">Documentos Esperados</LinkItem>
        <LinkItem to="/documentos-subidos">Documentos Subidos</LinkItem>
        <LinkItem to="/documentos-validados">Documentos Validados</LinkItem>
      </nav>

      <div className="mt-auto p-4">
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
          <div className="text-xs text-slate-500">Usuario</div>
          <div className="text-sm font-medium text-slate-800">galva@sistemaprl.click</div>
        </div>
      </div>
    </aside>
  );
}
