import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal.jsx";
import Eyebrow from "./Eyebrow.jsx";

/* a single expandable timeline entry (click to open the details) */
function TimelineItem({ item, accent, delay }) {
  const [open, setOpen] = useState(false);
  const { details } = item;

  return (
    <Reveal className="arc-tl-item" delay={delay} dataOpen={open}>
      <span className="arc-tl-dot" style={{ color: accent }} />

      <button
        type="button"
        className="arc-tl-head"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="flex items-center gap-2">
            <span className="arc-tl-org">{item.org}</span>
            <ChevronDown
              className="arc-tl-chev"
              size={15}
              strokeWidth={2.5}
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            />
          </span>
          <span className="arc-tl-period arc-mono">{item.period}</span>
        </div>
        <p className="arc-tl-role">{item.role}</p>
      </button>

      <div className="arc-detail" data-open={open}>
        <div className="arc-detail-clip">
          <div className="arc-detail-pad">
            <div className="arc-detail-meta arc-mono">{details.location}</div>
            <p className="arc-detail-text">{details.summary}</p>
            <ul className="arc-detail-list">
              {details.highlights.map((h) => (
                <li key={h}>
                  <span className="arc-detail-bullet" style={{ color: accent }} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* one timeline section (Experience / Education / Leadership) */
export default function TimelineSection({ id, num, label, accent, items, first }) {
  return (
    <section id={id} className={first ? "arc-sec" : "arc-sec mt-16"}>
      <Reveal>
        <Eyebrow num={num} label={label} accent={accent} />
      </Reveal>
      <div>
        {items.map((it, i) => (
          <TimelineItem key={it.org} item={it} accent={accent} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}
