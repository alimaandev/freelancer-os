
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Utility function to conditionally join class names
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    name: "Proposals",
    href: "/dashboard/proposals",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0  ">
      <nav className="p-4">
        <div className="mb-4 px-3">
          <div className="text-xs uppercase tracking-widest text-white/60">
            Workspace
          </div>
        </div>

        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-300",
                    "text-white/90",
                    isActive
                      ? "bg-black/70 shadow-[0_25px_80px_-40px_rgba(0,0,0,0.9)] border border-zinc-800/40"
                      : "hover:bg-white/8 hover:text-white border border-transparent"
                  )}
                >
                  {/* 3D glow */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                      isActive
                        ? "bg-gradient-to-r from-black via-zinc-950 to-black"
                        : "group-hover:opacity-100 bg-gradient-to-r from-zinc-950/40 via-transparent to-zinc-950/40"
                    )}
                  />

                  <span
                    className={cn(
                      "relative inline-flex h-9 w-9 items-center justify-center rounded-xl",
                      "bg-white/5 border border-white/10",
                      isActive
                        ? "text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
                        : "text-white/70 group-hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "transform transition-transform duration-300 group-hover:rotate-[-5deg]",
                        isActive ? "rotate-[-5deg]" : "rotate-0"
                      )}
                    >
                      {item.icon}
                    </span>
                  </span>

                  <span className="relative">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
