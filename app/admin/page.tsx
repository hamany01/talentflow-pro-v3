"use client";
import { useEffect, useState } from "react";
import { getUserRoleClient, Role } from "@/lib/auth";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHome() {
  const [state, setState] = useState<{loading:boolean; role?:Role; error?:string}>({loading:true});

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setState({loading:false, error:"not-auth"}); return; }
      const role = await getUserRoleClient();
      if (!role) { setState({loading:false, error:"no-role"}); return; }
      setState({loading:false, role});
    })();
  }, []);

  if (state.loading) return <main className="p-8 text-center">جاري التحميل…</main>;

  if (!state.role || !["admin","manager","recruiter"].includes(state.role)) {
    return <main className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-2">ليس لديك صلاحية الوصول</h1>
      <p className="mb-4">سجل الدخول بحساب إداري أو اطلب ترقية الصلاحيات.</p>
      <a href="/login" className="underline">الذهاب لتسجيل الدخول</a>
    </main>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">لوحة الإدارة</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <a href="/admin/jobs" className="block p-6 rounded-xl border shadow-sm hover:shadow-md">الوظائف</a>
        <a href="/admin/reports" className="block p-6 rounded-xl border shadow-sm hover:shadow-md">التقارير</a>
        <a href="/admin/users" className="block p-6 rounded-xl border shadow-sm hover:shadow-md">المستخدمون</a>
      </div>
    </main>
  );
}
