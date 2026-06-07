"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { useDashboardDerived, useDashboardStore } from "@/components/dashboard/store/DashboardStore";

function formatLastContact(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
}

export function ClientsTable() {
  const { filteredClients } = useDashboardDerived();
  const { state, actions } = useDashboardStore();

  return (
    <Card variant="glassDark" className="shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-white">Clients</CardTitle>
            <CardDescription className="text-white/55">Search + status filter applies everywhere.</CardDescription>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(["All", "Active", "Inactive"] as const).map((s) => {
              const active = state.clientStatusFilter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => actions.setClientStatusFilter(s)}
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
        {filteredClients.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-white font-medium">No matching clients</div>
            <div className="text-white/55 text-sm mt-1">Try clearing filters.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full border-separate" aria-label="Clients table">
              <thead>
                <tr className="text-left">
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Client</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Industry</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Owner</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Last Contact</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((c) => (
                  <tr key={c.id} className="border-t border-white/10">
                    <td className="py-4 px-4">
                      <div className="text-sm text-white font-medium">{c.name}</div>
                      <div className="text-xs text-white/55">{c.email}</div>
                    </td>
                    <td className="py-4 px-4 text-sm text-white/80">{c.industry ?? "—"}</td>
                    <td className="py-4 px-4 text-sm text-white/80">{c.accountOwner ?? "—"}</td>
                    <td className="py-4 px-4 text-sm text-white/70">{formatLastContact(c.lastContactISO)}</td>
                    <td className="py-4 px-4">
                      <StatusPill status={c.status} variant="client" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

