import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { posts, projects } from "./content.js";
import Background from "./components/Background.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import PostView from "./pages/PostView.jsx";
import ProjectView from "./pages/ProjectView.jsx";
import IndexView from "./pages/IndexView.jsx";
import NowView from "./pages/NowView.jsx";
import NotFound from "./pages/NotFound.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";

/* Map a hash to a route key — used both for rendering and to decide
   when to play a view transition (route changed) vs. not (anchor). */
function routeOf(hash) {
  let m;
  if ((m = hash.match(/^#\/post\/(.+)$/))) return "post:" + m[1];
  if ((m = hash.match(/^#\/project\/(.+)$/))) return "project:" + m[1];
  if (/^#\/posts\/?$/.test(hash)) return "posts";
  if (/^#\/projects\/?$/.test(hash)) return "projects";
  if (/^#\/now\/?$/.test(hash)) return "now";
  return "home";
}

/* tiny hash router — keeps the site working on GitHub Pages with no
   server config. Routes: #/ (home), #/posts, #/projects, #/now,
   #/post/<slug>, #/project/<slug>. */
function useHashRoute() {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );
  useEffect(() => {
    let last = routeOf(window.location.hash);
    const on = () => {
      const next = window.location.hash;
      const apply = () => setHash(next);
      /* cross-fade only on a real route change — in-page section
         anchors (#experience, …) keep scrolling normally */
      if (routeOf(next) !== last && document.startViewTransition) {
        document.startViewTransition(() => flushSync(apply));
      } else {
        apply();
      }
      last = routeOf(next);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  /* --- cursor-following glow (disabled) ---
     To re-enable: add `const glowRef = useRef(null);`, the pointermove
     effect below, and render `<div ref={glowRef} className="arc-glow" />`.
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
  const isPostsIndex = /^#\/posts\/?$/.test(hash);
  const isProjectsIndex = /^#\/projects\/?$/.test(hash);
  const isNow = /^#\/now\/?$/.test(hash);
  const routeKey = routeOf(hash);

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
  } else if (isPostsIndex) {
    view = <IndexView kind="post" />;
  } else if (isProjectsIndex) {
    view = <IndexView kind="project" />;
  } else if (isNow) {
    view = <NowView />;
  } else {
    view = <Portfolio />;
  }

  return (
    <div className="relative min-h-screen w-full">
      <Background />
      {(postMatch || projectMatch) && <ReadingProgress key={routeKey} />}
      {view}
    </div>
  );
}
