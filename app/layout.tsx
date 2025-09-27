import "./globals.css";

export const metadata = {
  title: "TalentFlow Pro v3",
  description: "منصة توظيف احترافية — أدوار وصلاحيات وAI وتقارير"
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="ar" dir="rtl">
      <body>
        <div className="container">
          <header className="row" style={{justifyContent:'space-between', marginBottom:16}}>
            <h1 className="h1" style={{fontSize:34}}>TalentFlow Pro</h1>
            <nav className="row" style={{gap:8}}>
              <a className="btn" href="/">الوظائف</a>
              <a className="btn" href="/admin">الإدارة</a>
              <a className="btn" href="/login">تسجيل الدخول</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

<a href="/logout" className="px-3 py-2 rounded-md border hover:bg-gray-100">تسجيل الخروج</a>

