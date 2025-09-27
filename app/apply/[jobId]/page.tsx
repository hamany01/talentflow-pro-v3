'use client';
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuid } from "uuid";
import { simpleScore } from "@/lib/ai/score";

export default function Apply({ params }: { params:{ jobId:string }}){
  const jobId = Number(params.jobId);
  const [job, setJob] = useState<any>(null);
  const [full_name,setN] = useState('');
  const [email,setE] = useState('');
  const [phone,setP] = useState('');
  const [summary,setS] = useState('');
  const [file,setF] = useState<File|null>(null);
  const [loading,setL] = useState(false);

  useEffect(()=>{
    supabase.from('jobs').select('*').eq('id', jobId).single().then(({data})=>setJob(data));
  },[jobId]);

  async function submit(){
    try{
      setL(true);
      let cv_url: string | null = null;
      if(file){
        const ext = file.name.split('.').pop() || 'pdf';
        const path = `uploads/${uuid()}.${ext}`;
        const { error: upErr } = await supabase.storage.from('cv').upload(path, file);
        if(upErr && upErr.message && !upErr.message.includes('The resource already exists')) throw upErr;
        const { data } = supabase.storage.from('cv').getPublicUrl(path);
        cv_url = data.publicUrl;
      }
      const { score, notes } = simpleScore({ requirements: job?.requirements, summary, title: job?.title });
      const { error } = await supabase.from('applications').insert({
        job_id: jobId, full_name, email, phone, summary, cv_url, status:'new', ai_score: score, ai_notes: notes
      });
      if(error) throw error;
      alert('تم الإرسال بنجاح'); window.location.href = '/';
    }catch(e:any){ console.error(e); alert('خطأ أثناء الإرسال: '+(e?.message||'')); }
    finally{ setL(false); }
  }

  return (
    <div className="card">
      <h2 className="h2" style={{marginTop:0}}>نموذج التقديم</h2>
      <div className="grid">
        <input className="input" placeholder="الاسم الكامل" value={full_name} onChange={e=>setN(e.target.value)} />
        <input className="input" placeholder="البريد" value={email} onChange={e=>setE(e.target.value)} />
        <input className="input" placeholder="الجوال" value={phone} onChange={e=>setP(e.target.value)} />
        <textarea className="textarea" placeholder="نبذة مختصرة" value={summary} onChange={e=>setS(e.target.value)} />
        <input className="input" type="file" onChange={e=>setF(e.target.files?.[0]||null)} />
        <button className="btn" onClick={submit} disabled={loading}>{loading?'...':'إرسال'}</button>
      </div>
    </div>
  );
}
