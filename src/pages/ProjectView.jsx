import { ArrowLeft, Shuffle } from "lucide-react";
import { formatDate, renderMarkdown } from "../lib/markdown.jsx";
import { projects } from "../content.js";
import Reveal from "../components/Reveal.jsx";
import PrevNext from "../components/PrevNext.jsx";
import ProjectWindow from "../components/ProjectWindow.jsx";

/* jump to a random project other than the current one */
function goToRandomProject(currentSlug) {
  const others = projects.filter((p) => p.slug !== currentSlug);
  if (others.length === 0) return;
  const next = others[Math.floor(Math.random() * others.length)];
  window.location.hash = "#/project/" + encodeURIComponent(next.slug);
}

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
      <Reveal>
        <PrevNext items={projects} currentSlug={project.slug} kind="project" />
      </Reveal>
      <Reveal className="arc-footer-line mt-14 flex items-center justify-between gap-4 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
        {projects.length > 1 && (
          <button
            type="button"
            className="arc-shuffle"
            onClick={() => goToRandomProject(project.slug)}
          >
            <Shuffle size={15} strokeWidth={2.5} /> Random project
          </button>
        )}
      </Reveal>
    </main>
  );
}
