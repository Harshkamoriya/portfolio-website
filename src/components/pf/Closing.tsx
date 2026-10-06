import { useState } from "react";
import { useCountUp, useInView } from "./hooks";

const words = [
  ["BUILD.", "Start from the failure modes, not the happy path."],
  ["BREAK.", "Load-test it until it tells you where it's weak."],
  ["DEBUG.", "Logs, traces, lock graphs. Find the cause, not the symptom."],
  ["OPTIMIZE.", "Measure first. Then make the slow part fast."],
  ["SHIP.", "Into production, with CI/CD and someone watching the graphs."],
];

export function Philosophy() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-40 md:px-10">
      <div className="label mb-16">§06 — OPERATING PRINCIPLES</div>
      {words.map(([w, d], i) => (
        <div key={w} className="group grid cursor-default items-baseline gap-4 border-t border-border py-4 md:grid-cols-12">
          <span className="label md:col-span-1">0{i + 1}</span>
          <span className="display text-[16vw] text-faint transition-colors duration-500 group-hover:text-foreground md:col-span-7 md:text-[9vw]">
            {w}
          </span>
          <p className="max-w-xs text-muted-foreground transition-all duration-500 md:col-span-4 md:translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
            <span className="text-signal">→ </span>
            {d}
          </p>
        </div>
      ))}
    </section>
  );
}

const tech: Record<string, { x: number; y: number; c: string }> = {
  Python: { x: 12, y: 30, c: "LANG" }, "C++": { x: 8, y: 62, c: "LANG" }, TypeScript: { x: 18, y: 85, c: "LANG" },
  FastAPI: { x: 32, y: 22, c: "BACKEND" }, "Node.js": { x: 34, y: 70, c: "BACKEND" }, WebSockets: { x: 46, y: 88, c: "BACKEND" },
  Redis: { x: 52, y: 36, c: "DATA" }, PostgreSQL: { x: 50, y: 60, c: "DATA" }, Pinecone: { x: 68, y: 82, c: "DATA" },
  AWS: { x: 74, y: 18, c: "CLOUD" }, Fargate: { x: 86, y: 38, c: "CLOUD" }, "CI/CD": { x: 92, y: 62, c: "INFRA" },
  Docker: { x: 70, y: 48, c: "INFRA" }, Gemini: { x: 30, y: 48, c: "AI" }, RAG: { x: 52, y: 80, c: "AI" }, Whisper: { x: 86, y: 86, c: "AI" },
};
const chains = [
  { n: "SERVING PATH", p: ["Python", "FastAPI", "Redis", "AWS"] },
  { n: "RETRIEVAL", p: ["Gemini", "RAG", "Pinecone"] },
  { n: "DELIVERY", p: ["Docker", "Fargate", "CI/CD"] },
  { n: "REALTIME", p: ["TypeScript", "Node.js", "WebSockets", "PostgreSQL"] },
  { n: "ALGORITHMS", p: ["C++", "Python"] },
];

export function Constellation() {
  const [c, setC] = useState(0);
  const active = chains[c].p;
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <div className="label">§07 — STACK, AS A GRAPH</div>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">
            Tools matter less than <span className="serif-em text-signal">how they connect.</span>
          </h2>
          <div className="mt-10">
            {chains.map((ch, i) => (
              <button key={ch.n} onMouseEnter={() => setC(i)} onClick={() => setC(i)} className="flex w-full items-center justify-between border-t border-border py-3 text-left font-mono text-xs tracking-[0.15em]">
                <span className={i === c ? "text-signal" : "text-muted-foreground"}>{ch.n}</span>
                <span className="text-faint">{ch.p.length} nodes</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] md:col-span-8 grid-bg">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {active.slice(1).map((t, i) => {
              const a = tech[active[i]!]!, b = tech[t]!;
              return <line key={c + t} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--signal)" strokeWidth="0.25" vectorEffect="non-scaling-stroke" className="animate-dash" style={{ strokeWidth: 1.5 }} />;
            })}
          </svg>
          {Object.entries(tech).map(([name, t]) => {
            const on = active.includes(name);
            return (
              <div key={name} className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500" style={{ left: `${t.x}%`, top: `${t.y}%` }}>
                <div className={`flex items-center gap-2 whitespace-nowrap font-mono text-[11px] md:text-xs ${on ? "text-foreground" : "text-faint"}`}>
                  <span className={`h-2 w-2 transition-all ${on ? "bg-signal scale-150" : "bg-faint"}`} />
                  {name}
                  <span className="hidden text-[9px] text-faint md:inline">{t.c}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TreeBg() {
  const nodes: { x: number; y: number; d: number }[] = [];
  const edges: [number, number, number, number, number][] = [];
  const build = (x: number, y: number, dx: number, d: number) => {
    nodes.push({ x, y, d });
    if (d >= 5) return;
    [-1, 1].forEach((s) => {
      edges.push([x, y, x + s * dx, y + 14, d]);
      build(x + s * dx, y + 14, dx / 2, d + 1);
    });
  };
  build(50, 8, 24, 0);
  return (
    <svg viewBox="0 0 100 90" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {edges.map(([x1, y1, x2, y2, d], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--border)" strokeWidth="0.15" />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="0.6" fill="var(--faint)">
          <animate attributeName="fill" values="var(--faint);var(--signal);var(--faint)" dur="6s" begin={`${n.d * 0.6 + (i % 5) * 0.1}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

export function DSA() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const v = useCountUp(1947, inView, 2200);
  return (
    <section className="relative overflow-hidden">
      <TreeBg />
      <div ref={ref} className="relative mx-auto max-w-[1600px] px-6 py-40 md:px-10">
        <div className="label">§08 — COMPETITIVE PROGRAMMING</div>
        <div className="mt-8 display text-[34vw] leading-[0.8] tabular-nums md:text-[26vw]">
          {Math.round(v)}
        </div>
        <div className="mt-10 grid gap-6 border-t border-border pt-6 font-mono text-sm md:grid-cols-4">
          <div><span className="text-faint">RATING / </span>LeetCode</div>
          <div><span className="text-faint">BADGE / </span><span className="text-signal">Knight</span></div>
          <div><span className="text-faint">SOLVED / </span>1000+</div>
          <div><span className="text-faint">PERCENTILE / </span>Top ~3%</div>
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  const rows = [
    ["Smart India Hackathon 2025", "Team Leader", "Led a 6-member team"],
    ["ECE Department", "Branch Councilor", "Student representation"],
    ["Cricket", "Team Captain", "2 years"],
  ];
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <div className="label mb-10">§09 — OFF THE KEYBOARD</div>
      {rows.map(([a, b, c]) => (
        <div key={a} className="grid items-baseline gap-2 border-t border-border py-6 md:grid-cols-12">
          <span className="text-3xl font-medium tracking-tight md:col-span-6 md:text-4xl">{a}</span>
          <span className="serif-em text-2xl text-signal md:col-span-3">{b}</span>
          <span className="font-mono text-xs text-muted-foreground md:col-span-3 md:text-right">{c}</span>
        </div>
      ))}
      <div className="border-t border-border" />
    </section>
  );
}

export function Contact() {
  const links = [
    ["GitHub", "https://github.com/"],
    ["LinkedIn", "https://linkedin.com/"],
    ["Email", "mailto:hello@example.com"],
    ["Resume", "#"],
  ];
  return (
    <section id="contact" className="relative overflow-hidden border-t border-border grid-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,var(--signal-dim),transparent_50%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 pb-8 pt-40 md:px-10">
        <div>
          <div className="label">§10 — END OF TRANSMISSION</div>
          <h2 className="mt-10 display text-[14vw] md:text-[10vw]">
            LET'S BUILD
            <br />
            SOMETHING <span className="serif-em text-signal">difficult.</span>
          </h2>
        </div>
        <div>
          <div className="grid border-t border-border md:grid-cols-4">
            {links.map(([l, h]) => (
              <a key={l} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between border-b border-border py-6 text-2xl transition-colors hover:text-signal md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                {l}
                <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </a>
            ))}
          </div>
          <div className="mt-10 flex justify-between label">
            <span>© 2026 HARSH KAMORIYA</span>
            <span>BUILT TO HANDLE LOAD</span>
          </div>
        </div>
      </div>
    </section>
  );
}
