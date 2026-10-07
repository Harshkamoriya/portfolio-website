import { useEffect, useRef, useState } from "react";
import photo from "@/assets/harsh.png";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn = (t: number) => t * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Scroll-driven identity reveal between hero and next section.
 *  The hero portrait detaches, floats up into the viewport, HARSH reveals,
 *  then the composition drifts out as the next section takes over.
 *  All updates are direct style writes inside rAF — no React re-renders. */
export function IdentityReveal() {
  const [motion, setMotion] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rm.matches) {
      setMotion(false);
      return;
    }
    const small = document.getElementById("hero-portrait");
    const s = stage.current, pl = plate.current, im = img.current, w = word.current, m = meta.current;
    if (!small || !s || !pl || !im || !w || !m) return;

    let raf = 0;
    let box = { l: 0, t: 0, w: 0, h: 0 };
    let smallDoc = { l: 0, t: 0, w: 0 };

    const layout = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const desktop = vw >= 768;
      const h = desktop ? Math.min(vh * 0.72, vw * 0.5) : Math.min(vh * 0.5, vw * 0.78);
      const wd = h * 0.75;
      const l = desktop ? vw * 0.5 - wd * 0.85 : (vw - wd) / 2;
      const t = desktop ? (vh - h) / 2 + 20 : vh * 0.16;
      box = { l, t, w: wd, h };
      Object.assign(pl.style, { left: `${l}px`, top: `${t}px`, width: `${wd}px`, height: `${h}px` });
      // measure the hero portrait in document coords, ignoring its own transforms
      const prev = small.style.visibility;
      const r = small.getBoundingClientRect();
      smallDoc = { l: r.left, t: r.top + window.scrollY, w: r.width };
      small.style.visibility = prev;
      w.style.top = desktop ? `${t + h * 0.62}px` : `${t + h + 8}px`;
      m.style.top = desktop ? `${t}px` : `${t - 28}px`;
      m.style.left = desktop ? `${l + wd + 32}px` : `${l}px`;
    };

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const t = window.scrollY / vh;
      const enter = ease(clamp((t - 0.04) / 0.62));
      const name = ease(clamp((t - 0.42) / 0.36));
      const exit = easeIn(clamp((t - 1.2) / 0.6));
      const active = t > 0.04 && exit < 1;

      s.style.visibility = active ? "visible" : "hidden";
      small.style.opacity = t > 0.04 ? "0" : "1";
      if (!active) return;

      // start: hero portrait's on-screen rect, end: floating box
      const sx = smallDoc.l, sy = smallDoc.t - window.scrollY;
      const k0 = smallDoc.w / box.w;
      const k = lerp(k0, 1, enter) * lerp(1, 0.82, exit);
      const x = lerp(sx - box.l, 0, enter) + exit * box.w * 0.18;
      const y = lerp(sy - box.t, 0, enter) - exit * vh * 0.55;
      pl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${k})`;
      pl.style.opacity = String(1 - exit);
      pl.style.boxShadow = `0 ${40 * enter}px ${120 * enter}px -30px oklch(0 0 0 / ${0.8 * enter})`;
      im.style.filter = `grayscale(${0.45 * (1 - enter) + 0.15 * exit}) contrast(1.05)`;

      w.style.clipPath = `inset(${(1 - name) * 100}% 0 0 0)`;
      w.style.transform = `translate3d(${-exit * box.w * 0.12}px, ${(1 - name) * 40 - exit * vh * 0.4}px, 0)`;
      w.style.opacity = String(1 - exit);
      m.style.opacity = String(name * (1 - exit));
    };

    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    const re = () => { layout(); update(); };
    re();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", re);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", re);
      cancelAnimationFrame(raf);
      small.style.opacity = "";
    };
  }, []);

  const mark = "absolute h-3 w-3 border-signal";

  if (!motion) {
    return (
      <section aria-label="Harsh" className="mx-auto flex max-w-[1400px] flex-col items-start gap-6 px-5 py-24 md:flex-row md:items-end md:px-10">
        <img src={photo} alt="Harsh Kamoriya" className="aspect-[3/4] w-56 border border-border object-cover object-[50%_22%] md:w-80" />
        <div className="display text-[22vw] leading-[0.8] text-foreground md:text-[14vw]">HARSH</div>
      </section>
    );
  }

  return (
    <section aria-label="Harsh" className="relative h-[110vh] md:h-[150vh]">
      <div ref={stage} className="pointer-events-none fixed inset-0 z-30" style={{ visibility: "hidden" }}>
        <div ref={plate} className="absolute origin-top-left will-change-transform">
          <span className={`${mark} -left-2 -top-2 border-l border-t`} />
          <span className={`${mark} -right-2 -top-2 border-r border-t`} />
          <span className={`${mark} -bottom-2 -left-2 border-b border-l`} />
          <span className={`${mark} -bottom-2 -right-2 border-b border-r`} />
          <div className="relative h-full w-full overflow-hidden border border-border bg-surface">
            <img ref={img} src={photo} alt="" decoding="async" className="h-full w-full object-cover object-[50%_22%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.15em] text-foreground/80">FIG.01</span>
          </div>
        </div>
        <div ref={meta} className="absolute hidden font-mono text-[11px] leading-relaxed tracking-[0.15em] text-muted-foreground md:block">
          <div className="text-signal">● IDENTITY</div>
          <div>OPERATOR · H.KAMORIYA</div>
          <div className="text-faint">BACKEND / DISTRIBUTED / AI</div>
        </div>
        <div
          ref={word}
          className="display absolute inset-x-0 text-center text-[24vw] leading-[0.8] text-foreground will-change-transform md:left-[38%] md:right-auto md:text-left md:text-[17vw]"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          HARSH<span className="text-signal">.</span>
        </div>
      </div>
    </section>
  );
}
