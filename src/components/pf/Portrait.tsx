import { useEffect, useRef } from "react";
import photo from "@/assets/harsh.png.asset.json";

/** Hero portrait: editorial plate with crop marks. On desktop it drifts up and
 *  gains colour as the hero scrolls away; static on mobile / reduced motion. */
export function Portrait() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = mq.matches ? Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9))) : 0;
      el.style.setProperty("--p", p.toFixed(3));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", on);
      mq.removeEventListener("change", update);
      cancelAnimationFrame(raf);
    };
  }, []);
  const mark = "absolute h-2.5 w-2.5 border-signal";
  return (
    <figure
      ref={ref}
      id="hero-portrait"
      className="relative w-24 shrink-0 origin-bottom-left will-change-transform md:w-40"
      style={{ transition: "opacity .2s" }}
    >
      <span className={`${mark} -left-1.5 -top-1.5 border-l border-t`} />
      <span className={`${mark} -right-1.5 -top-1.5 border-r border-t`} />
      <span className={`${mark} -bottom-1.5 -left-1.5 border-b border-l`} />
      <span className={`${mark} -bottom-1.5 -right-1.5 border-b border-r`} />
      <div className="relative overflow-hidden border border-border bg-surface">
        <img
          src={photo.url}
          alt="Harsh Kamoriya"
          width={160}
          height={213}
          decoding="async"
          className="aspect-[3/4] w-full object-cover object-[50%_22%]"
          style={{ filter: "grayscale(0.45) contrast(1.05)" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.15em] text-foreground/80">FIG.01</span>
      </div>
    </figure>
  );
}
