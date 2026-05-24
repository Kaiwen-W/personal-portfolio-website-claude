/* The macOS-style window used as a project preview.

   If the project's frontmatter has an `image:` field, that image fills
   the window body. Otherwise it falls back to the colour gradient.

   Renders as a link when `href` is given; `compact` shrinks the body
   for the home-page grid. */
import { resolveAsset } from "../lib/markdown.jsx";

export default function ProjectWindow({ project, href, className = "", compact = false }) {
  const imageSrc = project.image ? resolveAsset(project.image) : null;

  const bodyClass = "arc-window-body" + (compact ? " arc-window-body-sm" : "");

  const inner = (
    <>
      <div className="arc-window-bar">
        <span className="arc-windot" style={{ background: "#FF3F5C" }} />
        <span className="arc-windot" style={{ background: "#FFA0B4" }} />
        <span className="arc-windot" style={{ background: "#3142F0" }} />
      </div>

      {imageSrc ? (
        <div className={bodyClass}>
          <img
            src={imageSrc}
            alt={project.title}
            className="arc-window-img"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className={bodyClass}
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})`,
          }}
        >
          <div className="arc-dots" />
          <div className="relative px-4 text-center">
            <div className={"arc-display font-bold text-white " + (compact ? "text-xl" : "text-2xl")}>
              {project.title}
            </div>
            {project.tag && (
              <div className="arc-mono mt-1 text-xs" style={{ color: "rgba(255,255,255,0.72)" }}>
                {project.tag}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  const cls = ("arc-window " + className).trim();
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
