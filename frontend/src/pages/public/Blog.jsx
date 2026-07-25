import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Search, X } from "lucide-react";
import AppImage from "../../components/common/AppImage";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { useContentList } from "../../hooks/useContent";

const ALL = "All";

function readTime(content) {
  if (!content) return "2 min";
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function Blog() {
  const { data: blogs = [], isLoading, isError, refetch } = useContentList("blogs");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const categories = useMemo(() => {
    const cats = blogs.map((b) => b.category).filter(Boolean);
    return [ALL, ...Array.from(new Set(cats))];
  }, [blogs]);

  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = activeCategory === ALL || b.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [blogs, search, activeCategory]);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <Seo
        title="Blog — Farid Hossen Rehad's Engineering & AI Notes"
        description="Engineering notes, AI/ML experiments, and full-stack development write-ups by Md. Farid Hossen Rehad (Farid)."
        path="/blog"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Blog</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Engineering notes and AI experiments.</h1>

      {/* Filters */}
      {!isLoading && !isError && blogs.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts or tags…"
              className="contact-input w-full pl-9 pr-8"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text)">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
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

      {isLoading ? <LoadingSkeleton className="mt-10" /> : null}
      {isError ? <div className="mt-10"><ErrorState onRetry={refetch} /></div> : null}
      {!isLoading && !isError && blogs.length === 0 ? <div className="mt-10"><EmptyState /></div> : null}
      {!isLoading && !isError && filtered.length === 0 && blogs.length > 0 ? (
        <div className="mt-16 text-center">
          <p className="text-(--text-muted)">No posts match your filters.</p>
          <button onClick={() => { setSearch(""); setActiveCategory(ALL); }} className="mt-3 text-sm text-(--accent) underline">
            Clear filters
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && filtered.length > 0 ? (
        <>
          <p className="mt-6 text-sm text-(--text-muted)">{filtered.length} post{filtered.length !== 1 ? "s" : ""}</p>
          <div className="mt-4 grid gap-5">
            {filtered.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog.slug}`} className="glass group flex flex-col overflow-hidden rounded-lg motion-card">
                {blog.coverImage && (
                  <AppImage
                    src={blog.coverImage}
                    alt={blog.title}
                    wrapperClassName="aspect-[16/9] bg-(--card) shrink-0"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    {blog.category && (
                      <span className="rounded-full bg-(--accent)/12 px-2.5 py-0.5 text-xs font-medium text-(--accent)">
                        {blog.category}
                      </span>
                    )}
                    <span className="ml-auto flex items-center gap-1 text-xs text-(--text-muted)">
                      <Clock className="h-3 w-3" />
                      {readTime(blog.content)}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold leading-snug">{blog.title}</h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-(--text-muted)">{blog.excerpt}</p>
                  {blog.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded border border-(--border) bg-(--card) px-2 py-0.5 text-[11px] text-(--text-muted)">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </SectionReveal>
  );
}
