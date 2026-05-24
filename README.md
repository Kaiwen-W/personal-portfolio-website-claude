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
    image: projects/my-project.png
    ---

    # Writeup

    Body text in **Markdown**...

The project appears in the Projects section automatically, with its own page
at `#/project/<filename>`.

### Images inside post / project text

To put an image in the body of a post or project, use normal Markdown
image syntax on its own line:

    ![A short description](posts/my-diagram.png)

Put the image file anywhere under `public/` (e.g. `public/posts/my-diagram.png`)
and write the path relative to `public/`. A full `https://...` URL works too.
The text in the brackets becomes the image's alt text.

(The `Building Gesture Fan` post includes a placeholder image at
`public/posts/placeholder.svg` as a live example — swap or remove it.)

### Project images

To show a screenshot in a project's window instead of the colour gradient:

1. Put the image file in `public/projects/` — e.g. `public/projects/my-project.png`.
2. Add `image: projects/my-project.png` to that project's frontmatter.

The path is relative to the `public/` folder. A full URL (`https://...`) also
works. If `image:` is omitted, the window falls back to the `colors` gradient,
so `colors` is still worth setting. (`Pulse` ships with a placeholder image at
`public/projects/pulse.svg` — swap it for a real screenshot.)

## Edit the rest of the site

Open `src/data.js` — it holds the bio and CV-style entries:

- `profile` — your name, subtitle, bio and social links
- `experience` — work roles (with an expandable `details` dropdown)
- `education` — degrees, exchanges, courses
- `leadership` — societies, committees, mentoring roles

(Projects and posts are Markdown files, covered above.)

## Project structure

```
src/
  data.js            bio + experience/education/leadership
  content.js         loads the Markdown posts & projects
  posts/             one .md file per post
  projects/          one .md file per project
  index.css          theme + all custom styles
  App.jsx            hash router
  lib/               markdown renderer, icon map
  components/        Reveal, Eyebrow, Timeline, ProjectWindow, Background
  pages/             Portfolio, PostView, ProjectView, NotFound
```

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
