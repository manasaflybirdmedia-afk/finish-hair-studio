import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import AnnouncementBar from "@/components/store/AnnouncementBar";
import Header from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppButton from "@/components/store/WhatsAppButton";
import ProductCard from "@/components/store/ProductCard";
import { products, categories } from "@/data/products";

const filterGroups = {
  baseType: ["Mono", "Lace", "Silk"],
  size: ["7x5", "10x8"],
  density: ["Light", "Medium", "Heavy"],
  color: ["Black", "Brown", "Grey"],
};

type FilterKey = keyof typeof filterGroups;

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const subFilter = searchParams.get("sub");
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "Hair Systems");
  const [selectedSub, setSelectedSub] = useState(subFilter || "");
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, string[]>>({ baseType: [], size: [], density: [], color: [] });

  useEffect(() => {
    setSelectedCategory(categoryFilter || "Hair Systems");
    setSelectedSub(subFilter || "");
  }, [categoryFilter, subFilter]);

  const toggleFilter = (key: FilterKey, value: string) => {
    setSelectedFilters((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }));
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedSub) result = result.filter((p) => p.subcategory === selectedSub);
    result = result.filter((product) =>
      (selectedFilters.baseType.length === 0 || selectedFilters.baseType.includes(product.baseType || "")) &&
      (selectedFilters.size.length === 0 || selectedFilters.size.includes(product.size || "")) &&
      (selectedFilters.density.length === 0 || selectedFilters.density.includes(product.density || "")) &&
      (selectedFilters.color.length === 0 || selectedFilters.color.includes(product.color || ""))
    );
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, selectedSub, selectedFilters, sortBy]);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="container py-6 md:py-8">
        <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link><span>/</span>
          <span className="text-foreground">{selectedCategory || "Products"}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">{selectedSub || selectedCategory || "All Products"}</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden flex items-center gap-2 border border-border px-3 py-2 rounded text-sm font-body">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-border rounded px-3 py-2 text-sm font-body bg-background outline-none focus:border-gold">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Best Rating</option>
            </select>
          </div>
        </div>
        <div className="flex gap-8">
          <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto" : "hidden"} lg:block lg:relative lg:w-56 shrink-0`}>
            <div className="flex items-center justify-between lg:hidden mb-6"><h2 className="font-display text-xl font-semibold">Filters</h2><button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button></div>
            <div className="space-y-5 border border-border rounded p-5 shadow-card">
              <div>
                <h3 className="font-body font-semibold text-sm mb-3 uppercase tracking-wide">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <button onClick={() => { setSelectedCategory(cat.name); setSelectedSub(""); }} className={`block text-sm font-body ${selectedCategory === cat.name ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"} transition-colors`}>{cat.name}</button>
                      {selectedCategory === cat.name && <div className="pl-4 mt-2 space-y-1">{cat.subcategories.map((sub) => <button key={sub} onClick={() => setSelectedSub(selectedSub === sub ? "" : sub)} className={`block text-xs font-body ${selectedSub === sub ? "text-gold" : "text-muted-foreground hover:text-foreground"}`}>{sub}</button>)}</div>}
                    </div>
                  ))}
                </div>
              </div>
              {selectedCategory === "Hair Systems" && Object.entries(filterGroups).map(([key, values]) => (
                <div key={key}>
                  <h3 className="font-body font-semibold text-sm mb-3 uppercase tracking-wide">{key === "baseType" ? "Base type" : key}</h3>
                  <div className="space-y-2">
                    {values.map((value) => <label key={value} className="flex items-center gap-2 font-body text-sm text-muted-foreground cursor-pointer hover:text-foreground"><input type="checkbox" checked={selectedFilters[key as FilterKey].includes(value)} onChange={() => toggleFilter(key as FilterKey, value)} className="accent-[hsl(var(--gold))]" />{value}</label>)}
                  </div>
                </div>
              ))}
              <button onClick={() => setFiltersOpen(false)} className="lg:hidden w-full bg-gold text-accent-foreground py-3 rounded font-body font-semibold">Apply Filters</button>
            </div>
          </aside>
          <div className="flex-1">
            <p className="font-body text-xs text-muted-foreground mb-5">Showing 1–{filtered.length} of {filtered.length} results</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {filtered.map((product, i) => <ProductCard key={product.id} product={product} index={i} />)}
            </div>
            {filtered.length === 0 && <div className="text-center py-20"><p className="font-body text-muted-foreground">No products found for these filters.</p></div>}
          </div>
        </div>
      </div>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default Products;
