import SectionReveal from "../../components/common/SectionReveal";

export default function About() {
  return (
    <SectionReveal className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">About</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">I build across the stack and keep learning at the edge of AI.</h1>
      <div className="mt-8 grid gap-5 text-lg leading-8 text-white/60">
        <p>
          I am Md. Farid Hossen Rehad, studying CSE Discipline at Khulna University and building web products from interface to database.
        </p>
        <p>
          My work blends practical engineering with curiosity for AI/ML: secure APIs, responsive dashboards, data-backed features, and interfaces that feel calm under pressure.
        </p>
      </div>
    </SectionReveal>
  );
}
