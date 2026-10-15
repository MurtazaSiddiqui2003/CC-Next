import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const repo = process.env.GITHUB_REPOSITORY || "MurtazaSiddiqui2003/CC-Next";
const branch = process.env.GITHUB_BRANCH || "main";
const path = "content/projects.json";

function validSession(value) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !value) return false;
  const [issuedAt, signature] = value.split(".");
  if (!issuedAt || !signature || !/^\d+$/.test(issuedAt)) return false;
  const age = Date.now() - Number(issuedAt);
  if (age < 0 || age > 7 * 24 * 60 * 60 * 1000) return false;
  const expected = createHmac("sha256", secret).update(issuedAt).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

async function requireAdmin() {
  const store = await cookies();
  if (!validSession(store.get("portfolio_admin")?.value)) {
    return NextResponse.json({ error: "Please sign in to manage your portfolio." }, { status: 401 });
  }
  return null;
}

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Add a GitHub token with Contents: read/write permission as GITHUB_TOKEN in Vercel.");
  return {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };
}

async function getContent() {
  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`, {
    headers: githubHeaders(), cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not read portfolio content from GitHub (" + response.status + ").");
  const file = await response.json();
  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return { projects: JSON.parse(decoded), sha: file.sha };
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const { projects } = await getContent();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not load projects." }, { status: 500 });
  }
}

export async function PUT(request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!Array.isArray(body.projects) || body.projects.length > 50) {
      return NextResponse.json({ error: "Projects must be a list of up to 50 items." }, { status: 400 });
    }
    for (const project of body.projects) {
      if (!project || typeof project.name !== "string" || !project.name.trim() || typeof project.href !== "string") {
        return NextResponse.json({ error: "Every project needs a name and a live-site URL." }, { status: 400 });
      }
      for (const key of ["href", "image", "github"]) {
        if (project[key] && !/^https:\/\//i.test(project[key])) {
          return NextResponse.json({ error: key + " URLs must use HTTPS." }, { status: 400 });
        }
      }
    }

    const { sha } = await getContent();
    const encoded = Buffer.from(JSON.stringify(body.projects, null, 2) + "\n", "utf8").toString("base64");
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: githubHeaders(),
      body: JSON.stringify({
        message: "Update portfolio projects from admin",
        content: encoded,
        sha,
        branch,
      }),
    });
    if (!response.ok) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details.message || "GitHub could not save the portfolio content (" + response.status + ").");
    }
    return NextResponse.json({ ok: true, message: "Saved to GitHub. Your site will update after Vercel finishes deploying." });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Could not save projects." }, { status: 500 });
  }
}
