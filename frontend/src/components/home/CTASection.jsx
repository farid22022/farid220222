import { ArrowRight, BriefcaseBusiness, GitBranch, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "../common/SectionReveal";

const EMAIL = "mdfaridhossenrehad@gmail.com";

const quickContacts = [
  { label: "Email me", href: `mailto:${EMAIL}`, icon: Mail },
  { label: "GitHub", href: "https://github.com/mdfaridhossenrehad", icon: GitBranch },
  { label: "LinkedIn", href: "https://linkedin.com/in/mdfaridhossenrehad", icon: BriefcaseBusiness }
];

export default function CTASection() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="glass relative overflow-hidden rounded-2xl p-8 md:p-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_45%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_80%,color-mix(in_srgb,var(--secondary)_12%,transparent),transparent_40%)]" />

        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">From idea to execution</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-6xl">
          Let's build something useful, fast, and real.
        </h2>
        <p className="mt-5 max-w-2xl text-(--text-muted)">
          I can help with full-stack apps, admin dashboards, API systems, AI-enabled product experiments, and production deployment.
          Ready to collaborate — remotely, worldwide.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-(--text) px-6 py-3 text-sm font-semibold text-(--background) transition hover:opacity-90">
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
          {quickContacts.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-(--border) px-5 py-3 text-sm text-(--text-muted) transition hover:text-(--text)"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
