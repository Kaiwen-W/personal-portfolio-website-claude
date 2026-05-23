import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
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
 *  Swap names, links, dates and copy. The layout adapts automatically.
 * ------------------------------------------------------------------ */
const profile = {
  name: "Alex Rivera",
  bio: "Software engineer at Lumen Labs. Recently graduated from the University of Edinburgh with a degree in Computer Science. I like building small tools that make everyday things feel a little more delightful.",
  socials: [
    { label: "Twitter", href: "https://twitter.com/yourhandle", external: true },
    { label: "GitHub", href: "https://github.com/yourhandle", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", external: true },
    { label: "Email", href: "mailto:you@example.com", external: false },
  ],
};

const experience = [
  { org: "Lumen Labs", role: "Software Engineer", period: "Sept 2025", grad: ["#FF3F5C", "#5B3BF0"] },
  { org: "University of Edinburgh", role: "Computer Science", period: "2021 – 2025", grad: ["#3142F0", "#5B3BF0"] },
  { org: "Cobalt", role: "Software Engineering Intern", period: "Summer 2024", grad: ["#5B3BF0", "#FFA0B4"] },
  { org: "Helio", role: "Software Engineering Intern", period: "Summer 2022", grad: ["#3142F0", "#FF3F5C"] },
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

const ICON_TINTS = ["#FF3F5C", "#3142F0", "#5B3BF0", "#FFA0B4"];

/* ------------------------------------------------------------------ *
 *  Styles — kept inline so this file renders identically whether it is
 *  built by Vite or dropped in as a standalone artifact.
 * ------------------------------------------------------------------ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap');

:root{
  --bg:#09090C; --text:#ECECEF; --muted:#85858F;
  --border:rgba(255,255,255,0.08);
  --surface:rgba(255,255,255,0.022); --surface-2:rgba(255,255,255,0.045);
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

@keyframes arcDrift1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(70px,-50px) scale(1.18);}}
@keyframes arcDrift2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-60px,55px) scale(1.12);}}
@keyframes arcDrift3{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(45px,45px) scale(1.22);}}
@keyframes arcGrad{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}

.arc-blob{position:fixed;border-radius:9999px;filter:blur(110px);pointer-events:none;z-index:0;will-change:transform;}
.arc-glow{
  position:fixed;z-index:1;pointer-events:none;width:620px;height:620px;
  margin-left:-310px;margin-top:-310px;border-radius:9999px;
  background:radial-gradient(circle,rgba(255,63,92,0.11) 0%,rgba(49,66,240,0.07) 38%,transparent 72%);
  transition:transform .12s ease-out;
}
.arc-card{
  background:var(--surface);border:1px solid var(--border);border-radius:16px;
  color:inherit;text-decoration:none;
  transition:transform .4s cubic-bezier(.2,.7,.2,1),border-color .4s ease,background .4s ease,box-shadow .4s ease;
}
.arc-card:hover{
  transform:translateY(-3px);border-color:rgba(255,63,92,0.42);background:var(--surface-2);
  box-shadow:0 16px 44px -16px rgba(255,63,92,0.30);
}
.arc-panel{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;}
.arc-panel>*+*{border-top:1px solid var(--border);}
.arc-row{transition:background .3s ease;}
.arc-row:hover{background:rgba(255,255,255,0.03);}
.arc-link{
  color:var(--coral);text-decoration:none;display:inline-flex;align-items:center;gap:4px;
  transition:color .25s ease;
}
.arc-link:hover{color:var(--pink);}
.arc-link svg{transition:transform .25s ease;}
.arc-link:hover svg{transform:translate(2px,-2px);}
.arc-mono{
  display:flex;align-items:center;justify-content:center;border-radius:11px;
  color:#fff;font-weight:700;font-size:13px;flex-shrink:0;
  box-shadow:0 4px 14px -4px rgba(0,0,0,0.6);
}
.arc-iconbox{
  display:flex;align-items:center;justify-content:center;border-radius:12px;
  background:rgba(255,255,255,0.04);border:1px solid var(--border);flex-shrink:0;
  transition:border-color .35s ease,background .35s ease,transform .35s ease;
}
.arc-card:hover .arc-iconbox{border-color:rgba(255,63,92,0.30);background:rgba(255,63,92,0.07);}
.arc-preview{
  position:relative;height:240px;border-radius:16px;overflow:hidden;
  background-size:220% 220%;animation:arcGrad 11s ease infinite;
  box-shadow:inset 0 0 90px rgba(0,0,0,0.55);border:1px solid var(--border);
}
.arc-dots{
  position:absolute;inset:0;opacity:.7;
  background-image:radial-gradient(rgba(255,255,255,0.16) 1px,transparent 1px);
  background-size:24px 24px;
}
.arc-glass{
  width:256px;border-radius:14px;overflow:hidden;
  border:1px solid rgba(255,255,255,0.22);background:rgba(255,255,255,0.10);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  box-shadow:0 18px 50px -12px rgba(0,0,0,0.6);
  transition:transform .45s cubic-bezier(.2,.7,.2,1);
}
.arc-preview:hover .arc-glass{transform:translateY(-5px);}
.arc-glassbar{display:flex;gap:6px;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,0.18);}
.arc-windot{width:9px;height:9px;border-radius:9999px;}
.arc-footer-line{border-top:1px solid var(--border);}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important;}
}
`;

/* Scroll-triggered reveal wrapper */
function Reveal({ children, delay = 0, className = "" }) {
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
        style={{ width: 380, height: 380, top: -130, left: -150, background: "#FF3F5C", opacity: 0.28, animation: "arcDrift1 19s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 440, height: 440, top: "34%", right: -200, background: "#3142F0", opacity: 0.26, animation: "arcDrift2 23s ease-in-out infinite" }}
      />
      <div
        className="arc-blob"
        style={{ width: 360, height: 360, bottom: -150, left: "22%", background: "#5B3BF0", opacity: 0.3, animation: "arcDrift3 21s ease-in-out infinite" }}
      />
      <div ref={glowRef} className="arc-glow" />

      <main className="relative z-10 mx-auto max-w-xl px-6 py-16 sm:px-8 sm:py-24">

        {/* ---------- Header ---------- */}
        <Reveal>
          <h1 className="arc-display text-4xl font-extrabold sm:text-5xl">
            {profile.name}
          </h1>
        </Reveal>
        <Reveal delay={90}>
          <p
            className="mt-4 text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--muted)" }}
          >
            {profile.bio}
          </p>
        </Reveal>
        <Reveal delay={170}>
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

        {/* ---------- Experience ---------- */}
        <Reveal delay={120} className="mt-14">
          <div className="arc-panel">
            {experience.map((e) => (
              <div
                key={e.org}
                className="arc-row flex items-center gap-3 px-4 py-4 sm:px-5"
              >
                <div
                  className="arc-mono h-9 w-9"
                  style={{ backgroundImage: `linear-gradient(140deg, ${e.grad[0]}, ${e.grad[1]})` }}
                >
                  {e.org.charAt(0)}
                </div>
                <span className="truncate text-sm font-semibold sm:text-base">
                  {e.org}
                </span>
                <span
                  className="ml-auto shrink-0 text-right text-xs sm:text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {e.role} · {e.period}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- Projects ---------- */}
        {projects.map((p) => (
          <Reveal key={p.title} delay={80} className="mt-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="arc-display text-lg font-bold sm:text-xl">
                {p.title}
              </h2>
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
            <div
              className="arc-preview mt-4"
              style={{ backgroundImage: `linear-gradient(135deg, ${p.grad[0]}, ${p.grad[1]})` }}
            >
              <div className="arc-dots" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="arc-glass">
                  <div className="arc-glassbar">
                    <span className="arc-windot" style={{ background: "#FF3F5C" }} />
                    <span className="arc-windot" style={{ background: "#FFA0B4" }} />
                    <span className="arc-windot" style={{ background: "#3142F0" }} />
                  </div>
                  <div className="px-4 py-6 text-center">
                    <div className="arc-display text-base font-bold text-white">
                      {p.title}
                    </div>
                    <div
                      className="mt-1 text-xs font-medium"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {p.tag}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}

        {/* ---------- Archive CTA ---------- */}
        <Reveal delay={80} className="mt-14 text-center">
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

        {/* ---------- Posts ---------- */}
        <Reveal className="mt-20">
          <h2 className="arc-display text-2xl font-extrabold">Posts</h2>
        </Reveal>
        <div className="mt-6 flex flex-col gap-3">
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
                        className="shrink-0 text-xs"
                        style={{ color: "var(--muted)" }}
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
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Footer ---------- */}
        <Reveal className="arc-footer-line mt-20 pt-8">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} {profile.name} · Built with React &amp; Tailwind CSS
          </p>
        </Reveal>
      </main>
    </div>
  );
}
