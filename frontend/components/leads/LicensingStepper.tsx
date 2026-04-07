import type { LicenseState } from "@/types/leads";

const segmentClass: Record<
  LicenseState,
  [string, string, string, string]
> = {
  licensed: [
    "bg-wfm-tertiary-fixed-dim",
    "bg-wfm-tertiary-fixed-dim",
    "bg-wfm-tertiary-fixed-dim",
    "bg-wfm-tertiary-fixed-dim",
  ],
  applicant: [
    "bg-wfm-secondary",
    "bg-wfm-surface-container",
    "bg-wfm-surface-container",
    "bg-wfm-surface-container",
  ],
  review: [
    "bg-wfm-secondary-fixed-dim",
    "bg-wfm-secondary-fixed-dim",
    "bg-wfm-secondary-fixed-dim",
    "bg-wfm-surface-container",
  ],
};

type LicensingStepperProps = {
  state: LicenseState;
  statusLabel: string;
  statusClassName: string;
};

export function LicensingStepper({
  state,
  statusLabel,
  statusClassName,
}: LicensingStepperProps) {
  const segments = segmentClass[state];

  return (
    <div className="flex-1 px-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-widest text-wfm-on-primary-container">
          Licensing Status
        </span>
        <span
          className={`text-[9px] font-black uppercase tracking-widest ${statusClassName}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="flex h-1.5 gap-1.5">
        {segments.map((cls, i) => (
          <div key={i} className={`flex-1 rounded-full ${cls}`} />
        ))}
      </div>
    </div>
  );
}
