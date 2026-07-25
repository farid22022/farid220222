import { ArrowRight, BriefcaseBusiness, ChevronDown, GitBranch, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnnouncementPill from "./AnnouncementPill";

const stats = [
  { label: "Projects Built", value: "20+", icon: "🚀" },
  { label: "Technologies", value: "35+", icon: "⚡" },
  { label: "AI/ML Models", value: "10+", icon: "🧠" },
  { label: "Open Source", value: "Active", icon: "🌐" }
];

const quickLinks = [
  { label: "GitHub", href: "https://github.com/mdfaridhossenrehad", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/in/mdfaridhossenrehad", icon: BriefcaseBusiness },
  { label: "Email", href: "mailto:mdfaridhossenrehad@gmail.com", icon: Mail }
];

export default function Hero() {
  return (
    <section className="space-hero relative mx-auto grid min-h-[calc(100vh-40px)] max-w-7xl place-items-center px-4 pb-28 pt-16 md:pt-24">
      {/* Radial gradient background */}
      <div className="hero-gradient" aria-hidden="true" />

      <div className="relative z-10 w-full text-center">
        <AnnouncementPill />

        <div className="hero-avatar mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-(--border) bg-(--card) text-3xl font-black text-(--text)">
          FR
        </div>

        <h1 className="mt-6 max-w-6xl text-balance text-5xl font-black leading-[1.06] tracking-normal text-(--text) md:text-7xl lg:text-8xl">
          I design and build products that deliver <span className="impact-script">real impact</span>
        </h1>

        <p className="mx-auto mt-4 text-xl font-semibold text-(--text-muted) md:text-2xl">
          scalable systems · AI-powered solutions · beautiful interfaces
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-(--text-muted) md:text-lg">
          Hello, I'm <span className="font-bold text-(--text)">Md. Farid Hossen Rehad</span> — a Full Stack
          Developer &amp; AI/ML enthusiast studying CSE at Khulna University, Bangladesh.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contact"
            className="hero-action inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-(--text)"
          >
            Let's Connect{" "}
            <ArrowRight className="h-4 w-4 rounded-full bg-(--text) p-0.5 text-(--background)" />
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-6 py-3 text-sm font-semibold text-(--text-muted) transition hover:text-(--text)"
          >
            <Sparkles className="h-4 w-4" />
            Explore Work
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-3 py-1.5 text-xs text-(--text-muted) transition hover:text-(--text)"
              aria-label={label}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="glass min-w-[7.5rem] flex-1 rounded-lg px-4 py-3 text-center">
              <div className="text-xl">{icon}</div>
              <div className="mt-1 text-xl font-black text-(--text)">{value}</div>
              <div className="mt-0.5 text-xs text-(--text-muted)">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.24em] text-(--text-muted)" style={{ opacity: 0.45 }}>
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-(--text-muted)" style={{ opacity: 0.45 }} />
      </div>
    </section>
  );
}
