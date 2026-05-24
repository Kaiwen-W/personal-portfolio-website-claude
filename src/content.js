/* ==================================================================
 *  Loads every Markdown file in src/posts/ and src/projects/ at build
 *  time. Add a file to either folder and it appears automatically —
 *  no code change needed.
 * ================================================================== */

import {
  parseFrontmatter,
  estimateRead,
  slugFromPath,
  parseColors,
} from "./lib/markdown.jsx";

const byDateDesc = (a, b) => String(b.date).localeCompare(String(a.date));

/* ---- posts ---- */
const rawPosts = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts = Object.entries(rawPosts)
  .map(([path, raw]) => {
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
  })
  .sort(byDateDesc);

/* ---- projects ---- */
const rawProjects = import.meta.glob("./projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const projects = Object.entries(rawProjects)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: data.slug || slugFromPath(path),
      title: data.title || slugFromPath(path),
      tag: data.tag || "",
      description: data.description || "",
      colors: parseColors(data.colors),
      image: data.image || "",
      date: data.date || "",
      body,
    };
  })
  .sort(byDateDesc);
