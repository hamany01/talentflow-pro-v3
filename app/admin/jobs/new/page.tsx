'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewJob(){
  const [title,setTitle]=useState('');
  const [location,setLocation]=useState('جدة');
  const [type,setType]=useState('دوام كامل');
  const [description,setDescription]=useState('');
  const [requirements,setRequirements]=useState('');
  const r=useRouter();

  useEffect(()=>{
    supabase.auth.getUser().then(async ({ data:{ user }})=>{
      if(!user){ location.href='/login?reason=auth'; return; }
      const { data: prof } = await supabase.from('profiles').select('role').eq('user_id', user.id).maybeSingle();
      const role = prof?.role || 'viewer';
      if(!['admin','recruiter','manager'].includes(role)) location.href='/login?reason=role';
    });
  },[]);

  async function save(){
    const { data, error } = await supabase.from('jobs')
      .insert({ title, location, type, description, requirements, status:'open' })
      .select('*').single();
    if(error){ alert('خطأ: '+error.message); return; }
    r.push(`/admin/jobs/${data.id}`);
  }
  return (
    <div className="card">
      <h2 className="h2" style={{marginTop:0}}>إضافة وظيفة</h2>
      <div className="grid">
        <input className="input" placeholder="المسمى الوظيفي" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="input" placeholder="الموقع" value={location} onChange={e=>setLocation(e.target.value)} />
        <input className="input" placeholder="نوع الدوام" value={type} onChange={e=>setType(e.target.value)} />
        <textarea className="textarea" placeholder="الوصف" value={description} onChange={e=>setDescription(e.target.value)} />
        <textarea className="textarea" placeholder="المتطلبات" value={requirements} onChange={e=>setRequirements(e.target.value)} />
        <button className="btn" onClick={save}>حفظ</button>
      </div>
    </div>
  );
}
