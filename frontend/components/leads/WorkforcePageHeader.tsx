export function WorkforcePageHeader() {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h2 className="mb-1 text-4xl font-extrabold tracking-tight text-wfm-on-background">
          Workforce Management
        </h2>
        <p className="text-sm font-medium text-wfm-on-primary-container">
          32 Active Agents across 4 Specialized Teams
        </p>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-md bg-wfm-surface-container-highest px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-wfm-on-secondary-container transition-colors hover:bg-wfm-surface-container-high"
        >
          Export Ledger
        </button>
        <button
          type="button"
          className="rounded-md bg-gradient-to-r from-wfm-secondary to-wfm-secondary-container px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
        >
          Onboard Agent
        </button>
      </div>
    </div>
  );
}
