import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "../common/SectionReveal";

export default function CTASection() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="glass relative overflow-hidden rounded-lg p-8 md:p-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_35%)]" />
        <p className="text-sm uppercase tracking-[0.28em] text-white/40">From idea to execution</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black md:text-6xl">Let’s build something useful, fast, and real.</h2>
        <p className="mt-5 max-w-2xl text-white/58">
          I can help with full stack apps, admin dashboards, API systems, AI-enabled product experiments, and production deployment.
        </p>
        <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionReveal>
  );
}
