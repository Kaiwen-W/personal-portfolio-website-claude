import { ArrowLeft } from "lucide-react";
import { formatDate, renderMarkdown } from "../lib/markdown.jsx";
import Reveal from "../components/Reveal.jsx";
import ProjectWindow from "../components/ProjectWindow.jsx";

export default function ProjectView({ project }) {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
      <Reveal delay={70}>
        <span className="arc-mono mt-8 block text-xs" style={{ color: "var(--faint)" }}>
          {project.tag}
          {project.date ? "  ·  " + formatDate(project.date) : ""}
        </span>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="arc-display mt-3 text-3xl font-extrabold sm:text-4xl">
          {project.title}
        </h1>
      </Reveal>
      {project.description && (
        <Reveal delay={170}>
          <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
        </Reveal>
      )}
      <Reveal delay={220}>
        <ProjectWindow project={project} className="mt-7" />
      </Reveal>
      <Reveal delay={270}>
        <div className="mt-9">{renderMarkdown(project.body)}</div>
      </Reveal>
      <Reveal className="arc-footer-line mt-14 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
    </main>
  );
}
