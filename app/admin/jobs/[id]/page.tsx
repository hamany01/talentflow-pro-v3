import { supabase } from "@/lib/supabaseClient";

export default async function Applicants({ params }: { params:{ id:string }}){
  const id = Number(params.id);
  const [{ data: job }, { data: apps }] = await Promise.all([
    supabase.from('jobs').select('*').eq('id', id).single(),
    supabase.from('applications').select('*').eq('job_id', id).order('id',{ascending:false})
  ]);
  return (
    <div className="grid">
      <div className="card">
        <h2 className="h2" style={{marginTop:0}}>مرشحو الوظيفة #{id} — {job?.title ?? ''}</h2>
        {(!apps || apps.length===0) ? (
          <div>لا يوجد مرشحون بعد.</div>
        ) : (
          <table className="table">
            <thead>
              <tr><th>الاسم</th><th>الحالة</th><th>ملاءمة AI</th><th>السيرة</th><th>ملاحظات</th></tr>
            </thead>
            <tbody>
              {apps?.map((a:any)=>(
                <tr key={a.id}>
                  <td>{a.full_name}</td>
                  <td><span className="badge">{a.status}</span></td>
                  <td>{a.ai_score ?? "-"}</td>
                  <td>{a.cv_url ? <a target="_blank" href={a.cv_url}>فتح</a> : "-"}</td>
                  <td>{a.ai_notes ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
