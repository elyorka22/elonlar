import React from "react";

type NavItem = {
  key: string;
  label: string;
};

const items: NavItem[] = [
  { key: "home", label: "Bosh sahifa" },
  { key: "restaurants", label: "Restoranlar" },
  { key: "products", label: "Mahsulotlar" },
  { key: "cart", label: "Savat" },
  { key: "profile", label: "Profil" },
];

type BottomNavProps = {
  activeKey?: string;
};

export function BottomNav({ activeKey = "home" }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-orange-100 bg-white/95 py-1">
      <div className="mx-auto flex w-full max-w-md items-center justify-between px-3 text-xs sm:max-w-lg sm:px-4 md:max-w-2xl lg:max-w-4xl">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-1 py-1 ${
                isActive ? "text-[#ff7a1a]" : "text-slate-500"
              }`}
            >
              <span
                className={`mb-0.5 h-1 w-6 rounded-full ${
                  isActive ? "bg-[#ff7a1a]" : "bg-transparent"
                }`}
              />
              <span className="whitespace-nowrap text-[10px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

