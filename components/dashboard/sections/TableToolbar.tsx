"use client";

import React from "react";
import { useDashboardStore } from "@/components/dashboard/store/DashboardStore";

export function TableToolbar({
  placeholder,
}: {
  placeholder: string;
}) {
  const { state, actions } = useDashboardStore();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <input
          value={state.globalSearch}
          onChange={(e) => actions.setGlobalSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:border-sky-400/40"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => actions.setGlobalSearch("")}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/10"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

