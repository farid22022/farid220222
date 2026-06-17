import SectionReveal from "../../components/common/SectionReveal";

const uses = {
  Development: ["VS Code", "React + Vite", "Node.js", "MongoDB", "Postman"],
  Design: ["Figma", "Tailwind CSS", "Lucide Icons", "Framer Motion"],
  Learning: ["Python", "Jupyter", "Scikit-learn", "Research papers"]
};

export default function Uses() {
  return (
    <SectionReveal className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Uses</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Tools I reach for when building.</h1>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {Object.entries(uses).map(([title, list]) => (
          <div key={title} className="glass rounded-lg p-5">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="mt-4 grid gap-2 text-white/58">{list.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        ))}
      </div>
    </SectionReveal>
  );
}
