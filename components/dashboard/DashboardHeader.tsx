"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30">
      <div className="mx-auto max-w-[1400px] px-4 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.9)] px-6 py-4 transition-all duration-300 hover:shadow-[0_30px_90px_-55px_rgba(56,189,248,0.45)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl tracking-tight text-white">
                Freelancer OS
              </h1>
              <div className="hidden sm:block text-sm text-white/60">
                Top-tier workspace experience
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/clients"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_10px_30px_-15px_rgba(0,200,255,0.35)]"
              >
                New Client
              </Link>

              <div className="transform-gpu transition-transform duration-300 hover:scale-[1.02]">
                <UserButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
