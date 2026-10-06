import { useCountUp, useInView } from "./hooks";

const metrics = [
  { n: 1947, suf: "", k: "LEETCODE RATING", d: "Knight badge. Contest-tested, not tutorial-tested." },
  { n: 1000, suf: "+", k: "PROBLEMS SOLVED", d: "Graphs, DP, segment trees — the boring foundations." },
  { n: 18, suf: "×", k: "FASTER BACKTESTS", d: "17 hours of compute collapsed to 56 minutes." },
  { n: 50, suf: "%", k: "LOWER LATENCY", d: "End-to-end response time halved in production." },
  { n: 7, suf: "+", k: "AWS VMs OPERATED", d: "Provisioned, deployed, monitored, debugged." },
];

function Metric({ m, i }: { m: (typeof metrics)[number]; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(m.n, inView, 1800);
  return (
    <div ref={ref} className="group grid grid-cols-12 items-end gap-4 border-t border-border py-8 transition-colors hover:bg-surface md:py-10">
      <span className="col-span-12 label md:col-span-1">0{i + 1}</span>
      <div className="col-span-12 display text-[22vw] tabular-nums md:col-span-7 md:text-[11vw]">
        <span className="transition-colors group-hover:text-signal">{Math.round(v)}</span>
        <span className="text-signal">{m.suf}</span>
      </div>
      <div className="col-span-12 pb-3 md:col-span-4">
        <div className="font-mono text-sm tracking-[0.18em]">{m.k}</div>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">{m.d}</p>
        <div className="mt-4 h-px w-full bg-border">
          <div className="h-px bg-signal transition-all duration-[1800ms] ease-out" style={{ width: inView ? `${40 + i * 12}%` : "0%" }} />
        </div>
      </div>
    </div>
  );
}

export function Signal() {
  return (
    <section id="work" className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <div className="mb-16 flex items-end justify-between">
        <h2 className="label">§01 — ENGINEERING SIGNAL</h2>
        <span className="label hidden md:block">ALL FIGURES VERIFIED · PRODUCTION</span>
      </div>
      {metrics.map((m, i) => (
        <Metric key={m.k} m={m} i={i} />
      ))}
      <div className="border-t border-border" />
    </section>
  );
}

export function Engineer() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <section id="about" className="mx-auto max-w-[1600px] px-6 py-40 md:px-10">
      <div ref={ref} className={`grid gap-12 md:grid-cols-12 in-view-fade ${inView ? "is-in" : ""}`}>
        <div className="label md:col-span-3">§02 — THE ENGINEER</div>
        <div className="md:col-span-9">
          <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
            I like problems that get <span className="serif-em text-signal">harder</span> when you add users.
          </h2>
          <p className="mt-12 max-w-2xl text-xl leading-relaxed text-muted-foreground md:ml-[20%]">
            I work across backend systems, distributed infrastructure and AI applications — from architecture and
            implementation to deployment, debugging and production operations. The part I enjoy most is the part after
            launch: when real traffic finds the bottleneck you didn't plan for.
          </p>
        </div>
      </div>
    </section>
  );
}
