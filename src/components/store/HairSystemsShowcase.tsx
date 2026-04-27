import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const filters = {
  baseType: ["Mono", "Lace", "Silk"],
  size: ["7x5", "10x8"],
  density: ["Light", "Medium", "Heavy"],
  color: ["Black", "Brown", "Grey"],
};

type FilterKey = keyof typeof filters;

const HairSystemsShowcase = () => {
  const [selected, setSelected] = useState<Record<FilterKey, string[]>>({ baseType: [], size: [], density: [], color: [] });

  const toggle = (key: FilterKey, value: string) => {
    setSelected((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value],
    }));
  };

  const visibleProducts = useMemo(() => {
    return products
      .filter((product) => product.category === "Hair Systems")
      .filter((product) =>
        (selected.baseType.length === 0 || selected.baseType.includes(product.baseType || "")) &&
        (selected.size.length === 0 || selected.size.includes(product.size || "")) &&
        (selected.density.length === 0 || selected.density.includes(product.density || "")) &&
        (selected.color.length === 0 || selected.color.includes(product.color || ""))
      )
      .slice(0, 12);
  }, [selected]);

  return (
    <section className="py-10 md:py-12 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase">Explore Hair Systems</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <aside className="border border-border rounded p-5 h-fit lg:sticky lg:top-28 bg-background shadow-card">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg font-semibold">Filters</h3>
              <button onClick={() => setSelected({ baseType: [], size: [], density: [], color: [] })} className="font-body text-xs text-gold hover:text-gold-dark">
                Clear
              </button>
            </div>
            {Object.entries(filters).map(([key, values]) => (
              <div key={key} className="mb-5 last:mb-0">
                <h4 className="font-body text-xs font-bold uppercase tracking-wide mb-3">{key === "baseType" ? "Base type" : key}</h4>
                <div className="space-y-2">
                  {values.map((value) => (
                    <label key={value} className="flex items-center gap-2 font-body text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                      <input type="checkbox" checked={selected[key as FilterKey].includes(value)} onChange={() => toggle(key as FilterKey, value)} className="accent-[hsl(var(--gold))]" />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </aside>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {visibleProducts.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairSystemsShowcase;
