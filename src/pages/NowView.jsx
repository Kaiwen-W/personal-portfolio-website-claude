import { ArrowLeft } from "lucide-react";
import { now } from "../content.js";
import { formatDate, renderMarkdown } from "../lib/markdown.jsx";
import Reveal from "../components/Reveal.jsx";

/* The /now page — a single editable Markdown file (src/now.md)
   describing what you're currently focused on. */
export default function NowView() {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
      <Reveal delay={70}>
        <h1 className="arc-display mt-8 text-3xl font-extrabold sm:text-4xl">
          Now
        </h1>
      </Reveal>
      {now.updated && (
        <Reveal delay={120}>
          <p className="arc-mono mt-2 text-xs" style={{ color: "var(--faint)" }}>
            Last updated {formatDate(now.updated)}
          </p>
        </Reveal>
      )}
      <Reveal delay={170}>
        <div className="mt-8">{renderMarkdown(now.body)}</div>
      </Reveal>
      <Reveal className="arc-footer-line mt-14 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
    </main>
  );
}
