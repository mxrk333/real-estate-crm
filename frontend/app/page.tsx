import { AiPriorityFeed } from "@/components/dashboard/AiPriorityFeed";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { RecentMemos } from "@/components/dashboard/RecentMemos";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  memos,
  priorityLeads,
  stats,
} from "@/lib/dashboard-data";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader />
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
        {stats.map((metric) => (
          <StatCard key={metric.id} metric={metric} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <AiPriorityFeed leads={priorityLeads} />
        <RecentMemos memos={memos} />
      </div>
    </DashboardShell>
  );
}
