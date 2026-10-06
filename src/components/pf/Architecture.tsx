import { useState } from "react";

const layers = [
  { k: "CLIENT", t: "Web + realtime clients", d: "React dashboards subscribed over WebSockets; results stream in per ticker instead of one blocking response.", m: "WS · JSON" },
  { k: "API", t: "FastAPI gateway", d: "Async endpoints, request validation and auth. Long work is never done inline — it's enqueued and acknowledged in milliseconds.", m: "p99 42ms" },
  { k: "SERVICES", t: "Domain services", d: "Signal computation, portfolio analytics and ML inference split into independently deployable services.", m: "6 svc" },
  { k: "QUEUE", t: "Distributed job queue", d: "Fan-out of per-ticker jobs with retries, idempotency keys and back-pressure so spikes degrade gracefully.", m: "at-least-once" },
  { k: "WORKERS", t: "Containerised workers", d: "Dockerised workers autoscaled on AWS Fargate. This is where the 17h → 56m backtest rewrite lives.", m: "18× faster" },
  { k: "DATA", t: "PostgreSQL + Redis", d: "Postgres as source of truth; Redis for hot state and caching. Fixed a production deadlock by reordering lock acquisition.", m: "0 deadlocks" },
  { k: "CLOUD", t: "AWS infrastructure", d: "7+ VMs, Fargate tasks, CI/CD pipelines and monitoring — provisioned, deployed and debugged end to end.", m: "7+ VMs" },
];

export function Architecture() {
  const [a, setA] = useState(4);
  const L = layers[a]!;
  return (
    <section id="systems" className="relative mx-auto max-w-[1600px] px-6 py-40 md:px-10">
      <div className="mb-20 grid gap-8 md:grid-cols-12">
        <div className="label md:col-span-3">§04 — SYSTEM MAP</div>
        <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.04em] md:col-span-9 md:text-7xl">
          Every layer, <span className="serif-em text-muted-foreground">touched.</span>
          <span className="mt-4 block label">HOVER A LAYER TO INSPECT</span>
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-12">
        <div className="relative md:col-span-7">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-border" />
          {layers.map((l, i) => (
            <button
              key={l.k}
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
              onClick={() => setA(i)}
              className="group relative flex w-full items-center gap-6 py-3 text-left"
            >
              <span className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center border font-mono text-[10px] transition-all duration-300 ${i === a ? "border-signal bg-signal text-primary-foreground" : "border-border bg-background text-muted-foreground group-hover:border-foreground"}`}>
                L{i}
              </span>
              <span className={`display text-4xl transition-all duration-300 md:text-6xl ${i === a ? "translate-x-2 text-foreground" : "text-faint group-hover:text-muted-foreground"}`}>
                {l.k}
              </span>
              <span className={`ml-auto font-mono text-[11px] transition-opacity ${i === a ? "text-signal opacity-100" : "opacity-0"}`}>{l.m}</span>
              {i === a && (
                <span className="absolute left-[27px] top-full z-10 h-3 w-px overflow-hidden">
                  <span className="block h-1.5 w-px bg-signal animate-[reveal-up_0.8s_linear_infinite]" />
                </span>
              )}
            </button>
          ))}
        </div>

        <aside className="md:col-span-5">
          <div className="sticky top-28 border border-border bg-surface p-8">
            <div className="flex justify-between label">
              <span>INSPECT://L{a}</span>
              <span className="!text-ok">● LIVE</span>
            </div>
            <div key={a} className="animate-fade">
              <h3 className="mt-10 text-3xl font-medium tracking-tight">{L.t}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{L.d}</p>
              <div className="mt-10 grid grid-cols-2 border-t border-border pt-6 font-mono text-xs">
                <span className="text-faint">METRIC</span>
                <span className="text-right text-signal">{L.m}</span>
                <span className="mt-2 text-faint">OWNER</span>
                <span className="mt-2 text-right">h.kamoriya</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
