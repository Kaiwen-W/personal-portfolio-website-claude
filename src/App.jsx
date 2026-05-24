import { useState, useEffect, useRef } from "react";
import { posts, projects } from "./content.js";
import Background from "./components/Background.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import PostView from "./pages/PostView.jsx";
import ProjectView from "./pages/ProjectView.jsx";
import NotFound from "./pages/NotFound.jsx";
import ReadingProgress from "./components/ReadingProgress.jsx";

/* tiny hash router — keeps the site working on GitHub Pages with no
   server config. Routes: #/ (home), #/post/<slug>, #/project/<slug>. */
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
      <Background />
      {(postMatch || projectMatch) && <ReadingProgress key={routeKey} />}
      {view}
    </div>
  );
}
