import { useEffect, useState } from "react";
import { Portrait } from "./Portrait";

const nodes = [
  { id: "api", x: 80, y: 90, label: "API_GATEWAY" },
  { id: "svc", x: 260, y: 60, label: "SERVICES" },
  { id: "q", x: 260, y: 220, label: "QUEUE" },
  { id: "w1", x: 440, y: 140, label: "WORKER_01" },
  { id: "w2", x: 440, y: 300, label: "WORKER_02" },
  { id: "db", x: 600, y: 90, label: "POSTGRES" },
  { id: "rd", x: 600, y: 250, label: "REDIS" },
  { id: "cl", x: 600, y: 400, label: "AWS" },
];
const edges: [string, string][] = [
  ["api", "svc"], ["api", "q"], ["svc", "w1"], ["q", "w1"], ["q", "w2"],
  ["w1", "db"], ["w1", "rd"], ["w2", "rd"], ["w2", "cl"], ["svc", "db"],
];
const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));
const path = (a: string, b: string) => {
  const A = pos[a]!, B = pos[b]!;
  const mx = (A.x + B.x) / 2;
  return `M${A.x},${A.y} C${mx},${A.y} ${mx},${B.y} ${B.x},${B.y}`;
};

function SystemViz() {
  return (
    <svg viewBox="0 0 680 460" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <g key={i}>
          <path d={path(a, b)} fill="none" stroke="var(--border)" strokeWidth="1" />
          <path d={path(a, b)} fill="none" stroke="var(--faint)" strokeWidth="1" className="animate-dash" opacity="0.5" />
          {[0, 1].map((k) => (
            <circle key={k} r="2.2" fill={i % 3 === 0 ? "var(--signal)" : "var(--foreground)"}>
              <animateMotion dur={`${2.4 + (i % 4) * 0.7}s`} begin={`${k * 1.3 + i * 0.2}s`} repeatCount="indefinite" path={path(a, b)} />
            </circle>
          ))}
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          <circle r="4" fill="none" stroke="var(--signal)">
            <animate attributeName="r" values="4;16" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
          <rect x="-5" y="-5" width="10" height="10" fill="var(--background)" stroke="var(--foreground)" strokeWidth="1" />
          <rect x="-2" y="-2" width="4" height="4" fill={i % 3 === 0 ? "var(--signal)" : "var(--foreground)"} />
          <text x="12" y="-10" fill="var(--muted-foreground)" fontSize="9" fontFamily="Geist Mono" letterSpacing="1.2">{n.label}</text>
          <text x="12" y="4" fill="var(--faint)" fontSize="8" fontFamily="Geist Mono">{(12 + i * 7) % 99}ms · ok</text>
        </g>
      ))}
    </svg>
  );
}

function Ticker() {
  const [rps, setRps] = useState(1284);
  const [t, setT] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      setRps((r) => Math.max(900, Math.min(1800, r + Math.round((Math.random() - 0.5) * 80))));
      setT(new Date().toISOString().slice(11, 19));
    }, 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] text-muted-foreground">
      <span><span className="text-ok">●</span> ALL SYSTEMS NOMINAL</span>
      <span>THROUGHPUT <span className="text-foreground tabular-nums">{rps}</span> req/s</span>
      <span>P99 <span className="text-foreground">42ms</span></span>
      <span>UTC <span className="text-foreground tabular-nums">{t || "--:--:--"}</span></span>
    </div>
  );
}

const lines = ["I BUILD SYSTEMS", "THAT DON'T BREAK", "UNDER LOAD."];
const tags = ["PYTHON", "AWS", "FASTAPI", "POSTGRES", "REDIS", "DOCKER", "AI"];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden grid-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,var(--signal-dim),transparent_55%)] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="absolute right-0 top-[12%] h-[70%] w-full opacity-40 md:w-[52%] md:opacity-75 animate-fade" style={{ animationDelay: "0.6s" }}>
        <SystemViz />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-10 pt-28 md:px-10">
        <div className="flex justify-between label">
          <span>IDX.000 — PORTFOLIO</span>
          <span className="hidden md:block">22.72°N 75.86°E · INDORE, IN</span>
        </div>

        <div>
          <h1 className="display text-[15vw] md:text-[9.2vw]">
            {lines.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.04em]">
                <span className="block animate-reveal" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
                  {i === 2 ? (
                    <>
                      UNDER <span className="serif-em text-signal">load.</span>
                    </>
                  ) : (
                    l
                  )}
                </span>
              </span>
            ))}
          </h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 animate-fade" style={{ animationDelay: "0.8s" }}>
            <div className="flex items-end gap-5 md:col-span-6 md:gap-7">
              <Portrait />
              <div className="pb-1">
                <div className="label mb-3 hidden md:block">OPERATOR · H.KAMORIYA</div>
                <p className="max-w-md text-lg leading-snug text-muted-foreground">
                  <span className="text-foreground">Harsh Kamoriya</span> — software engineer building backend systems,
                  distributed infrastructure and AI-powered products.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap content-end gap-x-5 gap-y-2 md:col-span-7 md:justify-end">
              {tags.map((t, i) => (
                <span key={t} className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground">
                  <span className="text-faint">[{String(i).padStart(2, "0")}]</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-end justify-between border-t border-border pt-5">
          <Ticker />
          <span className="label hidden md:block">SCROLL ↓</span>
        </div>
      </div>
    </section>
  );
}
