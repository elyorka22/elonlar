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
    <div className="flex min-h-screen justify-center bg-slate-50 pb-16">
      <div className="flex w-full max-w-6xl flex-col px-3 sm:px-6 lg:px-8">
        <Header siteName={siteName} />

        <main className="mt-4 grid flex-1 gap-6 rounded-3xl bg-[#fff5ec] p-3 shadow-sm sm:p-4 lg:grid-cols-[2fr,1.25fr] lg:p-6">
          {/* Левая колонка: поиск, категории, список объявлений */}
          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-4">
              <div className="flex-1">
                <input
                  type="search"
                  placeholder="Taom, restoran yoki mahsulot izlash"
                  className="w-full rounded-2xl border border-orange-100 bg-slate-50 px-4 py-2 text-xs sm:text-sm placeholder:text-slate-400 focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
                />
              </div>
            </div>

            <CategoryTabs
              categories={categories}
              activeSlug={selectedCategorySlug}
              onChange={setSelectedCategorySlug}
            />

            <div className="mt-1 flex-1 rounded-2xl bg-white p-3 shadow-sm lg:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                  Mashhur e&apos;lonlar
                </h2>
              </div>

              {isLoading && (
                <p className="text-xs text-slate-500">Yuklanmoqda...</p>
              )}

              {!isLoading && selectedAds.length === 0 && (
                <p className="text-xs text-slate-500">
                  Hozircha bu yerda e&apos;lonlar yo&apos;q.
                </p>
              )}

              <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {selectedAds.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            </div>
          </section>

          {/* Правая колонка: промо и быстрые категории */}
          <aside className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl bg-gradient-to-br from-[#ff7a1a] to-[#ffb067] p-4 text-white shadow-sm">
                <p className="mb-1 text-sm font-semibold">Chegirma 30%</p>
                <p className="mb-3 text-xs opacity-90 lg:text-sm">
                  Sevimli restoranlardan issiq yetkazib berish.
                </p>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#ff7a1a]"
                >
                  Aksiyani ko&apos;rish
                </button>
              </div>

              <div className="rounded-3xl bg-[#ffe9d5] p-4 text-slate-900 shadow-sm">
                <p className="mb-1 text-sm font-semibold">Tezkor kuryer</p>
                <p className="text-xs text-slate-700 lg:text-sm">
                  Mahsulotlarni yaqin do&apos;konlardan tez yetkazib beramiz.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-3 shadow-sm lg:p-4">
              <h2 className="mb-2 text-sm font-semibold text-slate-900 sm:text-base">
                Do&apos;konlardan mahsulotlar
              </h2>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-[#e5f8e7] px-3 py-1 text-xs font-medium text-[#199f3c] sm:text-sm">
                  Supermarketlar
                </span>
                <span className="rounded-full bg-[#ffe9d5] px-3 py-1 text-xs font-medium text-[#ff7a1a] sm:text-sm">
                  Gazak va ichimliklar
                </span>
                <span className="rounded-full bg-[#e3edff] px-3 py-1 text-xs font-medium text-[#3760ff] sm:text-sm">
                  Maishiy tovarlar
                </span>
              </div>
            </div>
          </aside>
        </main>

        <BottomNav activeKey="home" />
      </div>
    </div>
  );
}

