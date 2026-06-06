"use client";

import React from "react";
import { TableToolbar } from "@/components/dashboard/sections/TableToolbar";

export function GlobalSearchAndControls() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
      <TableToolbar placeholder="Search clients, invoices, proposals…" />
    </div>
  );
}

