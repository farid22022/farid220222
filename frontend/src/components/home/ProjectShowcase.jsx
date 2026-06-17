import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "../common/SectionReveal";
import EmptyState from "../common/EmptyState";

export default function ProjectShowcase({ projects = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-white/40">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Project showcase</h2>
        </div>
        <Link to="/projects" className="text-sm text-white/60">All projects</Link>
      </div>
      {projects.length === 0 ? (
        <EmptyState title="No featured projects yet" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 motion-stagger">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project.slug}`} className="group glass motion-card overflow-hidden rounded-lg">
              <div className="aspect-[16/10] bg-white/[0.04]">
                {project.image ? <img src={project.image} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">{project.projectType || project.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-white/45 transition group-hover:text-white" />
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">{project.shortDescription}</p>
                {project.aiDomain ? <p className="mt-4 text-sm text-[var(--accent)]">{project.aiDomain}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
