import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ChevronDown,
  FileText,
  Sparkles,
  Wrench,
  AppWindow,
  Activity,
  ListChecks,
  BookOpen,
  GraduationCap,
  Briefcase,
  Pencil,
  Code,
  Camera,
} from "lucide-react";

/* ==================================================================
 *  EDIT EVERYTHING ABOUT YOU IN THIS BLOCK
 * ==================================================================
 *  Posts are NOT edited here — see the `src/posts/` folder.
 *  Drop a new `.md` file in there and it appears automatically.
 * ================================================================== */
const profile = {
  name: "Alex Rivera",
  subtitle: "Software engineer based in Edinburgh, UK",
  bio: "I build small tools that make everyday things feel a little more delightful — usually somewhere between hardware, interfaces and the people who use them.",
  socials: [
    { label: "Twitter", href: "https://twitter.com/yourhandle", external: true },
    { label: "GitHub", href: "https://github.com/yourhandle", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", external: true },
    { label: "Email", href: "mailto:you@example.com", external: false },
  ],
};

const experience = [
  {
    org: "Lumen Labs",
    role: "Software Engineer",
    period: "Sept 2025",
    details: {
      location: "Edinburgh, UK · Full-time",
      summary:
        "On the platform team, building internal tooling and developer-facing APIs used across the company.",
      highlights: [
        "Shipped a build service that cut average deploy times by ~40%.",
        "Owned the migration to a shared design-system component library.",
        "Mentor incoming interns and run weekly frontend office hours.",
      ],
    },
  },
  {
    org: "Cobalt",
    role: "Software Engineering Intern",
    period: "Summer 2024",
    details: {
      location: "London, UK · Internship",
      summary:
        "Joined the payments squad for a 12-week internship focused on reliability and observability.",
      highlights: [
        "Built an automated reconciliation dashboard adopted by the ops team.",
        "Added end-to-end tests covering the three highest-traffic flows.",
      ],
    },
  },
  {
    org: "Helio",
    role: "Software Engineering Intern",
    period: "Summer 2022",
    details: {
      location: "Remote · Internship",
      summary:
        "First industry internship, working across the mobile app codebase.",
      highlights: [
        "Implemented offline caching for the activity feed.",
        "Closed 30+ issues from the public bug tracker.",
      ],
    },
  },
];

const education = [
  {
    org: "University of Edinburgh",
    role: "BSc (Hons) Computer Science — First Class",
    period: "2021–2025",
    details: {
      location: "Edinburgh, UK",
      summary:
        "Four-year honours degree focused on systems, machine learning and human-computer interaction.",
      highlights: [
        "Dissertation on peer-feedback tooling, later adapted into a paper.",
        "Class representative for two consecutive years.",
        "Coursework: Distributed Systems, Computer Vision, HCI.",
      ],
    },
  },
  {
    org: "KTH Royal Institute of Technology",
    role: "Exchange semester · Computer Science",
    period: "Spring 2024",
    details: {
      location: "Stockholm, Sweden",
      summary:
        "One-semester exchange taking advanced courses not offered at home.",
      highlights: [
        "Studied Embedded Systems and Interaction Design.",
        "Built a capstone project with a four-person international team.",
      ],
    },
  },
];

const leadership = [
  {
    org: "Build Circle",
    role: "Founder & President",
    period: "2023–2025",
    details: {
      location: "University of Edinburgh",
      summary:
        "Founded and ran a society for students working on side projects.",
      highlights: [
        "Grew the community to 120+ active members.",
        "Organised fortnightly demo nights and an end-of-year showcase.",
        "Secured sponsorship covering venue and prize costs.",
      ],
    },
  },
  {
    org: "Hack the Burgh",
    role: "Organising Committee",
    period: "2023–2024",
    details: {
      location: "University of Edinburgh",
      summary: "Helped run one of Scotland's largest student hackathons.",
      highlights: [
        "Led logistics for 300+ attendees across the weekend.",
        "Coordinated mentors and judging over 12 sponsor tracks.",
      ],
    },
  },
  {
    org: "Edinburgh CompSoc",
    role: "Student Mentor",
    period: "2022–2023",
    details: {
      location: "University of Edinburgh",
      summary:
        "Mentored first-year students through the transition into the CS programme.",
      highlights: [
        "Ran weekly drop-in sessions on coursework and tooling.",
        "Paired with 8 mentees across the academic year.",
      ],
    },
  },
];

/* Projects are sourced from src/projects/*.md — see the PROJECTS block below. */

const timelineSections = [
  { num: "01", label: "Experience", accent: "#FF3F5C", items: experience },
  { num: "02", label: "Education", accent: "#3142F0", items: education },
  { num: "03", label: "Leadership", accent: "#5B3BF0", items: leadership },
];

const ICON_TINTS = ["#FF3F5C", "#3142F0", "#5B3BF0", "#FFA0B4"];

/* ==================================================================
 *  POSTS — sourced automatically from `src/posts/*.md`
 * ==================================================================
 *  How to add a post: create a file like `src/posts/my-post.md` with
 *  a frontmatter header, then write the body in Markdown:
 *
 *      ---
 *      title: My Post Title
 *      description: One-line blurb shown in the list
 *      date: 2026-06-01
 *      icon: pencil          (optional — see ICONS below)
 *      read: 4 min read      (optional — auto-estimated if omitted)
 *      ---
 *
 *      # Heading
 *      Body text in **Markdown**...
 *
 *  The link on the home page is generated for you. No code changes.
 * ================================================================== */

const ICONS = {
  filetext: FileText, sparkles: Sparkles, wrench: Wrench, appwindow: AppWindow,
  activity: Activity, listchecks: ListChecks, bookopen: BookOpen,
  graduationcap: GraduationCap, briefcase: Briefcase, pencil: Pencil,
  code: Code, camera: Camera,
};
function iconFor(name) {
  return ICONS[String(name || "").toLowerCase()] || FileText;
}

/* split a raw .md string into frontmatter data + body */
function parseFrontmatter(raw) {
  const data = {};
  let body = raw;
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (m) {
    body = m[2];
    m[1].split(/\r?\n/).forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (key) data[key] = val;
    });
  }
  return { data, body: body.trim() };
}

function estimateRead(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200)) + " min read";
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

/* Vite picks up every .md file in src/posts at build time.
   Wrapped in try/catch so the file still runs in non-Vite previews. */
let rawPosts = {};
try {
  rawPosts = import.meta.glob("./posts/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });
} catch (e) {
  rawPosts = {};
}

const globbedPosts = Object.entries(rawPosts).map(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: data.slug || slugFromPath(path),
    title: data.title || slugFromPath(path),
    description: data.description || "",
    date: data.date || "",
    icon: data.icon || "filetext",
    read: data.read || estimateRead(body),
    body,
  };
});

/* Fallback content — only used in previews that can't read the
   posts folder (e.g. the in-chat artifact). On the real site the
   files in src/posts/ are always used instead. */
const SAMPLE_POSTS = [
  {
    slug: "building-gesture-fan", title: "Building Gesture Fan", icon: "sparkles",
    description: "Project writeup of a fan controlled with computer vision",
    date: "2026-05-18", read: "2 min read",
    body: "Gesture Fan began with a simple annoyance: a fan that blows air at an empty corner of the room while you sit just out of its reach.\n\n## The idea\n\nWhat if the fan could see? Just enough to know roughly where a person is and point itself at them — and skip the remote entirely.\n\n## How it works\n\nThe prototype runs a lightweight pose model on a small camera. From that:\n\n- It tracks the nearest person and rotates to follow them\n- It recognises a few hand gestures for speed control\n- It pairs with a companion app over the local network\n\n## What I learned\n\nHardware is humbling. But there is nothing like the moment a thing you built physically turns to look at you.",
  },
  {
    slug: "what-i-use", title: "What I use", icon: "wrench",
    description: "A list of tools and gear I use and recommend",
    date: "2026-05-10", read: "1 min read",
    body: "People ask what I use often enough that a list felt easier than repeating myself.\n\n## Languages\n\nDay to day it is mostly **TypeScript** and **Python** — Python when a problem is mostly thinking, TypeScript when it is mostly interface.\n\n## Hardware\n\n- A laptop more portable than powerful\n- A mechanical keyboard with quiet switches\n- An e-reader, because screens are tiring\n\n## Principles over tools\n\nKeep the toolchain small, learn it deeply, and do not chase every new thing.",
  },
  {
    slug: "about-this-website", title: "About this website", icon: "appwindow",
    description: "A behind-the-scenes look at how this site was built",
    date: "2026-05-02", read: "1 min read",
    body: "This site is intentionally small. One page, a few sections, a dark background.\n\n## How it is built\n\nA React app styled with Tailwind, built with Vite and hosted on GitHub Pages. Posts — including this one — are just **Markdown files** in a folder. Drop a new file in, and a link appears here automatically.\n\n## The animations\n\nThere is motion, but it stays quiet: sections fade in, cards lift when you point at them, and a soft light follows the cursor.",
  },
];

const posts = (globbedPosts.length ? globbedPosts : SAMPLE_POSTS)
  .slice()
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

/* ==================================================================
 *  PROJECTS — sourced automatically from `src/projects/*.md`
 * ==================================================================
 *  Works exactly like posts: add a `.md` file with frontmatter and it
 *  appears on the home page with its own project page. Frontmatter:
 *
 *      ---
 *      title: My Project
 *      tag: short label shown under the title
 *      description: One-line blurb shown on the home page
 *      date: 2026-06-01
 *      colors: #FF3F5C, #5B3BF0    (the two gradient colours)
 *      ---
 *
 *      # Writeup
 *      Body text in **Markdown**...
 * ================================================================== */

function parseColors(str) {
  const parts = String(str || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) return [parts[0], parts[1]];
  if (parts.length === 1) return [parts[0], parts[0]];
  return ["#FF3F5C", "#5B3BF0"];
}

let rawProjects = {};
try {
  rawProjects = import.meta.glob("./projects/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  });
} catch (e) {
  rawProjects = {};
}

const globbedProjects = Object.entries(rawProjects).map(([path, raw]) => {
  const { data, body } = parseFrontmatter(raw);
  return {
    slug: data.slug || slugFromPath(path),
    title: data.title || slugFromPath(path),
    tag: data.tag || "",
    description: data.description || "",
    colors: parseColors(data.colors),
    date: data.date || "",
    body,
  };
});

const SAMPLE_PROJECTS = [
  {
    slug: "pulse", title: "Pulse", tag: "engagement platform",
    description: "A platform to increase lecture engagement through real-time audience reactions and data visualization. Trialled in live lectures alongside university staff.",
    colors: ["#FF3F5C", "#5B3BF0"], date: "2026-04-20",
    body: "Pulse started from a quiet observation in a packed lecture hall: a room of three hundred people, and almost no way for the person at the front to tell whether any of it was landing.\n\n## The problem\n\nLectures are broadcast-only by default. A lecturer can ask for questions and read a wall of silence — but silence is not data.\n\n## What it does\n\nPulse gives the room a lightweight back-channel. Students tap reactions on their phones and the lecturer sees the mood of the room update live.\n\n- Anonymous reactions, so quieter students still speak up\n- A live timeline a lecturer can review after class\n- Simple enough to learn in thirty seconds\n\n## Outcome\n\nWe trialled Pulse across several real lectures. The most common feedback was that, for the first time, the lecturer felt like they could see the room.",
  },
  {
    slug: "build-circle", title: "Build Circle", tag: "student community",
    description: "Founded a student society gathering the most proactive builders on campus to hold regular meetups and share updates on personal projects.",
    colors: ["#3142F0", "#FF3F5C"], date: "2026-03-15",
    body: "Build Circle is less a piece of software and more a piece of community design — though it has a small site holding it together.\n\n## Why start it\n\nUniversity is full of people quietly building things and almost no structured way for them to find each other.\n\n## How it works\n\n- Fortnightly demo nights where everyone shows progress\n- An end-of-year showcase open to the whole department\n- A members directory and a feed of current work\n\n## What I learned\n\nThe hardest part of a community is not starting it — it is the unglamorous work of keeping a rhythm.",
  },
  {
    slug: "gesture-fan", title: "Gesture Fan", tag: "hardware + vision",
    description: "A smart fan prototype with computer vision. It tracks people and responds to hand gestures, paired with a companion app for remote control and monitoring.",
    colors: ["#5B3BF0", "#FFA0B4"], date: "2026-02-28",
    body: "Gesture Fan is a fan that pays attention. It is the project that taught me the most about working at the seam between hardware and software.\n\n## The concept\n\nA normal fan keeps pointing wherever it pointed last. Gesture Fan watches the room with a small camera and aims itself at people instead.\n\n## Building it\n\n- It finds the nearest person and rotates to follow them\n- It reads a few hand gestures so you can change speed without a remote\n- A companion app exposes finer control over the local network\n\n## The honest part\n\nIt took far longer than expected — physical things fail in physical ways. But a fan that turns to look at you is a small piece of magic.",
  },
];

const projects = (globbedProjects.length ? globbedProjects : SAMPLE_PROJECTS)
  .slice()
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
}

/* ---------- tiny Markdown renderer (no dependencies) ---------- */
function renderInline(text, kp) {
  const out = [];
  let rest = text;
  let k = 0;
  const re = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(_[^_]+_)|(\[[^\]]+\]\([^)]+\))/;
  while (rest.length) {
    const m = rest.match(re);
    if (!m) { out.push(rest); break; }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const t = m[0];
    if (t.startsWith("`")) {
      out.push(<code key={kp + k} className="arc-md-code">{t.slice(1, -1)}</code>);
    } else if (t.startsWith("**")) {
      out.push(<strong key={kp + k}>{t.slice(2, -2)}</strong>);
    } else if (t.startsWith("*") || t.startsWith("_")) {
      out.push(<em key={kp + k}>{t.slice(1, -1)}</em>);
    } else {
      const lm = t.match(/\[([^\]]+)\]\(([^)]+)\)/);
      out.push(
        <a key={kp + k} href={lm[2]} className="arc-md-link" target="_blank" rel="noreferrer">
          {lm[1]}
        </a>
      );
    }
    rest = rest.slice(m.index + t.length);
    k++;
  }
  return out;
}

function renderMarkdown(md) {
  const lines = String(md).replace(/\r\n/g, "\n").split("\n");
  const tags = ["h2", "h3", "h4", "h5"];
  const hClass = ["arc-md-h1", "arc-md-h2", "arc-md-h3", "arc-md-h4"];
  const blocks = [];
  let i = 0, key = 0;
  const isSpecial = (l) =>
    /^(#{1,4})\s/.test(l) || l.trim().startsWith("```") ||
    l.trim().startsWith(">") || /^\s*[-*+]\s+/.test(l) || /^\s*\d+\.\s+/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim().startsWith("```")) {
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) buf.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={key++} className="arc-md-pre"><code>{buf.join("\n")}</code></pre>
      );
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const Tag = tags[lvl - 1];
      blocks.push(
        <Tag key={key++} className={hClass[lvl - 1]}>{renderInline(h[2], "h" + key)}</Tag>
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
          {items.map((it, idx) => <li key={idx}>{renderInline(it, "u" + key + "-" + idx)}</li>)}
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
          {items.map((it, idx) => <li key={idx}>{renderInline(it, "o" + key + "-" + idx)}</li>)}
        </ol>
      );
      continue;
    }
    if (line.trim() === "") { i++; continue; }

    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !isSpecial(lines[i]))
      buf.push(lines[i++]);
    blocks.push(
      <p key={key++} className="arc-md-p">{renderInline(buf.join(" "), "p" + key)}</p>
    );
  }
  return blocks;
}

/* ------------------------------------------------------------------ *
 *  Styles
 * ------------------------------------------------------------------ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root{
  --bg:#08080B; --text:#ECECEF; --muted:#7E7E88; --faint:#56565F;
  --border:rgba(255,255,255,0.075);
  --surface:rgba(255,255,255,0.022); --surface-2:rgba(255,255,255,0.05);
  --coral:#FF3F5C; --pink:#FFA0B4; --blue:#3142F0; --indigo:#5B3BF0;
}
*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
html{scroll-behavior:smooth;overflow-x:clip;}
body{
  background:var(--bg); color:var(--text);
  font-family:'Hanken Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
}
::selection{background:rgba(255,63,92,0.32);color:#fff;}
.arc-display{font-family:'Bricolage Grotesque','Hanken Grotesk',sans-serif;letter-spacing:-0.02em;}
.arc-mono{font-family:'JetBrains Mono',ui-monospace,monospace;}

@keyframes arcDrift1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(70px,-50px) scale(1.18);}}
@keyframes arcDrift2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-60px,55px) scale(1.12);}}
@keyframes arcDrift3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(45px,45px) scale(1.22);}}
@keyframes arcGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}

.arc-blob{position:fixed;border-radius:9999px;filter:blur(110px);pointer-events:none;z-index:0;will-change:transform;}
.arc-noise{
  position:fixed;inset:0;z-index:1;pointer-events:none;opacity:0.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.arc-glow{
  position:fixed;z-index:1;pointer-events:none;width:620px;height:620px;
  margin-left:-310px;margin-top:-310px;border-radius:9999px;
  background:radial-gradient(circle,rgba(255,63,92,0.10) 0%,rgba(49,66,240,0.06) 38%,transparent 72%);
  transition:transform .12s ease-out;
}

.arc-eyebrow{display:flex;align-items:center;gap:11px;margin-bottom:20px;}
.arc-eyebrow-num{font-size:12px;font-weight:600;}
.arc-eyebrow-label{
  font-size:12px;font-weight:600;text-transform:uppercase;
  letter-spacing:0.2em;color:var(--text);
}
.arc-eyebrow-rule{flex:1;height:1px;background:linear-gradient(to right,var(--border),transparent);}

.arc-tl-item{position:relative;padding-left:30px;margin-bottom:15px;}
.arc-tl-item:last-child{margin-bottom:0;}
.arc-tl-item::before{
  content:"";position:absolute;left:6px;top:9px;width:1.5px;
  height:calc(100% + 15px);background:var(--border);
}
.arc-tl-item:last-child::before{display:none;}
.arc-tl-dot{
  position:absolute;left:0;top:3px;width:14px;height:14px;border-radius:9999px;
  background:currentColor;border:3.5px solid var(--bg);
  box-shadow:0 0 0 1.4px currentColor;
  transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease;
}
.arc-tl-item[data-open="true"] .arc-tl-dot,
.arc-tl-item:hover .arc-tl-dot{
  transform:scale(1.2);
  box-shadow:0 0 0 1.4px currentColor,0 0 16px currentColor;
}
.arc-tl-head{
  display:block;width:100%;margin:0;padding:4px 0;
  background:none;border:none;cursor:pointer;
  font:inherit;color:inherit;text-align:left;
  border-radius:8px;transition:background .25s ease;
}
.arc-tl-head:hover{background:rgba(255,255,255,0.018);}
.arc-tl-org{font-size:15px;font-weight:600;color:var(--text);transition:color .25s ease;}
.arc-tl-head:hover .arc-tl-org,
.arc-tl-item[data-open="true"] .arc-tl-org{color:#fff;}
.arc-tl-chev{color:var(--faint);flex-shrink:0;transition:transform .32s cubic-bezier(.2,.7,.2,1),color .25s ease;}
.arc-tl-head:hover .arc-tl-chev{color:var(--muted);}
.arc-tl-period{font-size:11px;color:var(--faint);white-space:nowrap;flex-shrink:0;}
.arc-tl-role{font-size:13px;color:var(--muted);margin-top:2px;line-height:1.5;}

.arc-detail{
  display:grid;grid-template-rows:0fr;
  transition:grid-template-rows .38s cubic-bezier(.2,.7,.2,1);
}
.arc-detail[data-open="true"]{grid-template-rows:1fr;}
.arc-detail-clip{overflow:hidden;}
.arc-detail-pad{
  padding:12px 0 4px;
  opacity:0;transform:translateY(-4px);
  transition:opacity .3s ease .04s,transform .3s ease .04s;
}
.arc-detail[data-open="true"] .arc-detail-pad{opacity:1;transform:translateY(0);}
.arc-detail-meta{font-size:11px;color:var(--faint);margin-bottom:8px;}
.arc-detail-text{font-size:13px;line-height:1.62;color:var(--muted);}
.arc-detail-list{list-style:none;margin:11px 0 2px;padding:0;display:flex;flex-direction:column;gap:7px;}
.arc-detail-list li{display:flex;gap:10px;font-size:13px;line-height:1.5;color:var(--muted);}
.arc-detail-bullet{flex-shrink:0;width:5px;height:5px;border-radius:1.5px;margin-top:6px;background:currentColor;}

.arc-link{
  color:var(--coral);text-decoration:none;display:inline-flex;align-items:center;gap:4px;
  transition:color .25s ease;
}
.arc-link:hover{color:var(--pink);}
.arc-link svg{transition:transform .25s ease;}
.arc-link:hover svg{transform:translate(2px,-2px);}

/* project heading rendered as a title + arrow link */
.arc-project-head{
  display:inline-flex;align-items:flex-start;gap:3px;
  text-decoration:none;color:var(--text);
  transition:color .22s ease;
}
.arc-project-head:hover{color:#fff;}
.arc-project-arrow{
  color:var(--coral);margin-top:3px;flex-shrink:0;
  transition:transform .25s ease,color .25s ease;
}
.arc-project-head:hover .arc-project-arrow{transform:translate(2px,-2px);color:var(--pink);}

.arc-window{
  display:block;text-decoration:none;color:inherit;
  border-radius:16px;overflow:hidden;border:1px solid var(--border);
  background:var(--surface);
  box-shadow:0 20px 52px -22px rgba(0,0,0,0.75);
  transition:transform .45s cubic-bezier(.2,.7,.2,1),border-color .4s ease,box-shadow .4s ease;
}
.arc-window:hover{
  transform:translateY(-4px);border-color:rgba(255,63,92,0.4);
  box-shadow:0 28px 64px -24px rgba(0,0,0,0.85);
}
.arc-window-bar{
  display:flex;align-items:center;gap:7px;padding:12px 15px;
  background:rgba(255,255,255,0.04);border-bottom:1px solid var(--border);
}
.arc-windot{width:11px;height:11px;border-radius:9999px;transition:transform .3s ease;}
.arc-window:hover .arc-windot{transform:scale(1.12);}
.arc-window-body{
  position:relative;height:220px;
  display:flex;align-items:center;justify-content:center;
  background-size:220% 220%;animation:arcGrad 11s ease infinite;
  box-shadow:inset 0 0 90px rgba(0,0,0,0.45);
}
.arc-window-body-sm{height:172px;}
.arc-dots{
  position:absolute;inset:0;opacity:.7;
  background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);
  background-size:24px 24px;
}

.arc-card{
  background:var(--surface);border:1px solid var(--border);border-radius:14px;
  color:inherit;text-decoration:none;
  transition:transform .4s cubic-bezier(.2,.7,.2,1),border-color .4s ease,background .4s ease,box-shadow .4s ease;
}
.arc-card:hover{
  transform:translateY(-3px);border-color:rgba(255,63,92,0.42);background:var(--surface-2);
  box-shadow:0 16px 44px -16px rgba(255,63,92,0.30);
}
.arc-iconbox{
  display:flex;align-items:center;justify-content:center;border-radius:11px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);flex-shrink:0;
  transition:border-color .35s ease,background .35s ease;
}
.arc-card:hover .arc-iconbox{border-color:rgba(255,63,92,0.30);background:rgba(255,63,92,0.07);}
.arc-post-arrow{
  color:var(--faint);flex-shrink:0;align-self:center;
  opacity:0;transform:translateX(-5px);
  transition:opacity .3s ease,transform .3s ease,color .3s ease;
}
.arc-card:hover .arc-post-arrow{opacity:1;transform:translateX(0);color:var(--coral);}

/* post page + markdown */
.arc-back{
  display:inline-flex;align-items:center;gap:6px;
  font-size:13px;font-weight:600;color:var(--muted);text-decoration:none;
  transition:color .25s ease;
}
.arc-back:hover{color:var(--coral);}
.arc-back svg{transition:transform .25s ease;}
.arc-back:hover svg{transform:translateX(-3px);}
.arc-md-p{font-size:15px;line-height:1.78;color:#C9C9D0;margin:0 0 18px;}
.arc-md-h1{font-family:'Bricolage Grotesque',sans-serif;font-size:23px;font-weight:700;letter-spacing:-0.02em;margin:34px 0 13px;color:#fff;}
.arc-md-h2{font-family:'Bricolage Grotesque',sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.01em;margin:30px 0 11px;color:#fff;}
.arc-md-h3{font-size:15px;font-weight:700;margin:24px 0 9px;color:var(--text);}
.arc-md-h4{font-size:14px;font-weight:700;margin:20px 0 8px;color:var(--text);}
.arc-md-ul,.arc-md-ol{margin:0 0 18px;color:#C9C9D0;font-size:15px;line-height:1.7;}
.arc-md-ol{padding-left:20px;}
.arc-md-ul{list-style:none;padding-left:2px;}
.arc-md-ul li{position:relative;padding-left:18px;margin-bottom:7px;}
.arc-md-ol li{margin-bottom:7px;}
.arc-md-ul li::before{content:"";position:absolute;left:0;top:9px;width:5px;height:5px;border-radius:1.5px;background:var(--coral);}
.arc-md-link{color:var(--coral);text-decoration:none;border-bottom:1px solid rgba(255,63,92,0.35);transition:color .2s ease,border-color .2s ease;}
.arc-md-link:hover{color:var(--pink);border-color:var(--pink);}
.arc-md-code{
  font-family:'JetBrains Mono',monospace;font-size:12.5px;
  background:rgba(255,255,255,0.07);border:1px solid var(--border);
  padding:1.5px 6px;border-radius:5px;color:#FFB9C5;
}
.arc-md-pre{
  background:rgba(255,255,255,0.03);border:1px solid var(--border);
  border-radius:12px;padding:16px 18px;overflow-x:auto;margin:0 0 18px;
}
.arc-md-pre code{font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#D7D7DE;line-height:1.65;}
.arc-md-quote{
  border-left:2px solid var(--coral);padding:2px 0 2px 16px;margin:0 0 18px;
  color:var(--muted);font-style:italic;font-size:15px;line-height:1.7;
}
.arc-md-hr{border:none;border-top:1px solid var(--border);margin:28px 0;}

.arc-footer-line{border-top:1px solid var(--border);}

/* sticky side-rail navigation */
.arc-sec{scroll-margin-top:32px;}
.arc-nav{display:flex;flex-direction:column;gap:1px;}
.arc-nav-item{
  position:relative;display:flex;align-items:center;gap:10px;
  padding:8px 0 8px 14px;border-radius:8px;
  text-decoration:none;color:var(--muted);
  font-size:13px;font-weight:600;
  transition:color .2s ease,background .2s ease;
}
.arc-nav-item::before{
  content:"";position:absolute;left:0;top:50%;
  width:2px;height:0;transform:translateY(-50%);
  border-radius:2px;background:var(--coral);
  transition:height .26s cubic-bezier(.2,.7,.2,1);
}
.arc-nav-item:hover{color:var(--text);}
.arc-nav-num{font-size:11px;color:var(--faint);transition:color .2s ease;}
.arc-nav-item[data-active="true"]{color:#fff;}
.arc-nav-item[data-active="true"]::before{height:15px;}
.arc-nav-item[data-active="true"] .arc-nav-num{color:var(--coral);}

@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important;}
}
`;

/* ---------- helpers ---------- */
function Reveal({ children, delay = 0, className = "", dataOpen }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setShown(true); return; }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      data-open={dataOpen}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(22px)",
        transition: `opacity .7s cubic-bezier(.2,.6,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.6,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ num, label, accent }) {
  return (
    <div className="arc-eyebrow">
      <span className="arc-eyebrow-num arc-mono" style={{ color: accent }}>{num}</span>
      <span className="arc-eyebrow-label">{label}</span>
      <span className="arc-eyebrow-rule" />
    </div>
  );
}

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

function TimelineSection({ id, num, label, accent, items, first }) {
  return (
    <section id={id} className={first ? "arc-sec" : "arc-sec mt-16"}>
      <Reveal><Eyebrow num={num} label={label} accent={accent} /></Reveal>
      <div>
        {items.map((it, i) => (
          <TimelineItem key={it.org} item={it} accent={accent} delay={i * 70} />
        ))}
      </div>
    </section>
  );
}

/* the macOS-style project window — used on the home page and post pages */
function ProjectWindow({ project, href, className = "", compact = false }) {
  const inner = (
    <>
      <div className="arc-window-bar">
        <span className="arc-windot" style={{ background: "#FF3F5C" }} />
        <span className="arc-windot" style={{ background: "#FFA0B4" }} />
        <span className="arc-windot" style={{ background: "#3142F0" }} />
      </div>
      <div
        className={"arc-window-body" + (compact ? " arc-window-body-sm" : "")}
        style={{ backgroundImage: `linear-gradient(135deg, ${project.colors[0]}, ${project.colors[1]})` }}
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
    </>
  );
  if (href) {
    return <a href={href} className={("arc-window " + className).trim()}>{inner}</a>;
  }
  return <div className={("arc-window " + className).trim()}>{inner}</div>;
}

/* ---------- the home page ---------- */
/* section list for the rail navigation */
const navItems = [
  { id: "experience", num: "01", label: "Experience" },
  { id: "education", num: "02", label: "Education" },
  { id: "leadership", num: "03", label: "Leadership" },
  { id: "projects", num: "04", label: "Projects" },
  { id: "posts", num: "05", label: "Posts" },
];

function Portfolio() {
  const [active, setActive] = useState("experience");

  /* scrollspy — pick the last section whose top has passed a reference
     line near the top of the viewport. Deterministic at the very top
     and bottom of the page, unlike a middle-band observer. */
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vh = window.innerHeight;
      const line = vh * 0.35;
      let current = navItems[0].id;
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }
      /* a short trailing section can never scroll its top up to the
         reference line on a landscape viewport — so once the last
         section is fully on screen (or the page is scrolled to the
         bottom), it wins. */
      const doc = document.documentElement;
      const last = navItems[navItems.length - 1];
      const lastEl = document.getElementById(last.id);
      const atBottom = vh + window.scrollY >= doc.scrollHeight - 2;
      const scrollable = doc.scrollHeight > vh + 4;
      if (
        scrollable &&
        (atBottom || (lastEl && lastEl.getBoundingClientRect().bottom <= vh))
      ) {
        current = last.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(compute);
      }
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-8">
      <div className="lg:flex lg:gap-14">

        {/* ============ sticky left rail ============ */}
        <aside className="mx-auto max-w-xl pt-14 lg:mx-0 lg:max-w-none lg:w-72 lg:shrink-0 lg:self-start lg:sticky lg:top-0 lg:py-16">
          <Reveal>
            <h1 className="arc-display text-3xl font-extrabold sm:text-4xl">
              {profile.name}
            </h1>
          </Reveal>
          <Reveal delay={70}>
            <p className="mt-2 text-sm font-medium" style={{ color: "var(--muted)" }}>
              {profile.subtitle}
            </p>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {profile.bio}
            </p>
          </Reveal>
          <Reveal delay={190}>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="arc-link"
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer" : undefined}
                >
                  {s.label}
                  {s.external && <ArrowUpRight size={13} strokeWidth={2.5} />}
                </a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={250}>
            <nav className="arc-nav mt-9 hidden lg:flex">
              {navItems.map((n) => (
                <a
                  key={n.id}
                  href={"#" + n.id}
                  className="arc-nav-item"
                  data-active={active === n.id}
                >
                  <span className="arc-nav-num arc-mono">{n.num}</span>
                  {n.label}
                </a>
              ))}
            </nav>
          </Reveal>
        </aside>

        {/* ============ scrolling content ============ */}
        <div className="mx-auto min-w-0 max-w-xl pb-20 pt-10 lg:mx-0 lg:max-w-none lg:flex-1 lg:py-16">

          {/* Experience / Education / Leadership */}
          {timelineSections.map((s, idx) => (
            <TimelineSection
              key={s.label}
              id={s.label.toLowerCase()}
              num={s.num}
              label={s.label}
              accent={s.accent}
              items={s.items}
              first={idx === 0}
            />
          ))}

          {/* Projects — generated from src/projects/*.md */}
          <section id="projects" className="arc-sec mt-16">
            <Reveal><Eyebrow num="04" label="Projects" accent="#FFA0B4" /></Reveal>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
              {projects.map((p, i) => {
                const href = "#/project/" + encodeURIComponent(p.slug);
                return (
                  <Reveal key={p.slug} delay={i * 70}>
                    <h3 className="arc-display text-lg font-bold">
                      <a href={href} className="arc-project-head">
                        {p.title}
                        <ArrowUpRight className="arc-project-arrow" size={17} strokeWidth={2.5} />
                      </a>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {p.description}
                    </p>
                    <ProjectWindow project={p} href={href} className="mt-4" compact />
                  </Reveal>
                );
              })}
            </div>
            <Reveal delay={80} className="mt-12 text-center">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                …and many more projects in the works.
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                In the meantime, browse the full archive of
              </p>
              <div className="mt-3 flex justify-center">
                <a href="#" className="arc-link text-base font-bold">
                  Everything I&rsquo;ve ever Built <ArrowUpRight size={16} strokeWidth={2.5} />
                </a>
              </div>
            </Reveal>
          </section>

          {/* Posts — generated from src/posts/*.md */}
          <section id="posts" className="arc-sec mt-16">
            <Reveal><Eyebrow num="05" label="Posts" accent="#FF3F5C" /></Reveal>
            <div className="flex flex-col gap-3">
              {posts.map((post, i) => {
                const Icon = iconFor(post.icon);
                const tint = ICON_TINTS[i % ICON_TINTS.length];
                return (
                  <Reveal key={post.slug} delay={i * 55}>
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
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* Footer */}
          <Reveal className="arc-footer-line mt-16 pt-8">
            <p className="arc-mono text-xs" style={{ color: "var(--faint)" }}>
              © {new Date().getFullYear()} {profile.name} — built with React &amp; Tailwind CSS
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ---------- a single post page ---------- */
function PostView({ post }) {
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

/* ---------- a single project page ---------- */
function ProjectView({ project }) {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
      <Reveal delay={70}>
        <span className="arc-mono mt-8 block text-xs" style={{ color: "var(--faint)" }}>
          {project.tag}
          {project.date ? "  ·  " + formatDate(project.date) : ""}
        </span>
      </Reveal>
      <Reveal delay={120}>
        <h1 className="arc-display mt-3 text-3xl font-extrabold sm:text-4xl">
          {project.title}
        </h1>
      </Reveal>
      {project.description && (
        <Reveal delay={170}>
          <p className="mt-3 text-base" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
        </Reveal>
      )}
      <Reveal delay={220}>
        <ProjectWindow project={project} className="mt-7" />
      </Reveal>
      <Reveal delay={270}>
        <div className="mt-9">{renderMarkdown(project.body)}</div>
      </Reveal>
      <Reveal className="arc-footer-line mt-14 pt-8">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </Reveal>
    </main>
  );
}

function NotFound() {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-6 py-24 sm:px-8">
      <h1 className="arc-display text-3xl font-extrabold">Post not found</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
        That post doesn&rsquo;t exist — it may have been moved or renamed.
      </p>
      <div className="mt-6">
        <a href="#/" className="arc-back">
          <ArrowLeft size={15} strokeWidth={2.5} /> Back to home
        </a>
      </div>
    </main>
  );
}

/* ---------- routing ---------- */
function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  /* --- cursor-following glow (disabled) ---
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  --- end cursor-following glow --- */

  const postMatch = hash.match(/^#\/post\/(.+)$/);
  const projectMatch = hash.match(/^#\/project\/(.+)$/);
  const routeKey = postMatch
    ? "post:" + postMatch[1]
    : projectMatch
    ? "project:" + projectMatch[1]
    : "home";

  /* jump to the top only when the route itself changes — leaves in-page
     section anchors (#experience, #posts, …) free to scroll normally */
  const prevRoute = useRef(routeKey);
  useEffect(() => {
    if (prevRoute.current !== routeKey) {
      window.scrollTo(0, 0);
      prevRoute.current = routeKey;
    }
  }, [routeKey]);

  let view;
  if (postMatch) {
    const slug = decodeURIComponent(postMatch[1]);
    const post = posts.find((p) => p.slug === slug);
    view = post ? <PostView post={post} /> : <NotFound />;
  } else if (projectMatch) {
    const slug = decodeURIComponent(projectMatch[1]);
    const project = projects.find((p) => p.slug === slug);
    view = project ? <ProjectView project={project} /> : <NotFound />;
  } else {
    view = <Portfolio />;
  }

  return (
    <div className="relative min-h-screen w-full">
      <style>{STYLES}</style>

      <div className="arc-blob" style={{ width: 380, height: 380, top: -130, left: -150, background: "#FF3F5C", opacity: 0.26, animation: "arcDrift1 19s ease-in-out infinite" }} />
      <div className="arc-blob" style={{ width: 440, height: 440, top: "34%", right: -200, background: "#3142F0", opacity: 0.24, animation: "arcDrift2 23s ease-in-out infinite" }} />
      <div className="arc-blob" style={{ width: 360, height: 360, bottom: -150, left: "22%", background: "#5B3BF0", opacity: 0.28, animation: "arcDrift3 21s ease-in-out infinite" }} />
      <div className="arc-noise" />
      {/* <div ref={glowRef} className="arc-glow" /> */}

      {view}
    </div>
  );
}
