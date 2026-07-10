'use client';
import { useState, useEffect } from 'react';

const empty = { title:'', category:'', icon:'📝', excerpt:'', content:'', published: false };

export default function BlogAdmin() {
  const [posts,   setPosts]   = useState([]);
  const [form,    setForm]    = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res  = await fetch('/api/blog');
    const data = await res.json();
    setPosts(data); setLoading(false);
  }

  async function save() {
    const method = editing ? 'PUT' : 'POST';
    const body   = editing ? { ...form, id: editing } : form;
    await fetch('/api/blog', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    setForm(empty); setEditing(null); load();
  }

  async function del(id) {
    if (!confirm('Delete this post?')) return;
    await fetch('/api/blog', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) });
    load();
  }

  function edit(post) {
    setEditing(post._id);
    setForm({ title:post.title, category:post.category, icon:post.icon, excerpt:post.excerpt, content:post.content, published:post.published });
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="admin-header"><h1>Blog Posts</h1></div>

      {/* Form */}
      <div className="admin-card" style={{ marginBottom:24 }}>
        <h3>{editing ? 'Edit Post' : 'New Post'}</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <input className="admin-input" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <input className="admin-input" placeholder="Category (e.g. E-commerce)" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'80px 1fr', gap:14 }}>
          <input className="admin-input" placeholder="Icon" value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} />
          <input className="admin-input" placeholder="Short excerpt (shown on card)" value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} />
        </div>
        <textarea className="admin-textarea" placeholder="Full blog content..." value={form.content} onChange={e=>setForm({...form,content:e.target.value})} style={{ minHeight:140 }} />
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <label style={{ display:'flex', alignItems:'center', gap:8, fontSize:14, color:'#94A3B8', cursor:'pointer' }}>
            <input type="checkbox" checked={form.published} onChange={e=>setForm({...form,published:e.target.checked})} />
            Publish immediately
          </label>
          <button className="btn-primary" style={{ padding:'10px 24px' }} onClick={save}>{editing ? 'Update Post' : 'Add Post'}</button>
          {editing && <button className="btn-ghost" style={{ padding:'10px 24px' }} onClick={()=>{ setForm(empty); setEditing(null); }}>Cancel</button>}
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        {loading ? <p style={{ color:'#94A3B8' }}>Loading...</p> : (
          <table className="admin-table">
            <thead><tr><th>Icon</th><th>Title</th><th>Category</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p._id}>
                  <td style={{ fontSize:20 }}>{p.icon}</td>
                  <td style={{ color:'white', fontWeight:500 }}>{p.title}</td>
                  <td>{p.category}</td>
                  <td>{p.published ? <span className="badge-green">Published</span> : <span className="badge-red">Draft</span>}</td>
                  <td>
                    <div style={{ display:'flex', gap:8 }}>
                      <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }} onClick={()=>edit(p)}>Edit</button>
                      <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px', borderColor:'#FCA5A5', color:'#FCA5A5' }} onClick={()=>del(p._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length===0 && <tr><td colSpan={5} style={{ textAlign:'center', padding:32, color:'#3D4A5C' }}>No posts yet. Add one above.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
