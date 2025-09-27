import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'TalentFlow Pro v3',
  description: 'منصة توظيف',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl flex items-center justify-between gap-3 p-4">
            <Link href="/" className="text-2xl font-extrabold text-blue-900">
              TalentFlow Pro
            </Link>

            <nav className="flex items-center gap-2">
              <Link href="/jobs" className="px-3 py-2 rounded-md border hover:bg-gray-50">
                الوظائف
              </Link>
              <Link href="/admin" className="px-3 py-2 rounded-md border hover:bg-gray-50">
                الإدارة
              </Link>
              <Link href="/login" className="px-3 py-2 rounded-md border hover:bg-gray-50">
                تسجيل الدخول
              </Link>
              {/* يظهر دائمًا */}
              <Link
                href="/logout"
                className="px-3 py-2 rounded-md border border-red-400 text-red-600 hover:bg-red-50"
              >
                تسجيل الخروج
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
