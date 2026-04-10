import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white/80 px-8 backdrop-blur-xl">
      <div className="focus-within:ring-primary/20 flex w-96 items-center rounded-lg bg-surface-container-low px-4 py-2 transition-all duration-200 focus-within:ring-2">
        <MaterialIcon
          name="search"
          className="mr-3 text-xl text-on-surface-variant"
        />
        <input
          type="search"
          placeholder="Search leads or files..."
          className="font-body placeholder-on-surface-variant w-full border-none bg-transparent text-sm focus:ring-0"
          aria-label="Search leads or files"
        />
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="text-on-surface-variant transition-all hover:text-primary active:scale-95"
            aria-label="Notifications"
          >
            <MaterialIcon name="notifications" />
          </button>
          <button
            type="button"
            className="text-on-surface-variant transition-all hover:text-primary active:scale-95"
            aria-label="Apps"
          >
            <MaterialIcon name="apps" />
          </button>
        </div>
        <div className="h-6 w-px bg-outline-variant/30" />
        <span className="text-sm font-semibold text-primary">Admin Portal</span>
      </div>
    </header>
  );
}
