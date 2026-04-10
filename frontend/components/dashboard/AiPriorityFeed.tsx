import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { PriorityLead } from "@/types/dashboard";

import { LeadRow } from "./LeadRow";

type AiPriorityFeedProps = {
  leads: PriorityLead[];
  badgeText?: string;
};

export function AiPriorityFeed({
  leads,
  badgeText = "5 ACTIONABLE LEADS",
}: AiPriorityFeedProps) {
  return (
    <div className="rounded-xl bg-surface-container-low p-8 lg:col-span-8">
      <div className="mb-10 flex items-center justify-between">
        <h3 className="flex items-center text-2xl font-bold tracking-tight text-on-surface">
          <MaterialIcon name="auto_awesome" className="mr-3 text-primary" />
          AI Priority Feed
        </h3>
        <span className="rounded bg-primary-fixed px-3 py-1 text-xs font-bold text-on-primary-fixed-variant">
          {badgeText}
        </span>
      </div>
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadRow key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
