'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', { ...form, redirect: false });
    if (res?.ok) router.push('/admin');
    else setError('Invalid email or password.');
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#07070F' }}>
      <div style={{ width:360, background:'#101024', border:'1px solid #2E1A5C', borderRadius:20, padding:40 }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontFamily:'Orbitron, sans-serif', fontSize:18, fontWeight:700, color:'#C084FC', letterSpacing:3 }}>CRC CORE</div>
          <div style={{ fontSize:13, color:'#94A3B8', marginTop:6 }}>Admin Dashboard</div>
        </div>
        <form onSubmit={submit}>
          <input className="admin-input" type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({...form, email: e.target.value})} required />
          <input className="admin-input" type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} required />
          {error && <p style={{ color:'#FCA5A5', fontSize:13, marginBottom:12 }}>{error}</p>}
          <button type="submit" className="btn-primary" style={{ width:'100%', padding:13, textAlign:'center' }}>
            Sign In →
          </button>
        </form>
      </div>
    </div>
  );
}
