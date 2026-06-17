import { Code2, GraduationCap, MapPin, Sparkles } from "lucide-react";
import SectionReveal from "../common/SectionReveal";

const cards = [
  ["Role", "Full Stack Web Developer + AI/ML Enthusiast", Code2],
  ["Education", "CSE Discipline, Khulna University", GraduationCap],
  ["Location", "Khulna, Bangladesh", MapPin],
  ["Focus", "Clean interfaces, secure APIs, and intelligent product flows", Sparkles]
];

export default function QuickGlance() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/40">A quick glance</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">Building the bridge between product ideas and reliable software.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 motion-stagger">
        {cards.map(([label, text, Icon]) => (
          <div key={label} className="glass motion-card rounded-lg p-5">
            <Icon className="mb-5 h-6 w-6 text-[var(--accent)]" />
            <p className="text-sm text-white/40">{label}</p>
            <h3 className="mt-2 text-lg font-semibold leading-7">{text}</h3>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
