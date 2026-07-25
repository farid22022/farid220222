import { BookOpen, Brain, Code2, FlaskConical, Layers, TrendingUp } from "lucide-react";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";

const areas = [
  {
    icon: Brain,
    title: "Machine Learning Workflows",
    description:
      "Building end-to-end ML pipelines: data ingestion, preprocessing, model training, evaluation, and deployment. Focus on reproducibility and experiment tracking.",
    tags: ["Scikit-learn", "TensorFlow", "MLflow", "Pipelines"]
  },
  {
    icon: Layers,
    title: "Computer Vision with CNNs",
    description:
      "Exploring convolutional architectures for image classification, object detection, and feature extraction. Applying transfer learning to domain-specific datasets.",
    tags: ["CNN", "ResNet", "Transfer Learning", "OpenCV", "Keras"]
  },
  {
    icon: Code2,
    title: "AI-Assisted Web Interfaces",
    description:
      "Integrating ML model outputs into React-based dashboards — prediction displays, confidence visualizations, real-time inference pipelines via REST.",
    tags: ["React", "FastAPI", "REST", "Visualization"]
  },
  {
    icon: FlaskConical,
    title: "NLP & Text Processing",
    description:
      "Experimenting with tokenization, text classification, sentiment analysis, and basic transformer fine-tuning for Bangla and English corpora.",
    tags: ["NLTK", "HuggingFace", "Transformers", "Sentiment"]
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Product Decisions",
    description:
      "Using analytics and model metrics to inform UX choices — A/B testing principles, user behavior analysis, and feature prioritization backed by data.",
    tags: ["Data Analysis", "Pandas", "Matplotlib", "Product"]
  },
  {
    icon: BookOpen,
    title: "Secure Full Stack Architecture",
    description:
      "Research into API security patterns: JWT lifecycle management, rate limiting, CORS, input validation, and deployment hardening for production-grade apps.",
    tags: ["JWT", "CORS", "Node.js", "Express", "Security"]
  }
];

export default function Research() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <Seo
        title="Research — Applied AI & Web Intelligence by Farid Hossen Rehad"
        description="Practical, engineering-first research areas explored by Md. Farid Hossen Rehad (Farid): machine learning workflows, computer vision, NLP, and secure full-stack architecture."
        path="/research"
      />
      <SectionReveal>
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Research</p>
        <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
          Exploring practical AI, learning systems, and applied web intelligence.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-(--text-muted)">
          Areas I actively study, experiment with, and apply to real products.
          Not academic papers — practical, engineering-first explorations.
        </p>
      </SectionReveal>

      <div className="mt-14 grid gap-5">
        {areas.map(({ icon: Icon, title, description, tags }) => (
          <SectionReveal key={title}>
            <div className="glass h-full rounded-lg p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md border border-(--border) bg-(--card)">
                <Icon className="h-5 w-5 text-(--accent)" />
              </div>
              <h2 className="text-lg font-semibold leading-snug">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-(--text-muted)">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="tech-chip text-xs">{tag}</span>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
