/** Uniform product-screenshot frame: 16:10, hairline border, mono caption bar. */
export function Shot({
  src,
  alt,
  label,
  href,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  href?: string;
  className?: string;
}) {
  const frame = (
    <figure className="group border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-faint">
        <span>{label}</span>
        <span className="flex gap-1">
          <span className="h-1.5 w-1.5 bg-faint" />
          <span className="h-1.5 w-1.5 bg-faint" />
          <span className="h-1.5 w-1.5 bg-signal" />
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top opacity-80 grayscale-[35%] transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_var(--line)]" />
      </div>
    </figure>
  );
  if (!href) return <div className={className}>{frame}</div>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`block ${className}`}>
      {frame}
    </a>
  );
}
