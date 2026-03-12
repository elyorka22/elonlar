"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminGuard } from "@/components/AdminGuard";

type Settings = {
  id: string;
  site_name: string;
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [siteName, setSiteName] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase
        .from("site_settings")
        .select("id, site_name")
        .limit(1)
        .maybeSingle();

      if (data) {
        setSettings(data);
        setSiteName(data.site_name);
      }
    }

    loadSettings();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!settings) {
      return;
    }

    const { error } = await supabase
      .from("site_settings")
      .update({ site_name: siteName })
      .eq("id", settings.id);

    if (error) {
      setMessage("Saqlashda xatolik yuz berdi.");
      return;
    }

    setMessage("Sozlamalar saqlandi.");
  }

  return (
    <AdminGuard>
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-slate-900">
          Sayt sozlamalari
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-700">
              Sayt nomi (headerdagi nom)
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#ff7a1a] focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]/30"
              placeholder="Minutka"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-[#ff7a1a] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#ff6a00]"
          >
            Saqlash
          </button>

          {message && (
            <p className="text-xs text-slate-500" aria-live="polite">
              {message}
            </p>
          )}
        </form>
      </div>
    </AdminGuard>
  );
}

