import { ArrowLeft } from "lucide-react";
import { iconFor } from "../lib/icons.js";
import { formatDate, renderMarkdown } from "../lib/markdown.jsx";
import Reveal from "../components/Reveal.jsx";

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
      <Reveal className="arc-footer-line mt-14 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
    </main>
  );
}
