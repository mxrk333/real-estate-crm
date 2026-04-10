import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BuildingFeaturePlaceholder } from "@/components/shared/BuildingFeaturePlaceholder";

export const metadata: Metadata = {
  title: "Materials | Inner SPARC CRM",
  description: "Sales materials library — coming soon",
};

export default function MaterialsPage() {
  return (
    <DashboardShell>
      <BuildingFeaturePlaceholder title="Materials" />
    </DashboardShell>
  );
}
