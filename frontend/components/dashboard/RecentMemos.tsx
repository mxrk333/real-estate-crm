import type { MemoItem } from "@/types/dashboard";

function MemoEntry({ memo }: { memo: MemoItem }) {
  const borderClass =
    memo.accent === "primary"
      ? "border-primary-fixed"
      : "border-outline-variant/30";

  return (
    <div className={`relative border-l-2 pl-6 ${borderClass}`}>
      {memo.accent === "primary" ? (
        <span className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-primary" />
      ) : null}
      <p
        className={`mb-1 text-xs font-bold uppercase tracking-widest ${
          memo.categoryTone === "primary"
            ? "text-primary"
            : "text-on-surface-variant"
        }`}
      >
        {memo.category}
      </p>
      <h5 className="mb-1 text-sm font-bold leading-tight text-on-surface">
        {memo.title}
      </h5>
      <p className="text-xs leading-relaxed text-on-surface-variant">
        {memo.excerpt}
      </p>
      <span className="mt-2 block text-[10px] text-on-surface-variant">
        {memo.meta}
      </span>
    </div>
  );
}

type RecentMemosProps = {
  memos: MemoItem[];
};

export function RecentMemos({ memos }: RecentMemosProps) {
  return (
    <div className="rounded-xl bg-surface-container-lowest p-8 ring-1 ring-outline-variant/15 lg:col-span-4">
      <h3 className="mb-8 text-xl font-bold tracking-tight text-on-surface">
        Recent Memos
      </h3>
      <div className="space-y-8">
        {memos.map((memo) => (
          <MemoEntry key={memo.id} memo={memo} />
        ))}
      </div>
      <button
        type="button"
        className="border-outline-variant text-on-surface-variant hover:bg-surface-container-high mt-12 w-full rounded border-2 py-3 text-xs font-bold uppercase tracking-widest transition-colors"
      >
        View All Communications
      </button>
    </div>
  );
}
