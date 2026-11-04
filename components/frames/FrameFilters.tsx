"use client";

export interface FilterState {
  gender: string;
  shape: string;
  color: string;
  material: string;
  price: string;
  style: string;
}

export const EMPTY_FILTERS: FilterState = {
  gender: "",
  shape: "",
  color: "",
  material: "",
  price: "",
  style: "",
};

const GROUPS: { key: keyof FilterState; label: string; options: { id: string; label: string }[] }[] = [
  {
    key: "gender",
    label: "Designed for",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "unisex", label: "Unisex" },
    ],
  },
  {
    key: "shape",
    label: "Shape",
    options: [
      { id: "round", label: "Round" },
      { id: "square", label: "Square" },
      { id: "rectangle", label: "Rectangle" },
      { id: "aviator", label: "Aviator" },
      { id: "geometric", label: "Geometric" },
    ],
  },
  {
    key: "color",
    label: "Color",
    options: [
      { id: "black", label: "Black" },
      { id: "tortoise", label: "Tortoise" },
      { id: "clear", label: "Clear" },
      { id: "metal", label: "Metal" },
      { id: "colorful", label: "Colorful" },
    ],
  },
  {
    key: "material",
    label: "Material",
    options: [
      { id: "acetate", label: "Acetate" },
      { id: "metal", label: "Metal" },
      { id: "titanium", label: "Titanium" },
      { id: "mixed", label: "Mixed" },
    ],
  },
  {
    key: "price",
    label: "Price",
    options: [
      { id: "under-250", label: "Under $250" },
      { id: "250-400", label: "$250–$400" },
      { id: "400-600", label: "$400–$600" },
      { id: "600-plus", label: "$600+" },
    ],
  },
  {
    key: "style",
    label: "Style",
    options: [
      { id: "classic", label: "Classic" },
      { id: "bold", label: "Bold" },
      { id: "minimal", label: "Minimal" },
      { id: "luxury", label: "Luxury" },
      { id: "sport", label: "Sport" },
    ],
  },
];

export function FrameFilters({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  return (
    <div className="space-y-6">
      {GROUPS.map((group) => (
        <fieldset key={group.key}>
          <legend className="text-xs tracking-[0.18em] text-stone uppercase">{group.label}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.options.map((option) => {
              const active = value[group.key] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...value,
                      [group.key]: active ? "" : option.id,
                    })
                  }
                  className={`min-h-11 min-w-11 px-3 text-sm md:min-h-12 ${
                    active ? "bg-ink text-ivory" : "bg-cream text-charcoal"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
