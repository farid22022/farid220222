import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import EmptyState from "../../components/common/EmptyState";
import SectionReveal from "../../components/common/SectionReveal";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => { api.get("/blogs").then(({ data }) => setBlogs(data)).catch(() => setBlogs([])); }, []);

  return (
    <SectionReveal className="mx-auto max-w-7xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">Blog</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">Engineering notes and AI experiments.</h1>
      {blogs.length === 0 ? <div className="mt-10"><EmptyState /></div> : (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blogs.map((blog) => (
            <Link key={blog._id} to={`/blog/${blog.slug}`} className="glass rounded-lg p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{blog.category}</p>
              <h2 className="mt-3 text-xl font-semibold">{blog.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/55">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </SectionReveal>
  );
}
