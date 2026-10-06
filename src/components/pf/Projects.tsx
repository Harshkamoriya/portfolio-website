import { useScrollProgress, useInView } from "./hooks";

const vSteps = [
  { k: "CANDIDATE", d: "Speaks over WebRTC. Audio + transcript stream in real time." },
  { k: "INTERVIEW AGENT", d: "Gemini-driven interviewer runs the conversation and scores answers." },
  { k: "MEMORY AGENT", d: "Distils every answer into structured memory — claims, gaps, signals." },
  { k: "RAG", d: "Pinecone retrieval over the résumé, JD and prior answers." },
  { k: "FOLLOW-UP", d: "A context-aware question that only a human interviewer would think to ask." },
];

function Verviq() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();
  const active = Math.min(vSteps.length - 1, Math.floor(p * vSteps.length));
  return (
    <div ref={ref} style={{ height: "380vh" }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="pointer-events-none absolute -right-[10vw] top-1/2 -translate-y-1/2 display text-[38vw] text-line select-none">V</div>
        <div className="relative mx-auto grid w-full max-w-[1600px] gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <div className="label">CHAPTER 01 / FLAGSHIP</div>
            <h3 className="mt-6 display text-7xl md:text-[9vw]">
              VERVIQ<span className="text-signal">.</span>
            </h3>
            <p className="mt-4 serif-em text-3xl text-muted-foreground">AI interviews that actually listen.</p>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              <span className="text-foreground">The challenge:</span> LLM interviewers forget. Ask a follow-up three
              minutes in and the context is gone. <span className="text-foreground">The solution:</span> a multi-agent
              loop where a dedicated memory agent and RAG keep every answer in play.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
              {["MULTI-AGENT", "RAG", "PINECONE", "GEMINI", "WEBRTC", "WEBSOCKETS", "POSTGRESQL"].map((t) => (
                <span key={t}>/{t}</span>
              ))}
            </div>
          </div>
          <div className="relative md:col-span-6 md:col-start-7">
            <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border" />
            <div className="absolute left-[11px] top-0 w-px bg-signal transition-all duration-700" style={{ height: `${((active + 0.5) / vSteps.length) * 100}%` }} />
            {vSteps.map((s, i) => (
              <div key={s.k} className={`relative flex gap-6 py-5 transition-all duration-700 ${i <= active ? "opacity-100" : "opacity-20"}`}>
                <span className={`relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full border transition-colors duration-500 ${i === active ? "border-signal bg-signal" : i < active ? "border-signal bg-background" : "border-border bg-background"}`} />
                <div>
                  <div className={`font-mono text-sm tracking-[0.2em] ${i === active ? "text-signal" : ""}`}>{s.k}</div>
                  <p className={`mt-1 max-w-sm text-muted-foreground transition-all duration-700 ${i === active ? "max-h-20 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GitSaathi() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const log = [
    ["$", "gitsaathi analyze ./repo", "text-foreground"],
    ["→", "indexing 1,284 files · 312 commits", "text-muted-foreground"],
    ["→", "transcribing standup.mp3 (AssemblyAI)", "text-muted-foreground"],
    ["✓", "summary: auth module owns 41% of churn", "text-ok"],
    ["✓", "insight: 3 PRs touch billing without tests", "text-ok"],
    ["!", "suggest: split src/server/router.ts (2.1k LOC)", "text-signal"],
  ];
  return (
    <div className="border-y border-border bg-surface">
      <div ref={ref} className="mx-auto grid max-w-[1600px] gap-12 px-6 py-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7 md:order-2">
          <div className="border border-border bg-background font-mono text-sm">
            <div className="flex items-center justify-between border-b border-border px-4 py-3 text-[11px] text-faint">
              <span>~/gitsaathi — zsh</span>
              <span>REPO → AI → INSIGHT</span>
            </div>
            <div className="space-y-2 p-6">
              {log.map(([p, t, c], i) => (
                <div key={i} className={`flex gap-3 transition-all duration-500 ${c} ${inView ? "opacity-100" : "translate-y-2 opacity-0"}`} style={{ transitionDelay: `${i * 280}ms` }}>
                  <span className="text-faint">{p}</span>
                  {t}
                </div>
              ))}
              <span className="inline-block h-4 w-2 bg-foreground animate-blink" />
            </div>
          </div>
        </div>
        <div className="md:col-span-5 md:order-1">
          <div className="label">CHAPTER 02 / DEVELOPER TOOL</div>
          <h3 className="mt-6 font-mono text-5xl font-medium tracking-tight md:text-6xl">
            git<span className="text-signal">saathi</span>
          </h3>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Point it at a repository. It reads the code, the commit history and even meeting recordings, and tells you
            where the real complexity lives.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-px border border-border bg-border font-mono text-xs">
            {["T3 STACK", "PRISMA", "POSTGRESQL", "ASSEMBLYAI"].map((t) => (
              <div key={t} className="bg-surface px-4 py-4">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AeroGuide() {
  const steps = ["VOICE", "WHISPER", "AI", "RESPONSE"];
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-32 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="label">CHAPTER 03 / AVIATION</div>
          <h3 className="mt-6 display text-6xl md:text-[7vw]">AEROGUIDE</h3>
        </div>
        <p className="max-w-sm text-muted-foreground">
          An AI airport companion that works when the terminal Wi-Fi doesn't — on-device Whisper transcription with
          graceful fallbacks.
        </p>
      </div>
      {/* departures board */}
      <div className="mt-14 border border-border font-mono">
        <div className="grid grid-cols-12 border-b border-border px-5 py-3 text-[10px] tracking-[0.2em] text-faint">
          <span className="col-span-1">SEQ</span>
          <span className="col-span-4">STAGE</span>
          <span className="col-span-5">DETAIL</span>
          <span className="col-span-2 text-right">STATUS</span>
        </div>
        {steps.map((s, i) => (
          <div key={s} className="group grid grid-cols-12 items-center border-b border-border px-5 py-5 transition-colors last:border-b-0 hover:bg-surface">
            <span className="col-span-1 text-faint">0{i + 1}</span>
            <span className="col-span-4 text-2xl tracking-[0.1em] text-signal md:text-4xl">{s}</span>
            <span className="col-span-5 text-xs text-muted-foreground md:text-sm">
              {["Mic capture, noise-gated", "Offline speech-to-text, on device", "Intent + flight context", "Spoken + on-screen answer"][i]}
            </span>
            <span className="col-span-2 text-right text-xs text-ok">{["ON TIME", "OFFLINE OK", "BOARDING", "ARRIVED"][i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 label">FALLBACK: CLOUD STT → CACHED FAQ → TEXT INPUT. NO DEAD ENDS.</div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-[1600px] px-6 pt-32 md:px-10">
        <div className="label">§05 — THREE CHAPTERS</div>
      </div>
      <Verviq />
      <GitSaathi />
      <AeroGuide />
    </section>
  );
}
