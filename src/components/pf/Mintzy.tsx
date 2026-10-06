import { useScrollProgress } from "./hooks";

const stages = [
  {
    k: "PROBLEM",
    title: "A trading platform choking on its own success.",
    body: "Mintzy's analytics pipeline computed signals per ticker synchronously. As the watchlist grew, users waited a full minute for a response.",
    big: ["60s", "→", "30s"],
    cap: "TOTAL RESPONSE TIME",
  },
  {
    k: "ARCHITECTURE",
    title: "FastAPI front door, containerised workers behind it.",
    body: "Requests fan out through a distributed job queue to Dockerised workers on AWS Fargate. Redis holds hot state; WebSockets stream results back as they land.",
    big: ["5s", "→", "3s"],
    cap: "PER-TICKER LATENCY",
  },
  {
    k: "BOTTLENECK",
    title: "A production deadlock nobody could reproduce locally.",
    body: "Under concurrent load, workers contended for the same rows and stalled the queue. Traced through logs and lock graphs, then reordered acquisition and narrowed transaction scope.",
    big: ["0", "", "deadlocks"],
    cap: "POST-FIX, UNDER LOAD",
  },
  {
    k: "OPTIMIZATION",
    title: "Vectorised the ML backtesting engine.",
    body: "Replaced row-by-row loops with vectorised ops, parallelised across workers and cached intermediate features. Same results, a fraction of the compute.",
    big: ["17h", "→", "56m"],
    cap: "BACKTESTING RUNTIME",
  },
  {
    k: "RESULT",
    title: "Same hardware. Different system.",
    body: "Shipped with CI/CD, observable in production, and fast enough that the product team stopped apologising for it.",
    big: ["18×", "", "faster"],
    cap: "NET IMPROVEMENT",
  },
];
const stack = ["DOCKER", "AWS FARGATE", "DISTRIBUTED QUEUES", "REDIS", "FASTAPI", "WEBSOCKETS", "CI/CD"];

export function Mintzy() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();
  const idx = Math.min(stages.length - 1, Math.floor(p * stages.length));
  const s = stages[idx]!;
  return (
    <section className="relative border-y border-border bg-surface">
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="label md:col-span-3">§03 — EXPERIENCE / CASE FILE</div>
          <div className="md:col-span-9">
            <div className="label !text-signal">SOFTWARE ENGINEER · MINTZY</div>
            <h2 className="mt-4 display text-6xl md:text-[8vw]">
              Production, <span className="serif-em">under pressure.</span>
            </h2>
          </div>
        </div>
      </div>

      <div ref={ref} style={{ height: `${stages.length * 90}vh` }} className="relative">
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-6 md:grid-cols-12 md:px-10">
            <ol className="flex gap-4 overflow-x-auto md:col-span-3 md:flex-col md:gap-0">
              {stages.map((st, i) => (
                <li key={st.k} className="flex items-center gap-3 py-2 font-mono text-xs tracking-[0.18em] md:py-3">
                  <span className={`h-px transition-all duration-500 ${i === idx ? "w-10 bg-signal" : "w-4 bg-faint"}`} />
                  <span className={i === idx ? "text-foreground" : i < idx ? "text-muted-foreground" : "text-faint"}>{st.k}</span>
                  {i < stages.length - 1 && <span className="hidden text-faint md:hidden">↓</span>}
                </li>
              ))}
              <li className="mt-10 hidden md:block">
                <div className="label mb-3">STACK</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {stack.map((t, i) => (
                    <span key={t} className={`font-mono text-[11px] transition-colors duration-500 ${i <= idx + 2 ? "text-foreground" : "text-faint"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            </ol>

            <div key={idx} className="md:col-span-9">
              <div className="overflow-hidden">
                <div className="display flex flex-wrap items-baseline gap-x-[0.15em] text-[20vw] tabular-nums animate-reveal md:text-[13vw]">
                  <span className={idx === 4 ? "text-signal glow-signal" : ""}>{s.big[0]}</span>
                  {s.big[1] && <span className="text-faint">{s.big[1]}</span>}
                  <span className={idx === 4 ? "serif-em text-[0.5em] text-muted-foreground" : idx === 2 ? "serif-em text-[0.4em] text-muted-foreground" : "text-signal"}>
                    {s.big[2]}
                  </span>
                </div>
              </div>
              <div className="label mt-2">{s.cap}</div>
              <div className="mt-10 grid gap-6 border-t border-border pt-8 animate-fade md:grid-cols-2">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
