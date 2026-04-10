"use client";

import Image from "next/image";
import { useState } from "react";

import {
  type FilterValue,
  type ProjectCard,
  projectFilters,
} from "@/lib/projects-data";
import { createProjectAction } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

// ─── Tag ─────────────────────────────────────────────────────────────────────

function ProjectTag({ label, tone }: { label: string; tone: "premium" | "eco" | "commercial" | "default" }) {
  if (tone === "premium") {
    return (
      <span className="text-[10px] font-bold text-tertiary px-2 py-1 bg-tertiary-container/10 rounded uppercase">
        {label}
      </span>
    );
  }
  if (tone === "eco") {
    return (
      <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
        <MaterialIcon name="eco" className="text-xs" />
        {label}
      </div>
    );
  }
  if (tone === "commercial") {
    return (
      <span className="text-xs font-semibold text-on-surface-variant italic">
        {label}
      </span>
    );
  }
  return <span className="text-xs text-on-surface-variant">{label}</span>;
}

// ─── Anchor Card (xl:col-span-2, 16/9) ───────────────────────────────────────

function AnchorCard({ project, onClick }: { project: ProjectCard; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="xl:col-span-2 group relative bg-surface-container-lowest overflow-hidden rounded-xl transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1280px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
            <MaterialIcon name="trending_up" className="text-sm" />
            {project.inquiries} Inquiries
          </span>
        </div>
      </div>
      <div className="p-8 flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">
            Flagship Development
          </p>
          <h3 className="text-3xl font-bold font-headline text-on-surface mb-2">
            {project.name}
          </h3>
          <div className="flex items-center text-on-surface-variant">
            <MaterialIcon name="location_on" className="text-sm mr-1" />
            <span className="text-sm">{project.location}</span>
          </div>
        </div>
        <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all group-hover:border-primary">
          <MaterialIcon name="arrow_forward" />
        </button>
      </div>
    </div>
  );
}

// ─── Portrait Card (4/5) ──────────────────────────────────────────────────────

function PortraitCard({ project, onClick }: { project: ProjectCard; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-surface-container-lowest overflow-hidden rounded-xl cursor-pointer">
      <div className="aspect-[4/5] w-full relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-primary shadow-sm">
            {project.inquiries} Inquiries
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-headline text-on-surface mb-1">
          {project.name}
        </h3>
        <p className="text-sm text-on-surface-variant flex items-center mb-4">
          <MaterialIcon name="location_on" className="text-xs mr-1" />
          {project.location}
        </p>
        <div className="h-[2px] w-full bg-surface-container mb-4" />
        <div className="flex justify-between items-center">
          {project.tag ? (
            <ProjectTag label={project.tag.label} tone={project.tag.tone} />
          ) : (
            <span />
          )}
          <a className="text-sm font-bold text-primary hover:underline" href="#">
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Square Card (1/1) ────────────────────────────────────────────────────────

function SquareCard({ project, onClick }: { project: ProjectCard; onClick: () => void }) {
  return (
    <div onClick={onClick} className="group bg-surface-container-lowest overflow-hidden rounded-xl cursor-pointer">
      <div className="aspect-square w-full relative overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-primary shadow-sm">
            {project.inquiries} Inquiries
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold font-headline text-on-surface mb-1">
          {project.name}
        </h3>
        <p className="text-sm text-on-surface-variant flex items-center mb-4">
          <MaterialIcon name="location_on" className="text-xs mr-1" />
          {project.location}
        </p>
        <div className="flex justify-between items-center pt-2">
          {/* Left slot */}
          {project.salesExecs ? (
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white"
                    style={{ backgroundColor: `hsl(0,0%,${70 + i * 8}%)` }}
                  />
                ))}
              </div>
              <span className="text-[10px] text-on-surface-variant font-medium">
                {project.salesExecs} Sales Execs
              </span>
            </div>
          ) : project.tag ? (
            <ProjectTag label={project.tag.label} tone={project.tag.tone} />
          ) : (
            <span />
          )}
          {/* Right slot */}
          {!project.salesExecs && !project.tag && (
            <span className="text-[10px] text-on-surface-variant">Active Campaign</span>
          )}
          {project.tag?.tone === "eco" && (
            <span className="text-[10px] text-on-surface-variant">Active Campaign</span>
          )}
          {project.tag?.tone === "commercial" && (
            <button className="text-primary">
              <MaterialIcon name="more_horiz" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Filter Rail ──────────────────────────────────────────────────────────────

function FilterRail({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div className="flex items-center space-x-8 mb-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {projectFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`whitespace-nowrap pb-2 text-sm font-semibold transition-colors ${
            active === f.value
              ? "border-b-2 border-primary text-primary"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ total, showing }: { total: number; showing: number }) {
  return (
    <div className="mt-20 flex items-center justify-between py-8 border-t border-outline-variant/10">
      <p className="text-sm text-on-surface-variant font-medium">
        Showing{" "}
        <span className="font-bold text-primary">{showing}</span> of {total}{" "}
        High-Value Portfolios
      </p>
      <div className="flex space-x-2">
        <button
          disabled
          className="w-10 h-10 rounded flex items-center justify-center bg-surface-container-high text-on-surface cursor-not-allowed"
        >
          <MaterialIcon name="chevron_left" />
        </button>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            className={`w-10 h-10 rounded flex items-center justify-center font-bold transition-colors ${
              n === 1
                ? "bg-primary text-white"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
          >
            {n}
          </button>
        ))}
        <button className="w-10 h-10 rounded flex items-center justify-center hover:bg-surface-container transition-colors">
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────

export function ProjectGallery({ initialProjects }: { initialProjects: ProjectCard[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length > 0) {
      const updatedFiles = [...files, ...selected].slice(0, 5);
      setFiles(updatedFiles);
      setPreviews(updatedFiles.map(f => URL.createObjectURL(f)));
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedFiles.map(f => URL.createObjectURL(f)));
  };

  const [isCopying, setIsCopying] = useState(false);

  const handleGenerateProposal = async (project: ProjectCard) => {
    const proposal = `🏠 *${project.name}* - ${project.houseModel || 'Featured Unit'}
📍 Location: ${project.location}
🏗️ Status: ${project.constructionStatus}
🏢 Developer: ${project.developer || 'Not specified'}

💰 *Financial Summary:*
• Price Range: ${project.priceRange || 'Contact for pricing'}
• TCP: ${project.tcp}
• Reservation: ${project.reservationFee}
• Req. Salary: ${project.requiredSalary}
• DP Schema: ${project.dpOption}

${project.driveLink ? `📁 *Media Kit:* ${project.driveLink}` : ''}

Hello! I am ${project.developer || 'your agent'} and I'd love to share more details about this premium property. Let me know if you'd like to schedule a virtual tour or a site viewing!`;

    try {
      await navigator.clipboard.writeText(proposal);
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 2000);
    } catch (err) {
      alert("Failed to copy proposal. Please try again.");
    }
  };

  const filtered =
    activeFilter === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-primary mb-4">
            Project Gallery
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            A curated showcase of premier Philippine real estate developments.
            From high-rise residential towers to expansive estate developments,
            manage and review your entire portfolio with architectural clarity.
          </p>
        </div>
        <div className="shrink-0">
          <button 
            onClick={() => setIsCreateOpen(true)}
            className="px-8 py-4 executive-btn-gradient text-white font-bold rounded-md active:scale-95 transition-all flex items-center gap-2"
          >
            <MaterialIcon name="add" />
            New Project(s)
          </button>
        </div>
      </div>

      {/* Filter rail */}
      <FilterRail active={activeFilter} onChange={setActiveFilter} />

      {/* Bento grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant gap-4">
          <MaterialIcon name="search_off" className="text-5xl" />
          <p className="text-lg font-semibold">No projects in this region yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map((project) => {
            if (project.size === "anchor") return <AnchorCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />;
            if (project.size === "portrait") return <PortraitCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />;
            return <SquareCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />;
          })}
        </div>
      )}

      {/* Pagination */}
      <Pagination total={24} showing={filtered.length} />

      {/* Slide-over Panel */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header / Image */}
            <div className="relative h-64 w-full shrink-0">
              <Image
                src={selectedProject.imageUrl}
                alt={selectedProject.imageAlt}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-xs font-bold bg-primary text-white rounded">
                    {selectedProject.priority || "Standard"}
                  </span>
                  {selectedProject.commission && (
                    <span className="px-2 py-1 text-xs font-bold text-tertiary bg-tertiary-fixed rounded">
                      {selectedProject.commission}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl font-bold font-headline text-white">
                  {selectedProject.name}
                </h2>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Basic Info */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                  Project Information
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <p className="text-outline">House Model</p>
                    <p className="font-semibold">{selectedProject.houseModel || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-outline">House Type</p>
                    <p className="font-semibold">{selectedProject.houseType || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-outline">Status</p>
                    <p className="font-semibold">{selectedProject.constructionStatus || "Not specified"}</p>
                  </div>
                  <div>
                    <p className="text-outline">Developer</p>
                    <p className="font-semibold">{selectedProject.developer || "Not specified"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-outline">Location</p>
                    <p className="font-semibold">{selectedProject.location}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-outline">Exact Location</p>
                    <p className="font-semibold">{selectedProject.exactLocation || "Not specified"}</p>
                  </div>
                </div>
              </section>

              {/* Financial Info */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-4">
                  Financial Information
                </h3>
                <div className="space-y-4">
                  <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                    <p className="text-xs text-on-surface-variant mb-1">Price Range</p>
                    <p className="text-xl font-bold text-primary">
                      {selectedProject.priceRange || "Contact for pricing"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                    <div>
                      <p className="text-outline">Total Contract Price</p>
                      <p className="font-bold text-tertiary">
                        {selectedProject.tcp || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-outline">Reservation Fee</p>
                      <p className="font-semibold">{selectedProject.reservationFee || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-outline">Required Salary</p>
                      <p className="font-semibold">{selectedProject.requiredSalary || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-outline">DP Option</p>
                      <p className="font-semibold">{selectedProject.dpOption || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-surface-container shrink-0 flex gap-4">
              {selectedProject.driveLink ? (
                <Button variant="outline" className="flex-1" onClick={() => window.open(selectedProject.driveLink, '_blank')}>
                  <MaterialIcon name="folder_open" className="mr-2" />
                  View Drive
                </Button>
              ) : (
                <Button disabled className="flex-1" variant="secondary">
                  No Media Kit
                </Button>
              )}
              <Button 
                variant={isCopying ? "secondary" : "executive"}
                className={`flex-[2] ${isCopying ? 'bg-tertiary text-white' : ''}`}
                onClick={() => handleGenerateProposal(selectedProject)}
              >
                <MaterialIcon name={isCopying ? "check" : "content_copy"} className="text-sm mr-2" />
                {isCopying ? "Ready to Paste!" : "Generate Proposal"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal/Drawer */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCreateOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-surface-container shrink-0 flex items-center justify-between bg-surface-container-low">
              <h2 className="text-xl font-bold font-headline text-primary">Execute New Project</h2>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form
                id="create-project-form"
                action={async (formData) => {
                  // Manually append the files from our React state to ensure they are sent
                  files.forEach(f => formData.append('imageFiles', f));
                  const res = await createProjectAction(formData);
                  if (res.success) {
                    setIsCreateOpen(false);
                    setFile(null);
                    setPreview(null);
                  }
                }}
                className="p-6 space-y-6"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                      <MaterialIcon name="info" className="text-sm text-primary" /> Project Information
                    </h3>
                    <Input label="Project Name" name="name" required placeholder="e.g. Idesia Dasmariñas" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Developer" name="developer" required placeholder="e.g. P.A Properties" />
                      <div className="w-full">
                        <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Category</label>
                        <select name="city" required className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none">
                          <option value="metro-manila">Metro Manila</option>
                          <option value="cavite">Cavite Clusters</option>
                          <option value="laguna">Laguna Estates</option>
                          <option value="cebu">Cebu Hubs</option>
                        </select>
                      </div>
                    </div>
                    <Input label="Location Summary" name="location" required placeholder="e.g. Dasmariñas, Cavite" />
                    <Input label="Exact Location" name="exactLocation" placeholder="Full address..." />
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-container">
                      <Input label="House Model" name="houseModel" placeholder="e.g. Aria" />
                      <Input label="Construction Status" name="constructionStatus" defaultValue="Preselling" />
                    </div>
                  </div>

                {/* Financials */}
                <div className="space-y-4 pt-4 border-t border-surface-container">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                    <MaterialIcon name="payments" className="text-sm text-primary" /> Financial Information
                  </h3>
                  <Input label="Price Range Text" name="priceRange" placeholder="₱3.0M - ₱6.6M" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="TCP (Numeric)" type="number" name="tcp" placeholder="6631041" />
                    <Input label="Reservation Fee" type="number" name="reservationFee" placeholder="30000" />
                    <Input label="Required Salary" type="number" name="requiredSalary" placeholder="135706" />
                    <Input label="Commission Rate" name="commissionRate" defaultValue="5.00% COMM" />
                  </div>
                  <Input label="Downpayment Option Text" name="dpOption" placeholder="₱82,282 for 8 months" />
                </div>
                
                {/* Media Attachment */}
                <div className="space-y-4 pt-4 border-t border-surface-container">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                    <MaterialIcon name="photo_library" className="text-sm text-primary" /> Project Showcase
                  </h3>
                  
                  <div className="relative group">
                    <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                      previews.length > 0 ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary hover:bg-surface-container'
                    }`}>
                      {previews.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 w-full">
                          {previews.map((src, idx) => (
                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden shadow-md group/item">
                              <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover/item:opacity-100"
                              >
                                <MaterialIcon name="close" className="text-xs" />
                              </button>
                              {idx === 0 && (
                                <div className="absolute bottom-1 left-1 bg-primary text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                  Main Photo
                                </div>
                              )}
                            </div>
                          ))}
                          {previews.length < 5 && (
                            <div className="relative aspect-video border-2 border-dashed border-primary/20 rounded-lg flex flex-col items-center justify-center bg-white/50 hover:bg-white hover:border-primary/40 transition-all cursor-pointer">
                              <MaterialIcon name="add_a_photo" className="text-xl text-primary/40" />
                              <span className="text-[10px] font-bold text-primary/40">Add More</span>
                              <input 
                                type="file" 
                                name="imageFiles" 
                                multiple 
                                accept="image/*" 
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                            <MaterialIcon name="add_a_photo" className="text-3xl text-primary" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-bold text-on-surface">Upload project showcase</p>
                            <p className="text-xs text-on-surface-variant">Attach up to 5 photos (Main photo first)</p>
                          </div>
                        </>
                      )}
                      
                      {previews.length === 0 && (
                        <input 
                          type="file" 
                          name="imageFiles" 
                          multiple 
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Featured Image URL (Fallback)" name="imageUrl" placeholder="https://..." />
                    <div className="w-full">
                      <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">House Type</label>
                      <select name="type" required className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none">
                        <option value="HOUSE_AND_LOT">House and Lot</option>
                        <option value="CONDOMINIUM">Condominium</option>
                        <option value="TOWNHOUSE">Townhouse</option>
                        <option value="VACANT_LOT">Vacant Lot</option>
                        <option value="COMMERCIAL">Commercial</option>
                      </select>
                    </div>
                  </div>
                  <Input label="Google Drive Link" name="driveLink" placeholder="https://drive.google.com/..." className="text-primary" />
                </div>
              </div>
              </form>
            </div>

            <div className="p-6 border-t border-surface-container shrink-0 flex gap-4 bg-surface-container-low">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="create-project-form"
                variant="executive"
                className="flex-[2]"
              >
                Create Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
