import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minutka – Elonlar",
  description: "Mobil doska ob\"yavleniy na Supabase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="bg-orange-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
