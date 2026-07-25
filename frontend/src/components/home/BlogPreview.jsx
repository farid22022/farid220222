import { Link } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import SectionReveal from "../common/SectionReveal";

export default function BlogPreview({ blogs = [] }) {
  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Writing</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">Recent blog notes</h2>
      </div>
      {blogs.length === 0 ? (
        <EmptyState title="No featured blogs yet" />
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog.slug}`} className="glass rounded-lg p-5 transition hover:-translate-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-(--text-muted)">{blog.category}</p>
              <h3 className="mt-4 text-xl font-semibold">{blog.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-(--text-muted)">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
