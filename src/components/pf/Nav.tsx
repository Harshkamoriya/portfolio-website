import { useEffect, useState } from "react";

const links = [
  ["Work", "#work"],
  ["Systems", "#systems"],
  ["Projects", "#projects"],
  ["About", "#about"],
] as const;

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 200);
      setScrolled(y > 40);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden ? "-translate-y-full" : ""} ${scrolled ? "bg-background/70 backdrop-blur-md border-b border-border" : ""}`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-mono text-xs tracking-[0.2em]">
          HARSH <span className="text-signal">/</span> 2026
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="label transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </div>
        <a
          href="https://drive.google.com/file/d/1GPfHbkqii0XeIPmRcuo3wJK5Qb6Zrswi/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="label !text-foreground transition-colors hover:!text-signal"
        >
          Resume ↗
        </a>
      </nav>
    </header>
  );
}
