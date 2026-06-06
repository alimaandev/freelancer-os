"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { useDashboardDerived } from "@/components/dashboard/store/DashboardStore";
import { StatusPill } from "@/components/dashboard/ui/StatusPill";

type FeedItem = {
  id: string;
  title: string;
  detail: string;
  status?: string;
  dateLabel: string;
};

function prettyISO(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString(undefined, {
    month: "short",
    day: "2-digit",
  });
}

export function ActivityFeed() {
  const { filteredClients, filteredInvoices, filteredProposals, clientById } = useDashboardDerived();

  const items: FeedItem[] = React.useMemo(() => {
    const feed: FeedItem[] = [];

    for (const c of filteredClients) {
      if (c.lastContactISO) {
        feed.push({
          id: `feed_client_${c.id}`,
          title: `Contacted ${c.name}`,
          detail: `Last contact: ${prettyISO(c.lastContactISO)}`,
          status: c.status,
          dateLabel: prettyISO(c.lastContactISO),
        });
      }
    }

    for (const inv of filteredInvoices) {
      const c = clientById.get(inv.clientId);
      feed.push({
        id: `feed_inv_${inv.id}`,
        title: `Invoice ${inv.id}`,
        detail: `${c?.name ?? "Client"} • Due ${prettyISO(inv.dueDateISO)}`,
        status: inv.status,
        dateLabel: prettyISO(inv.dueDateISO),
      });
    }


    for (const p of filteredProposals) {
      const c = clientById.get(p.clientId);
      feed.push({
        id: `feed_prop_${p.id}`,
        title: `Proposal ${p.id}`,
        detail: `${c?.name ?? "Client"} • ${prettyISO(p.createdISO)}`,
        status: p.status,
        dateLabel: prettyISO(p.createdISO),
      });
    }

    // newest-ish by dateLabel isn't strict; sort by ISO when available.
    return feed.slice(0, 10);
  }, [filteredClients, filteredInvoices, filteredProposals, clientById]);

  return (
    <Card className="bg-white/5 border-white/10 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
      <CardHeader>
        <CardTitle className="text-white">Activity</CardTitle>
        <CardDescription className="text-white/55">Realtime-ish feed based on your current filters.</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="py-10 text-center">
            <div className="text-white font-medium">No activity</div>
            <div className="text-white/55 text-sm mt-1">Try widening filters.</div>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="mt-0.5">
                  {it.status ? <StatusPill status={it.status} variant="neutral" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-white font-medium truncate">{it.title}</div>
                    <div className="text-xs text-white/55 whitespace-nowrap">{it.dateLabel}</div>
                  </div>
                  <div className="text-xs text-white/60 mt-1">{it.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

