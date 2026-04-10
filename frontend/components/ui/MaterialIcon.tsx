type MaterialIconProps = {
  name: string;
  className?: string;
  /** Filled variant (Material Symbols FILL axis). */
  filled?: boolean;
};

export function MaterialIcon({
  name,
  className = "",
  filled = false,
}: MaterialIconProps) {
  const iconClass = filled
    ? "material-symbols-filled"
    : "material-symbols-outlined";
  return (
    <span className={`${iconClass} ${className}`.trim()} aria-hidden>
      {name}
    </span>
  );
}
