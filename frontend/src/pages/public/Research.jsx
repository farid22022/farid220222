import SectionReveal from "../../components/common/SectionReveal";

export default function Research() {
  return (
    <SectionReveal className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Research</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Exploring practical AI, learning systems, and applied web intelligence.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {["Machine learning workflows", "AI-assisted interfaces", "Data-driven product decisions", "Secure full stack architecture"].map((item) => (
          <div key={item} className="glass rounded-lg p-5 text-lg font-semibold">{item}</div>
        ))}
      </div>
    </SectionReveal>
  );
}
