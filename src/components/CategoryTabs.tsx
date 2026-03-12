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
    <div className="mt-4 flex gap-2 rounded-full bg-white p-1 shadow-sm">
      {categories.map((category) => {
        const isActive = activeSlug === category.slug;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.slug)}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium ${
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

