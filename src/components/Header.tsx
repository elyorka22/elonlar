import React from "react";

type HeaderProps = {
  siteName: string;
};

export function Header({ siteName }: HeaderProps) {
  return (
    <header className="w-full bg-[#ff7a1a] text-white shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 text-white shadow-sm">
            <span className="text-xs font-bold">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide">
              Elonlar.uz
            </span>
            <span className="text-sm font-semibold sm:text-base">
              {siteName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#ff7a1a] hover:bg-orange-50 sm:inline-flex"
          >
            E&apos;lon qo&apos;shish
          </button>
          <button
            type="button"
            className="flex h-9 w-20 items-center justify-center rounded-full bg-white/10 text-xs font-semibold shadow-sm sm:w-24"
          >
            Kirish
          </button>
        </div>
      </div>
    </header>
  );
}

