# Personal site

A minimal dark-themed personal site built with **React + Vite + Tailwind CSS**,
with accent colours borrowed from the Arc browser logo (coral, blue, indigo, pink).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
```

## Writing a post

Posts are plain **Markdown files** in `src/posts/`. To publish a new post,
create a file — that is the whole process. The link on the home page and the
post page are generated automatically; you never touch any code.

Create `src/posts/my-new-post.md`:

    ---
    title: My New Post
    description: One-line blurb shown in the list
    date: 2026-06-01
    icon: pencil
    ---

    # A heading

    Body text in **Markdown** — paragraphs, lists, code, links, quotes
    and code blocks all work.

Frontmatter fields:

- `title` — post title (defaults to the filename if omitted)
- `description` — the blurb shown under the title in the list
- `date` — `YYYY-MM-DD`; posts are sorted newest-first by this
- `icon` — optional; one of: filetext, sparkles, wrench, appwindow,
  activity, listchecks, bookopen, graduationcap, briefcase, pencil, code, camera
- `read` — optional; e.g. `4 min read`. If omitted it is estimated from the
  word count automatically

The post URL is `#/post/<filename>` (without the `.md`).

Run `npm run dev` and the new post appears in the Posts list immediately.

## Writing a project

Projects work exactly like posts — Markdown files, this time in `src/projects/`.
Create `src/projects/my-project.md`:

    ---
    title: My Project
    tag: short label shown under the title
    description: One-line blurb shown on the home page
    date: 2026-06-01
    colors: #FF3F5C, #5B3BF0
    ---

    # Writeup

    Body text in **Markdown**...

`colors` is the two-colour gradient used in the project's window preview.
The project appears in the Projects section automatically, with its own page
at `#/project/<filename>`.

## Edit the rest of the site

Open `src/App.jsx`. The block at the top holds everything else:

- `profile` — your name, subtitle, bio and social links
- `experience` — work roles (with an expandable `details` dropdown)
- `education` — degrees, exchanges, courses
- `leadership` — societies, committees, mentoring roles

(Projects and posts are Markdown files, covered above.)

## Deploy to GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that builds
and publishes the site automatically.

1. Push this project to a GitHub repository's `main` branch.
2. In the repo, go to **Settings -> Pages**.
3. Under **Build and deployment -> Source**, choose **GitHub Actions**.
4. Push any commit to `main` — the site builds and goes live at
   `https://<username>.github.io/<repo-name>/`.

`vite.config.js` uses `base: './'` so the build works whether the site is
served from a project page or a user page. Post links use hash routing
(`#/post/...`), so they work on GitHub Pages with no extra configuration.
