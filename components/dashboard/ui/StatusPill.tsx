"use client";

import React from "react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}


export function StatusPill({
  status,
  variant,
  className,
}: {
  status: string;
  variant?: "client" | "invoice" | "proposal" | "neutral";
  className?: string;
}) {
  const v = variant ?? "neutral";
  const base = "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium";

  const styles: Record<string, string> = {
    // client
    Active: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Inactive: "bg-slate-50 border-slate-200 text-slate-600",

    // invoice
    Paid: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Pending: "bg-sky-50 border-sky-200 text-sky-700",
    Overdue: "bg-rose-50 border-rose-200 text-rose-700",

    // proposal
    Accepted: "bg-emerald-50 border-emerald-200 text-emerald-700",
    Rejected: "bg-rose-50 border-rose-200 text-rose-700",
  };

  const cls = styles[status] ?? "bg-white border-white/20 text-white/80";

  return <span className={cn(base, cls, className)}>{status}</span>;
}

