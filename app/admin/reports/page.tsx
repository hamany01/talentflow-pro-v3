'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Reports(){
  const [jobsCount,setJC]=useState(0);
  const [appsCount,setAC]=useState(0);
  const [top,setTop]=useState<any[]>([]);
  const [jobId,setJobId]=useState<number|undefined>(undefined);

  useEffect(()=>{
    (async()=>{
      const jobs = await supabase.from('jobs').select('*', { count:'exact', head:true });
      setJC(jobs.count||0);
      const apps = await supabase.from('applications').select('*', { count:'exact', head:true });
      setAC(apps.count||0);
      const q = supabase.from('applications').select('id,full_name,ai_score,job_id').order('ai_score',{ascending:false}).limit(10);
      const { data } = await q;
      setTop(data||[]);
    })();
  },[]);

  async function exportCSV(){
    const { data } = await supabase.from('applications').select('*').order('id',{ascending:false});
    const rows = data||[];
    const cols = ['id','job_id','full_name','email','phone','ai_score','status','cv_url','created_at'];
    const csv = [cols.join(',')].concat(rows.map(r=>cols.map(c=>JSON.stringify(r[c]??'')).join(','))).join('\n');
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'applications.csv'; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="grid">
      <div className="row" style={{gap:14}}>
        <div className="card" style={{flex:'1 1 220px'}}>
          <div className="h2" style={{fontSize:20}}>عدد الوظائف</div>
          <div style={{fontSize:36,fontWeight:900}}>{jobsCount}</div>
        </div>
        <div className="card" style={{flex:'1 1 220px'}}>
          <div className="h2" style={{fontSize:20}}>عدد الطلبات</div>
          <div style={{fontSize:36,fontWeight:900}}>{appsCount}</div>
        </div>
      </div>
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div className="h2" style={{marginTop:0}}>أفضل 10 مرشحين (حسب AI)</div>
          <button className="btn" onClick={exportCSV}>تصدير CSV</button>
        </div>
        {(!top || top.length===0) ? 'لا توجد بيانات بعد.' : (
          <table className="table">
            <thead><tr><th>المرشح</th><th>الوظيفة</th><th>الملاءمة</th></tr></thead>
            <tbody>{top.map((x:any)=>(<tr key={x.id}><td>{x.full_name}</td><td>#{x.job_id}</td><td>{x.ai_score ?? '-'}</td></tr>))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
