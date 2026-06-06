"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import type { DateRangeKey } from "@/components/dashboard/store/DashboardStore";
import { useDashboardStore } from "@/components/dashboard/store/DashboardStore";

const OPTIONS: Array<{ key: DateRangeKey; label: string }> = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
];

export function DateRangeSelector() {
  const { state, actions } = useDashboardStore();

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-1">
      {OPTIONS.map((opt) => {
        const active = state.dateRange === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => actions.setDateRange(opt.key)}
            className={
              "px-3 py-1.5 text-xs rounded-lg transition-all " +
              (active
                ? "bg-white/10 text-white shadow-[0_10px_30px_-15px_rgba(56,189,248,0.45)]"
                : "text-white/70 hover:text-white hover:bg-white/5")
            }
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

