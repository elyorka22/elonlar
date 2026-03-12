"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { CategoryTabs, CategoryTab } from "@/components/CategoryTabs";
import { AdCard, Ad } from "@/components/AdCard";

type SiteSettings = {
  site_name: string;
};

export default function HomeClient() {
  const [siteName, setSiteName] = useState<string>("Minutka");
  const [categories, setCategories] = useState<CategoryTab[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const [{ data: settingsData }, { data: categoriesData }, { data: adsData }] =
        await Promise.all([
          supabase.from("site_settings").select("site_name").limit(1).maybeSingle(),
          supabase
            .from("categories")
            .select("id, slug, title")
            .order("title", { ascending: true }),
          supabase
            .from("ads")
            .select("id, title, description, price, city, category_id")
            .eq("is_published", true)
            .order("created_at", { ascending: false }),
        ]);

      if (settingsData?.site_name) {
        setSiteName(settingsData.site_name);
      }

      if (categoriesData) {
        const normalizedCategories: CategoryTab[] = categoriesData.map((category) => ({
          id: category.id,
          slug: category.slug,
          title: category.title,
        }));
        setCategories(normalizedCategories);
        if (normalizedCategories.length > 0) {
          setSelectedCategorySlug(normalizedCategories[0].slug);
        }
      }

      if (adsData) {
        const normalizedAds: Ad[] = adsData.map((ad) => ({
          id: ad.id,
          title: ad.title,
          description: ad.description ?? null,
          price: ad.price ?? null,
          city: ad.city ?? null,
        }));
        setAds(normalizedAds);
      }

      setIsLoading(false);
    }

    loadData();
  }, []);

  const selectedAds = (() => {
    if (!selectedCategorySlug) {
      return ads;
    }

    const selectedCategory = categories.find(
      (category) => category.slug === selectedCategorySlug
    );

    if (!selectedCategory) {
      return ads;
    }

    return ads;
  })();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 pb-16">
      <Header siteName={siteName} />

      <div className="flex flex-1 justify-center">
        <main className="flex w-full max-w-6xl flex-col gap-6 px-3 pt-4 sm:px-6 lg:px-8 lg:pt-6">
          {/* Hero */}
          <section className="grid gap-4 rounded-3xl bg-gradient-to-r from-[#ff7a1a] to-[#ffb067] p-4 text-white shadow-sm sm:p-6 lg:grid-cols-[1.6fr,1.2fr] lg:p-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  Mahalliy yetkazib berish
                </p>
                <h1 className="mt-1 text-xl font-semibold leading-tight sm:text-2xl lg:text-3xl">
                  Toping va buyurtma qiling sevimli taom va mahsulotlarni bir
                  joyda.
                </h1>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur sm:flex-row sm:items-center sm:gap-4">
                <div className="flex-1">
                  <input
                    type="search"
                    placeholder="Taom, restoran yoki mahsulot izlash"
                    className="w-full rounded-2xl border border-white/30 bg-white/90 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm sm:text-sm"
                >
                  Qidirish
                </button>
              </div>

              <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  30 daqiqada yetkazib berish
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-medium">
                  0 so&apos;m minimal buyurtma
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-medium">
                  Do&apos;konlar va restoranlar bir joyda
                </span>
              </div>
            </div>

            <div className="hidden flex-col justify-between rounded-2xl bg-white/10 p-4 text-sm sm:flex lg:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
                  Aksiya
                </p>
                <p className="mt-1 text-lg font-semibold">
                  Chegirma 30% har kuni sevimli restoranlarda.
                </p>
              </div>
              <p className="mt-3 text-xs opacity-90">
                Tanlangan restoranlardan issiq taomlarni tez va qulay yetkazib
                beramiz. Birinchi buyurtmangiz uchun qo&apos;shimcha bonuslar.
              </p>
            </div>
          </section>

          {/* Категории и фильтры */}
          <section className="space-y-3">
            <CategoryTabs
              categories={categories}
              activeSlug={selectedCategorySlug}
              onChange={setSelectedCategorySlug}
            />

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#e5f8e7] px-3 py-1 text-xs font-medium text-[#199f3c] sm:text-sm">
                Tez yetkazib berish
              </span>
              <span className="rounded-full bg-[#ffe9d5] px-3 py-1 text-xs font-medium text-[#ff7a1a] sm:text-sm">
                Chegirmadagi taomlar
              </span>
              <span className="rounded-full bg-[#e3edff] px-3 py-1 text-xs font-medium text-[#3760ff] sm:text-sm">
                24/7 ochiq
              </span>
            </div>
          </section>

          {/* Список объявлений */}
          <section className="flex flex-col gap-3 rounded-3xl bg-white p-3 shadow-sm sm:p-4 lg:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                Mashhur e&apos;lonlar
              </h2>
              <p className="text-[11px] text-slate-500 sm:text-xs">
                {ads.length > 0
                  ? `${ads.length} ta e&apos;lon topildi`
                  : "E&apos;lonlar hali yo&apos;q"}
              </p>
            </div>

            {isLoading && (
              <p className="text-xs text-slate-500">Yuklanmoqda...</p>
            )}

            {!isLoading && selectedAds.length === 0 && (
              <p className="text-xs text-slate-500">
                Hozircha bu yerda e&apos;lonlar yo&apos;q.
              </p>
            )}

            <div className="mt-1 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectedAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <BottomNav activeKey="home" />
    </div>
  );
}

