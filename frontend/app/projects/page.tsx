import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BuildingFeaturePlaceholder } from "@/components/shared/BuildingFeaturePlaceholder";

export const metadata: Metadata = {
  title: "Projects | Inner SPARC CRM",
  description: "Project pipeline — coming soon",
};

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <BuildingFeaturePlaceholder title="Projects" />
    </DashboardShell>
  );
}
