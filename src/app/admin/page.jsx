import { connectDB } from '@/lib/mongodb';
import { Message, Blog, Case } from '@/models';

export default async function AdminDashboard() {
  await connectDB();
  const [msgCount, unreadCount, blogCount, caseCount] = await Promise.all([
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Blog.countDocuments(),
    Case.countDocuments(),
  ]);

  const stats = [
    { label:'Total Messages', value: msgCount,   sub: `${unreadCount} unread`,  color:'#C084FC' },
    { label:'Blog Posts',     value: blogCount,  sub: 'Published posts',        color:'#86EFAC' },
    { label:'Case Studies',   value: caseCount,  sub: 'Active cases',           color:'#67E8F9' },
  ];

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <a href="/" target="_blank" className="btn-ghost" style={{ fontSize:13, padding:'8px 18px' }}>View Site ↗</a>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:32 }}>
        {stats.map(s => (
          <div key={s.label} className="admin-card" style={{ borderColor: s.color + '33' }}>
            <div style={{ fontSize:36, fontFamily:'Orbitron,sans-serif', fontWeight:900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize:16, fontWeight:600, color:'white', margin:'6px 0 4px' }}>{s.label}</div>
            <div style={{ fontSize:13, color:'#94A3B8' }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="admin-card">
        <h3>Quick Actions</h3>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <a href="/admin/messages" className="btn-primary" style={{ fontSize:13, padding:'10px 20px' }}>View Messages</a>
          <a href="/admin/blog"     className="btn-ghost"    style={{ fontSize:13, padding:'10px 20px' }}>Add Blog Post</a>
          <a href="/admin/cases"    className="btn-ghost"    style={{ fontSize:13, padding:'10px 20px' }}>Manage Cases</a>
        </div>
      </div>
    </>
  );
}
