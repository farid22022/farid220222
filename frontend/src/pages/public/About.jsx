import { Award, BookOpen, Code2, GraduationCap, MapPin, Sparkles, Target, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../components/common/Seo";
import SectionReveal from "../../components/common/SectionReveal";
import { skillCategories } from "../../data/skills";

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Khulna University",
    period: "2022 – Present",
    description: "Studying CSE Discipline with focus on algorithms, software engineering, and applied AI.",
    icon: GraduationCap
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Science Background",
    period: "Completed 2021",
    description: "Strong foundation in mathematics, physics, and logical reasoning.",
    icon: BookOpen
  }
];

const experience = [
  {
    role: "Full Stack Developer",
    type: "Self-employed / Freelance",
    period: "2023 – Present",
    description: "Building end-to-end web applications with React, Node.js, MongoDB — from UI to deployment. Delivered dashboards, REST APIs, and AI-enabled product prototypes.",
    tags: ["React", "Node.js", "MongoDB", "REST APIs"]
  },
  {
    role: "AI/ML Researcher (Student)",
    type: "Personal Research",
    period: "2023 – Present",
    description: "Exploring CNN-based computer vision, NLP pipelines, and data-driven model experiments. Applying ML findings to practical web product features.",
    tags: ["Python", "TensorFlow", "CNN", "Computer Vision", "Scikit-learn"]
  }
];

const values = [
  { icon: Target, title: "Precision over noise", text: "I focus on what actually matters — clear requirements, thoughtful code, and products that work under pressure." },
  { icon: Sparkles, title: "Curiosity-driven", text: "Always at the intersection of web engineering and AI, learning new frameworks and techniques every week." },
  { icon: Trophy, title: "Competitive mindset", text: "Regular DSA practice on CodeChef, Codeforces, and LeetCode keeps problem-solving instincts sharp." },
  { icon: Code2, title: "Build in public", text: "Sharing projects, writing notes, and contributing to open source whenever possible." }
];


export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-24">
      <Seo
        title="About Farid Hossen Rehad — Full Stack & AI/ML Developer"
        description="Learn more about Md. Farid Hossen Rehad (Farid): CSE student at Khulna University, full stack developer, and AI/ML enthusiast. Education, experience, and the principles behind the work."
        path="/about"
      />
      {/* Header */}
      <SectionReveal>
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">About</p>
        <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">
          I build across the stack and stay at the edge of AI.
        </h1>
        <div className="mt-8 flex flex-col gap-5 text-lg leading-8 text-(--text-muted)">
          <p>
            I'm <span className="font-semibold text-(--text)">Md. Farid Hossen Rehad</span>, a CSE student at Khulna University, Bangladesh.
            I design and ship full-stack web products — from database schema to deployed interface.
          </p>
          <p>
            My work blends practical engineering with curiosity for AI/ML: secure APIs, responsive dashboards,
            data-backed features, and interfaces that feel calm under pressure. I believe good software is built slowly
            and iterated quickly.
          </p>
        </div>

        {/* Quick facts */}
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { icon: MapPin, text: "Khulna, Bangladesh" },
            { icon: GraduationCap, text: "CSE, Khulna University" },
            { icon: Code2, text: "Full Stack + AI/ML" },
            { icon: Award, text: "Open to opportunities" }
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-4 py-2 text-sm text-(--text-muted)">
              <Icon className="h-4 w-4 text-(--accent)" />
              {text}
            </span>
          ))}
        </div>
      </SectionReveal>

      {/* Values */}
      <SectionReveal className="mt-20">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">How I work</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Principles that guide the craft</h2>
        <div className="mt-8 grid gap-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass rounded-lg p-5">
              <Icon className="mb-4 h-6 w-6 text-(--accent)" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-(--text-muted)">{text}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* Skills */}
      <SectionReveal className="mt-20">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Skills</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Technologies I reach for</h2>
        <div className="mt-8 grid gap-5">
          {Object.entries(skillCategories).map(([category, items]) => (
            <div key={category}>
              <p className="mb-3 text-sm font-semibold text-(--text-muted)">{category}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="tech-chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* Education */}
      <SectionReveal className="mt-20">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Education</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Academic background</h2>
        <div className="mt-8 grid gap-4">
          {education.map(({ degree, institution, period, description, icon: Icon }) => (
            <div key={degree} className="glass flex gap-5 rounded-lg p-6">
              <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-(--border) bg-(--card)">
                <Icon className="h-5 w-5 text-(--accent)" />
              </div>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold">{degree}</h3>
                  <span className="rounded-full border border-(--border) px-3 py-0.5 text-xs text-(--text-muted)">{period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-(--accent)">{institution}</p>
                <p className="mt-2 text-sm leading-6 text-(--text-muted)">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* Experience */}
      <SectionReveal className="mt-20">
        <p className="text-sm uppercase tracking-[0.28em] text-(--text-muted)">Experience</p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">What I've been working on</h2>
        <div className="mt-8 space-y-4">
          {experience.map(({ role, type, period, description, tags }) => (
            <div key={role} className="glass rounded-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{role}</h3>
                  <p className="text-sm text-(--accent)">{type}</p>
                </div>
                <span className="rounded-full border border-(--border) px-3 py-0.5 text-xs text-(--text-muted)">{period}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-(--text-muted)">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="tech-chip text-xs">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>

      {/* CTA */}
      <SectionReveal className="mt-20">
        <div className="glass relative overflow-hidden rounded-lg p-8 text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--accent)_20%,transparent),transparent_55%)]" />
          <h2 className="text-3xl font-black">Want to work together?</h2>
          <p className="mx-auto mt-3 max-w-md text-(--text-muted)">I'm open to freelance projects, collaborations, and full-time opportunities.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-(--text) px-6 py-3 text-sm font-semibold text-(--background)">
              Get in touch
            </Link>
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full border border-(--border) px-6 py-3 text-sm font-semibold text-(--text-muted)">
              See my work
            </Link>
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
