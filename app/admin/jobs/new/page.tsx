"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NewJob() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (typeof window !== "undefined") window.location.href="/login?reason=auth"; return; }
      const { data: prof } = await supabase.from("profiles").select("role").eq("user_id", user.id).maybeSingle();
      const role = prof?.role ?? "viewer";
      if (!["admin","manager","recruiter"].includes(role)) {
        if (typeof window !== "undefined") window.location.href="/login?reason=role";
        return;
      }
      setOk(true);
    })();
  }, []);

  if (!ok) return <main className="p-8 text-center">جاري التحقق…</main>;
  return <main className="max-w-3xl mx-auto p-6">نموذج إضافة وظيفة (جاهز لتعبئته)</main>;
}
