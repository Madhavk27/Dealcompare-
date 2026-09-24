import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  Check,
  ArrowRightLeft,
  X,
  ChevronDown,
} from 'lucide-react';
import { Product } from '../types';

interface SearchScreenProps {
  initialQuery?: string;
  selectedCategory?: string;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedForCompare: string[];
  onToggleCompare: (productId: string) => void;
  onOpenCompareModal: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  initialQuery = '',
  selectedCategory = 'all',
  products,
  onSelectProduct,
  selectedForCompare,
  onToggleCompare,
  onOpenCompareModal,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [sortBy, setSortBy] = useState<'best_match' | 'lowest_price' | 'highest_discount' | 'highest_rating'>('best_match');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  // Available brands
  const brands = useMemo(() => {
    const bSet = new Set<string>();
    products.forEach((p) => bSet.add(p.brand));
    return ['all', ...Array.from(bSet)];
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Query search
        const matchQuery =
          !query.trim() ||
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase());

        // Category filter
        const matchCategory =
          activeCategory === 'all' || p.category === activeCategory;

        // Brand filter
        const matchBrand =
          selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();

        // Price filter
        const matchPrice = p.currentLowestPrice <= maxPrice;

        return matchQuery && matchCategory && matchBrand && matchPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest_price') return a.currentLowestPrice - b.currentLowestPrice;
        if (sortBy === 'highest_discount') return b.discountPercent - a.discountPercent;
        if (sortBy === 'highest_rating') return b.rating - a.rating;
        return 0; // best match default
      });
  }, [products, query, activeCategory, selectedBrand, maxPrice, sortBy]);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-4 space-y-5 pb-28 animate-fadeIn">
      {/* Search Bar */}
      <section className="space-y-3">
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, model numbers..."
            className="w-full h-12 pl-12 pr-10 bg-[#141414] text-white border border-white/20 rounded-lg text-sm sm:text-base shadow-xl focus:border-white outline-hidden transition-all font-sans placeholder-neutral-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results count & Filter Controls */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <p className="text-neutral-400 font-mono text-xs uppercase tracking-wider">
            [ {filteredProducts.length === products.length ? '1,248' : filteredProducts.length} RECORDS INDEXED ]
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilterDrawer(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider border transition-all ${
                selectedBrand !== 'all' || activeCategory !== 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#141414] text-white border-white/20 hover:border-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              FILTERS
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="appearance-none pl-3 pr-7 py-1.5 bg-[#141414] text-white border border-white/20 rounded text-xs font-mono font-bold uppercase tracking-wider hover:border-white transition-all focus:outline-hidden focus:border-white cursor-pointer"
              >
                <option value="best_match" className="bg-black text-white">BEST MATCH</option>
                <option value="lowest_price" className="bg-black text-white">LOWEST PRICE</option>
                <option value="highest_discount" className="bg-black text-white">HIGHEST DISCOUNT</option>
                <option value="highest_rating" className="bg-black text-white">HIGHEST RATING</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Active Filter Chips */}
      {(selectedBrand !== 'all' || activeCategory !== 'all') && (
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          {activeCategory !== 'all' && (
            <span className="bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded flex items-center gap-1.5 uppercase">
              CAT: {activeCategory}
              <button onClick={() => setActiveCategory('all')} className="hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedBrand !== 'all' && (
            <span className="bg-white/10 text-white border border-white/20 px-2.5 py-1 rounded flex items-center gap-1.5 uppercase">
              BRAND: {selectedBrand}
              <button onClick={() => setSelectedBrand('all')} className="hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedBrand('all');
              setMaxPrice(100000);
            }}
            className="text-neutral-400 underline uppercase hover:text-white"
          >
            RESET ALL
          </button>
        </div>
      )}

      {/* Product List */}
      <section className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-[#121212] rounded-lg border border-white/20 p-6 space-y-3">
            <p className="text-base font-bold uppercase text-white font-mono">NO MATCHING PRODUCTS FOUND</p>
            <p className="text-xs text-neutral-400 font-mono">
              Try searching with another keyword or adjusting your filter thresholds.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('all');
                setSelectedBrand('all');
              }}
              className="bg-white text-black font-black uppercase font-mono px-4 py-2 rounded text-xs hover:bg-neutral-200"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const isCompared = selectedForCompare.includes(product.id);

            return (
              <article
                key={product.id}
                className="bg-[#121212] rounded-lg border border-white/15 hover:border-white/50 transition-all duration-200 p-4 flex flex-col gap-3 relative shadow-lg"
              >
                {/* Checkbox for Compare */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(product.id);
                    }}
                    className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-all ${
                      isCompared
                        ? 'bg-white border-white text-black'
                        : 'border-white/30 bg-[#1a1a1a] hover:border-white text-transparent'
                    }`}
                    title="Select to compare side-by-side"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </button>
                </div>

                {/* Top info */}
                <div className="flex gap-4">
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded bg-[#1a1a1a] border border-white/10 relative cursor-pointer flex items-center justify-center p-1.5 overflow-hidden group"
                  >
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0 pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest border border-white/10 px-1 py-0.5">
                        {product.brand}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        {product.category}
                      </span>
                    </div>
                    <h2
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm sm:text-base text-white leading-tight mb-2 truncate cursor-pointer hover:text-neutral-300 transition-colors uppercase tracking-tight"
                    >
                      {product.name}
                    </h2>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-neutral-400 font-bold ml-1">
                        {product.rating} <span className="text-neutral-600">({product.reviewCount.toLocaleString('en-IN')})</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Lowest Banner */}
                <div className="p-3 bg-white/5 rounded border border-white/15">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-widest">
                        CURRENT LOWEST ARBITRAGE
                      </p>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-xl sm:text-2xl font-black font-mono text-[#00FF66] leading-none">
                          ₹{product.currentLowestPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-mono text-neutral-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="inline-block px-1.5 py-0.5 bg-[#00FF66] text-black text-[10px] font-mono font-black uppercase mb-0.5">
                        {product.discountPercent}% OFF
                      </span>
                      <p className="text-xs font-bold text-neutral-300">
                        SAVE ₹{product.savingsAmount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Compare top stores list */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                    LIVE STORE QUOTES:
                  </p>
                  <ul className="space-y-1">
                    {product.stores.slice(0, 3).map((store) => (
                      <li
                        key={store.id}
                        className={`flex justify-between items-center py-2 px-3 rounded text-xs font-mono ${
                          store.badge === 'BEST PRICE'
                            ? 'bg-[#1a1a1a] border border-[#00FF66]/50 text-white font-bold'
                            : 'bg-[#141414] border border-white/10 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="uppercase">{store.storeName}</span>
                          {store.badge && (
                            <span className="text-[9px] font-black bg-[#00FF66] text-black px-1.5 py-0.5 uppercase tracking-widest">
                              {store.badge}
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-bold ${
                            store.badge === 'BEST PRICE' ? 'text-[#00FF66]' : 'text-neutral-400'
                          }`}
                        >
                          ₹{store.price.toLocaleString('en-IN')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2.5 px-3 border border-white/20 hover:border-white hover:bg-white/10 text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors text-center"
                  >
                    COMPARE ({product.stores.length} STORES)
                  </button>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex-1 py-2.5 px-3 bg-white hover:bg-neutral-200 text-black rounded text-xs font-mono font-black uppercase tracking-wider transition-all text-center"
                  >
                    VIEW ANALYSIS →
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Floating Action Button for Compare */}
      {selectedForCompare.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 z-40 flex justify-center pointer-events-none animate-bounce-short">
          <button
            onClick={onOpenCompareModal}
            className="pointer-events-auto flex items-center gap-2.5 bg-white text-black font-black font-mono text-xs uppercase tracking-wider py-3.5 px-6 rounded shadow-2xl hover:bg-neutral-200 transition-all active:scale-95 border-2 border-black"
          >
            <ArrowRightLeft className="w-4 h-4 text-black stroke-[2.5px]" />
            COMPARE SELECTED ({selectedForCompare.length})
          </button>
        </div>
      )}

      {/* Filter Drawer Modal */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-[#0E0E0E] text-white border-l border-white/20 h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-slideLeft">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <h3 className="font-black text-lg uppercase tracking-tight font-mono">DATABASE FILTERS</h3>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="p-1 rounded hover:bg-white/10 text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                  CATEGORY
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['all', 'smartphones', 'laptops', 'headphones', 'tvs', 'gaming', 'fashion'].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => setActiveCategory(c)}
                        className={`py-2 px-3 rounded text-xs font-mono font-bold uppercase text-left border transition-all ${
                          activeCategory === c
                            ? 'bg-white text-black border-white'
                            : 'bg-[#141414] text-neutral-300 border-white/15 hover:border-white'
                        }`}
                      >
                        {c}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-2">
                  BRAND
                </label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`py-1.5 px-3 rounded text-xs font-mono font-bold uppercase border transition-all ${
                        selectedBrand === b
                          ? 'bg-white text-black border-white'
                          : 'bg-[#141414] text-neutral-300 border-white/15 hover:border-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono">
                  <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                    MAX PRICE
                  </label>
                  <span className="text-sm font-black text-[#00FF66]">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex gap-2 font-mono">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedBrand('all');
                  setMaxPrice(100000);
                }}
                className="flex-1 py-3 border border-white/20 text-white font-bold text-xs uppercase rounded hover:bg-white/10"
              >
                RESET
              </button>
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-3 bg-white text-black font-black text-xs uppercase rounded hover:bg-neutral-200"
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
