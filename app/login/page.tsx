'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPass] = useState('');
  const [mode,setMode] = useState<'signin'|'signup'|'magic'>('signin');
  const [msg,setMsg] = useState<string>('');

  async function go(){
    setMsg('');
    try{
      if(mode==='magic'){
        const { error } = await supabase.auth.signInWithOtp({ email });
        if(error) throw error;
        setMsg('تم إرسال رابط الدخول إلى بريدك.');
        return;
      }
      if(mode==='signup'){
        const { error } = await supabase.auth.signUp({ email, password });
        if(error) throw error;
        setMsg('تم إنشاء الحساب. سجّل الدخول الآن.');
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if(error) throw error;
      location.href = '/admin';
    }catch(e:any){ setMsg(e?.message || 'خطأ'); }
  }

  async function logout(){
    await supabase.auth.signOut();
    location.href = '/';
  }

  return (
    <div className="card">
      <h2 className="h2" style={{marginTop:0}}>تسجيل الدخول</h2>
      <div className="row" style={{gap:8, marginBottom:10}}>
        <button className="btn" onClick={()=>setMode('signin')}>تسجيل دخول</button>
        <button className="btn" onClick={()=>setMode('signup')}>إنشاء حساب</button>
        <button className="btn" onClick={()=>setMode('magic')}>رابط سحري</button>
        <button className="btn" onClick={logout}>خروج</button>
      </div>
      <div className="grid">
        <input className="input" placeholder="البريد" value={email} onChange={e=>setEmail(e.target.value)} />
        {mode!=='magic' && <input className="input" type="password" placeholder="كلمة المرور" value={password} onChange={e=>setPass(e.target.value)} />}
        <button className="btn" onClick={go}>متابعة</button>
        {msg && <div style={{color:'#1e40af'}}>{msg}</div>}
      </div>
    </div>
  );
}
