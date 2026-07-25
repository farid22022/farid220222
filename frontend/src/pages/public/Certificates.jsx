import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ExternalLink } from "lucide-react";
import AppImage from "../../components/common/AppImage";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { useContentList } from "../../hooks/useContent";

const ALL = "All";

function formatDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Certificates() {
  const { data: items = [], isLoading, isError, refetch } = useContentList("certificates");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const cats = items.map((c) => c.category).filter(Boolean);
    return [ALL, ...Array.from(new Set(cats))];
  }, [items]);

  const filtered = useMemo(() => {
    return activeCategory === ALL ? items : items.filter((c) => c.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <Seo
        title="Certificates — Farid Hossen Rehad's Learning Journey"
        description="Certifications and learning milestones earned by Md. Farid Hossen Rehad (Farid) across full-stack development and AI/ML."
        path="/certificates"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Certificates</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Learning receipts from the journey.</h1>

      {/* Category filter */}
      {!isLoading && !isError && categories.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
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
      )}

      {isLoading ? <LoadingSkeleton className="mt-10" /> : null}
      {isError ? <div className="mt-10"><ErrorState onRetry={refetch} /></div> : null}
      {!isLoading && !isError && items.length === 0 ? <div className="mt-10"><EmptyState /></div> : null}

      {!isLoading && !isError && filtered.length > 0 ? (
        <>
          <p className="mt-6 text-sm text-(--text-muted)">{filtered.length} certificate{filtered.length !== 1 ? "s" : ""}</p>
          <div className="mt-4 grid gap-4">
            {filtered.map((item) => (
              <Link
                key={item._id}
                to={`/certificates/${item.slug || item._id}`}
                className="glass group flex flex-col overflow-hidden rounded-lg motion-card transition hover:border-(--text-muted)"
              >
                {item.certificateImage ? (
                  <AppImage
                    src={item.certificateImage}
                    alt={item.title}
                    wrapperClassName="aspect-video bg-(--card) shrink-0"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-(--card)">
                    <Award className="h-12 w-12 text-(--text-muted)" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold leading-snug">{item.title}</h2>
                      <p className="mt-1 text-sm text-(--accent)">{item.issuer}</p>
                    </div>
                    {item.category && (
                      <span className="shrink-0 rounded-full border border-(--border) px-2.5 py-0.5 text-[10px] text-(--text-muted)">
                        {item.category}
                      </span>
                    )}
                  </div>
                  {item.issueDate && (
                    <p className="mt-2 text-xs text-(--text-muted)">{formatDate(item.issueDate)}</p>
                  )}
                  {item.skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.skills.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-md border border-(--border) px-2 py-0.5 text-[10px] text-(--text-muted)">
                          {s}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="rounded-md border border-(--border) px-2 py-0.5 text-[10px] text-(--text-muted)">
                          +{item.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-xs text-(--text-muted) transition group-hover:text-(--text)">
                      View details →
                    </span>
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-(--text-muted) transition hover:text-(--text)"
                      >
                        Verify <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </SectionReveal>
  );
}
