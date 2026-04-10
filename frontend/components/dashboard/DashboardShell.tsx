import { SideNav } from "@/components/dashboard/SideNav";
import { TopNav } from "@/components/dashboard/TopNav";
import { navItems, userProfile } from "@/lib/dashboard-data";
import type { NavItem } from "@/types/dashboard";

type DashboardShellProps = {
  children: React.ReactNode;
  /** Override nav (defaults to CRM `navItems`). */
  items?: NavItem[];
};

export function DashboardShell({ children, items = navItems }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <SideNav items={items} user={userProfile} />
      <main className="ml-64 min-h-screen">
        <TopNav />
        <div className="mx-auto max-w-[1600px] p-12">{children}</div>
      </main>
    </div>
  );
}
