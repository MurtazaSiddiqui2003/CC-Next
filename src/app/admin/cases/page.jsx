'use client';
import { useState, useEffect } from 'react';

const empty = { title:'', badge:'', market:'', points:['','',''], videoUrl:'/Assets/Videos/reel.mp4', order:0 };

export default function CasesAdmin() {
  const [cases,   setCases]   = useState([]);
  const [form,    setForm]    = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res  = await fetch('/api/cases');
    const data = await res.json();
    setCases(data); setLoading(false);
  }

  async function save() {
    const cleanPoints = form.points.filter(p=>p.trim());
    const body = editing ? { ...form, points:cleanPoints, id:editing } : { ...form, points:cleanPoints };
    await fetch('/api/cases', { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    setForm(empty); setEditing(null); load();
  }

  async function del(id) {
    if (!confirm('Delete this case?')) return;
    await fetch('/api/cases', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) });
    load();
  }

  function edit(c) {
    setEditing(c._id);
    setForm({ title:c.title, badge:c.badge, market:c.market, points:[...c.points,'','',''].slice(0,5), videoUrl:c.videoUrl, order:c.order });
  }

  function updatePoint(i, val) {
    const pts = [...form.points]; pts[i]=val; setForm({...form,points:pts});
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="admin-header"><h1>Case Studies</h1></div>

      <div className="admin-card" style={{ marginBottom:24 }}>
        <h3>{editing ? 'Edit Case' : 'New Case'}</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <input className="admin-input" placeholder="Client Name" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <input className="admin-input" placeholder="Badge (e.g. B2B & B2C)" value={form.badge} onChange={e=>setForm({...form,badge:e.target.value})} />
        </div>
        <input className="admin-input" placeholder="Market (e.g. E-commerce Brand — USA & Canada)" value={form.market} onChange={e=>setForm({...form,market:e.target.value})} />
        <p style={{ fontSize:12, color:'#3D4A5C', marginBottom:8 }}>Deliverables (bullet points):</p>
        {form.points.map((pt,i) => (
          <input key={i} className="admin-input" placeholder={`Point ${i+1}`} value={pt} onChange={e=>updatePoint(i,e.target.value)} />
        ))}
        <input className="admin-input" placeholder="Video URL (default: /Assets/Videos/reel.mp4)" value={form.videoUrl} onChange={e=>setForm({...form,videoUrl:e.target.value})} />
        <div style={{ display:'flex', gap:12 }}>
          <button className="btn-primary" style={{ padding:'10px 24px' }} onClick={save}>{editing ? 'Update Case' : 'Add Case'}</button>
          {editing && <button className="btn-ghost" style={{ padding:'10px 24px' }} onClick={()=>{ setForm(empty); setEditing(null); }}>Cancel</button>}
        </div>
      </div>

      <div className="admin-card">
        {loading ? <p style={{ color:'#94A3B8' }}>Loading...</p> : (
          <table className="admin-table">
            <thead><tr><th>Client</th><th>Badge</th><th>Market</th><th>Points</th><th>Actions</th></tr></thead>
            <tbody>
              {cases.map(c => (
                <tr key={c._id}>
                  <td style={{ color:'white', fontWeight:600 }}>{c.title}</td>
                  <td><span className="badge-green">{c.badge}</span></td>
                  <td style={{ fontSize:12 }}>{c.market}</td>
                  <td style={{ fontSize:12 }}>{c.points.length} items</td>
                  <td>
                    <div style={{ display:'flex', gap:8 }}>
                      <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }} onClick={()=>edit(c)}>Edit</button>
                      <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px', borderColor:'#FCA5A5', color:'#FCA5A5' }} onClick={()=>del(c._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {cases.length===0 && <tr><td colSpan={5} style={{ textAlign:'center', padding:32, color:'#3D4A5C' }}>No cases yet. Add one above.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
