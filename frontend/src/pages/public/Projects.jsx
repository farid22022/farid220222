import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import AppImage from "../../components/common/AppImage";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { useContentList } from "../../hooks/useContent";

const ALL = "All";

export default function Projects() {
  const { data: projects = [], isLoading, isError, refetch } = useContentList("projects");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const cats = projects.map((p) => p.category).filter(Boolean);
    return [ALL, ...Array.from(new Set(cats))];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = activeCategory === ALL || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.technologies?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [projects, search, activeCategory]);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <Seo
        title="Projects by Farid Hossen Rehad — Full Stack & AI/ML Work"
        description="Browse full-stack web apps, dashboards, and AI/ML projects built by Md. Farid Hossen Rehad (Farid) — React, Node.js, MongoDB, and applied machine learning."
        path="/projects"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Projects</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Systems, dashboards, and product experiments.</h1>

      {/* Filters */}
      {!isLoading && !isError && projects.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects or tech…"
              className="contact-input w-full pl-9 pr-8"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text)">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "border-(--accent) bg-(--accent)/10 text-(--accent)"
                    : "border-(--border) bg-(--card) text-(--text-muted) hover:text-(--text)"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* States */}
      {isLoading ? <LoadingSkeleton className="mt-10" /> : null}
      {isError ? <div className="mt-10"><ErrorState onRetry={refetch} /></div> : null}
      {!isLoading && !isError && filtered.length === 0 && projects.length > 0 ? (
        <div className="mt-16 text-center">
          <SlidersHorizontal className="mx-auto mb-3 h-8 w-8 text-(--text-muted)" />
          <p className="text-(--text-muted)">No projects match your filters.</p>
          <button onClick={() => { setSearch(""); setActiveCategory(ALL); }} className="mt-3 text-sm text-(--accent) underline">
            Clear filters
          </button>
        </div>
      ) : null}
      {!isLoading && !isError && projects.length === 0 ? <div className="mt-10"><EmptyState /></div> : null}

      {/* Grid */}
      {!isLoading && !isError && filtered.length > 0 ? (
        <>
          <p className="mt-6 text-sm text-(--text-muted)">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</p>
          <div className="mt-4 grid gap-4">
            {filtered.map((project) => (
              <Link key={project._id} to={`/projects/${project.slug}`} className="glass group overflow-hidden rounded-lg motion-card">
                <AppImage
                  src={project.image}
                  alt={project.title}
                  wrapperClassName="aspect-[16/10] bg-(--card)"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">
                      {project.projectType || project.category}
                    </span>
                    {project.featured && (
                      <span className="rounded-full bg-(--accent)/15 px-2 py-0.5 text-[10px] font-semibold text-(--accent)">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-(--text-muted)">{project.shortDescription}</p>
                  {project.technologies?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="rounded border border-(--border) bg-(--card) px-2 py-0.5 text-[11px] text-(--text-muted)">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="rounded border border-(--border) bg-(--card) px-2 py-0.5 text-[11px] text-(--text-muted)">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                  {project.aiDomain ? (
                    <p className="mt-3 text-sm text-(--accent)">{project.aiDomain}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </SectionReveal>
  );
}
