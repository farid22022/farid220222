import { skills } from "../../data/skills";

export default function SkillMarquee() {
  return (
    <div className="overflow-hidden border-y border-(--border) bg-(--card) py-5">
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {skills.map((skill) => (
          <span key={skill} className="rounded-full border border-(--border) px-5 py-2 text-sm text-(--text-muted)">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
