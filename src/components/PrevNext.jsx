import { ArrowLeft, ArrowRight } from "lucide-react";

/* Prev / next links for a date-sorted list (newest first).
   `prev` is the newer entry, `next` is the older one — i.e. it walks
   the list in display order. Renders nothing if there is only one entry. */
export default function PrevNext({ items, currentSlug, kind }) {
  const idx = items.findIndex((x) => x.slug === currentSlug);
  if (idx === -1) return null;

  const prev = idx > 0 ? items[idx - 1] : null;
  const next = idx < items.length - 1 ? items[idx + 1] : null;
  if (!prev && !next) return null;

  const href = (slug) => "#/" + kind + "/" + encodeURIComponent(slug);

  return (
    <nav className="arc-pn">
      {prev ? (
        <a href={href(prev.slug)} className="arc-pn-link arc-pn-prev">
          <span className="arc-pn-label">
            <ArrowLeft size={13} strokeWidth={2.5} /> Previous
          </span>
          <span className="arc-pn-title">{prev.title}</span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a href={href(next.slug)} className="arc-pn-link arc-pn-next">
          <span className="arc-pn-label">
            Next <ArrowRight size={13} strokeWidth={2.5} />
          </span>
          <span className="arc-pn-title">{next.title}</span>
        </a>
      ) : (
        <span />
      )}
    </nav>
  );
}
