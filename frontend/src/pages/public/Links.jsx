import { ExternalLink, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "../../components/common/SectionReveal";
import { socials } from "../../data/socials";

export default function Links() {
  return (
    <SectionReveal className="mx-auto max-w-3xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Links</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Find me around the web.</h1>
      <div className="mt-10 grid gap-3">
        <Link to="/share-text" className="glass flex items-center justify-between rounded-lg p-4">
          <span className="flex items-center gap-3"><KeyRound className="h-5 w-5" />Text Share</span>
          <ExternalLink className="h-4 w-4 text-white/45" />
        </Link>
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} href={href} className="glass flex items-center justify-between rounded-lg p-4">
            <span className="flex items-center gap-3"><Icon className="h-5 w-5" />{label}</span>
            <ExternalLink className="h-4 w-4 text-white/45" />
          </a>
        ))}
      </div>
    </SectionReveal>
  );
}
