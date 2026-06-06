import React from "react";
import { DashboardBoard } from "@/components/dashboard/sections/DashboardBoard";
import { DashboardStoreProvider } from "@/components/dashboard/store/DashboardStore";

export default function DashboardPage() {
  return (
    <DashboardStoreProvider>
      <DashboardBoard  />
    </DashboardStoreProvider>
  );
}

