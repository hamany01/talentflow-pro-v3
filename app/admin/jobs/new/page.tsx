"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [deptId, setDeptId] = useState<number | null>(null);
  const [locationTxt, setLocationTxt] = useState("");
  const [type, setType] = useState("دوام كامل");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  useEffect(() => {
    // حماية الصفحة: لازم تسجيل دخول + دور مناسب
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login?reason=auth"); return; }

      // ملاحظة: جدول profiles مرفوع في bootstrap_pro_v3.sql ومعرفته id = user.id
      const { data: prof } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id) // لا تستخدم user_id — المخطط الجديد يعتمد id مباشرة
        .maybeSingle();

      const role = prof?.role || "viewer";
      if (!["admin", "recruiter", "manager"].includes(role)) {
        router.push("/login?reason=role");
      }
    })();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("jobs")
      .insert([{
        title,
        dept_id: deptId,
        location: locationTxt,
        type,
        description,
        requirements
      }])
      .select()
      .maybeSingle();

    if (error) {
      alert("حدث خطأ أثناء إضافة الوظيفة: " + error.message);
      return;
    }

    // التوجيه لصفحة الوظائف
    router.push("/admin/jobs");
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center py-10">
      <div className="w-full max-w-3xl bg-white border rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">إضافة وظيفة جديدة</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">المسمى الوظيفي</label>
            <input
              className="w-full border rounded-xl p-3 text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: مشرف إنتاج"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">القسم (ID)</label>
              <input
                type="number"
                className="w-full border rounded-xl p-3 text-gray-900"
                value={deptId ?? ""}
                onChange={(e) => setDeptId(e.target.value ? Number(e.target.value) : null)}
                placeholder="مثال: 3"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">الموقع</label>
              <input
                className="w-full border rounded-xl p-3 text-gray-900"
                value={locationTxt}
                onChange={(e) => setLocationTxt(e.target.value)}
                placeholder="مثال: جدة"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">نوع العمل</label>
              <select
                className="w-full border rounded-xl p-3 text-gray-900 bg-white"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>دوام كامل</option>
                <option>دوام جزئي</option>
                <option>عقد</option>
                <option>مرن</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">الوصف</label>
            <textarea
              className="w-full border rounded-xl p-3 text-gray-900"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أكتب الوصف الوظيفي هنا..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">المتطلبات</label>
            <textarea
              className="w-full border rounded-xl p-3 text-gray-900"
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="ضع المهارات والمؤهلات المطلوبة..."
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-3 rounded-xl border text-white bg-black hover:opacity-90"
            >
              حفظ الوظيفة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
