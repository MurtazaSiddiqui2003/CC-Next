"use client";

import { useCallback, useEffect, useState } from "react";
import "./admin.css";

const blankProject = () => ({
  number: "", name: "", category: "", description: "", tags: [], image: "", alt: "",
  href: "", github: "", label: "Explore project", focus: "", approach: "", deliverable: "",
});

export default function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState(0);
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      const data = await response.json();
      if (response.status === 401) {
        setSignedIn(false);
      } else if (!response.ok) {
        setError(data.error || "Could not load projects.");
      } else {
        setProjects(data.projects);
        setSelected((current) => Math.min(current, Math.max(0, data.projects.length - 1)));
        setSignedIn(true);
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadProjects(); }, [loadProjects]);

  async function login(event) {
    event.preventDefault();
    setLoading(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "Sign-in failed."); return; }
      setPassword("");
      await loadProjects();
    } catch {
      setError("Could not connect. Please try again.");
    } finally { setLoading(false); }
  }

  async function saveProjects() {
    setSaving(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ projects }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.error || "Save failed.");
      else setNotice(data.message || "Saved.");
    } catch { setError("Could not save. Please try again."); }
    finally { setSaving(false); }
  }

  function updateField(key, value) {
    setProjects((current) => current.map((project, index) => index === selected ? { ...project, [key]: value } : project));
  }

  function addProject() {
    setProjects((current) => [...current, { ...blankProject(), number: String(current.length + 1).padStart(2, "0") }]);
    setSelected(projects.length);
    setNotice(""); setError("");
  }

  function removeProject() {
    if (!window.confirm("Remove this project from the portfolio? This takes effect when you save.")) return;
    const next = projects.filter((_, index) => index !== selected);
    setProjects(next);
    setSelected(Math.max(0, Math.min(selected, next.length - 1)));
    setNotice(""); setError("");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSignedIn(false); setProjects([]); setNotice(""); setError("");
  }

  const project = projects[selected];

  if (loading && !signedIn) return <main className="admin-shell"><p className="admin-muted">Loading your private workspace…</p></main>;

  if (!signedIn) return (
    <main className="admin-shell admin-login-wrap">
      <a className="admin-back" href="/">← Back to portfolio</a>
      <section className="admin-login">
        <p className="admin-kicker">MURTAZA SIDDIQUI / PRIVATE AREA</p>
        <h1>Welcome back.</h1>
        <p className="admin-muted">Sign in to manage your portfolio projects and case studies.</p>
        <form onSubmit={login}>
          <label htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
        </form>
        <p className="admin-footnote">This area is private. If this is the first setup, add the required environment variables in Vercel.</p>
      </section>
    </main>
  );

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div><p className="admin-kicker">MURTAZA SIDDIQUI / ADMIN</p><h1>Portfolio manager</h1><p className="admin-muted">Edit project details, links, images, and case studies.</p></div>
        <div className="admin-header-actions"><a className="admin-secondary" href="/" target="_blank" rel="noreferrer">View portfolio ↗</a><button className="admin-secondary" onClick={logout}>Sign out</button></div>
      </header>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-title"><span>PROJECTS</span><button onClick={addProject}>+ Add</button></div>
          {projects.map((item, index) => <button key={index} className={"admin-project-option " + (selected === index ? "active" : "")} onClick={() => { setSelected(index); setNotice(""); setError(""); }}><span className="admin-project-number">{item.number || String(index + 1).padStart(2, "0")}</span><span><strong>{item.name || "Untitled project"}</strong><small>{item.category || "No category"}</small></span></button>)}
          {projects.length === 0 && <p className="admin-muted">No projects yet. Add your first one.</p>}
        </aside>
        <section className="admin-editor">
          {!project ? <div className="admin-empty"><h2>Start with a project</h2><p className="admin-muted">Add a project to build out your portfolio.</p></div> : <>
            <div className="admin-editor-top"><div><p className="admin-kicker">PROJECT DETAILS</p><h2>{project.name || "Untitled project"}</h2></div><button className="admin-danger" onClick={removeProject}>Remove project</button></div>
            <div className="admin-fields">
              <label>Project name<input value={project.name || ""} onChange={(e) => updateField("name", e.target.value)} /></label>
              <label>Category<input value={project.category || ""} onChange={(e) => updateField("category", e.target.value)} /></label>
              <label>Project number<input value={project.number || ""} onChange={(e) => updateField("number", e.target.value)} /></label>
              <label>Card button label<input value={project.label || ""} onChange={(e) => updateField("label", e.target.value)} /></label>
              <label className="admin-wide">Short description<textarea rows="3" value={project.description || ""} onChange={(e) => updateField("description", e.target.value)} /></label>
              <label className="admin-wide">Live project URL<input type="url" placeholder="https://…" value={project.href || ""} onChange={(e) => updateField("href", e.target.value)} /></label>
              <label className="admin-wide">GitHub URL (optional)<input type="url" placeholder="https://github.com/…" value={project.github || ""} onChange={(e) => updateField("github", e.target.value)} /></label>
              <label className="admin-wide">Image URL<input type="url" placeholder="https://…" value={project.image || ""} onChange={(e) => updateField("image", e.target.value)} /></label>
              <label className="admin-wide">Image alt text<input value={project.alt || ""} onChange={(e) => updateField("alt", e.target.value)} /></label>
              <label className="admin-wide">Tags <span className="admin-field-note">Separate with commas</span><input value={(project.tags || []).join(", ")} onChange={(e) => updateField("tags", e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} /></label>
            </div>
            <div className="admin-case-fields"><p className="admin-kicker">CASE STUDY</p>
              <label>Focus / goal<textarea rows="2" value={project.focus || ""} onChange={(e) => updateField("focus", e.target.value)} /></label>
              <label>Approach<textarea rows="3" value={project.approach || ""} onChange={(e) => updateField("approach", e.target.value)} /></label>
              <label>Deliverable<textarea rows="2" value={project.deliverable || ""} onChange={(e) => updateField("deliverable", e.target.value)} /></label>
            </div>
            {error && <p className="admin-error" role="alert">{error}</p>}
            {notice && <p className="admin-notice" role="status">{notice}</p>}
            <div className="admin-savebar"><span className="admin-muted">Changes are not live until saved and the deployment finishes.</span><button className="admin-primary" onClick={saveProjects} disabled={saving}>{saving ? "Saving…" : "Save changes"}</button></div>
          </>}
          {error && !project && <p className="admin-error" role="alert">{error}</p>}
          {notice && !project && <p className="admin-notice" role="status">{notice}</p>}
        </section>
      </div>
    </main>
  );
}
