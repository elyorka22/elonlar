import React from "react";

export type Ad = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  city: string | null;
};

type AdCardProps = {
  ad: Ad;
};

export function AdCard({ ad }: AdCardProps) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="line-clamp-1 text-sm font-semibold text-slate-900">
          {ad.title}
        </h3>
        {typeof ad.price === "number" && (
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-[#ff7a1a]">
            {ad.price} soʻm
          </span>
        )}
      </div>
      {ad.description && (
        <p className="mb-2 line-clamp-2 text-[11px] text-slate-600">
          {ad.description}
        </p>
      )}
      {ad.city && (
        <p className="text-[10px] font-medium text-slate-500">{ad.city}</p>
      )}
    </article>
  );
}

