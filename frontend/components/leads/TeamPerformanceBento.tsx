import { MaterialIcon } from "@/components/icons/MaterialIcon";

export function TeamPerformanceBento() {
  return (
    <div className="mb-12 grid grid-cols-12 gap-6">
      <div className="col-span-12 rounded-xl bg-wfm-surface-container-lowest p-8 ring-1 ring-wfm-outline-variant/10 md:col-span-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-wfm-on-primary-container">
              Team Performance Index
            </span>
            <h3 className="mt-1 text-2xl font-bold">Velocity &amp; Compliance</h3>
          </div>
          <MaterialIcon
            name="analytics"
            className="text-4xl text-wfm-secondary opacity-20"
          />
        </div>
        <div className="flex items-center gap-12">
          <div className="space-y-1">
            <p className="text-3xl font-black text-wfm-on-background">94%</p>
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-wfm-on-tertiary-fixed-variant">
              <span className="h-1.5 w-1.5 rounded-full bg-wfm-tertiary-fixed" />
              Licensed
            </p>
          </div>
          <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-wfm-surface-container">
            <div className="h-full w-2/3 bg-wfm-secondary" />
            <div className="h-full w-1/4 bg-wfm-secondary-fixed" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-wfm-on-background">12</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-wfm-on-primary-container">
              New Leads
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-12 rounded-xl bg-wfm-primary-container p-8 text-white md:col-span-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
          Licensing Alert
        </span>
        <h3 className="mt-2 text-xl font-bold leading-tight">
          4 Agents awaiting documentation review.
        </h3>
        <button
          type="button"
          className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wfm-tertiary-fixed transition-all hover:gap-4"
        >
          Open Review Queue{" "}
          <MaterialIcon name="trending_flat" className="text-base" />
        </button>
      </div>
    </div>
  );
}
