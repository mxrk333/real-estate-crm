export function DashboardHeader() {
  return (
    <div className="mb-12 flex items-end justify-between">
      <div>
        <h2 className="text-headline mb-2 text-4xl font-extrabold tracking-tight text-on-surface">
          The Closer&apos;s Corner
        </h2>
        <p className="text-lg text-on-surface-variant">
          Morning, Gabriel. Here is your pipeline overview for today.
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          type="button"
          className="border-outline-variant hover:border-primary text-on-surface border-b-2 px-6 py-3 text-sm font-semibold transition-all"
        >
          Download Report
        </button>
        <button
          type="button"
          className="executive-btn-gradient rounded-md px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.02]"
        >
          Authorize New Deal
        </button>
      </div>
    </div>
  );
}
