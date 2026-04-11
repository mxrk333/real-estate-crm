"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  type FilterValue,
  type ProjectCard,
} from "@/lib/projects-data";
import { createProjectAction, updateProjectAction, deleteProjectAction } from "@/app/actions/projects";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { LocationSelectorGroup } from "./LocationSelectorGroup";
import { ProvincePicker } from "./ProvincePicker";

// ─── Location Formatting Helper ──────────────────────────────────────────────

function formatLocation(project: ProjectCard): string {
  const parts: string[] = [];
  if (project.exactLocation && project.exactLocation !== project.location) parts.push(project.exactLocation);
  if (project.location) parts.push(project.location);
  if (project.province && project.province !== project.location) parts.push(project.province);
  return parts.join(", ") || "Location not specified";
}

// ─── House Type Formatting Helper ────────────────────────────────────────────

function formatHouseType(value?: string): string {
  if (!value || value === "Not specified") return "Not specified";
  return value.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

// ─── Currency Formatting Helper ──────────────────────────────────────────────

function formatPeso(value: string | number | undefined): string {
  if (!value && value !== 0) return "";
  const num = typeof value === "string" ? parseFloat(value.replace(/[₱,\s]/g, "")) : value;
  if (isNaN(num)) return "";
  return `₱${num.toLocaleString("en-PH")}`;
}

function parsePesoToNumber(value: string): string {
  return value.replace(/[₱,\s]/g, "");
}

// ─── CurrencyInput ────────────────────────────────────────────────────────────

function CurrencyInput({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
}) {
  const [display, setDisplay] = useState(() => {
    if (defaultValue) {
      const num = parseFloat(String(defaultValue).replace(/[₱,\s]/g, ""));
      return isNaN(num) ? "" : num.toLocaleString("en-PH");
    }
    return "";
  });

  const rawValue = parsePesoToNumber(display);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[₱,\s]/g, "");
    if (raw === "" || raw === ".") {
      setDisplay(raw);
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      setDisplay(num.toLocaleString("en-PH"));
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">₱</span>
        <input
          type="text"
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-2.5 pl-7 bg-transparent border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant/60"
        />
        {/* Hidden input sends the raw number to the server */}
        <input type="hidden" name={name} value={rawValue} />
      </div>
    </div>
  );
}

// ─── Fullscreen Lightbox ──────────────────────────────────────────────────────

function ImageLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1));
      if (e.key === "ArrowRight") setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <MaterialIcon name="close" className="text-2xl" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-white/80 text-sm font-bold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main image */}
      <div className="relative w-full h-full max-w-5xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          fill
          className="object-contain"
          unoptimized
          priority
        />
      </div>

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p === 0 ? images.length - 1 : p - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <MaterialIcon name="chevron_left" className="text-3xl" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p === images.length - 1 ? 0 : p + 1)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <MaterialIcon name="chevron_right" className="text-3xl" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
              className={`relative w-12 h-9 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                idx === currentIndex ? "border-white shadow-lg" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" unoptimized />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Image Gallery Viewer ─────────────────────────────────────────────────────

function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const allImages = images.length > 0 ? images : [];

  if (allImages.length === 0) return null;

  return (
    <>
      <div className="space-y-3">
        {/* Main Image — click to open fullscreen */}
        <div
          className="relative h-64 w-full rounded-xl overflow-hidden bg-surface-container group cursor-zoom-in"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={allImages[activeIndex]}
            alt={`${name} - Photo ${activeIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Expand hint */}
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <MaterialIcon name="fullscreen" className="text-sm" />
            View Full Size
          </div>

          {/* Nav Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1)); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
              >
                <MaterialIcon name="chevron_left" className="text-lg" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1)); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
              >
                <MaterialIcon name="chevron_right" className="text-lg" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {activeIndex + 1} / {allImages.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                  idx === activeIndex
                    ? "border-primary shadow-md ring-2 ring-primary/30"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-primary text-[7px] text-white text-center font-bold py-[1px]">
                    MAIN
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={allImages}
          initialIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

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

// ─── Priority Badge Helper ────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority?: string }) {
  const p = (priority || "Standard").toLowerCase();
  const config = p.includes("high")
    ? { bg: "bg-red-500", text: "text-white", icon: "priority_high" }
    : p.includes("medium") || p.includes("mid")
    ? { bg: "bg-amber-500", text: "text-white", icon: "drag_handle" }
    : { bg: "bg-surface-container-high", text: "text-on-surface-variant", icon: "remove" };

  return (
    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
      <MaterialIcon name={config.icon} className="text-[10px]" />
      {priority || "Standard"}
    </span>
  );
}

// ─── Info Chip (small key-value) ──────────────────────────────────────────────

function InfoChip({ icon, label, value }: { icon: string; label: string; value?: string }) {
  if (!value || value === "N/A" || value === "Not specified") return null;
  return (
    <div className="flex items-center gap-1.5 text-[11px]">
      <MaterialIcon name={icon} className="text-xs text-primary/60" />
      <span className="text-on-surface-variant">{label}:</span>
      <span className="font-semibold text-on-surface truncate">{value}</span>
    </div>
  );
}

// ─── Anchor Card (xl:col-span-2, 16/9) ───────────────────────────────────────

function AnchorCard({ project, onClick }: { project: ProjectCard; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="xl:col-span-2 group relative bg-surface-container-lowest overflow-hidden rounded-xl transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary/5"
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
        {/* Top overlay badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <PriorityBadge priority={project.priority} />
            {project.commission && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-tertiary/90 text-white rounded-full backdrop-blur-sm">
                {project.commission}
              </span>
            )}
          </div>
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm flex items-center gap-1">
            <MaterialIcon name="trending_up" className="text-sm" />
            {project.inquiries}
          </span>
        </div>
        {/* Bottom gradient overlay with price */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-16">
          <p className="text-primary-fixed text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
            {project.developer || "Developer"}
          </p>
          <h3 className="text-3xl font-bold font-headline text-white mb-1">
            {project.name}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              <MaterialIcon name="location_on" className="text-[14px] text-white" />
              {formatLocation(project)}
            </span>
            {project.constructionStatus && (
              <span className="text-white/70 text-xs flex items-center gap-1">
                <MaterialIcon name="construction" className="text-xs" />
                {project.constructionStatus}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Bottom info strip */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/10">
        <div className="flex items-center gap-6 flex-wrap">
          {project.priceRange && (
            <div className="flex items-center gap-1.5">
              <MaterialIcon name="payments" className="text-sm text-primary" />
              <span className="text-sm font-bold text-primary">{project.priceRange}</span>
            </div>
          )}
          <div className="w-full h-px bg-outline-variant/20 my-2" />
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
            <InfoChip icon="apartment" label="Model" value={project.houseModel} />
            <InfoChip icon="engineering" label="Type" value={formatHouseType(project.houseType)} />
            {project.bedrooms && project.bedrooms > 0 ? (
              <InfoChip icon="bed" label="Bedroom(s)" value={project.bedrooms.toString()} />
            ) : null}
            {project.tcp && project.tcp !== "N/A" ? (
              <InfoChip icon="account_balance" label="TCP" value={project.tcp} />
            ) : null}
            {project.bathrooms && project.bathrooms > 0 ? (
              <InfoChip icon="shower" label="Toilet & Bath" value={project.bathrooms.toString()} />
            ) : null}
            {project.reservationFee && project.reservationFee !== "N/A" ? (
              <InfoChip icon="receipt_long" label="Reservation" value={project.reservationFee} />
            ) : null}
          </div>
        </div>
        <button className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all group-hover:border-primary shrink-0">
          <MaterialIcon name="arrow_forward" className="text-sm" />
        </button>
      </div>
    </div>
  );
}

// ─── Standard Project Card (unified design) ──────────────────────────────────

function ProjectCardComponent({ project, onClick }: { project: ProjectCard; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group bg-surface-container-lowest overflow-hidden rounded-xl cursor-pointer hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="w-full relative overflow-hidden aspect-[4/3] sm:aspect-video">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <PriorityBadge priority={project.priority} />
          <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-primary shadow-sm flex items-center gap-1">
            <MaterialIcon name="trending_up" className="text-xs" />
            {project.inquiries}
          </span>
        </div>
        {/* Commission badge */}
        {project.commission && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-0.5 text-[10px] font-bold bg-tertiary/90 text-white rounded-full backdrop-blur-sm">
              {project.commission}
            </span>
          </div>
        )}
        {/* Construction status badge */}
        {project.constructionStatus && (
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-black/50 text-white rounded-full backdrop-blur-sm flex items-center gap-0.5">
              <MaterialIcon name="construction" className="text-[10px]" />
              {project.constructionStatus}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Developer label */}
        {project.developer && project.developer !== "Not specified" && (
          <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">
            {project.developer}
          </p>
        )}
        <h3 className="text-lg font-bold font-headline text-on-surface mb-0.5 leading-tight">
          {project.name}
        </h3>
        <p className="text-xs text-on-surface-variant flex items-center mb-3 line-clamp-1">
          <MaterialIcon name="location_on" className="text-[10px] mr-1 shrink-0" />
          <span className="truncate">{formatLocation(project)}</span>
        </p>

        {/* Price range */}
        {project.priceRange && project.priceRange !== "Contact for details" && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2 mb-3">
            <p className="text-[9px] text-primary/70 uppercase font-bold tracking-wider mb-0.5">Price Range</p>
            <p className="text-sm font-bold text-primary">{project.priceRange}</p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-outline-variant/20 mb-3 mt-auto" />

        {/* Key details row */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-2">
          <InfoChip icon="apartment" label="Model" value={project.houseModel} />
          <InfoChip icon="home_work" label="Type" value={formatHouseType(project.houseType)} />
          {project.bedrooms && project.bedrooms > 0 ? (
            <InfoChip icon="bed" label="Bedroom(s)" value={project.bedrooms.toString()} />
          ) : null}
          {project.tcp && project.tcp !== "N/A" ? (
            <InfoChip icon="account_balance" label="TCP" value={project.tcp} />
          ) : null}
          {project.bathrooms && project.bathrooms > 0 ? (
            <InfoChip icon="shower" label="Toilet & Bath" value={project.bathrooms.toString()} />
          ) : null}
          {project.reservationFee && project.reservationFee !== "N/A" ? (
            <InfoChip icon="receipt_long" label="Reservation" value={project.reservationFee} />
          ) : null}
        </div>

        {/* Footer with tag */}
        {project.tag && (
          <div className="mt-3 pt-3 border-t border-outline-variant/10">
            <ProjectTag label={project.tag.label} tone={project.tag.tone} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Filter Rail ──────────────────────────────────────────────────────────────

function FilterRail({
  active,
  onChange,
  projects,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
  projects: ProjectCard[];
}) {
  // Build dynamic filters from actual project data
  const provinceCounts = new Map<string, number>();
  projects.forEach((p) => {
    const province = p.province || "Uncategorized";
    provinceCounts.set(province, (provinceCounts.get(province) || 0) + 1);
  });

  const dynamicFilters = Array.from(provinceCounts.entries())
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .map(([province, count]) => ({
      label: province,
      value: province.toLowerCase().replace(/ /g, "-"),
      count,
    }));

  return (
    <div className="flex items-center space-x-8 mb-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* "All" pill */}
      <button
        onClick={() => onChange("all")}
        className={`whitespace-nowrap pb-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
          active === "all"
            ? "border-b-2 border-primary text-primary"
            : "text-on-surface-variant hover:text-primary"
        }`}
      >
        All
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          active === "all" ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant"
        }`}>
          {projects.length}
        </span>
      </button>
      {dynamicFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`whitespace-nowrap pb-2 text-sm font-semibold transition-colors flex items-center gap-2 ${
            active === f.value
              ? "border-b-2 border-primary text-primary"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          {f.label}
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
            active === f.value ? "bg-primary text-white" : "bg-surface-container-high text-on-surface-variant"
          }`}>
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, totalItems, showing, onPageChange }: { currentPage: number; totalPages: number; totalItems: number; showing: number; onPageChange: (p: number) => void }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-20 flex items-center justify-between py-8 border-t border-outline-variant/10">
      <p className="text-sm text-on-surface-variant font-medium">
        Showing{" "}
        <span className="font-bold text-primary">{showing}</span> of {totalItems}{" "}
        High-Value Portfolios
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
            currentPage === 1 
              ? "bg-surface-container-high text-on-surface/30 cursor-not-allowed" 
              : "hover:bg-surface-container text-on-surface cursor-pointer"
          }`}
        >
          <MaterialIcon name="chevron_left" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`w-10 h-10 rounded flex items-center justify-center font-bold transition-colors ${
              n === currentPage
                ? "bg-primary text-white"
                : "hover:bg-surface-container text-on-surface-variant"
            }`}
          >
            {n}
          </button>
        ))}
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
            currentPage === totalPages 
              ? "bg-surface-container-high text-on-surface/30 cursor-not-allowed" 
              : "hover:bg-surface-container text-on-surface cursor-pointer"
          }`}
        >
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
    </div>
  );
}

// ─── Project Form (shared between Create and Edit) ────────────────────────────

function ProjectForm({
  formId,
  project,
  files,
  previews,
  onFileChange,
  onRemoveFile,
}: {
  formId: string;
  project?: ProjectCard | null;
  files: File[];
  previews: string[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}) {
  // For edit mode, show existing images from project.images alongside new previews
  const existingImages = project?.images || [];

  const [houseType, setHouseType] = useState(project?.houseType || "HOUSE_AND_LOT");
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string | null>(null);

  const isLotOnly = houseType === "VACANT_LOT";
  const showBedsBaths = ['HOUSE_AND_LOT', 'TOWNHOUSE', 'CONDOMINIUM'].includes(houseType);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <MaterialIcon name="info" className="text-sm text-primary" /> Project Information
          </h3>

          {/* House Type at very top */}
          <div className="w-full">
            <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Property Type</label>
            <select
              name="type"
              required
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none"
            >
              <option value="HOUSE_AND_LOT">🏠 House and Lot</option>
              <option value="CONDOMINIUM">🏢 Condominium</option>
              <option value="TOWNHOUSE">🏘️ Townhouse</option>
              <option value="VACANT_LOT">🌿 Vacant Lot</option>
              <option value="COMMERCIAL">🏪 Commercial</option>
            </select>
          </div>

          <Input label="Project Name" name="name" required placeholder="e.g. Idesia Dasmariñas" defaultValue={project?.name} />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={isLotOnly ? "Developer (optional)" : "Developer"}
              name="developer"
              required={!isLotOnly}
              placeholder="e.g. P.A Properties"
              defaultValue={project?.developer}
            />
            <ProvincePicker
              defaultValue={project?.category ? project.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : ""}
              onProvinceChange={(code) => setSelectedProvinceCode(code)}
            />
          </div>
          <LocationSelectorGroup
            defaultLocation={project?.location}
            defaultExactLocation={project?.exactLocation}
            provinceCode={selectedProvinceCode}
          />
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-surface-container">
            <Input label="House Model" name="houseModel" placeholder="e.g. Aria" defaultValue={project?.houseModel} />
            <Input label="Construction Status" name="constructionStatus" defaultValue={project?.constructionStatus || "Preselling"} />
            
            {showBedsBaths && (
              <>
                <Input type="number" label="Bedroom(s) (Optional)" name="bedrooms" placeholder="e.g. 3" defaultValue={project?.bedrooms?.toString()} />
                <Input type="number" step="0.5" label="Toilet & Bath (Optional)" name="bathrooms" placeholder="e.g. 2" defaultValue={project?.bathrooms?.toString()} />
              </>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Priority Level</label>
              <select name="priority" className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none" defaultValue={project?.priority || "Standard"}>
                <option value="High Priority">🔴 High Priority</option>
                <option value="Medium Priority">🟡 Medium Priority</option>
                <option value="Standard">⚪ Standard</option>
                <option value="Low Priority">🔵 Low Priority</option>
              </select>
            </div>
            <div className="w-full">
              <label className="block text-xs font-semibold text-outline mb-1.5 px-0.5">Listing Status</label>
              <select name="listingStatus" className="w-full p-2.5 bg-transparent border border-outline-variant rounded-lg focus:border-primary outline-none" defaultValue="FOR_SALE">
                <option value="FOR_SALE">For Sale</option>
                <option value="FOR_RENT">For Rent</option>
                <option value="SOLD">Sold</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="space-y-4 pt-4 border-t border-surface-container">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <MaterialIcon name="payments" className="text-sm text-primary" /> Financial Information
          </h3>
          <CurrencyInput label="Price Range (Min)" name="priceRangeMin" placeholder="3,000,000" defaultValue={project?.priceRange?.split(" - ")[0]} />
          <CurrencyInput label="Price Range (Max)" name="priceRangeMax" placeholder="6,631,041" defaultValue={project?.priceRange?.split(" - ")[1]} />
          <div className="grid grid-cols-2 gap-4">
            <CurrencyInput label="TCP (Total Contract Price)" name="tcp" placeholder="6,631,041" defaultValue={project?.tcp} />
            <CurrencyInput label="Reservation Fee" name="reservationFee" placeholder="30,000" defaultValue={project?.reservationFee} />
            <CurrencyInput label="Required Salary" name="requiredSalary" placeholder="135,706" defaultValue={project?.requiredSalary} />
            <Input label="Commission Rate" name="commissionRate" defaultValue={project?.commission || "5.00% COMM"} />
          </div>
          <Input label="Downpayment Option Text" name="dpOption" placeholder="₱82,282 for 8 months" defaultValue={project?.dpOption} />
        </div>

        {/* Media Attachment */}
        <div className="space-y-4 pt-4 border-t border-surface-container">
          <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <MaterialIcon name="photo_library" className="text-sm text-primary" /> Project Showcase
          </h3>

          <div className="relative group">
            <div className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
              previews.length > 0 || existingImages.length > 0 ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary hover:bg-surface-container'
            }`}>
              {(previews.length > 0 || existingImages.length > 0) ? (
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Show existing images (for edit mode) */}
                  {existingImages.map((src, idx) => (
                    <div key={`existing-${idx}`} className="relative aspect-video rounded-lg overflow-hidden shadow-md group/item">
                      <img src={src} alt={`Existing ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 0 && previews.length === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Main Photo
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Show new upload previews */}
                  {previews.map((src, idx) => (
                    <div key={`new-${idx}`} className="relative aspect-video rounded-lg overflow-hidden shadow-md group/item">
                      <img src={src} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => onRemoveFile(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover/item:opacity-100"
                      >
                        <MaterialIcon name="close" className="text-xs" />
                      </button>
                      {idx === 0 && existingImages.length === 0 && (
                        <div className="absolute bottom-1 left-1 bg-primary text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Main Photo
                        </div>
                      )}
                    </div>
                  ))}
                  {(previews.length + existingImages.length) < 5 && (
                    <div className="relative aspect-video border-2 border-dashed border-primary/20 rounded-lg flex flex-col items-center justify-center bg-white/50 hover:bg-white hover:border-primary/40 transition-all cursor-pointer">
                      <MaterialIcon name="add_a_photo" className="text-xl text-primary/40" />
                      <span className="text-[10px] font-bold text-primary/40">Add More</span>
                      <input
                        type="file"
                        name="imageFiles"
                        multiple
                        accept="image/*"
                        onChange={onFileChange}
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

              {previews.length === 0 && existingImages.length === 0 && (
                <input
                  type="file"
                  name="imageFiles"
                  multiple
                  accept="image/*"
                  onChange={onFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
          </div>

          <Input label="Featured Image URL (Fallback)" name="imageUrl" placeholder="https://..." defaultValue={project?.imageUrl} />
          <Input label="Google Drive Link" name="driveLink" placeholder="https://drive.google.com/..." className="text-primary" defaultValue={project?.driveLink} />
        </div>
      </div>

      {/* Pass existing images for the update action to keep them */}
      {project?.images && project.images.length > 0 && (
        <input type="hidden" name="existingImages" value={JSON.stringify(project.images)} />
      )}
    </div>
  );
}

// ─── Main Gallery ─────────────────────────────────────────────────────────────

export function ProjectGallery({ initialProjects }: { initialProjects: ProjectCard[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectCard | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 10;

  const searchParams = useSearchParams();

  // ─── Automatically open project from URL if present ────────────────────
  useEffect(() => {
    const projectId = searchParams?.get("projectId");
    if (projectId && initialProjects && initialProjects.length > 0) {
      const match = initialProjects.find((p) => p.id === projectId);
      if (match) {
        setSelectedProject(match);
      }
    }
  }, [searchParams, initialProjects]);

  // Determine if any drawer/panel is open
  const isAnyDrawerOpen = !!selectedProject || isCreateOpen || isEditMode;

  // ─── Body scroll lock when drawer is open ────────────────────────────
  useEffect(() => {
    if (isAnyDrawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.overscrollBehavior = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.overscrollBehavior = "";
    };
  }, [isAnyDrawerOpen]);

  // ─── ESC key to close active drawer ──────────────────────────────────
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else if (isEditMode) {
          setIsEditMode(false);
          setEditingProject(null);
        } else if (isCreateOpen) {
          setIsCreateOpen(false);
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject, isCreateOpen, isEditMode, showDeleteConfirm]);

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

  const resetFormState = useCallback(() => {
    setFiles([]);
    setPreviews([]);
    setIsEditMode(false);
    setEditingProject(null);
    setShowDeleteConfirm(false);
  }, []);

  const openEditMode = (project: ProjectCard) => {
    setEditingProject(project);
    setIsEditMode(true);
    setSelectedProject(null);
    setFiles([]);
    setPreviews([]);
  };

  const handleDelete = async (projectId: string) => {
    setIsDeleting(true);
    try {
      const res = await deleteProjectAction(projectId);
      if (res.success) {
        setSelectedProject(null);
        setShowDeleteConfirm(false);
      } else {
        alert("Failed to delete project: " + (res.error || "Unknown error"));
      }
    } catch {
      alert("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
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

  // ─── Search + Filter logic ────────────────────────────────────────────
  const searchLower = searchQuery.toLowerCase().trim();

  const filtered = initialProjects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
    const matchesSearch =
      !searchLower ||
      p.name.toLowerCase().includes(searchLower) ||
      p.location.toLowerCase().includes(searchLower) ||
      (p.developer && p.developer.toLowerCase().includes(searchLower)) ||
      (p.houseModel && p.houseModel.toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  // Reset page when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  // Pagination logic
  const totalFiltered = filtered.length;
  const totalPages = Math.ceil(totalFiltered / PROJECTS_PER_PAGE);
  const paginatedProjects = filtered.slice((currentPage - 1) * PROJECTS_PER_PAGE, currentPage * PROJECTS_PER_PAGE);

  // Stats
  const totalProjects = initialProjects.length;
  const highPriority = initialProjects.filter(p => p.priority?.toLowerCase().includes("high")).length;

  return (
    <>
      {/* ─── Page Header ─────────────────────────────────────────────── */}
      <div className="mb-10">
        {/* Top row: Title + Action */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
              Project Gallery
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Manage and review your entire real estate portfolio
            </p>
          </div>
          <button 
            onClick={() => { resetFormState(); setIsCreateOpen(true); }}
            className="px-6 py-3 executive-btn-gradient text-white font-bold rounded-lg active:scale-95 transition-all flex items-center gap-2 text-sm shadow-lg"
          >
            <MaterialIcon name="add" className="text-lg" />
            New Project
          </button>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-1">
              <MaterialIcon name="domain" className="text-sm text-primary" />
              <span className="text-xs text-on-surface-variant font-medium">Total Projects</span>
            </div>
            <p className="text-2xl font-bold text-on-surface">{totalProjects}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-1">
              <MaterialIcon name="priority_high" className="text-sm text-red-500" />
              <span className="text-xs text-on-surface-variant font-medium">High Priority</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{highPriority}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-1">
              <MaterialIcon name="filter_list" className="text-sm text-primary" />
              <span className="text-xs text-on-surface-variant font-medium">Showing</span>
            </div>
            <p className="text-2xl font-bold text-on-surface">{filtered.length}</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-1">
              <MaterialIcon name="trending_up" className="text-sm text-tertiary" />
              <span className="text-xs text-on-surface-variant font-medium">Total Inquiries</span>
            </div>
            <p className="text-2xl font-bold text-tertiary">
              {initialProjects.reduce((sum, p) => sum + (p.inquiries || 0), 0)}
            </p>
          </div>
        </div>

        {/* Toolbar: Search + Filters */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MaterialIcon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, location, developer..."
                className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-lg border border-outline-variant/30 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-outline-variant/60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-outline-variant/30 flex items-center justify-center hover:bg-outline-variant/50 transition-colors"
                >
                  <MaterialIcon name="close" className="text-xs" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-8 w-px bg-outline-variant/20" />

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* All pill */}
              <button
                onClick={() => setActiveFilter("all")}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${activeFilter === "all"
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                All
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  activeFilter === "all" ? "bg-white/20" : "bg-outline-variant/20"
                }`}>
                  {initialProjects.length}
                </span>
              </button>
              {/* Dynamic province pills */}
              {(() => {
                const counts = new Map<string, number>();
                initialProjects.forEach((p) => {
                  const prov = p.province || "Other";
                  counts.set(prov, (counts.get(prov) || 0) + 1);
                });
                return Array.from(counts.entries())
                  .sort((a, b) => b[1] - a[1])
                  .map(([province, count]) => {
                    const val = province.toLowerCase().replace(/ /g, "-");
                    return (
                      <button
                        key={val}
                        onClick={() => setActiveFilter(val)}
                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${activeFilter === val
                          ? "bg-primary text-white shadow-md"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                        }`}
                      >
                        {province}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          activeFilter === val ? "bg-white/20" : "bg-outline-variant/20"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  });
              })()}
            </div>
          </div>

          {/* Breadcrumb when searching */}
          {searchQuery && (
            <div className="mt-3 pt-3 border-t border-outline-variant/10">
              {filtered.length > 0 ? (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-on-surface-variant font-medium">Projects</span>
                  <MaterialIcon name="chevron_right" className="text-xs text-outline-variant" />
                  <span className="text-primary font-bold">&ldquo;{searchQuery}&rdquo;</span>
                  <span className="text-on-surface-variant">— {filtered.length} result{filtered.length !== 1 ? "s" : ""} found</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                  <MaterialIcon name="info" className="text-sm text-outline-variant" />
                  No matching results for &ldquo;<span className="font-semibold text-on-surface">{searchQuery}</span>&rdquo;
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── Project Grid ─────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center">
            <MaterialIcon name={searchQuery ? "search_off" : "domain_disabled"} className="text-4xl text-outline-variant" />
          </div>
          <div className="text-center max-w-sm">
            <h3 className="text-lg font-bold text-on-surface mb-2">
              {searchQuery ? "No projects match your search" : "No projects in this region yet"}
            </h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {searchQuery
                ? `We couldn't find any project matching "${searchQuery}". Try a different search term or clear your filters.`
                : "Start building your portfolio by adding your first project."}
            </p>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}
                className="mt-4 px-4 py-2 text-sm font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                Clear Search & Filters
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => {
            if (project.size === "anchor") return <AnchorCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />;
            return <ProjectCardComponent key={project.id} project={project} onClick={() => setSelectedProject(project)} />;
          })}
        </div>
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalFiltered}
        showing={paginatedProjects.length} 
        onPageChange={(p) => {
          setCurrentPage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ─── View Project Drawer ──────────────────────────────────────────── */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => { setSelectedProject(null); setShowDeleteConfirm(false); }}
            onWheel={(e) => e.preventDefault()}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-md bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header with Image Gallery */}
            <div className="shrink-0">
              {/* Image Gallery for viewing ALL uploaded photos */}
              {selectedProject.images && selectedProject.images.length > 0 ? (
                <div className="p-4 pb-0">
                  <ImageGallery images={selectedProject.images} name={selectedProject.name} />
                </div>
              ) : (
                <div className="relative h-64 w-full">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.imageAlt}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* Close button and project name overlay */}
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-start justify-between">
                  <div>
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
                    <h2 className="text-2xl font-bold font-headline text-on-surface">
                      {selectedProject.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => { setSelectedProject(null); setShowDeleteConfirm(false); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
                  >
                    <MaterialIcon name="close" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ overscrollBehavior: "contain" }}>
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
                  {(selectedProject.bedrooms ?? 0) > 0 && (
                    <div>
                      <p className="text-outline">Bedroom(s)</p>
                      <p className="font-semibold">{selectedProject.bedrooms}</p>
                    </div>
                  )}
                  {(selectedProject.bathrooms ?? 0) > 0 && (
                    <div>
                      <p className="text-outline">Toilet & Bath</p>
                      <p className="font-semibold">{selectedProject.bathrooms}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-outline">House Type</p>
                    <p className="font-semibold">{formatHouseType(selectedProject.houseType) || "Not specified"}</p>
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
                    <p className="text-outline">Barangay</p>
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

              {/* Photo count */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Media
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    <MaterialIcon name="photo_library" className="text-sm text-primary mr-1 align-middle" />
                    {selectedProject.images.length} photo{selectedProject.images.length !== 1 ? "s" : ""} uploaded
                  </p>
                </section>
              )}
            </div>

            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border-t border-red-200 dark:border-red-900 shrink-0">
                <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3">
                  Are you sure you want to delete &ldquo;{selectedProject.name}&rdquo;? This action cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => handleDelete(selectedProject.id)}
                    disabled={isDeleting}
                  >
                    <MaterialIcon name="delete_forever" className="mr-1 text-sm" />
                    {isDeleting ? "Deleting..." : "Delete Project"}
                  </Button>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="p-6 border-t border-surface-container shrink-0 space-y-3">
              {/* Edit & Delete row */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditMode(selectedProject)}
                >
                  <MaterialIcon name="edit" className="mr-1 text-sm" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <MaterialIcon name="delete" className="mr-1 text-sm" />
                  Delete
                </Button>
              </div>
              {/* Main actions row */}
              <div className="flex gap-4">
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
                  {isCopying ? "Ready to Paste!" : "Copy Project Information"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create Project Modal/Drawer ─────────────────────────────────── */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => { setIsCreateOpen(false); resetFormState(); }}
            onWheel={(e) => e.preventDefault()}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-surface-container shrink-0 flex items-center justify-between bg-surface-container-low">
              <h2 className="text-xl font-bold font-headline text-primary">New Project</h2>
              <button
                onClick={() => { setIsCreateOpen(false); resetFormState(); }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
              <form
                id="create-project-form"
                action={async (formData) => {
                  // Combine priceRange min and max
                  const priceMin = formData.get("priceRangeMin") as string;
                  const priceMax = formData.get("priceRangeMax") as string;
                  if (priceMin || priceMax) {
                    const minFormatted = priceMin ? formatPeso(priceMin) : "";
                    const maxFormatted = priceMax ? formatPeso(priceMax) : "";
                    formData.set("priceRange", `${minFormatted} - ${maxFormatted}`.trim().replace(/^-\s*$/, ""));
                  }
                  // Manually append the files from our React state to ensure they are sent
                  files.forEach(f => formData.append('imageFiles', f));
                  const res = await createProjectAction(formData);
                  if (res.success) {
                    setIsCreateOpen(false);
                    resetFormState();
                  }
                }}
              >
                <ProjectForm
                  formId="create-project-form"
                  files={files}
                  previews={previews}
                  onFileChange={handleFileChange}
                  onRemoveFile={removeFile}
                />
              </form>
            </div>

            <div className="p-6 border-t border-surface-container shrink-0 flex gap-4 bg-surface-container-low">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => { setIsCreateOpen(false); resetFormState(); }}
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

      {/* ─── Edit Project Modal/Drawer ────────────────────────────────────── */}
      {isEditMode && editingProject && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => { setIsEditMode(false); resetFormState(); }}
            onWheel={(e) => e.preventDefault()}
          />
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-surface-container shrink-0 flex items-center justify-between bg-surface-container-low">
              <div>
                <h2 className="text-xl font-bold font-headline text-primary">Edit Project</h2>
                <p className="text-xs text-on-surface-variant">{editingProject.name}</p>
              </div>
              <button
                onClick={() => { setIsEditMode(false); resetFormState(); }}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                <MaterialIcon name="close" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: "contain" }}>
              <form
                id="edit-project-form"
                action={async (formData) => {
                  // Combine priceRange min and max
                  const priceMin = formData.get("priceRangeMin") as string;
                  const priceMax = formData.get("priceRangeMax") as string;
                  if (priceMin || priceMax) {
                    const minFormatted = priceMin ? formatPeso(priceMin) : "";
                    const maxFormatted = priceMax ? formatPeso(priceMax) : "";
                    formData.set("priceRange", `${minFormatted} - ${maxFormatted}`.trim().replace(/^-\s*$/, ""));
                  }
                  files.forEach(f => formData.append('imageFiles', f));
                  const res = await updateProjectAction(editingProject.id, formData);
                  if (res.success) {
                    setIsEditMode(false);
                    resetFormState();
                  } else {
                    alert("Failed to update: " + (res.error || "Unknown error"));
                  }
                }}
              >
                <ProjectForm
                  formId="edit-project-form"
                  project={editingProject}
                  files={files}
                  previews={previews}
                  onFileChange={handleFileChange}
                  onRemoveFile={removeFile}
                />
              </form>
            </div>

            <div className="p-6 border-t border-surface-container shrink-0 flex gap-4 bg-surface-container-low">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => { setIsEditMode(false); resetFormState(); }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                form="edit-project-form"
                variant="executive"
                className="flex-[2]"
              >
                <MaterialIcon name="save" className="mr-2 text-sm" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
