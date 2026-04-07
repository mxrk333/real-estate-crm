import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { StatMetric } from "@/types/dashboard";

const toneClass = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  muted: "text-on-surface-variant font-medium",
} as const;

export function StatCard({ metric }: { metric: StatMetric }) {
  const { footer } = metric;
  const tone = footer.tone ?? "primary";

  return (
    <div className="flex h-44 flex-col justify-between rounded-xl bg-surface-container-lowest p-8 ring-1 ring-outline-variant/15">
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold uppercase tracking-widest text-on-surface-variant">
          {metric.label}
        </span>
        <MaterialIcon name={metric.icon} className="text-primary" />
      </div>
      <div>
        <span className="text-4xl font-extrabold tracking-tighter text-on-surface">
          {metric.value}
        </span>
        <div
          className={`mt-2 flex items-center text-xs ${tone === "muted" ? "font-medium" : "font-bold"} ${toneClass[tone]}`}
        >
          {footer.icon ? (
            <MaterialIcon name={footer.icon} className="mr-1 text-xs" />
          ) : null}
          <span>{footer.text}</span>
        </div>
      </div>
    </div>
  );
}
