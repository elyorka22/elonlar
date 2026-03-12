import React from "react";

type HeaderProps = {
  siteName: string;
};

export function Header({ siteName }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-b from-[#ff7a1a] to-[#ff9450] text-white">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-3 pt-4 pb-3 sm:max-w-lg sm:px-4 md:max-w-2xl lg:max-w-4xl">
        <div className="flex flex-col">
          <span className="text-sm font-medium opacity-90">Minutka</span>
          <span className="text-lg font-semibold">{siteName}</span>
        </div>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </button>
      </div>
    </header>
  );
}

