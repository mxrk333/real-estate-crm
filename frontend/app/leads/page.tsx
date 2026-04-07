import { AgentLedger } from "@/components/leads/AgentLedger";
import { TeamPerformanceBento } from "@/components/leads/TeamPerformanceBento";
import { WorkforcePageHeader } from "@/components/leads/WorkforcePageHeader";
import { ledgerAgents } from "@/lib/leads-data";

export default function LeadsPage() {
  return (
    <>
      <WorkforcePageHeader />
      <TeamPerformanceBento />
      <AgentLedger agents={ledgerAgents} totalEntries={32} />
    </>
  );
}
