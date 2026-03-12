"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminGuard } from "@/components/AdminGuard";

type Stats = {
  totalAds: number;
  publishedAds: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function loadStats() {
      const [{ count: total }, { count: published }] = await Promise.all([
        supabase
          .from("ads")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("ads")
          .select("id", { count: "exact", head: true })
          .eq("is_published", true),
      ]);

      setStats({
        totalAds: total ?? 0,
        publishedAds: published ?? 0,
      });
    }

    loadStats();
  }, []);

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Boshqaruv paneli
        </h2>
        <p className="text-xs text-slate-500">
          Bu yerda e&apos;lonlar va sayt sozlamalarini boshqarishingiz mumkin.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#fff5ec] p-3">
            <p className="text-[11px] font-medium text-slate-500">
              Jami e&apos;lonlar
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#ff7a1a]">
              {stats ? stats.totalAds : "-"}
            </p>
          </div>
          <div className="rounded-2xl bg-[#e5f8e7] p-3">
            <p className="text-[11px] font-medium text-slate-500">
              Aktiv e&apos;lonlar
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#199f3c]">
              {stats ? stats.publishedAds : "-"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <a
            href="/admin/ads"
            className="rounded-full bg-[#ff7a1a] px-4 py-2 font-semibold text-white"
          >
            E&apos;lonlarni boshqarish
          </a>
          <a
            href="/admin/settings"
            className="rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-700"
          >
            Sayt sozlamalari
          </a>
        </div>
      </div>
    </AdminGuard>
  );
}

