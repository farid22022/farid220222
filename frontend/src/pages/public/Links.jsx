import { ArrowUpRight, Code2, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { codingProfiles, socials } from "../../data/socials";

const tools = [
  { label: "Text Share", description: "Quickly share code snippets or notes via a temporary link", href: "/share-text", icon: KeyRound, internal: true }
];

function LinkCard({ label, description, href, icon: Icon, internal }) {
  const Wrapper = internal ? Link : "a";
  const extraProps = internal
    ? { to: href }
    : { href, target: "_blank", rel: "noopener noreferrer" };

  return (
    <Wrapper
      {...extraProps}
      className="glass group flex items-center justify-between gap-4 rounded-lg p-5 motion-card"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--border) bg-(--card) transition group-hover:border-(--text-muted)">
          <Icon className="h-5 w-5 text-(--accent)" />
        </div>
        <div>
          <p className="font-medium text-(--text)">{label}</p>
          {description && <p className="mt-0.5 text-sm text-(--text-muted)">{description}</p>}
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-(--text-muted) transition group-hover:text-(--text)" />
    </Wrapper>
  );
}

export default function Links() {
  return (
    <SectionReveal className="mx-auto max-w-2xl px-4 py-24">
      <Seo
        title="Links — Find Farid Hossen Rehad Around the Web"
        description="All the places Md. Farid Hossen Rehad (Farid) is active online: GitHub, LinkedIn, and competitive programming profiles."
        path="/links"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Links</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Find me around the web.</h1>
      <p className="mt-5 text-lg text-(--text-muted)">All the places where I'm active or share my work.</p>

      <div className="mt-10 space-y-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Social</p>
          <div className="grid gap-3">
            {socials.filter((s) => s.href.startsWith("http") || s.href.startsWith("mailto")).map((s) => (
              <LinkCard key={s.label} {...s} internal={false} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Competitive Programming</p>
          <div className="grid gap-3">
            {codingProfiles.map((p) => (
              <LinkCard key={p.label} {...p} internal={false} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">Tools</p>
          <div className="grid gap-3">
            {tools.map((t) => (
              <LinkCard key={t.label} {...t} />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
