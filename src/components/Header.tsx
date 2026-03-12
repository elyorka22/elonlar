import React from "react";

type HeaderProps = {
  siteName: string;
};

export function Header({ siteName }: HeaderProps) {
  return (
    <header className="w-full border-b border-orange-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7a1a] to-[#ffb067] text-white shadow-sm">
            <span className="text-xs font-bold">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#ff7a1a]">
              Elonlar.uz
            </span>
            <span className="text-sm font-semibold text-slate-900 sm:text-base">
              {siteName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-orange-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#ff7a1a] hover:text-[#ff7a1a] sm:inline-flex"
          >
            E&apos;lon qo&apos;shish
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-100 bg-white text-xs font-semibold text-slate-700 shadow-sm"
          >
            Uz
          </button>
        </div>
      </div>
    </header>
  );
}

