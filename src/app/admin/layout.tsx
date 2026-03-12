import "../globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <div className="flex min-h-screen justify-center">
          <div className="flex w-full max-w-3xl flex-col px-4 py-6">
            <header className="mb-4 flex items-center justify-between">
              <h1 className="text-lg font-semibold text-slate-900">
                Admin panel
              </h1>
            </header>
            <main className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

