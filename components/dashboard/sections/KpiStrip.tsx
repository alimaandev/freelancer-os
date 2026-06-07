"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { DateRangeSelector } from "@/components/dashboard/sections/DateRangeSelector";
import { useDashboardDerived } from "@/components/dashboard/store/DashboardStore";

function KpiCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
}) {
  return (
    <Card variant="glassDark" className="shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
      <div className="p-4">
        <div className="text-xs text-white/60">{label}</div>
        <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
        {sub ? <div className="mt-1 text-xs text-white/45">{sub}</div> : null}
      </div>
    </Card>
  );
}

export function KpiStrip() {
  const { kpis } = useDashboardDerived();

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Ops Dashboard</h2>
          <p className="text-sm text-white/55">{kpis.summaryText}</p>
        </div>
        <DateRangeSelector />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Clients" value={kpis.totalClients} sub={`Active: ${kpis.activeClients}`} />
        <KpiCard label="Revenue (Paid + Pending)" value={`$${(kpis.revenueCents / 100).toFixed(2)}`} sub="Demo calculation" />
        <KpiCard label="Pending Invoices" value={kpis.pendingInvoices} sub={`Overdue: ${kpis.overdueInvoices}`} />
        <KpiCard label="Accepted Proposals" value={kpis.acceptedProposals} sub={kpis.lastInvoiceDue ? `Last due: ${kpis.formatISOToDate(kpis.lastInvoiceDue)}` : undefined} />
      </div>
    </section>
  );
}

