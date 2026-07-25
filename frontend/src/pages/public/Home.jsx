import { useQueries } from "@tanstack/react-query";
import api from "../../api/axiosInstance";
import ErrorState from "../../components/common/ErrorState";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import Seo from "../../components/common/Seo";
import BlogPreview from "../../components/home/BlogPreview";
import CTASection from "../../components/home/CTASection";
import CertificatePreview from "../../components/home/CertificatePreview";
import Hero from "../../components/home/Hero";
import ProjectShowcase from "../../components/home/ProjectShowcase";
import SkillMarquee from "../../components/home/SkillMarquee";

export default function Home() {
  const resources = ["projects", "blogs", "certificates"];
  const results = useQueries({
    queries: resources.map((resource) => ({
      queryKey: [resource, "list", "featured"],
      queryFn: async () => {
        const { data } = await api.get(`/${resource}/featured`);
        return data;
      }
    }))
  });
  const data = Object.fromEntries(resources.map((resource, index) => [resource, results[index].data || []]));
  const loading = results.some((result) => result.isLoading);
  const failed = results.every((result) => result.isError);
  const retry = () => results.forEach((result) => result.refetch());

  return (
    <>
      <Seo
        title="Md. Farid Hossen Rehad — Farid | Full Stack & AI/ML Developer"
        description="Md. Farid Hossen Rehad, known online as Farid, is a full stack developer and AI/ML enthusiast studying CSE at Khulna University, Bangladesh. Explore Farid's projects, blog, and certificates."
        path="/"
      />
      <Hero />
      <SkillMarquee />
      {loading ? <LoadingSkeleton cards={3} className="mx-auto max-w-7xl px-4 py-20" /> : null}
      {failed ? <div className="mx-auto max-w-3xl px-4 py-20"><ErrorState onRetry={retry} /></div> : null}
      {!loading && !failed ? (
        <>
          <ProjectShowcase projects={data.projects} />
          <CertificatePreview certificates={data.certificates} />
          <BlogPreview blogs={data.blogs} />
        </>
      ) : null}
      <CTASection />
    </>
  );
}
