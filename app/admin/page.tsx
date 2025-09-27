'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Admin(){
  const [role,setRole] = useState<string>('');
  useEffect(()=>{
    supabase.auth.getUser().then(async ({ data:{ user }})=>{
      if(!user){ location.href='/login?reason=auth'; return; }
      const { data: prof } = await supabase.from('profiles').select('role').eq('user_id', user.id).maybeSingle();
      const r = prof?.role || 'viewer';
      setRole(r);
      if(!['admin','recruiter','manager'].includes(r)) location.href='/login?reason=role';
    });
  },[]);

  return (
    <div className="grid">
      <div className="card">
        <h2 className="h2" style={{marginTop:0}}>لوحة الإدارة</h2>
        <div className="grid">
          <a className="btn" href="/admin/jobs">إدارة الوظائف</a>
          <a className="btn" href="/admin/reports">التقارير</a>
          <a className="btn" href="/admin/users">المستخدمون والصلاحيات</a>
        </div>
        <div className="hr" />
        <div>دورك الحالي: <strong>{role||'-'}</strong></div>
      </div>
    </div>
  );
}
