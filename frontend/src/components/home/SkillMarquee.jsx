import { skills } from "../../data/skills";

export default function SkillMarquee() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-5">
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {skills.map((skill) => (
          <span key={skill} className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/65">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
