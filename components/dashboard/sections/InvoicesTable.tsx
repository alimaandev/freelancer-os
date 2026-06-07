"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { moneyFromCents, useDashboardDerived, useDashboardStore } from "@/components/dashboard/store/DashboardStore";

function dueLabel(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

export function InvoicesTable() {
  const { filteredInvoices, clientById } = useDashboardDerived();
  const { state, actions, markInvoicePaid, sendInvoiceReminder } = useDashboardStore();

  const [busyId, setBusyId] = useState<string | null>(null);

  const totals = useMemo(() => {
    const overdue = filteredInvoices.filter((i) => i.status === "Overdue").length;
    const pending = filteredInvoices.filter((i) => i.status === "Pending").length;
    return { overdue, pending };
  }, [filteredInvoices]);

  async function handleMarkPaid(invoiceId: string) {
    setBusyId(invoiceId);
    // demo latency
    await new Promise((r) => setTimeout(r, 350));
    markInvoicePaid(invoiceId);
    setBusyId(null);
  }

  return (
    <Card variant="glassDark" className="shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-white">Invoices</CardTitle>
            <CardDescription className="text-white/55">Actions update state instantly (demo).</CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["All", "Paid", "Pending", "Overdue"] as const).map((s) => {
              const active = state.invoiceStatusFilter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => actions.setInvoiceStatusFilter(s)}
                  className={
                    "px-3 py-1.5 rounded-xl text-xs border transition-all " +
                    (active
                      ? "bg-white/10 border-white/20 text-white shadow-[0_10px_30px_-15px_rgba(56,189,248,0.35)]"
                      : "bg-white/0 border-white/10 text-white/70 hover:bg-white/5 hover:text-white")
                  }
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 text-xs text-white/55">
          Filtered totals: Pending <span className="text-white">{totals.pending}</span> • Overdue{" "}
          <span className="text-white">{totals.overdue}</span>
        </div>

        {filteredInvoices.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-white font-medium">No matching invoices</div>
            <div className="text-white/55 text-sm mt-1">Try clearing filters.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-separate" aria-label="Invoices table">
              <thead>
                <tr className="text-left">
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Invoice</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Client</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Due</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Amount</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Status</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const client = clientById.get(inv.clientId);
                  const canPay = inv.status !== "Paid";

                  return (
                    <tr key={inv.id} className="border-t border-white/10">
                      <td className="py-4 px-4">
                        <div className="text-sm text-white font-medium">{inv.id}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-white/80">{client?.name ?? "—"}</div>
                        <div className="text-xs text-white/55">{client?.email ?? ""}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-white/70">{dueLabel(inv.dueDateISO)}</td>
                      <td className="py-4 px-4 text-sm text-white/80">{moneyFromCents(inv.amountCents)}</td>
                      <td className="py-4 px-4">
                        <StatusPill status={inv.status} variant="invoice" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={!canPay || busyId === inv.id}
                            onClick={() => handleMarkPaid(inv.id)}
                            className={
                              "rounded-xl border px-3 py-1.5 text-xs transition-all " +
                              (canPay
                                ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15"
                                : "border-white/10 bg-white/0 text-white/40")
                            }
                          >
                            {busyId === inv.id ? "Updating…" : inv.status === "Paid" ? "Paid" : "Mark paid"}
                          </button>
                          <button
                            type="button"
                            disabled={busyId === inv.id}
                            onClick={() => sendInvoiceReminder(inv.id)}

                            className={
                              "rounded-xl border px-3 py-1.5 text-xs transition-all border-white/10 bg-white/0 text-white/70 hover:bg-white/5"
                            }
                          >
                            Reminder
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

