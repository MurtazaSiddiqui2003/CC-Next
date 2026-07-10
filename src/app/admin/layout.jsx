import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await getServerSession();
  if (!session) redirect('/admin/login');
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo">CRC CORE</div>
        <a href="/admin"          className="admin-nav-link">📊 Dashboard</a>
        <a href="/admin/messages" className="admin-nav-link">✉️ Messages</a>
        <a href="/admin/blog"     className="admin-nav-link">📝 Blog Posts</a>
        <a href="/admin/cases"    className="admin-nav-link">💼 Case Studies</a>
        <div style={{ flex:1 }} />
        <a href="/" className="admin-nav-link">← Back to Site</a>
        <a href="/api/auth/signout" className="admin-nav-link" style={{ color:'#FCA5A5' }}>Sign Out</a>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
