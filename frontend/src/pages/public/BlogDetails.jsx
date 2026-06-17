import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import Loader from "../../components/common/Loader";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${slug}`).then(({ data }) => setBlog(data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading blog" />;
  if (!blog) return null;

  return (
    <article className="mx-auto max-w-4xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">{blog.category}</p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">{blog.title}</h1>
      <p className="mt-6 text-xl leading-8 text-white/60">{blog.excerpt}</p>
      {blog.coverImage ? <img src={blog.coverImage} alt={blog.title} className="mt-10 rounded-lg border border-white/10" /> : null}
      <ContentGallery images={blog.gallery} title="Blog gallery" />
      <div className="prose prose-invert mt-10 max-w-none whitespace-pre-wrap text-white/70">{blog.content}</div>
      <CustomFieldsDisplay fields={blog.customFields} />
    </article>
  );
}
