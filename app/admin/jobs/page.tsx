import { supabase } from "@/lib/supabaseClient";

export default async function JobsAdmin(){
  const { data: jobs } = await supabase.from("jobs").select("*").order("id",{ascending:false});
  return (
    <div className="grid">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h2 className="h2" style={{margin:0}}>الوظائف</h2>
        <a className="btn" href="/admin/jobs/new">إضافة وظيفة</a>
      </div>
      <div className="grid">
        {(jobs??[]).map((j:any)=>(
          <div className="card" key={j.id}>
            <div className="row" style={{justifyContent:'space-between'}}>
              <div style={{fontSize:20,fontWeight:800}}>{j.title}</div>
              <span className="badge">{j.status ?? 'open'}</span>
            </div>
            <div style={{color:'#475569'}}>{j.location} • {j.type}</div>
            <a className="btn" href={`/admin/jobs/${j.id}`}>المرشحون</a>
          </div>
        ))}
        {(!jobs || jobs.length===0) && <div className="card center">لا توجد وظائف بعد.</div>}
      </div>
    </div>
  );
}
