# Personal site

A minimal dark-themed personal site built with **React + Vite + Tailwind CSS**,
with accent colours borrowed from the Arc browser logo (coral, blue, indigo, pink).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to /dist
```

## Make it yours

Open `src/App.jsx`. Everything you need to edit lives in the clearly marked
block at the top of the file:

- `profile` — your name, bio and social links
- `experience` — your roles (the coloured monogram is the first letter)
- `projects` — title, one-line tag and description for each project
- `posts` — your writing, each with an icon, title, blurb and read time

Colours and animations are defined in the `STYLES` string further down.

## Deploy to GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that builds
and publishes the site automatically.

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push any commit to `main` — the site builds and goes live at
   `https://<username>.github.io/<repo-name>/`.

`vite.config.js` uses `base: './'` so the build works whether the site is
served from a project page (`/repo-name/`) or a user page
(`<username>.github.io`). No extra configuration needed.

### Manual deploy (optional)

If you prefer not to use Actions, run `npm run build` and push the contents
of `/dist` to a `gh-pages` branch, then point GitHub Pages at that branch.
