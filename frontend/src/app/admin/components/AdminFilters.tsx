"use client";

import { Calendar, X } from "lucide-react";
import type { Filters } from "../useAdmin";

interface AdminFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
}

export function AdminFilters({ filters, onChange }: AdminFiltersProps) {
  const hasFilter = filters.from || filters.to;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 flex flex-wrap items-center gap-3">
      <Calendar className="w-4 h-4 text-gray-400 shrink-0" />

      <div className="flex items-center gap-2 flex-1 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">De</label>
          <input
            type="date"
            value={filters.from}
            max={filters.to || undefined}
            onChange={(e) => onChange({ ...filters, from: e.target.value })}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">Até</label>
          <input
            type="date"
            value={filters.to}
            min={filters.from || undefined}
            onChange={(e) => onChange({ ...filters, to: e.target.value })}
            className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {hasFilter && (
        <button
          onClick={() => onChange({ from: "", to: "" })}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Limpar
        </button>
      )}
    </div>
  );
}
