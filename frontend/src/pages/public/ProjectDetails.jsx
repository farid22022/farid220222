import { ExternalLink, GitBranch } from "lucide-react";
import { useParams } from "react-router-dom";
import AppImage from "../../components/common/AppImage";
import ContentGallery from "../../components/common/ContentGallery";
import CustomFieldsDisplay from "../../components/common/CustomFieldsDisplay";
import ErrorState from "../../components/common/ErrorState";
import Loader from "../../components/common/Loader";
import Seo from "../../components/common/Seo";
import { useContentBySlug } from "../../hooks/useContent";

function hasItems(value) {
  return Array.isArray(value) && value.length > 0;
}

function ProjectLink({ href, label, icon: Icon = ExternalLink }) {
  if (!href) return null;
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full border border-(--border) px-4 py-2 text-sm text-(--text-muted)">
      {label} <Icon className="h-4 w-4" />
    </a>
  );
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const { data: project, isLoading, isError, refetch } = useContentBySlug("projects", slug);

  if (isLoading) return <Loader label="Loading project" />;
  if (isError) return <div className="mx-auto max-w-3xl px-4 py-24"><ErrorState onRetry={refetch} /></div>;
  if (!project) return null;

  return (
    <article className="mx-auto max-w-5xl px-4 py-24">
      <Seo
        title={`${project.title} — Farid Hossen Rehad`}
        description={project.shortDescription || project.description || `${project.title}, a project by Md. Farid Hossen Rehad (Farid).`}
        path={`/projects/${project.slug}`}
        image={project.image}
        type="article"
      />
      <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">
        {project.category} {project.projectType ? `/ ${project.projectType}` : ""}
      </p>
      <h1 className="mt-4 text-5xl font-black md:text-7xl">{project.title}</h1>
      <p className="mt-6 text-lg leading-8 text-(--text-muted)">{project.description}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {project.aiDomain ? <span className="rounded-full border border-(--accent)/30 bg-(--accent)/10 px-3 py-1 text-sm text-(--text-muted)">{project.aiDomain}</span> : null}
        {project.technologies?.map((tech) => <span key={tech} className="rounded-full border border-(--border) px-3 py-1 text-sm text-(--text-muted)">{tech}</span>)}
      </div>
      {project.image ? <AppImage src={project.image} alt={project.title} wrapperClassName="mt-10 w-full rounded-lg border border-(--border)" className="h-full w-full object-cover" eager /> : null}
      <ContentGallery images={project.gallery} title="Project gallery" />
      {(project.problemStatement || hasItems(project.keyFeatures) || hasItems(project.mlTechniques) || hasItems(project.modelArchitectures) || project.metrics) ? (
        <section className="glass mt-10 rounded-lg p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-(--text-muted)">AI / ML details</p>
          {project.problemStatement ? (
            <div className="mt-5">
              <h2 className="text-xl font-semibold">Problem statement</h2>
              <p className="mt-3 leading-7 text-(--text-muted)">{project.problemStatement}</p>
            </div>
          ) : null}
          <div className="mt-6 grid gap-4">
            {hasItems(project.keyFeatures) ? <InfoList title="Key features" items={project.keyFeatures} /> : null}
            {hasItems(project.mlTechniques) ? <InfoList title="ML techniques" items={project.mlTechniques} /> : null}
            {hasItems(project.modelArchitectures) ? <InfoList title="Model architectures" items={project.modelArchitectures} /> : null}
            {(project.datasetName || project.accuracy) ? (
              <div className="rounded-lg border border-(--border) p-4">
                <h3 className="font-semibold">Results</h3>
                {project.datasetName ? <p className="mt-3 text-sm text-(--text-muted)">Dataset: {project.datasetName}</p> : null}
                {project.accuracy ? <p className="mt-2 text-sm text-(--text-muted)">Score: {project.accuracy}</p> : null}
              </div>
            ) : null}
          </div>
          {project.metrics ? <p className="mt-5 leading-7 text-(--text-muted)">{project.metrics}</p> : null}
        </section>
      ) : null}
      <CustomFieldsDisplay fields={project.customFields} />
      <div className="mt-8 flex flex-wrap gap-3">
        {project.liveUrl ? <a href={project.liveUrl} className="inline-flex items-center gap-2 rounded-full bg-(--text) px-4 py-2 text-sm font-semibold text-(--background)">Live <ExternalLink className="h-4 w-4" /></a> : null}
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
    <div className="rounded-lg border border-(--border) p-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-(--card) px-3 py-1 text-sm text-(--text-muted)">{item}</span>
        ))}
      </div>
    </div>
  );
}
