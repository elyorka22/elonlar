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
    <div className="flex min-h-screen justify-center bg-[#fff5ec] pb-16">
      <div className="flex w-full max-w-md flex-col px-3 sm:max-w-lg sm:px-4 md:max-w-2xl lg:max-w-4xl">
        <Header siteName={siteName} />

        <main className="-mt-3 flex-1 rounded-t-3xl bg-[#fff5ec] px-2 pb-6 pt-4 sm:px-4">
          <div className="mb-3">
            <input
              type="search"
              placeholder="Taom, restoran yoki mahsulot izlash"
              className="w-full rounded-2xl border border-orange-100 bg-white px-4 py-2 text-xs placeholder:text-slate-400 focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
            />
          </div>

          <CategoryTabs
            categories={categories}
            activeSlug={selectedCategorySlug}
            onChange={setSelectedCategorySlug}
          />

          <section className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-gradient-to-br from-[#ff7a1a] to-[#ffb067] p-3 text-white">
              <p className="mb-1 text-xs font-semibold">Chegirma 30%</p>
              <p className="mb-2 text-[10px] opacity-90">
                Sevimli restoranlardan issiq yetkazib berish.
              </p>
              <button
                type="button"
                className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#ff7a1a]"
              >
                Aksiyani ko&apos;rish
              </button>
            </div>

            <div className="rounded-3xl bg-[#ffe9d5] p-3 text-slate-900">
              <p className="mb-1 text-xs font-semibold">Tezkor kuryer</p>
              <p className="text-[10px] text-slate-600">
                Mahsulotlarni yaqin do&apos;konlardan tez yetkazib beramiz.
              </p>
            </div>
          </section>

          <section className="mt-5">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              Do&apos;konlardan mahsulotlar
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[#e5f8e7] px-3 py-1 text-[10px] font-medium text-[#199f3c]">
                Supermarketlar
              </span>
              <span className="rounded-full bg-[#ffe9d5] px-3 py-1 text-[10px] font-medium text-[#ff7a1a]">
                Gazak va ichimliklar
              </span>
              <span className="rounded-full bg-[#e3edff] px-3 py-1 text-[10px] font-medium text-[#3760ff]">
                Maishiy tovarlar
              </span>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-slate-900">
              Mashhur e&apos;lonlar
            </h2>

            {isLoading && (
              <p className="text-xs text-slate-500">Yuklanmoqda...</p>
            )}

            {!isLoading && selectedAds.length === 0 && (
              <p className="text-xs text-slate-500">
                Hozircha bu yerda e&apos;lonlar yo&apos;q.
              </p>
            )}

            <div className="mt-2 flex flex-col gap-3">
              {selectedAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} />
              ))}
            </div>
          </section>
        </main>

        <BottomNav activeKey="home" />
      </div>
    </div>
  );
}

