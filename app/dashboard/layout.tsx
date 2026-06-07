"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full text-gray-100 flex flex-col">
      {/* Header – sticky on top */}
      <header className="sticky top-0 z-20 h-14 flex items-center px-6   ">
        {/* Mobile button to open sidebar */}
        <button
          className="mr-2 md:hidden text-white hover:text-gray-200"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <DashboardHeader />
      </header>

      {/* Sidebar – hidden on mobile unless toggled, always visible on md+ */}
      <aside
        className={`
          ${sidebarOpen ? "fixed inset-y-0 left-0" : "hidden"}
          md:block md:fixed md:inset-y-0 md:left-0
          w-64 bg-white/5 backdrop-blur-md border-r border-white/10 z-30
        `}
      >
        <DashboardSidebar />
      </aside>

      {/* Main content – occupies remaining space */}
      <main className="flex-1 min-h-0 p-4 sm:p-6 md:pl-64 pt-4">
        <div className="min-w-0 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.55)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
