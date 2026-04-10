import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProjectGallery } from "@/components/projects/ProjectGallery";

import { fetchProjects } from "../actions/projects";

export const metadata: Metadata = {
  title: "Project Gallery | Inner SPARC CRM",
  description:
    "A curated showcase of premier Philippine real estate developments.",
};

export default async function ProjectsPage() {
  const dbProjects = await fetchProjects();
  
  return (
    <DashboardShell>
      <ProjectGallery initialProjects={dbProjects as any} />
    </DashboardShell>
  );
}
