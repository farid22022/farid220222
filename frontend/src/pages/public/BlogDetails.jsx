import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Tag, Share2, ExternalLink, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AppImage from "../../components/common/AppImage";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Seo from "../../components/common/Seo";
import { useContentBySlug } from "../../hooks/useContent";
import api from "../../api/axiosInstance";

function readTime(content) {
  if (!content) return "2 min read";
  const text = content.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="reading-progress" style={{ width: `${progress}%` }} />;
}

function ShareBar({ title }) {
  const url = window.location.href;
  const enc = encodeURIComponent;
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-(--border) bg-(--card) px-3 py-2 text-xs text-(--text-muted) transition hover:text-(--text)"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        X / Twitter
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${enc(url)}&title=${enc(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-(--border) bg-(--card) px-3 py-2 text-xs text-(--text-muted) transition hover:text-(--text)"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        LinkedIn
      </a>
      <button
        type="button"
        onClick={() => { navigator.clipboard.writeText(url); toast.success("Link copied!"); }}
        className="inline-flex items-center gap-1.5 rounded-lg border border-(--border) bg-(--card) px-3 py-2 text-xs text-(--text-muted) transition hover:text-(--text)"
      >
        <Share2 className="h-3.5 w-3.5" />
        Copy link
      </button>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-(--border) bg-(--background) px-4 py-2.5 text-sm text-(--text) placeholder:text-(--text-muted) focus:outline-none focus:ring-1 focus:ring-(--border)";

function MessageForm({ blogTitle }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    await api.post("/messages", { ...data, context: blogTitle });
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  }

  return (
    <section className="mt-14 rounded-2xl border border-(--border) bg-(--card) p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-(--text)">
          <MessageSquare className="h-5 w-5" />
          Leave a message
        </h2>
        <p className="mt-1 text-sm text-(--text-muted)">
          Have a question or thought about this post? I'd love to hear from you.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Your name"
              className={inputClass}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
              })}
              type="email"
              placeholder="Your email"
              className={inputClass}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div>
          <textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your message…"
            rows={4}
            className={`${inputClass} resize-none`}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start rounded-lg bg-(--text) px-5 py-2.5 text-sm font-semibold text-(--background) transition hover:opacity-85 disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
  );
}

export default function BlogDetails() {
  const { slug } = useParams();
  const { data: blog, isLoading, isError, refetch } = useContentBySlug("blogs", slug);

  if (isLoading) return <Loader label="Loading post" />;
  if (isError) return (
    <div className="mx-auto max-w-3xl px-4 py-24">
      <ErrorState onRetry={refetch} />
    </div>
  );
  if (!blog) return null;

  const date = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <>
      <Seo
        title={`${blog.title} — Farid Hossen Rehad`}
        description={blog.excerpt || `${blog.title}, a blog post by Md. Farid Hossen Rehad (Farid).`}
        path={`/blog/${blog.slug}`}
        image={blog.coverImage}
        type="article"
      />
      <ReadingProgress />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">

        {/* Back navigation */}
        <Link
          to="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-(--text)"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-8 max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {blog.category && (
              <span className="rounded-full border border-(--border) bg-(--card) px-3 py-1 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
                {blog.category}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
              <Clock className="h-3.5 w-3.5" />
              {readTime(blog.content)}
            </span>
            {date && (
              <span className="flex items-center gap-1.5 text-xs text-(--text-muted)">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-tight text-(--text) md:text-5xl lg:text-[3.5rem]">
            {blog.title}
          </h1>
          {blog.excerpt && (
            <p className="mt-4 text-lg leading-8 text-(--text-muted) sm:text-xl">{blog.excerpt}</p>
          )}
        </header>

        {/* Cover image — full width */}
        {blog.coverImage && (
          <div className="mb-10 overflow-hidden rounded-2xl border border-(--border)">
            <AppImage
              src={blog.coverImage}
              alt={blog.title}
              wrapperClassName="aspect-video w-full"
              className="h-full w-full object-cover"
              eager
            />
          </div>
        )}

        {/* Single-column layout */}
        <div className="flex flex-col gap-12">

          {/* ── Main content column ── */}
          <div className="min-w-0">
            {blog.content && (
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            <ContentGallery images={blog.gallery} title="Images" />
            <CustomFieldsDisplay fields={blog.customFields} />
            <MessageForm blogTitle={blog.title} />

            <div className="mt-12 border-t border-(--border) pt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-(--text)"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all posts
              </Link>
            </div>
          </div>

          {/* ── Post meta ── */}
          <aside>
            <div className="space-y-5">

              {/* About this post */}
              <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">
                  About this post
                </p>
                <dl className="grid gap-3">
                  {date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
                      <span className="text-sm text-(--text)">{date}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-(--text-muted)" />
                    <span className="text-sm text-(--text)">{readTime(blog.content)}</span>
                  </div>
                  {blog.category && (
                    <div className="flex items-start gap-3">
                      <span className="mt-1 h-3 w-3 shrink-0 rounded-full border border-(--border)" />
                      <span className="text-sm text-(--text)">{blog.category}</span>
                    </div>
                  )}
                </dl>
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
                  <p className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">
                    <Tag className="h-3 w-3" />
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-(--border) px-2.5 py-1 text-xs text-(--text-muted)"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="rounded-2xl border border-(--border) bg-(--card) p-5">
                <p className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-(--text-muted)">
                  <Share2 className="h-3 w-3" />
                  Share this post
                </p>
                <ShareBar title={blog.title} />
              </div>

              {/* Back link (sidebar) */}
              <Link
                to="/blog"
                className="flex items-center gap-2 rounded-2xl border border-(--border) bg-(--card) px-5 py-4 text-sm text-(--text-muted) transition hover:text-(--text)"
              >
                <ArrowLeft className="h-4 w-4" />
                All posts
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
