"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useDashboardDerived } from "@/components/dashboard/store/DashboardStore";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";

function bullet(icon: string, text: string) {
  return (
    <li className="flex gap-3">
      <span className="text-white/70">{icon}</span>
      <span className="text-sm text-white/80">{text}</span>
    </li>
  );
}

export function CopilotPanel() {
  const { kpis, filteredInvoices, filteredProposals, filteredClients } = useDashboardDerived();

  const plan = useMemo(() => {
    const overdue = filteredInvoices.filter((i) => i.status === "Overdue").length;
    const pendingInv = filteredInvoices.filter((i) => i.status === "Pending").length;
    const pendingProps = filteredProposals.filter((p) => p.status === "Pending").length;
    const inactive = filteredClients.filter((c) => c.status === "Inactive").length;

    const bullets: string[] = [];

    if (overdue > 0) bullets.push(`Send reminders for ${overdue} overdue invoice${overdue === 1 ? "" : "s"} today.`);
    if (pendingInv > 0) bullets.push(`Draft follow-ups for ${pendingInv} pending invoice${pendingInv === 1 ? "" : "s"}.`);
    if (pendingProps > 0) bullets.push(`Nudge ${pendingProps} pending proposal${pendingProps === 1 ? "" : "s"} to move to decision.`);
    if (inactive > 0) bullets.push(`Re-engage ${inactive} inactive client${inactive === 1 ? "" : "s"} with a quick win offer.`);

    if (bullets.length === 0) {
      bullets.push("Everything looks healthy. Consider upselling accepted proposals to increase deal size.");
    }

    return bullets.slice(0, 4);
  }, [filteredInvoices, filteredProposals, filteredClients]);

  return (
    <Card
      variant="glassDark"
      className="bg-gradient-to-b from-white/10 to-white/5 overflow-hidden shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]"
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-white">Ops Copilot</CardTitle>
            <CardDescription className="text-white/55">Actionable plan derived from your current dashboard state.</CardDescription>
          </div>
          <div className="hidden sm:block">
            <StatusPill status="Realtime" variant="neutral" className="bg-white/5 border-white/10 text-white/80" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-xs text-white/55">At a glance</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">Revenue: <span className="text-white font-medium">${(kpis.revenueCents / 100).toFixed(2)}</span></span>
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">Active clients: <span className="text-white font-medium">{kpis.activeClients}</span></span>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/55">Next best actions</div>
          <ul className="mt-2 space-y-2">
            {plan.map((p, idx) => (
              <React.Fragment key={p + "__" + idx}>
                {bullet(
                  idx === 0 ? "⚡" : idx === 1 ? "🧠" : idx === 2 ? "📈" : "✅",
                  p
                )}
              </React.Fragment>
            ))}
          </ul>

        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <div className="text-xs text-white/55">Copilot mode</div>
          <div className="mt-1 text-sm text-white/85 font-medium">Deterministic demo (no external API)</div>
          <div className="mt-1 text-xs text-white/55">Upgrade later by wiring these actions to backend endpoints.</div>
        </div>
      </CardContent>
    </Card>
  );
}

