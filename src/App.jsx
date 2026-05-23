import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Wrench,
  AppWindow,
  Activity,
  ListChecks,
  BookOpen,
  GraduationCap,
  Briefcase,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  EDIT EVERYTHING ABOUT YOU IN THIS BLOCK
 *  Each timeline entry has a `details` object — that is what shows
 *  inside the dropdown when the entry is clicked.
 * ------------------------------------------------------------------ */
const profile = {
  name: "Alex Rivera",
  status: "Open to new-grad roles",
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

const projects = [
  {
    title: "Pulse",
    tag: "engagement platform",
    desc: "A platform to increase lecture engagement through real-time audience reactions and data visualization. Trialled in live lectures alongside university staff.",
    grad: ["#FF3F5C", "#5B3BF0"],
  },
  {
    title: "Build Circle",
    tag: "student community",
    desc: "Founded a student society gathering the most proactive builders on campus to hold regular meetups and share updates on personal projects.",
    grad: ["#3142F0", "#FF3F5C"],
  },
  {
    title: "Gesture Fan",
    tag: "hardware + vision",
    desc: "A smart fan prototype with computer vision. It tracks people and responds to hand gestures, paired with a companion app for remote control and monitoring.",
    grad: ["#5B3BF0", "#FFA0B4"],
  },
];

const posts = [
  { icon: Sparkles, title: "Building Gesture Fan", desc: "Project writeup of a fan controlled with computer vision", read: "3 min read" },
  { icon: Wrench, title: "What I use", desc: "A list of tools and gear I use and recommend", read: "2 min read" },
  { icon: AppWindow, title: "About this website", desc: "A behind-the-scenes look at how this site was built", read: "3 min read" },
  { icon: Activity, title: "Pulse: lessons learned", desc: "A writeup of a tool I built to help lecturers", read: "5 min read" },
  { icon: ListChecks, title: "Bucket List", desc: "A list of things I want to do before I —", read: "1 min read" },
  { icon: BookOpen, title: "Books", desc: "A list of books I've read and recommend", read: "1 min read" },
  { icon: GraduationCap, title: "My dissertation, as a paper", desc: "The story behind my dissertation and how it became a paper", read: "8 min read" },
  { icon: Briefcase, title: "Internships 102", desc: "Things I wish I knew before I started applying", read: "5 min read" },
];

/* the three timeline blocks, in order, each with its own accent */
const timelineSections = [
  { num: "01", label: "Experience", accent: "#FF3F5C", items: experience },
  { num: "02", label: "Education", accent: "#3142F0", items: education },
  { num: "03", label: "Leadership", accent: "#5B3BF0", items: leadership },
];

const ICON_TINTS = ["#FF3F5C", "#3142F0", "#5B3BF0", "#FFA0B4"];

/* ------------------------------------------------------------------ *
 *  Styles — kept inline so this file renders identically whether it is
 *  built by Vite or dropped in as a standalone artifact.
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
html{scroll-behavior:smooth;}
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
@keyframes arcPulse{0%{box-shadow:0 0 0 0 rgba(255,63,92,0.55);}70%{box-shadow:0 0 0 7px rgba(255,63,92,0);}100%{box-shadow:0 0 0 0 rgba(255,63,92,0);}}

/* background atmosphere */
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

/* status pill */
.arc-status{
  display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:9999px;
  border:1px solid var(--border);background:var(--surface);
  font-size:12px;font-weight:500;color:var(--muted);
}
.arc-status-dot{
  width:7px;height:7px;border-radius:9999px;background:var(--coral);
  animation:arcPulse 2.6s ease-out infinite;
}

/* section eyebrow label */
.arc-eyebrow{display:flex;align-items:center;gap:11px;margin-bottom:20px;}
.arc-eyebrow-num{font-size:12px;font-weight:600;}
.arc-eyebrow-label{
  font-size:12px;font-weight:600;text-transform:uppercase;
  letter-spacing:0.2em;color:var(--text);
}
.arc-eyebrow-rule{flex:1;height:1px;background:linear-gradient(to right,var(--border),transparent);}

/* timeline */
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

/* clickable header */
.arc-tl-head{
  display:block;width:100%;margin:0;padding:4px 0;
  background:none;border:none;cursor:pointer;
  font:inherit;color:inherit;text-align:left;
  border-radius:8px;transition:background .25s ease;
}
.arc-tl-head:hover{background:rgba(255,255,255,0.018);}
.arc-tl-org{
  font-size:15px;font-weight:600;color:var(--text);transition:color .25s ease;
}
.arc-tl-head:hover .arc-tl-org,
.arc-tl-item[data-open="true"] .arc-tl-org{color:#fff;}
.arc-tl-chev{color:var(--faint);flex-shrink:0;transition:transform .32s cubic-bezier(.2,.7,.2,1),color .25s ease;}
.arc-tl-head:hover .arc-tl-chev{color:var(--muted);}
.arc-tl-period{font-size:11px;color:var(--faint);white-space:nowrap;flex-shrink:0;}
.arc-tl-role{font-size:13px;color:var(--muted);margin-top:2px;line-height:1.5;}

/* dropdown detail panel — grid 0fr/1fr animates to natural height */
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
.arc-detail-list{
  list-style:none;margin:11px 0 2px;padding:0;
  display:flex;flex-direction:column;gap:7px;
}
.arc-detail-list li{
  display:flex;gap:10px;font-size:13px;line-height:1.5;color:var(--muted);
}
.arc-detail-bullet{
  flex-shrink:0;width:5px;height:5px;border-radius:1.5px;margin-top:6px;
  background:currentColor;
}

/* links */
.arc-link{
  color:var(--coral);text-decoration:none;display:inline-flex;align-items:center;gap:4px;
  transition:color .25s ease;
}
.arc-link:hover{color:var(--pink);}
.arc-link svg{transition:transform .25s ease;}
.arc-link:hover svg{transform:translate(2px,-2px);}

/* project window — a macOS-style window used as the preview itself */
.arc-window{
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
.arc-windot{
  width:11px;height:11px;border-radius:9999px;transition:transform .3s ease;
}
.arc-window:hover .arc-windot{transform:scale(1.12);}
.arc-window-body{
  position:relative;height:220px;
  display:flex;align-items:center;justify-content:center;
  background-size:220% 220%;animation:arcGrad 11s ease infinite;
  box-shadow:inset 0 0 90px rgba(0,0,0,0.45);
}
.arc-dots{
  position:absolute;inset:0;opacity:.7;
  background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);
  background-size:24px 24px;
}

/* post cards */
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

.arc-footer-line{border-top:1px solid var(--border);}

@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important;}
}
`;

/* Scroll-triggered reveal wrapper */
function Reveal({ children, delay = 0, className = "", dataOpen }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
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
      <span className="arc-eyebrow-num arc-mono" style={{ color: accent }}>
        {num}
      </span>
      <span className="arc-eyebrow-label">{label}</span>
      <span className="arc-eyebrow-rule" />
    </div>
  );
}

/* a single expandable timeline entry */
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
                  <span
                    className="arc-detail-bullet"
                    style={{ color: accent }}
                  />
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

function TimelineSection({ num, label, accent, items }) {
  return (
    <section className="mt-16">
      <Reveal>
        <Eyebrow num={num} label={label} accent={accent} />
      </Reveal>
      <div>
        {items.map((it, i) => (
          <TimelineItem
            key={it.org}
            item={it}
            accent={accent}
            delay={i * 70}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const glowRef = useRef(null);

  /* soft light that trails the cursor */
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <style>{STYLES}</style>

      {/* atmospheric background */}
      <div
        className="arc-blob"
        style={{ width: 380, height: 380, top: -130, left: -150, background: "#FF3F5C", opacity: 0.26, animation: "arcDrift1 19s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 440, height: 440, top: "34%", right: -200, background: "#3142F0", opacity: 0.24, animation: "arcDrift2 23s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 360, height: 360, bottom: -150, left: "22%", background: "#5B3BF0", opacity: 0.28, animation: "arcDrift3 21s ease-in-out infinite" }}
      />
      <div className="arc-noise" />
      <div ref={glowRef} className="arc-glow" />

      <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">

        {/* ---------- Header ---------- */}
        <Reveal>
          <span className="arc-status">
            <span className="arc-status-dot" />
            {profile.status}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="arc-display mt-5 text-4xl font-extrabold sm:text-5xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p
            className="mt-2 text-base font-medium"
            style={{ color: "var(--muted)" }}
          >
            {profile.subtitle}
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p
            className="mt-4 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            {profile.bio}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="arc-link"
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noreferrer" : undefined}
              >
                {s.label}
                {s.external && <ArrowUpRight size={14} strokeWidth={2.5} />}
              </a>
            ))}
          </div>
        </Reveal>

        {/* ---------- Experience / Education / Leadership ---------- */}
        {timelineSections.map((s) => (
          <TimelineSection
            key={s.label}
            num={s.num}
            label={s.label}
            accent={s.accent}
            items={s.items}
          />
        ))}

        {/* ---------- Projects ---------- */}
        <section className="mt-16">
          <Reveal>
            <Eyebrow num="04" label="Projects" accent="#FFA0B4" />
          </Reveal>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={80} className={i === 0 ? "" : "mt-12"}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="arc-display text-lg font-bold sm:text-xl">
                  {p.title}
                </h3>
                <a href="#" className="arc-link shrink-0 text-sm font-semibold">
                  …more <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
              </div>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {p.desc}
              </p>
              <div className="arc-window mt-4">
                <div className="arc-window-bar">
                  <span className="arc-windot" style={{ background: "#FF3F5C" }} />
                  <span className="arc-windot" style={{ background: "#FFA0B4" }} />
                  <span className="arc-windot" style={{ background: "#3142F0" }} />
                </div>
                <div
                  className="arc-window-body"
                  style={{ backgroundImage: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}
                >
                  <div className="arc-dots" />
                  <div className="relative text-center">
                    <div className="arc-display text-2xl font-bold text-white">
                      {p.title}
                    </div>
                    <div
                      className="arc-mono mt-1 text-xs"
                      style={{ color: "rgba(255,255,255,0.72)" }}
                    >
                      {p.tag}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* archive CTA */}
          <Reveal delay={80} className="mt-12 text-center">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              …and many more projects in the works.
            </p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              In the meantime, browse the full archive of
            </p>
            <div className="mt-3 flex justify-center">
              <a href="#" className="arc-link text-base font-bold">
                Everything I&rsquo;ve ever Built
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </div>
          </Reveal>
        </section>

        {/* ---------- Posts ---------- */}
        <section className="mt-16">
          <Reveal>
            <Eyebrow num="05" label="Posts" accent="#FF3F5C" />
          </Reveal>
          <div className="flex flex-col gap-3">
            {posts.map((post, i) => {
              const Icon = post.icon;
              const tint = ICON_TINTS[i % ICON_TINTS.length];
              return (
                <Reveal key={post.title} delay={i * 55}>
                  <a
                    href="#"
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
                        <span
                          className="arc-mono shrink-0 text-xs"
                          style={{ color: "var(--faint)" }}
                        >
                          {post.read}
                        </span>
                      </div>
                      <p
                        className="mt-1 truncate text-xs sm:text-sm"
                        style={{ color: "var(--muted)" }}
                      >
                        {post.desc}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="arc-post-arrow"
                      size={18}
                      strokeWidth={2.25}
                    />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ---------- Footer ---------- */}
        <Reveal className="arc-footer-line mt-16 pt-8">
          <p className="arc-mono text-xs" style={{ color: "var(--faint)" }}>
            © {new Date().getFullYear()} {profile.name} — built with React &amp; Tailwind CSS
          </p>
        </Reveal>
      </main>
    </div>
  );
}
