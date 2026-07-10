'use client';
import { useState, useEffect } from 'react';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);

  async function load() {
    const res  = await fetch('/api/messages');
    const data = await res.json();
    setMessages(data); setLoading(false);
  }

  async function markRead(id) {
    await fetch('/api/messages', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) });
    load();
  }

  async function del(id) {
    if (!confirm('Delete this message?')) return;
    await fetch('/api/messages', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id }) });
    load();
  }

  useEffect(() => { load(); }, []);

  return (
    <>
      <div className="admin-header">
        <h1>Messages</h1>
        <span style={{ fontSize:13, color:'#94A3B8' }}>{messages.filter(m=>!m.read).length} unread</span>
      </div>
      <div className="admin-card">
        {loading ? <p style={{ color:'#94A3B8' }}>Loading...</p> : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {messages.map(m => (
                <tr key={m._id} style={{ opacity: m.read ? 0.6 : 1 }}>
                  <td style={{ fontWeight: m.read ? 400 : 600, color: m.read ? '#94A3B8':'white' }}>{m.name}</td>
                  <td>{m.email}</td>
                  <td style={{ maxWidth:260 }}>{m.message.slice(0,80)}{m.message.length>80?'...':''}</td>
                  <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td>{m.read ? <span className="badge-green">Read</span> : <span className="badge-red">Unread</span>}</td>
                  <td>
                    <div style={{ display:'flex', gap:8 }}>
                      {!m.read && <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px' }} onClick={()=>markRead(m._id)}>Mark Read</button>}
                      <button className="btn-ghost" style={{ fontSize:12, padding:'4px 10px', borderColor:'#FCA5A5', color:'#FCA5A5' }} onClick={()=>del(m._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {messages.length===0 && <tr><td colSpan={6} style={{ textAlign:'center', padding:32, color:'#3D4A5C' }}>No messages yet.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
