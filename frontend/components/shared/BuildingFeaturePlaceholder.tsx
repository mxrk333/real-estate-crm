type BuildingFeaturePlaceholderProps = {
  title: string;
  description?: string;
};

export function BuildingFeaturePlaceholder({
  title,
  description =
    "We're building this for you right now. Sit tight — your new workspace will be ready soon.",
}: BuildingFeaturePlaceholderProps) {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="house-loader relative mb-10">
        <div
          className="absolute -inset-8 rounded-full bg-primary/5 blur-2xl"
          aria-hidden
        />
        <svg
          className="house-loader__svg text-primary"
          viewBox="0 0 120 120"
          width={140}
          height={140}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            className="house-loader__roof"
            d="M60 12 L108 52 L12 52 Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            className="house-loader__walls"
            d="M22 52 V98 H98 V52"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            className="house-loader__door"
            d="M48 98 V72 H72 V98"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect
            className="house-loader__window house-loader__window--l"
            x="28"
            y="62"
            width="14"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <rect
            className="house-loader__window house-loader__window--r"
            x="78"
            y="62"
            width="14"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <g className="house-loader__crane-arm">
            <line
              x1="95"
              y1="8"
              x2="95"
              y2="38"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle
              cx="95"
              cy="42"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        </svg>
      </div>

      <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-on-surface-variant">
        Under construction
      </p>
      <h1 className="text-headline mb-4 max-w-md text-3xl font-extrabold tracking-tight text-on-surface md:text-4xl">
        {title}
      </h1>
      <p className="text-on-surface-variant max-w-md text-base leading-relaxed">
        {description}
      </p>

      <div
        className="mt-10 flex items-center gap-2"
        role="status"
        aria-label="Loading"
      >
        <span className="house-loader__dot bg-primary" />
        <span className="house-loader__dot bg-primary" />
        <span className="house-loader__dot bg-primary" />
      </div>
    </div>
  );
}
