"use client";

import { useState } from "react";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { LedgerAgent } from "@/types/leads";

import { AgentLedgerRow } from "./AgentLedgerRow";

const filters = [
  { id: "all", label: "All Agents" },
  { id: "pm", label: "Project Managers" },
  { id: "field", label: "Field Agents" },
] as const;

type AgentLedgerProps = {
  agents: LedgerAgent[];
  totalEntries?: number;
};

export function AgentLedger({
  agents,
  totalEntries = 32,
}: AgentLedgerProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["id"]>("all");

  const visibleAgents = agents.filter((a) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pm") return a.role === "manager";
    return a.role === "agent";
  });

  return (
    <section className="overflow-hidden rounded-xl bg-wfm-surface-container-lowest ring-1 ring-wfm-outline-variant/10">
      <div className="flex items-center justify-between border-b border-wfm-surface-container-high bg-wfm-surface-container-low/50 px-8 py-5">
        <div className="flex gap-8">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                className={`pb-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "border-b-2 border-wfm-secondary text-wfm-on-background"
                    : "text-wfm-on-primary-container hover:text-wfm-on-background"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded p-1.5 text-wfm-on-primary-container transition-colors hover:bg-wfm-surface-container"
            aria-label="Filter list"
          >
            <MaterialIcon name="filter_list" className="text-lg" />
          </button>
          <button
            type="button"
            className="rounded p-1.5 text-wfm-on-primary-container transition-colors hover:bg-wfm-surface-container"
            aria-label="More options"
          >
            <MaterialIcon name="more_vert" className="text-lg" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-wfm-surface-container/40">
        {visibleAgents.map((agent) => (
          <AgentLedgerRow key={agent.id} agent={agent} />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-wfm-surface-container bg-wfm-surface-container-low/20 px-8 py-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-wfm-on-primary-container">
          Showing {visibleAgents.length} of {totalEntries} Ledger Entries
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded border border-wfm-outline-variant/30 text-wfm-on-primary-container transition-colors hover:bg-wfm-surface-container"
            aria-label="Previous page"
          >
            <MaterialIcon name="chevron_left" className="text-sm" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded bg-wfm-secondary text-[10px] font-black text-white"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded border border-wfm-outline-variant/30 text-[10px] font-black text-wfm-on-primary-container transition-colors hover:bg-wfm-surface-container"
          >
            2
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded border border-wfm-outline-variant/30 text-wfm-on-primary-container transition-colors hover:bg-wfm-surface-container"
            aria-label="Next page"
          >
            <MaterialIcon name="chevron_right" className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}
