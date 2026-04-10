import Image from "next/image";

import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { LedgerAgent } from "@/types/leads";

import { LicensingStepper } from "./LicensingStepper";

const roleBadgeClass: Record<
  LedgerAgent["role"],
  { label: string; textClass: string }
> = {
  manager: {
    label: "Manager",
    textClass: "text-wfm-on-secondary-fixed-variant",
  },
  agent: {
    label: "Agent",
    textClass: "text-wfm-on-primary-fixed-variant",
  },
};

export function AgentLedgerRow({ agent }: { agent: LedgerAgent }) {
  const badge = roleBadgeClass[agent.role];

  return (
    <div className="group flex items-center px-8 py-6 transition-colors hover:bg-wfm-surface-container-low/30">
      <div className="mr-6 h-12 w-12 overflow-hidden rounded-lg shadow-sm">
        <Image
          src={agent.avatarSrc}
          alt={agent.avatarAlt}
          width={48}
          height={48}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>
      <div className="w-1/4">
        <h4 className="font-bold text-wfm-on-background transition-colors group-hover:text-wfm-secondary">
          {agent.name}
        </h4>
        <p className="text-xs font-medium text-wfm-on-primary-container">
          {agent.email}
        </p>
      </div>
      <div className="w-48">
        <span
          className={`rounded-full bg-wfm-surface-container-high px-3 py-1 text-[10px] font-black uppercase tracking-wider ${badge.textClass}`}
        >
          {badge.label}
        </span>
      </div>
      <LicensingStepper
        state={agent.license.state}
        statusLabel={agent.license.statusLabel}
        statusClassName={agent.license.statusClassName}
      />
      <div className="pl-8">
        <button
          type="button"
          className="rounded-full p-2 text-wfm-on-primary-container opacity-0 transition-opacity hover:bg-wfm-surface-container group-hover:opacity-100"
          aria-label={`Open ${agent.name}`}
        >
          <MaterialIcon name="chevron_right" />
        </button>
      </div>
    </div>
  );
}
