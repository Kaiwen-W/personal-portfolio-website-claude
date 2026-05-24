import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile, timelineSections, navItems, ICON_TINTS } from "../data.js";
import { posts, projects } from "../content.js";
import { Rich } from "../lib/markdown.jsx";
import Reveal from "../components/Reveal.jsx";
import Eyebrow from "../components/Eyebrow.jsx";
import TimelineSection from "../components/Timeline.jsx";
import PostCard from "../components/PostCard.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

export default function Portfolio() {
  const [active, setActive] = useState("experience");

  /* scrollspy — highlight the rail nav item for the section in view.
     Picks the last section whose top has passed a reference line near
     the top of the viewport. A bottom guard handles a short trailing
     section that may never cross that line — but it must only fire
     once genuinely scrolled to the end, never at the top. */
  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vh = window.innerHeight;
      const doc = document.documentElement;
      /* Fixed threshold keeps behaviour consistent across viewport
         sizes — a section becomes "active" only once its heading is
         within 100 px of the viewport top. */
      const line = 100;

      let current = navItems[0].id;
      for (const n of navItems) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= line) current = n.id;
      }

      /* only once the page is genuinely scrolled to its end — checking
         scroll position, not whether the last section is merely visible,
         so this can never override the first section at the top */
      const maxScroll = doc.scrollHeight - vh;
      if (maxScroll > 4 && window.scrollY >= maxScroll - 4) {
        current = navItems[navItems.length - 1].id;
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
            <p
              className="mt-2 text-sm font-medium"
              style={{ color: "var(--muted)" }}
            >
              <Rich text={profile.subtitle} />
            </p>
          </Reveal>
          <Reveal delay={130}>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
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
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={80} className="mt-12 text-center">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                …and many more projects in the works.
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                In the meantime, browse the full archive of
              </p>
              <div className="mt-3 flex justify-center">
                <a href="#/projects" className="arc-link text-base font-bold">
                  Everything I&rsquo;ve ever Built{" "}
                  <ArrowUpRight size={16} strokeWidth={2.5} />
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
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 55}>
                  <PostCard
                    post={post}
                    tint={ICON_TINTS[i % ICON_TINTS.length]}
                  />
                </Reveal>
              ))}
            </div>
            <Reveal delay={60} className="mt-7 flex justify-center">
              <a href="#/posts" className="arc-link text-sm font-bold">
                Read all posts <ArrowUpRight size={15} strokeWidth={2.5} />
              </a>
            </Reveal>
          </section>

          {/* Footer */}
          <Reveal className="arc-footer-line mt-16 pt-8">
            <p className="arc-mono text-xs" style={{ color: "var(--faint)" }}>
              Kaiwen {"<"}3 You!
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
