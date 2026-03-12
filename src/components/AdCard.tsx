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
    <article className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 sm:text-base">
          {ad.title}
        </h3>
        {typeof ad.price === "number" && (
          <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-[#ff7a1a] sm:px-3">
            {ad.price} soʻm
          </span>
        )}
      </div>
      {ad.description && (
        <p className="mb-2 line-clamp-3 text-[12px] text-slate-600 sm:text-[13px]">
          {ad.description}
        </p>
      )}
      {ad.city && (
        <p className="mt-auto text-[11px] font-medium text-slate-500 sm:text-xs">
          {ad.city}
        </p>
      )}
    </article>
  );
}

