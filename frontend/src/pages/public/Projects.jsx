import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import EmptyState from "../../components/common/EmptyState";
import SectionReveal from "../../components/common/SectionReveal";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects").then(({ data }) => setProjects(data)).catch(() => setProjects([]));
  }, []);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Projects</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Systems, dashboards, and product experiments.</h1>
      {projects.length === 0 ? <div className="mt-10"><EmptyState /></div> : (
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project.slug}`} className="glass group overflow-hidden rounded-lg">
              <div className="aspect-[16/10] bg-white/[0.04]">{project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover transition group-hover:scale-105" /> : null}</div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">{project.projectType || project.category}</p>
                <h2 className="mt-3 text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/55">{project.shortDescription}</p>
                {project.aiDomain ? <p className="mt-4 text-sm text-[var(--accent)]">{project.aiDomain}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
