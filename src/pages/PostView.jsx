import { ArrowLeft, Shuffle } from "lucide-react";
import { iconFor } from "../lib/icons.js";
import { formatDate, renderMarkdown } from "../lib/markdown.jsx";
import { posts } from "../content.js";
import Reveal from "../components/Reveal.jsx";
import PrevNext from "../components/PrevNext.jsx";

/* jump to a random post other than the current one */
function goToRandomPost(currentSlug) {
  const others = posts.filter((p) => p.slug !== currentSlug);
  if (others.length === 0) return;
  const next = others[Math.floor(Math.random() * others.length)];
  window.location.hash = "#/post/" + encodeURIComponent(next.slug);
}

export default function PostView({ post }) {
  const Icon = iconFor(post.icon);
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
      <Reveal delay={70}>
        <div className="mt-8 flex items-center gap-3">
          <div className="arc-iconbox h-10 w-10">
            <Icon size={18} strokeWidth={2} style={{ color: "#FF3F5C" }} />
          </div>
          <span className="arc-mono text-xs" style={{ color: "var(--faint)" }}>
            {formatDate(post.date)}
            {post.read ? "  ·  " + post.read : ""}
          </span>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="arc-display mt-4 text-3xl font-extrabold sm:text-4xl">
          {post.title}
        </h1>
      </Reveal>
      {post.description && (
        <Reveal delay={170}>
          <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
            {post.description}
          </p>
        </Reveal>
      )}
      <Reveal delay={220}>
        <div className="mt-8">{renderMarkdown(post.body)}</div>
      </Reveal>
      <Reveal>
        <PrevNext items={posts} currentSlug={post.slug} kind="post" />
      </Reveal>
      <Reveal className="arc-footer-line mt-14 flex items-center justify-between gap-4 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
        {posts.length > 1 && (
          <button
            type="button"
            className="arc-shuffle"
            onClick={() => goToRandomPost(post.slug)}
          >
            <Shuffle size={15} strokeWidth={2.5} /> Random post
          </button>
        )}
      </Reveal>
    </main>
  );
}
