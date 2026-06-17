import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import BlogPreview from "../../components/home/BlogPreview";
import CTASection from "../../components/home/CTASection";
import CertificatePreview from "../../components/home/CertificatePreview";
import Hero from "../../components/home/Hero";
import OpenToWorkMarquee from "../../components/home/OpenToWorkMarquee";
import ProblemSolvingStack from "../../components/home/ProblemSolvingStack";
import ProjectShowcase from "../../components/home/ProjectShowcase";
import QuickGlance from "../../components/home/QuickGlance";
import SpaceBento from "../../components/home/SpaceBento";
import SkillMarquee from "../../components/home/SkillMarquee";
import StoryPreview from "../../components/home/StoryPreview";

export default function Home() {
  const [data, setData] = useState({ projects: [], blogs: [], certificates: [], stories: [] });

  useEffect(() => {
    Promise.allSettled([
      api.get("/projects/featured"),
      api.get("/blogs/featured"),
      api.get("/certificates/featured"),
      api.get("/stories/featured")
    ]).then(([projects, blogs, certificates, stories]) => {
      setData({
        projects: projects.value?.data || [],
        blogs: blogs.value?.data || [],
        certificates: certificates.value?.data || [],
        stories: stories.value?.data || []
      });
    });
  }, []);

  return (
    <>
      <Hero />
      <SpaceBento />
      <SkillMarquee />
      <QuickGlance />
      <ProblemSolvingStack />
      <ProjectShowcase projects={data.projects} />
      <BlogPreview blogs={data.blogs} />
      <CertificatePreview certificates={data.certificates} />
      <StoryPreview stories={data.stories} />
      <OpenToWorkMarquee />
      <CTASection />
    </>
  );
}
