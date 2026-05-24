import { ArrowUpRight } from "lucide-react";
import ProjectWindow from "./ProjectWindow.jsx";

/* A single project entry — used on the home page and the projects index. */
export default function ProjectCard({ project }) {
  const href = "#/project/" + encodeURIComponent(project.slug);
  return (
    <>
      <h3 className="arc-display text-lg font-bold">
        <a href={href} className="arc-project-head">
          {project.title}
          <ArrowUpRight className="arc-project-arrow" size={17} strokeWidth={2.5} />
        </a>
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>
      <ProjectWindow project={project} href={href} className="mt-4" compact />
    </>
  );
}
