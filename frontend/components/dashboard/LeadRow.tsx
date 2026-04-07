import type { PriorityLead } from "@/types/dashboard";

const temperatureLabel: Record<
  PriorityLead["temperature"],
  { text: string; className: string }
> = {
  hot: {
    text: "Hot Lead",
    className: "text-tertiary",
  },
  warm: {
    text: "Warm Lead",
    className: "text-on-secondary-container",
  },
};

export function LeadRow({ lead }: { lead: PriorityLead }) {
  const temp = temperatureLabel[lead.temperature];

  return (
    <div className="group flex items-center rounded-lg bg-surface-container-lowest p-6 transition-all hover:scale-[1.01] hover:bg-white">
      <div className="mr-6 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container-high text-xl">
        {lead.emoji}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-on-surface">{lead.name}</h4>
        <p className="text-sm text-on-surface-variant">{lead.subtitle}</p>
      </div>
      <div className="mr-8 text-right">
        <span
          className={`mb-1 block text-xs font-bold uppercase tracking-wider ${temp.className}`}
        >
          {temp.text}
        </span>
        <span className="text-xs text-on-surface-variant">
          {lead.activeLabel}
        </span>
      </div>
      <button
        type="button"
        className="border-primary text-primary hover:bg-primary/5 border-b-2 px-5 py-2.5 text-xs font-bold transition-colors"
      >
        {lead.actionLabel}
      </button>
    </div>
  );
}
