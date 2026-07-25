import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "../common/SectionReveal";
import EmptyState from "../common/EmptyState";
import AppImage from "../common/AppImage";

export default function ProjectShowcase({ projects = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">Project showcase</h2>
        </div>
        <Link to="/projects" className="text-sm text-(--text-muted)">All projects</Link>
      </div>
      {projects.length === 0 ? (
        <EmptyState title="No featured projects yet" />
      ) : (
        <div className="grid gap-4 motion-stagger">
          {projects.map((project) => (
            <Link key={project._id} to={`/projects/${project.slug}`} className="group glass motion-card overflow-hidden rounded-lg">
              <AppImage src={project.image} alt={project.title} wrapperClassName="aspect-[16/10] bg-(--card)" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">{project.projectType || project.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-(--text-muted) transition group-hover:text-(--text)" />
                </div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-(--text-muted)">{project.shortDescription}</p>
                {project.aiDomain ? <p className="mt-4 text-sm text-(--accent)">{project.aiDomain}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
