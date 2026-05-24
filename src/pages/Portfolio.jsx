import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, timelineSections, navItems, ICON_TINTS } from "../data.js";
import { posts, projects } from "../content.js";
import { iconFor } from "../lib/icons.js";
import { Rich } from "../lib/markdown.jsx";
import Reveal from "../components/Reveal.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import TimelineSection from "../components/Timeline.jsx";
import ProjectWindow from "../components/ProjectWindow.jsx";

export default function Portfolio() {
  const [active, setActive] = useState("experience");

  /* scrollspy — highlight the rail nav item for the section in view.
     Picks the last section whose top has passed a reference line near
     the top of the viewport; a bottom guard handles short trailing
     sections that can never reach that line on a landscape screen. */
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
      const doc = document.documentElement;
      const last = navItems[navItems.length - 1];
      const lastEl = document.getElementById(last.id);
      const atBottom = vh + window.scrollY >= doc.scrollHeight - 2;
      const scrollable = doc.scrollHeight > vh + 4;
      if (scrollable && (atBottom || (lastEl && lastEl.getBoundingClientRect().bottom <= vh))) {
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
              <Rich text={profile.name} />
            </h1>
          </Reveal>
          <Reveal delay={70}>
            <p className="mt-2 text-sm font-medium" style={{ color: "var(--muted)" }}>
              <Rich text={profile.subtitle} />
            </p>
          </Reveal>
          <Reveal delay={130}>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              <Rich text={profile.bio} />
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
                  <Rich text={s.label} />
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
            <Reveal>
              <Eyebrow num="04" label="Projects" accent="#FFA0B4" />
            </Reveal>
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
            <Reveal>
              <Eyebrow num="05" label="Posts" accent="#FF3F5C" />
            </Reveal>
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
