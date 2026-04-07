import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { BuildingFeaturePlaceholder } from "@/components/shared/BuildingFeaturePlaceholder";

export const metadata: Metadata = {
  title: "Settings | Inner SPARC CRM",
  description: "Workspace settings — coming soon",
};

export default function SettingsPage() {
  return (
    <DashboardShell>
      <BuildingFeaturePlaceholder title="Settings" />
    </DashboardShell>
  );
}
