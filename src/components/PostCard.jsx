import { ArrowUpRight } from "lucide-react";
import { iconFor } from "../lib/icons.js";

/* A single post row — used on the home page and the posts index. */
export default function PostCard({ post, tint }) {
  const Icon = iconFor(post.icon);
  return (
    <a
      href={"#/post/" + encodeURIComponent(post.slug)}
      className="arc-card flex items-start gap-4 px-4 py-4 sm:px-5"
    >
      <div className="arc-iconbox h-10 w-10">
        <Icon size={18} strokeWidth={2} style={{ color: tint }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold leading-snug sm:text-base">
            {post.title}
          </h3>
          <span className="arc-mono shrink-0 text-xs" style={{ color: "var(--faint)" }}>
            {post.read}
          </span>
        </div>
        <p className="mt-1 truncate text-xs sm:text-sm" style={{ color: "var(--muted)" }}>
          {post.description}
        </p>
      </div>
      <ArrowUpRight className="arc-post-arrow" size={18} strokeWidth={2.25} />
    </a>
  );
}
