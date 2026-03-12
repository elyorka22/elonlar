"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminGuard } from "@/components/AdminGuard";

type AdRow = {
  id: string;
  title: string;
  is_published: boolean;
};

export default function AdminAdsPage() {
  const [ads, setAds] = useState<AdRow[]>([]);

  useEffect(() => {
    async function loadAds() {
      const { data } = await supabase
        .from("ads")
        .select("id, title, is_published")
        .order("created_at", { ascending: false });

      if (data) {
        setAds(
          data.map((ad) => ({
            id: ad.id,
            title: ad.title,
            is_published: ad.is_published,
          }))
        );
      }
    }

    loadAds();
  }, []);

  async function togglePublished(id: string, current: boolean) {
    await supabase
      .from("ads")
      .update({ is_published: !current })
      .eq("id", id);

    setAds((previous) =>
      previous.map((ad) =>
        ad.id === id ? { ...ad, is_published: !current } : ad
      )
    );
  }

  async function removeAd(id: string) {
    await supabase.from("ads").delete().eq("id", id);
    setAds((previous) => previous.filter((ad) => ad.id !== id));
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold text-slate-900">
            E&apos;lonlar
          </h2>
          <a
            href="/admin/ads/new"
            className="rounded-full bg-[#ff7a1a] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[#ff6a00]"
          >
            Yangi e&apos;lon
          </a>
        </div>

        <div className="space-y-2 text-xs">
          {ads.length === 0 && (
            <p className="text-slate-500">
              Hozircha e&apos;lonlar yo&apos;q. Yangi e&apos;lon qo&apos;shing.
            </p>
          )}

          {ads.map((ad) => (
            <div
              key={ad.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2"
            >
              <div>
                <p className="line-clamp-1 text-sm font-medium text-slate-900">
                  {ad.title}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {ad.is_published ? "Aktiv" : "Chernovik"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => togglePublished(ad.id, ad.is_published)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-700"
                >
                  {ad.is_published ? "O‘chirish" : "Aktivlash"}
                </button>
                <a
                  href={`/admin/ads/${ad.id}`}
                  className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white"
                >
                  Tahrirlash
                </a>
                <button
                  type="button"
                  onClick={() => removeAd(ad.id)}
                  className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600"
                >
                  O&apos;chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminGuard>
  );
}

