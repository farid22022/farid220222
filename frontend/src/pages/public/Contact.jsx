import { Mail, MapPin } from "lucide-react";
import SectionReveal from "../../components/common/SectionReveal";

export default function Contact() {
  return (
    <SectionReveal className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Contact</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Have an idea worth shipping?</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <a href="mailto:admin@example.com" className="glass rounded-lg p-6">
          <Mail className="mb-5 h-7 w-7 text-[var(--accent)]" />
          <h2 className="text-2xl font-semibold">Email</h2>
          <p className="mt-2 text-white/55">admin@example.com</p>
        </a>
        <div className="glass rounded-lg p-6">
          <MapPin className="mb-5 h-7 w-7 text-[var(--accent)]" />
          <h2 className="text-2xl font-semibold">Location</h2>
          <p className="mt-2 text-white/55">Khulna, Bangladesh</p>
        </div>
      </div>
    </SectionReveal>
  );
}
