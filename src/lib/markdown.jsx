/* ==================================================================
 *  Content helpers: frontmatter parsing + a tiny Markdown renderer.
 *  No dependencies — the renderer covers the common subset (headings,
 *  emphasis, links, code, lists, quotes) that blog posts actually use.
 * ================================================================== */

/* split a raw .md string into { data, body } */
export function parseFrontmatter(raw) {
  const data = {};
  let body = raw;
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (m) {
    body = m[2];
    m[1].split(/\r?\n/).forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (key) data[key] = val;
    });
  }
  return { data, body: body.trim() };
}

/* estimate reading time from word count (~200 wpm) */
export function estimateRead(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)) + " min read";
}

/* "./posts/my-post.md" -> "my-post" */
export function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

/* "#FF3F5C, #5B3BF0" -> ["#FF3F5C", "#5B3BF0"] */
export function parseColors(str) {
  const parts = String(str || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 2) return [parts[0], parts[1]];
  if (parts.length === 1) return [parts[0], parts[0]];
  return ["#FF3F5C", "#5B3BF0"];
}

/* "2026-05-18" -> "18 May 2026" */
export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* resolve an asset path: full URLs and data URIs are used as-is;
   anything else is treated as a file in /public and prefixed with the
   site's base URL so it works on GitHub Pages project pages. */
export function resolveAsset(src) {
  if (!src) return src;
  if (/^(https?:|data:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL || "/";
  return base + src.replace(/^\//, "");
}

/* inline spans: `code`, **bold**, *italic*, _italic_, ![img](src), [link](url) */
export function renderInline(text, kp) {
  const out = [];
  let rest = text;
  let k = 0;
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(_[^_]+_)|(!\[[^\]]*\]\([^)]+\))|(\[[^\]]+\]\([^)]+\))/;
  while (rest.length) {
    const m = rest.match(re);
    if (!m) {
      out.push(rest);
      break;
    }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const t = m[0];
    if (t.startsWith("`")) {
      out.push(<code key={kp + k} className="arc-md-code">{t.slice(1, -1)}</code>);
    } else if (t.startsWith("**")) {
      out.push(<strong key={kp + k}>{t.slice(2, -2)}</strong>);
    } else if (t.startsWith("*") || t.startsWith("_")) {
      out.push(<em key={kp + k}>{t.slice(1, -1)}</em>);
    } else if (t.startsWith("![")) {
      const im = t.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      out.push(
        <img
          key={kp + k}
          src={resolveAsset(im[2])}
          alt={im[1]}
          className="arc-md-img"
          loading="lazy"
        />
      );
    } else {
      const lm = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const external = /^https?:\/\//.test(lm[2]);
      out.push(
        <a
          key={kp + k}
          href={lm[2]}
          className="arc-md-link"
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          {lm[1]}
        </a>
      );
    }
    rest = rest.slice(m.index + t.length);
    k++;
  }
  return out;
}

/* Renders any plain string with inline Markdown — links, bold, italic,
   code. Use it for text coming from data.js:  <Rich text={item.role} /> */
export function Rich({ text }) {
  return renderInline(String(text ?? ""), "r");
}

/* block-level parser -> array of React elements */
export function renderMarkdown(md) {
  const lines = String(md).replace(/\r\n/g, "\n").split("\n");
  const tags = ["h2", "h3", "h4", "h5"];
  const hClass = ["arc-md-h1", "arc-md-h2", "arc-md-h3", "arc-md-h4"];
  const blocks = [];
  let i = 0;
  let key = 0;
  const isSpecial = (l) =>
    /^(#{1,4})\s/.test(l) ||
    l.trim().startsWith("```") ||
    l.trim().startsWith(">") ||
    /^\s*[-*+]\s+/.test(l) ||
    /^\s*\d+\.\s+/.test(l) ||
    /^!\[[^\]]*\]\([^)]+\)$/.test(l.trim());

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) buf.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key++} className="arc-md-pre">
          <code>{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const Tag = tags[lvl - 1];
      blocks.push(
        <Tag key={key++} className={hClass[lvl - 1]}>
          {renderInline(h[2], "h" + key)}
        </Tag>
      );
      i++;
      continue;
    }
    const img = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (img) {
      blocks.push(
        <figure key={key++} className="arc-md-figure">
          <img
            src={resolveAsset(img[2])}
            alt={img[1]}
            className="arc-md-img"
            loading="lazy"
          />
        </figure>
      );
      i++;
      continue;
    }
    if (/^(\*\*\*|---|___)\s*$/.test(line.trim())) {
      blocks.push(<hr key={key++} className="arc-md-hr" />);
      i++;
      continue;
    }
    if (line.trim().startsWith(">")) {
      const buf = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        buf.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(
        <blockquote key={key++} className="arc-md-quote">
          {renderInline(buf.join(" "), "q" + key)}
        </blockquote>
      );
      continue;
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i]))
        items.push(lines[i++].replace(/^\s*[-*+]\s+/, ""));
      blocks.push(
        <ul key={key++} className="arc-md-ul">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, "u" + key + "-" + idx)}</li>
          ))}
        </ul>
      );
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i]))
        items.push(lines[i++].replace(/^\s*\d+\.\s+/, ""));
      blocks.push(
        <ol key={key++} className="arc-md-ol">
          {items.map((it, idx) => (
            <li key={idx}>{renderInline(it, "o" + key + "-" + idx)}</li>
          ))}
        </ol>
      );
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }

    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !isSpecial(lines[i]))
      buf.push(lines[i++]);
    blocks.push(
      <p key={key++} className="arc-md-p">
        {renderInline(buf.join(" "), "p" + key)}
      </p>
    );
  }
  return blocks;
}
