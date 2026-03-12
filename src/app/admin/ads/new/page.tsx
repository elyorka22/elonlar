"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { AdminGuard } from "@/components/AdminGuard";

type Category = {
  id: string;
  title: string;
};

export default function NewAdPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      const { data } = await supabase
        .from("categories")
        .select("id, title")
        .order("title", { ascending: true });

      if (data) {
        const normalized = data.map((category) => ({
          id: category.id,
          title: category.title,
        }));
        setCategories(normalized);
        if (normalized.length > 0) {
          setCategoryId(normalized[0].id);
        }
      }
    }

    loadCategories();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const priceNumber = price ? Number(price) : null;

    await supabase.from("ads").insert({
      title,
      description,
      price: priceNumber,
      city,
      category_id: categoryId,
      is_published: false,
    });

    router.push("/admin/ads");
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Yangi e&apos;lon
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Sarlavha
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Tavsif
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Narx (so&apos;m)
              </label>
              <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-slate-700">
                Shahar
              </label>
              <input
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Kategoriya
            </label>
            <select
              value={categoryId ?? ""}
              onChange={(event) => setCategoryId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#ff6a00]"
          >
            Saqlash
          </button>
        </form>
      </div>
    </AdminGuard>
  );
}

