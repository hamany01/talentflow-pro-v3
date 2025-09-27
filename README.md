# TalentFlow Pro v3

## متغيرات البيئة (Vercel)
- `NEXT_PUBLIC_SUPABASE_URL` = رابط Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key

## إعداد قاعدة البيانات
شغّل محتويات `supabase/bootstrap_pro_v3.sql` في Supabase → SQL Editor

## مسارات
- `/` الوظائف
- `/jobs/[id]` التفاصيل
- `/apply/[jobId]` التقديم + رفع CV + AI Score
- `/login` دخول/خروج (سحري/كلمة مرور)
- `/admin` لوحة
- `/admin/jobs`, `/admin/jobs/new`, `/admin/jobs/[id]`
- `/admin/reports`
- `/admin/users` إدارة أدوار
