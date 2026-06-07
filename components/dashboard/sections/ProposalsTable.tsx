"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";
import { useDashboardDerived, useDashboardStore, type ProposalStatus } from "@/components/dashboard/store/DashboardStore";

export function ProposalsTable() {
  const { filteredProposals, clientById } = useDashboardDerived();
  const { state, actions, setProposalStatus } = useDashboardStore();

  const [busyId, setBusyId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const accepted = filteredProposals.filter((p) => p.status === "Accepted").length;
    const pending = filteredProposals.filter((p) => p.status === "Pending").length;
    const rejected = filteredProposals.filter((p) => p.status === "Rejected").length;
    return { accepted, pending, rejected };
  }, [filteredProposals]);

  async function updateStatus(id: string, status: ProposalStatus) {
    setBusyId(id);
    await new Promise((r) => setTimeout(r, 300));
    setProposalStatus(id, status);
    setBusyId(null);
  }

  return (
    <Card variant="glassDark" className="shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="text-white">Proposals</CardTitle>
            <CardDescription className="text-white/55">Accept/reject updates state (demo).</CardDescription>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["All", "Accepted", "Pending", "Rejected"] as const).map((s) => {
              const active = state.proposalStatusFilter === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => actions.setProposalStatusFilter(s)}
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
          Filtered totals: Accepted <span className="text-white">{counts.accepted}</span> • Pending{" "}
          <span className="text-white">{counts.pending}</span> • Rejected{" "}
          <span className="text-white">{counts.rejected}</span>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-white font-medium">No matching proposals</div>
            <div className="text-white/55 text-sm mt-1">Try clearing filters.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full border-separate" aria-label="Proposals table">
              <thead>
                <tr className="text-left">
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Proposal</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Client</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Created</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Status</th>
                  <th className="text-xs text-white/55 font-medium py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProposals.map((p) => {
                  const c = clientById.get(p.clientId);

                  return (
                    <tr key={p.id} className="border-t border-white/10">
                      <td className="py-4 px-4">
                        <div className="text-sm text-white font-medium">{p.id}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-white/80">{c?.name ?? "—"}</div>
                        <div className="text-xs text-white/55">{c?.email ?? ""}</div>
                      </td>
                      <td className="py-4 px-4 text-sm text-white/70">
                        {new Date(p.createdISO + "T00:00:00Z").toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <StatusPill status={p.status} variant="proposal" />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={busyId === p.id}
                            onClick={() => updateStatus(p.id, "Accepted")}
                            className="rounded-xl border px-3 py-1.5 text-xs transition-all border-emerald-400/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15 disabled:opacity-60"
                          >
                            {busyId === p.id ? "Updating…" : "Accept"}
                          </button>
                          <button
                            type="button"
                            disabled={busyId === p.id}
                            onClick={() => updateStatus(p.id, "Rejected")}
                            className="rounded-xl border px-3 py-1.5 text-xs transition-all border-rose-400/40 bg-rose-400/10 text-rose-200 hover:bg-rose-400/15 disabled:opacity-60"
                          >
                            Reject
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

