import { Code2, Handshake, Mail, Orbit, Sparkles, TimerReset } from "lucide-react";
import SectionReveal from "../common/SectionReveal";
import { skills } from "../../data/skills";
import WeatherGlobeCard from "./WeatherGlobeCard";

const workItems = [
  "Full stack dashboards",
  "AI/ML experiments",
  "CNN model pipelines",
  "Secure REST APIs",
  "Cloudinary media flows",
  "Research-led products"
];

export default function SpaceBento() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="space-bento-grid motion-stagger">
        <div className="space-card partnership-card rounded-lg p-6 md:col-span-2" data-parallax="0.07">
          <div className="orbit-rings" aria-hidden="true">
            <span />
            <span />
            <span className="active" />
            <span />
          </div>
          <Handshake className="mt-20 h-8 w-8 text-white/35" />
          <p className="mt-5 text-xs uppercase tracking-[0.22em] text-white/35">Partnership</p>
          <h3 className="mt-2 max-w-xl text-2xl font-bold text-white">
            I prioritize clear communication, reliable delivery, and products that make technical ideas feel usable.
          </h3>
        </div>

        <div className="space-card innovation-card rounded-lg p-6 md:row-span-2" data-parallax="0.11">
          <h3 className="mx-auto max-w-sm text-center text-3xl font-black italic leading-tight text-[#ffd4d8]">
            Focused on latest digital <span className="text-[var(--accent)]">innovations</span>
          </h3>
          <div className="mt-8 flex flex-wrap justify-center gap-3 motion-stagger">
            {skills.slice(0, 16).map((skill) => (
              <span key={skill} className="tech-chip motion-magnetic">{skill}</span>
            ))}
          </div>
          <div className="browser-miniature">
            <div className="browser-top">
              <span />
              <span />
              <span />
            </div>
            <p>Something that</p>
            <strong>stands out.</strong>
          </div>
        </div>

        <div className="space-card rounded-lg p-6 text-center" data-float>
          <TimerReset className="mx-auto h-8 w-8 text-[var(--accent)]" />
          <h3 className="mt-6 text-3xl font-black italic text-[#ffd4d8]">Adaptable across time zones</h3>
          <div className="mt-6 flex justify-center gap-2">
            {["BD", "Remote", "Global"].map((zone) => (
              <span key={zone} className="rounded-md border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-white/55">
                {zone}
              </span>
            ))}
          </div>
        </div>

        <div className="space-card rounded-lg p-6 text-center" data-float>
          <Orbit className="mx-auto h-10 w-10 text-[var(--accent)]" />
          <h3 className="mt-6 text-2xl font-black text-white">Let us innovate together</h3>
          <p className="mt-2 text-sm text-white/45">Ready to bring your next web or AI idea to life?</p>
          <a href="mailto:admin@example.com" className="motion-magnetic mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black">
            <Mail className="h-4 w-4" />
            Start a conversation
          </a>
        </div>

        <WeatherGlobeCard />

        <div className="space-card work-strip rounded-lg p-6 md:col-span-2" data-parallax="0.05">
          <div className="work-carousel" aria-hidden="true">
            {workItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <Code2 className="mt-40 h-8 w-8 text-white/35" />
          <p className="mt-3 text-xs uppercase tracking-[0.22em] text-white/35">Things I am doing</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Working on full stack AI product systems</h3>
        </div>

        <div className="space-card rounded-lg p-6" data-float>
          <Sparkles className="h-8 w-8 text-[var(--accent)]" />
          <p className="mt-12 text-xs uppercase tracking-[0.22em] text-white/35">Build mode</p>
          <h3 className="mt-2 text-2xl font-bold text-white">Clean UI, strong APIs, and intelligent workflows.</h3>
        </div>
      </div>
    </SectionReveal>
  );
}
