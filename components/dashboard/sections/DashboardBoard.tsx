"use client";

import React from "react";
import { KpiStrip } from "@/components/dashboard/sections/KpiStrip";
import { ClientsTable } from "@/components/dashboard/sections/ClientsTable";
import { InvoicesTable } from "@/components/dashboard/sections/InvoicesTable";
import { ProposalsTable } from "@/components/dashboard/sections/ProposalsTable";
import { ActivityFeed } from "@/components/dashboard/sections/ActivityFeed";
import { CopilotPanel } from "@/components/dashboard/sections/CopilotPanel";
import { GlobalSearchAndControls } from "@/components/dashboard/sections/GlobalSearchAndControls";

export function DashboardBoard() {
  return (
    <div className="space-y-6">
      <KpiStrip />
      <GlobalSearchAndControls />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ClientsTable />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <InvoicesTable />
            <ProposalsTable />
          </div>
        </div>

        <div className="space-y-6">
          <ActivityFeed />
          <CopilotPanel />
        </div>
      </div>
    </div>
  );
}

