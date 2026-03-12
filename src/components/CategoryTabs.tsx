import React from "react";

export type CategoryTab = {
  id: string;
  slug: string;
  title: string;
};

type CategoryTabsProps = {
  categories: CategoryTab[];
  activeSlug: string | null;
  onChange: (slug: string | null) => void;
};

export function CategoryTabs({
  categories,
  activeSlug,
  onChange,
}: CategoryTabsProps) {
  return (
    <div className="mt-4 flex gap-2 overflow-x-auto rounded-full bg-white p-1 shadow-sm">
      {categories.map((category) => {
        const isActive = activeSlug === category.slug;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.slug)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:text-sm ${
              isActive
                ? "bg-[#ff7a1a] text-white shadow"
                : "bg-transparent text-slate-700"
            }`}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}

