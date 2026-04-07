import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BuildingFeaturePlaceholder } from "@/components/shared/BuildingFeaturePlaceholder";

export const metadata: Metadata = {
  title: "Milestones | Inner SPARC CRM",
  description: "Deal milestones — coming soon",
};

export default function MilestonesPage() {
  return (
    <DashboardShell>
      <BuildingFeaturePlaceholder title="Milestones" />
    </DashboardShell>
  );
}
