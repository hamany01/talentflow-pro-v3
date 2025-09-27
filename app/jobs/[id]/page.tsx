import { supabase } from "@/lib/supabaseClient";

export default async function Job({ params }: { params:{ id:string }}){
  const id = Number(params.id);
  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single();
  if(!job) return <div className="card">الوظيفة غير موجودة</div>;
  return (
    <div className="grid">
      <div className="card">
        <h2 className="h2" style={{marginTop:0}}>{job.title}</h2>
        <div style={{color:'#475569'}}>{job.location} • {job.type}</div>
        <p>{job.description}</p>
        <div style={{whiteSpace:'pre-wrap'}}>{job.requirements}</div>
        <div style={{marginTop:10}}>
          <a className="btn" href={`/apply/${job.id}`}>التقديم على الوظيفة</a>
        </div>
      </div>
    </div>
  );
}
