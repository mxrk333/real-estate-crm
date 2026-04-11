"use client";

import { useState, useRef, useEffect } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { fetchProjects } from "@/app/actions/projects";
import type { ProjectCard } from "@/lib/projects-data";
import Image from "next/image";
import Link from "next/link";

export function TopNav() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dbProjects, setDbProjects] = useState<ProjectCard[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch real projects from DB on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        // Calling the server action
        const data = await fetchProjects();
        // Force typecast if needed, but it already matches ProjectCard
        setDbProjects(data as ProjectCard[]);
      } catch (error) {
        console.error("Failed to fetch projects for global search", error);
      }
    }
    loadProjects();
  }, []);

  const searchResults = dbProjects.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase().trim()) || 
           (p.location && p.location.toLowerCase().includes(query.toLowerCase().trim())) ||
           (p.developer && p.developer.toLowerCase().includes(query.toLowerCase().trim()))
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white/80 px-8 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="relative" ref={dropdownRef}>
        <div className="focus-within:ring-primary/20 flex w-[400px] items-center rounded-lg bg-surface-container-low px-4 py-2.5 transition-all duration-200 focus-within:bg-white focus-within:shadow-md focus-within:ring-2">
          <MaterialIcon
            name="search"
            className="mr-3 text-lg text-on-surface-variant"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search projects, leads or files..."
            className="font-body placeholder-on-surface-variant w-full border-none bg-transparent text-sm focus:ring-0 outline-none"
            aria-label="Search"
          />
          {query && (
            <button onClick={() => { setQuery(""); setIsOpen(false); }} className="text-on-surface-variant hover:text-on-surface">
              <MaterialIcon name="close" className="text-sm" />
            </button>
          )}
        </div>

        {/* Global Search Dropdown */}
        {isOpen && query.trim() !== "" && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-outline-variant/10 overflow-hidden z-50 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-surface-container-lowest px-4 py-2 border-b border-outline-variant/10 flex justify-between items-center text-xs text-on-surface-variant font-medium">
              <span>Quick Results</span>
              {searchResults.length > 0 && <span>{searchResults.length} matches</span>}
            </div>
            
            <div className="max-h-[400px] overflow-y-auto p-2">
              {searchResults.length === 0 ? (
                <div className="px-4 py-8 text-center flex flex-col items-center">
                  <MaterialIcon name="search_off" className="text-3xl text-outline-variant mb-2" />
                  <p className="text-sm font-semibold text-on-surface">No specific data found</p>
                  <p className="text-xs text-on-surface-variant mt-1">We couldn&apos;t find anything matching &ldquo;{query}&rdquo;.</p>
                </div>
              ) : (
                searchResults.map((project) => (
                  <Link 
                    href={`/projects?projectId=${project.id}`}
                    key={project.id}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-surface-container-lowest rounded-lg group transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                      <Image src={project.imageUrl} alt={project.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] text-on-surface-variant mb-0.5 font-medium">
                        <span className="bg-primary/10 text-primary px-1.5 rounded uppercase tracking-wider">Projects</span>
                        <MaterialIcon name="chevron_right" className="text-[10px]" />
                        <span className="truncate">{project.name}</span>
                      </div>
                      <p className="text-sm font-bold text-on-surface truncate group-hover:text-primary transition-colors">{project.name}</p>
                    </div>
                    <MaterialIcon name="arrow_forward" className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity text-sm mr-2" />
                  </Link>
                ))
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="p-2 border-t border-outline-variant/10 bg-surface-container-lowest text-center">
                <Link href="/projects" className="text-xs font-bold text-primary hover:underline">
                  View all in Projects
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-on-surface-variant transition-all hover:text-primary active:scale-95"
            aria-label="Notifications"
          >
            <MaterialIcon name="notifications" />
          </button>
          <button
            type="button"
            className="text-on-surface-variant transition-all hover:text-primary active:scale-95"
            aria-label="Apps"
          >
            <MaterialIcon name="apps" />
          </button>
        </div>
        <div className="h-6 w-px bg-outline-variant/30" />
        <span className="text-sm font-semibold text-primary">Good day, Mark!</span>
      </div>
    </header>
  );
}
