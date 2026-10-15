# Murtaza Siddiqui Portfolio

A responsive Next.js portfolio for web development, e-commerce, branding, social content, photography, and AI-assisted creative work.

## Run locally

```bash
npm install
npm run dev
```

## Private portfolio admin

The `/admin` dashboard manages project cards and case-study content. Project data lives in `content/projects.json`; saving from the dashboard updates that file through the GitHub Contents API and triggers the connected Vercel deployment.

Set these environment variables in **Vercel → Project → Settings → Environment Variables**:

- `ADMIN_PASSWORD`: a unique, strong password for the admin.
- `ADMIN_SESSION_SECRET`: a randomly generated secret of at least 32 characters used to sign the seven-day, HTTP-only session cookie.
- `GITHUB_TOKEN`: a fine-grained GitHub token restricted to `MurtazaSiddiqui2003/CC-Next`, with **Contents: Read and write** permission.
- `GITHUB_REPOSITORY`: defaults to `MurtazaSiddiqui2003/CC-Next`.
- `GITHUB_BRANCH`: defaults to `main`; set to the branch that should receive content edits.

Never place these secrets in client-side code or commit real values to GitHub. After adding or changing environment variables, redeploy the Vercel project.

## Content workflow

1. Open `/admin` and sign in with `ADMIN_PASSWORD`.
2. Edit project details, tags, image URLs, live/GitHub links, and case-study fields.
3. Save changes. The content is committed to the configured GitHub branch.
4. Vercel builds the updated site; edits appear on the public portfolio after deployment succeeds.

The first admin release edits projects and case studies. It does not yet manage every page section, testimonials, or media uploads. For images, use a stable HTTPS image URL until direct uploads are added.
