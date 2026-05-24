import { ArrowLeft } from "lucide-react";
import { posts, projects } from "../content.js";
import { ICON_TINTS } from "../data.js";
import Reveal from "../components/Reveal.jsx";
import PostCard from "../components/PostCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

/* Archive route — lists every post or project. Reached via #/posts and
   #/projects, and reused for both by switching on `kind`. */
export default function IndexView({ kind }) {
  const isPosts = kind === "post";
  const items = isPosts ? posts : projects;
  const title = isPosts ? "All posts" : "All projects";
  const noun = items.length === 1
    ? (isPosts ? "post" : "project")
    : (isPosts ? "posts" : "projects");

  return (
    <main className="relative z-10 mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
      <Reveal delay={70}>
        <h1 className="arc-display mt-8 text-3xl font-extrabold sm:text-4xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={120}>
        <p className="arc-mono mt-2 text-xs" style={{ color: "var(--faint)" }}>
          {items.length} {noun}
        </p>
      </Reveal>

      {items.length === 0 ? (
        <Reveal delay={170}>
          <p className="mt-10 text-sm" style={{ color: "var(--muted)" }}>
            Nothing here yet — check back soon.
          </p>
        </Reveal>
      ) : isPosts ? (
        <div className="mt-9 flex flex-col gap-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 55}>
              <PostCard post={post} tint={ICON_TINTS[i % ICON_TINTS.length]} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
