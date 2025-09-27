'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Logout() {
  useEffect(() => {
    (async () => {
      try {
        await supabase.auth.signOut();
      } catch {}
      // احتياطًا امسح مفاتيح supabase من التخزين المحلي
      Object.keys(localStorage)
        .filter((k) => k.startsWith('sb-'))
        .forEach((k) => localStorage.removeItem(k));
      window.location.replace('/'); // رجوع للصفحة الرئيسية
    })();
  }, []);

  return <div style={{padding:24, fontSize:18}}>جاري تسجيل الخروج…</div>;
}
