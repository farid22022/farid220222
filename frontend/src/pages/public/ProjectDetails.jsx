import { ExternalLink, GitBranch } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosInstance";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import Loader from "../../components/common/Loader";

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

function ProjectLink({ href, label, icon: Icon = ExternalLink }) {
  if (!href) return null;
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
      {label} <Icon className="h-4 w-4" />
    </a>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${slug}`).then(({ data }) => setProject(data)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading project" />;
  if (!project) return null;

  return (
    <article className="mx-auto max-w-5xl px-4 py-24">
      <p className="text-sm uppercase tracking-[0.28em] text-white/40">
        {project.category} {project.projectType ? `/ ${project.projectType}` : ""}
      </p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">{project.title}</h1>
      <p className="mt-6 text-lg leading-8 text-white/60">{project.description}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {project.aiDomain ? <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-sm text-white/75">{project.aiDomain}</span> : null}
        {project.technologies?.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-sm text-white/60">{tech}</span>)}
      </div>
      {project.image ? <img src={project.image} alt={project.title} className="mt-10 w-full rounded-lg border border-white/10 object-cover" /> : null}
      <ContentGallery images={project.gallery} title="Project gallery" />
      {(project.problemStatement || hasItems(project.keyFeatures) || hasItems(project.mlTechniques) || hasItems(project.modelArchitectures) || project.metrics) ? (
        <section className="glass mt-10 rounded-lg p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-white/40">AI / ML details</p>
          {project.problemStatement ? (
            <div className="mt-5">
              <h2 className="text-xl font-semibold">Problem statement</h2>
              <p className="mt-3 leading-7 text-white/60">{project.problemStatement}</p>
            </div>
          ) : null}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {hasItems(project.keyFeatures) ? <InfoList title="Key features" items={project.keyFeatures} /> : null}
            {hasItems(project.mlTechniques) ? <InfoList title="ML techniques" items={project.mlTechniques} /> : null}
            {hasItems(project.modelArchitectures) ? <InfoList title="Model architectures" items={project.modelArchitectures} /> : null}
            {(project.datasetName || project.accuracy) ? (
              <div className="rounded-lg border border-white/10 p-4">
                <h3 className="font-semibold">Results</h3>
                {project.datasetName ? <p className="mt-3 text-sm text-white/58">Dataset: {project.datasetName}</p> : null}
                {project.accuracy ? <p className="mt-2 text-sm text-white/58">Score: {project.accuracy}</p> : null}
              </div>
            ) : null}
          </div>
          {project.metrics ? <p className="mt-5 leading-7 text-white/60">{project.metrics}</p> : null}
        </section>
      ) : null}
      <CustomFieldsDisplay fields={project.customFields} />
      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl ? <a href={project.liveUrl} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Live <ExternalLink className="h-4 w-4" /></a> : null}
        <ProjectLink href={project.githubUrl} label="Code" icon={GitBranch} />
        <ProjectLink href={project.datasetUrl} label="Dataset" />
        <ProjectLink href={project.notebookUrl} label="Notebook" />
        <ProjectLink href={project.modelUrl} label="Model" />
        <ProjectLink href={project.paperUrl} label="Paper" />
        <ProjectLink href={project.demoVideoUrl} label="Demo video" />
      </div>
    </article>
  );
}

function InfoList({ title, items }) {
  return (
    <div className="rounded-lg border border-white/10 p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white/[0.05] px-3 py-1 text-sm text-white/60">{item}</span>
        ))}
      </div>
    </div>
  );
}
