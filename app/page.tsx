import { supabase } from "@/lib/supabaseClient";

export default async function Home(){
  const { data: jobs } = await supabase.from("jobs").select("id,title,location,type,description").order("id",{ascending:false});
  return (
    <main>
      <div className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2 className="h2" style={{margin:0}}>الوظائف المتاحة</h2>
          <a className="btn" href="/admin/jobs">لوحة التوظيف</a>
        </div>
        <div className="grid" style={{marginTop:12}}>
          {(jobs??[]).map((j:any)=>(
            <div className="card" key={j.id}>
              <div className="row" style={{justifyContent:'space-between'}}>
                <div style={{fontSize:22,fontWeight:800}}>{j.title}</div>
                <span className="badge">{j.type ?? 'دوام كامل'}</span>
              </div>
              <div style={{color:'#475569',margin:'6px 0'}}>{j.location ?? ''}</div>
              <p style={{margin:0}}>{j.description ?? ''}</p>
              <div style={{marginTop:10}}>
                <a className="btn" href={`/jobs/${j.id}`}>التفاصيل</a>
              </div>
            </div>
          ))}
          {(!jobs || jobs.length===0) && <div className="center" style={{padding:24}}>لا توجد وظائف بعد.</div>}
        </div>
      </div>
    </main>
  );
}
