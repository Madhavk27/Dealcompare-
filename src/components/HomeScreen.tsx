import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Zap,
  History,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  ArrowDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';

interface HomeScreenProps {
  onSearch: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
  onNavigateToSearch: () => void;
  products: Product[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearch,
  onSelectProduct,
  onSelectCategory,
  onNavigateToSearch,
  products,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onNavigateToSearch();
    }
  };

  const galaxyS25 = products.find((p) => p.id === 'samsung-s25') || products[3];
  const sonyHeadphones = products.find((p) => p.id === 'sony-wh1000xm5') || products[2];
  const macbook = products.find((p) => p.id === 'macbook-air-m2') || products[5];

  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone },
    { id: 'laptops', name: 'Laptops', icon: Laptop },
    { id: 'headphones', name: 'Headphones', icon: Headphones },
    { id: 'tvs', name: 'TVs', icon: Tv },
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-6 space-y-8 animate-fadeIn pb-28">
      {/* Hero Section */}
      <section className="text-center max-w-2xl mx-auto pt-2 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 bg-white/5 text-[11px] font-mono font-bold tracking-widest text-neutral-300 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#00FF66]" />
          <span>MULTI-STORE REALTIME ARBITRAGE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
          COMPARE PRICES.<br />
          <span className="text-neutral-400">FIND THE REAL DEAL.</span>
        </h1>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 max-w-md mx-auto">
          Scan thousands of verified products across top Indian retailers instantly.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative bg-[#141414] p-1.5 rounded-lg flex items-center border border-white/20 focus-within:border-white transition-all shadow-xl max-w-xl mx-auto"
        >
          <Search className="w-5 h-5 absolute left-4 text-neutral-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products, brands, or paste link..."
            className="w-full bg-transparent border-none focus:outline-hidden pl-11 pr-3 py-2.5 text-sm sm:text-base text-white placeholder-neutral-500 font-sans"
          />
          <button
            type="submit"
            className="bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded transition-colors shrink-0 active:scale-95 cursor-pointer"
          >
            COMPARE
          </button>
        </form>

        {/* Feature Badges */}
        <div className="pt-2 flex flex-wrap justify-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF66]" /> 5+ VERIFIED STORES
          </span>
          <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-300">
            <Zap className="w-3.5 h-3.5 text-white" /> LIVE ARBITRAGE
          </span>
          <span className="flex items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 py-1 text-neutral-300">
            <History className="w-3.5 h-3.5 text-neutral-400" /> 90D PRICE ARCHIVE
          </span>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight uppercase text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
            TRENDING CATEGORIES
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">SELECT TO EXPLORE</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="bg-[#121212] hover:bg-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer border border-white/15 hover:border-white active:scale-95 group text-center"
              >
                <div className="p-3 bg-white/5 border border-white/10 rounded group-hover:bg-white group-hover:text-black text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Today's Best Deals */}
      {galaxyS25 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black tracking-tight uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
              TODAY'S HIGHEST VALUE ARBITRAGE
            </h2>
            <span className="text-[10px] font-mono font-bold text-black bg-[#00FF66] px-2 py-0.5 uppercase tracking-wider">
              HANDPICKED
            </span>
          </div>

          <div
            onClick={() => onSelectProduct(galaxyS25)}
            className="bg-[#121212] rounded-lg border border-white/15 hover:border-white p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 transition-all cursor-pointer group shadow-xl"
          >
            <div className="w-full sm:w-36 h-36 bg-[#1a1a1a] rounded shrink-0 relative overflow-hidden flex items-center justify-center p-2 border border-white/10">
              <img
                src={galaxyS25.images.main}
                alt={galaxyS25.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#00FF66] text-black text-[9px] font-mono font-black px-1.5 py-0.5 tracking-widest uppercase">
                BEST PRICE
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest border border-white/20 px-1.5 py-0.5 text-neutral-400">
                  {galaxyS25.brand}
                </span>
                <span className="text-[10px] font-mono text-[#00FF66]">
                  {galaxyS25.discountPercent}% DISCOUNT
                </span>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-white truncate group-hover:text-neutral-300 transition-colors uppercase tracking-tight">
                {galaxyS25.shortTitle}
              </h3>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#00FF66]">
                  ₹{galaxyS25.currentLowestPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs sm:text-sm font-mono text-neutral-500 line-through">
                  ₹{galaxyS25.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-mono text-white/70">
                  SAVE ₹{galaxyS25.savingsAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="pt-1 flex items-center justify-between border-t border-white/10 text-xs font-mono text-neutral-400">
                <span>STORE: AMAZON INDIA</span>
                <span className="text-white font-bold group-hover:underline">VIEW BREAKDOWN →</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Biggest Price Drops */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h2 className="text-base sm:text-lg font-black tracking-tight uppercase text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-[#FF3B30] inline-block"></span>
            MASSIVE PRICE DROPS
          </h2>
          <span className="text-[11px] font-mono text-neutral-500">PAST 48 HOURS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Sony WH-1000XM5 */}
          {sonyHeadphones && (
            <div
              onClick={() => onSelectProduct(sonyHeadphones)}
              className="bg-[#121212] rounded-lg border border-white/15 hover:border-white p-4 flex flex-col justify-between transition-all cursor-pointer group space-y-3"
            >
              <div className="flex gap-3.5 items-center">
                <div className="w-20 h-20 rounded bg-[#1a1a1a] overflow-hidden shrink-0 flex items-center justify-center p-1 border border-white/10">
                  <img
                    src={sonyHeadphones.images.main}
                    alt={sonyHeadphones.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                    {sonyHeadphones.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase truncate group-hover:text-neutral-300 transition-colors">
                    {sonyHeadphones.shortTitle}
                  </h3>
                  <div className="mt-1 inline-flex items-center gap-1 bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30 text-[10px] font-mono font-bold px-1.5 py-0.5">
                    <ArrowDown className="w-3 h-3" /> ₹4,500 PRICE CUT
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="font-mono">
                  <span className="text-xs text-neutral-500 block">CURRENT LOWEST</span>
                  <span className="text-base sm:text-lg font-black text-white">
                    ₹{sonyHeadphones.currentLowestPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button className="bg-white text-black font-black text-xs font-mono uppercase px-3 py-1.5 rounded hover:bg-neutral-200">
                  COMPARE →
                </button>
              </div>
            </div>
          )}

          {/* MacBook Air M2 */}
          {macbook && (
            <div
              onClick={() => onSelectProduct(macbook)}
              className="bg-[#121212] rounded-lg border border-white/15 hover:border-white p-4 flex flex-col justify-between transition-all cursor-pointer group space-y-3"
            >
              <div className="flex gap-3.5 items-center">
                <div className="w-20 h-20 rounded bg-[#1a1a1a] overflow-hidden shrink-0 flex items-center justify-center p-1 border border-white/10">
                  <img
                    src={macbook.images.main}
                    alt={macbook.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                    {macbook.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white uppercase truncate group-hover:text-neutral-300 transition-colors">
                    {macbook.shortTitle}
                  </h3>
                  <div className="mt-1 inline-flex items-center gap-1 bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/30 text-[10px] font-mono font-bold px-1.5 py-0.5">
                    <ArrowDown className="w-3 h-3" /> ₹8,000 PRICE CUT
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="font-mono">
                  <span className="text-xs text-neutral-500 block">CURRENT LOWEST</span>
                  <span className="text-base sm:text-lg font-black text-white">
                    ₹{macbook.currentLowestPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <button className="bg-white text-black font-black text-xs font-mono uppercase px-3 py-1.5 rounded hover:bg-neutral-200">
                  COMPARE →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Button */}
      <div className="flex justify-center pt-4 pb-2">
        <button
          onClick={onNavigateToSearch}
          className="bg-white hover:bg-neutral-200 text-black font-black text-sm uppercase tracking-widest px-8 py-4 rounded flex items-center gap-3 transition-all active:scale-98 shadow-xl"
        >
          <span>BROWSE FULL DATABASE</span>
          <ArrowRight className="w-4 h-4 stroke-[3px]" />
        </button>
      </div>
    </div>
  );
};
