import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";

const uses = {
  "Development": [
    { name: "VS Code", note: "Primary editor — fast, extensible, excellent for React & Node" },
    { name: "React + Vite", note: "Frontend stack of choice for speed and DX" },
    { name: "Node.js + Express", note: "Backend API server for all projects" },
    { name: "MongoDB + Mongoose", note: "Document database for flexible schemas" },
    { name: "Postman", note: "API testing and documentation" },
    { name: "Git & GitHub", note: "Version control and code collaboration" },
    { name: "Tailwind CSS", note: "Utility-first CSS — fast styling without context switching" },
    { name: "Framer Motion", note: "Declarative animations in React" },
    { name: "GSAP", note: "Advanced timeline & scroll animations" }
  ],
  "AI / ML": [
    { name: "Python", note: "Primary language for all ML work" },
    { name: "TensorFlow / Keras", note: "Deep learning model training" },
    { name: "Scikit-learn", note: "Classical ML, preprocessing, evaluation" },
    { name: "Jupyter Notebooks", note: "Exploratory analysis and experiment logs" },
    { name: "Pandas & NumPy", note: "Data manipulation and numerical computing" },
    { name: "OpenCV", note: "Computer vision preprocessing and pipelines" },
    { name: "Matplotlib / Seaborn", note: "Visualization of model results" }
  ],
  "Design & Collaboration": [
    { name: "Figma", note: "Wireframes, component design, and UI specs" },
    { name: "Lucide Icons", note: "Clean, consistent icon set" },
    { name: "Excalidraw", note: "Quick system architecture diagrams" },
    { name: "Notion", note: "Project planning and notes" }
  ],
  "Deployment & Infrastructure": [
    { name: "Vercel", note: "Frontend deployments — zero config, fast CDN" },
    { name: "Render / Railway", note: "Node.js backend hosting" },
    { name: "MongoDB Atlas", note: "Cloud database with built-in backups" },
    { name: "Firebase Hosting", note: "Alternative static site deployments" },
    { name: "ImgBB", note: "Fast image hosting for portfolio assets" }
  ]
};

export default function Uses() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <Seo
        title="Uses — Farid Hossen Rehad's Dev Toolkit"
        description="The software, frameworks, and services Md. Farid Hossen Rehad (Farid) uses daily for full-stack development and AI/ML work."
        path="/uses"
      />
      <SectionReveal>
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Uses</p>
        <h1 className="mt-4 text-5xl font-black md:text-7xl">Tools I reach for when building.</h1>
        <p className="mt-5 max-w-2xl text-lg text-(--text-muted)">
          An honest list of the software, services, and gear that power my daily development workflow.
        </p>
      </SectionReveal>

      <div className="mt-14 space-y-12">
        {Object.entries(uses).map(([category, items]) => (
          <SectionReveal key={category}>
            <h2 className="mb-5 text-2xl font-bold">{category}</h2>
            <div className="grid gap-3">
              {items.map(({ name, note }) => (
                <div key={name} className="glass flex items-start gap-4 rounded-lg px-5 py-4">
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                  <div>
                    <p className="font-semibold text-(--text)">{name}</p>
                    <p className="mt-0.5 text-sm text-(--text-muted)">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
