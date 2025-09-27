'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Users(){
  const [rows,setRows]=useState<any[]>([]);
  const [email,setEmail]=useState('');
  const [role,setRole]=useState('viewer');
  const [msg,setMsg]=useState('');

  useEffect(()=>{ load(); },[]);

  async function load(){
    const { data:{ user } } = await supabase.auth.getUser();
    if(!user){ location.href='/login?reason=auth'; return; }
    const me = await supabase.from('profiles').select('role').eq('user_id', user.id).maybeSingle();
    if(!['admin'].includes(me.data?.role)){ location.href='/login?reason=role'; return; }
    const { data } = await supabase.from('profiles').select('*').order('created_at',{ascending:false});
    setRows(data||[]);
  }

  async function promote(){
    setMsg('');
    try{
      const { data, error } = await supabase.rpc('promote_user_by_email', { p_email: email, p_role: role });
      if(error) throw error;
      setMsg('تم التعيين/التحديث'); setEmail(''); setRole('viewer'); load();
    }catch(e:any){ setMsg(e?.message||'خطأ'); }
  }

  return (
    <div className="grid">
      <div className="card">
        <h2 className="h2" style={{marginTop:0}}>المستخدمون والصلاحيات</h2>
        <div className="row">
          <input className="input" placeholder="email@domain.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <select className="select" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="admin">admin</option>
            <option value="recruiter">recruiter</option>
            <option value="manager">manager</option>
            <option value="viewer">viewer</option>
          </select>
          <button className="btn" onClick={promote}>تعيين دور</button>
          {msg && <div style={{color:'#1e40af'}}>{msg}</div>}
        </div>
      </div>
      <div className="card">
        <div className="h2" style={{marginTop:0}}>القائمة</div>
        {rows.length===0 ? 'لا يوجد مستخدمون بعد.' : (
          <table className="table">
            <thead><tr><th>البريد</th><th>الدور</th><th>تاريخ</th></tr></thead>
            <tbody>{rows.map(r=>(<tr key={r.user_id}><td>{r.email}</td><td>{r.role}</td><td>{new Date(r.created_at).toLocaleString()}</td></tr>))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
