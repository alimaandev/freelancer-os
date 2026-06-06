import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100">
      {/* Fixed header with subtle glass effect */}
      <header className="fixed top-0 left-0 right-0 h-14 flex items-center px-6 bg-white/5 backdrop-blur-md border-b border-white/10 z-20">
        <DashboardHeader />
      </header>

      {/* Sidebar with glass‑morphism, hidden on small screens */}
      <aside className="hidden md:block fixed inset-y-0 left-0 w-64 pt-14 bg-white/5 backdrop-blur-md border-r border-white/10 z-10">
        <DashboardSidebar />
      </aside>

      {/* Main content area – full size, with glass panel for the inner content */}
      <main className="pt-14 min-h-dvh p-4 sm:p-6 md:pl-64">
        <div className="min-w-0 max-w-7xl mx-auto rounded-2xl bg-white/5 backdrop-blur-lg border border-white/15 p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
