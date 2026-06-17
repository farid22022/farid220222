import { ArrowUpRight, Braces, Trophy } from "lucide-react";
import SectionReveal from "../common/SectionReveal";
import { problemSolvingPlatforms } from "../../data/problemSolving";

export default function ProblemSolvingStack() {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-white/40">Problem solving</p>
        <h2 className="mt-3 max-w-4xl text-3xl font-bold text-white md:text-5xl">
          I keep my algorithmic thinking sharp across contest and interview platforms.
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {problemSolvingPlatforms.map((platform) => (
          <a key={platform.name} href={platform.href} className="glass group relative overflow-hidden rounded-lg p-5">
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${platform.accent}`} />
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-md border border-white/10 bg-white/[0.04] p-3">
                {platform.name === "LeetCode" ? <Braces className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/45 transition group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold">{platform.name}</h3>
            <p className="mt-3 text-sm leading-6 text-white/58">{platform.focus}</p>
          </a>
        ))}
      </div>
    </SectionReveal>
  );
}
