import React, { useState, useEffect } from 'react';
import {
  Flame,
  Clock,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Product, CouponItem } from '../types';

interface DealsScreenProps {
  products: Product[];
  coupons: CouponItem[];
  onSelectProduct: (product: Product) => void;
  onCopyCoupon: (code: string) => void;
}

export const DealsScreen: React.FC<DealsScreenProps> = ({
  products,
  coupons,
  onSelectProduct,
  onCopyCoupon,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);

  // Live Countdown timer for Flash Deals (e.g. 04:22:15)
  const [timeLeft, setTimeLeft] = useState<{ h: number; m: number; s: number }>({
    h: 4,
    m: 22,
    s: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: 59, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return { h: 12, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = () => {
    const hh = String(timeLeft.h).padStart(2, '0');
    const mm = String(timeLeft.m).padStart(2, '0');
    const ss = String(timeLeft.s).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  };

  const handleCopy = (coupon: CouponItem) => {
    onCopyCoupon(coupon.code);
    setCopiedCouponId(coupon.id);
    setTimeout(() => setCopiedCouponId(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'smartphones', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'home', label: 'Home' },
  ];

  // Specific products for deal cards
  const sonyWh = products.find((p) => p.id === 'sony-wh1000xm5') || products[2];
  const appleWatch = products.find((p) => p.id === 'apple-watch-s9') || products[6];
  const razerKb = products.find((p) => p.id === 'razer-huntsman-mini') || products[7];
  const nikeShoes = products.find((p) => p.id === 'nike-air-zoom-pegasus') || products[8];
  const samsungSsd = products.find((p) => p.id === 'samsung-980-pro-ssd') || products[9];
  const lodgeSkillet = products.find((p) => p.id === 'lodge-cast-iron-skillet') || products[10];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-4 space-y-6 pb-28 animate-fadeIn bg-[#0A0A0A] text-white">
      {/* Hero Title */}
      <section className="text-center pt-2">
        <div className="inline-block bg-white/10 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest mb-2 border border-white/20">
          DAILY PRICE RADAR
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
          TODAY'S BEST DEALS
        </h1>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1 uppercase">
          ALGORITHMICALLY SOURCED DISCOUNTS ACROSS MAJOR RETAILERS
        </p>
      </section>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 font-mono">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-white text-black font-black'
                : 'bg-[#141414] text-neutral-300 border border-white/15 hover:border-white/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Deal Cards Section */}
      <section className="space-y-4">
        {/* Deal Card 1: Sony WH-1000XM5 */}
        {sonyWh && (
          <div className="bg-[#121212] border border-white/20 rounded-lg p-5 relative overflow-hidden flex flex-col hover:border-white/50 transition-all group">
            <div className="absolute top-4 left-4 bg-[#00FF66] text-black px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-widest z-10 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-black" /> HOT DEAL
            </div>

            <div
              onClick={() => onSelectProduct(sonyWh)}
              className="h-48 sm:h-64 w-full bg-[#181818] mb-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer border border-white/10"
            >
              <img
                src={sonyWh.images.main}
                alt={sonyWh.name}
                className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col grow">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                {sonyWh.brand} • {sonyWh.category}
              </div>
              <h2
                onClick={() => onSelectProduct(sonyWh)}
                className="font-black text-lg sm:text-xl text-white uppercase line-clamp-2 cursor-pointer hover:text-[#00FF66] transition-colors"
              >
                {sonyWh.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-[#00FF66]">
                  ₹27,990
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 line-through">
                  ₹34,990
                </span>
                <span className="text-xs font-bold text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/20">
                  20% OFF
                </span>
              </div>

              <button
                onClick={() => onSelectProduct(sonyWh)}
                className="mt-4 w-full bg-white hover:bg-neutral-200 text-black py-3 rounded text-xs font-mono font-black uppercase tracking-wider transition-all active:scale-98 cursor-pointer"
              >
                VIEW COMPARISON & OFFERS
              </button>
            </div>
          </div>
        )}

        {/* Deal Card 2: Apple Watch Series 9 GPS */}
        {appleWatch && (
          <div className="bg-[#121212] border border-white/20 rounded-lg p-5 relative overflow-hidden flex flex-col hover:border-white/50 transition-all group">
            <div
              onClick={() => onSelectProduct(appleWatch)}
              className="h-48 sm:h-64 w-full bg-[#181818] mb-4 rounded flex items-center justify-center relative overflow-hidden cursor-pointer border border-white/10"
            >
              <img
                src={appleWatch.images.main}
                alt={appleWatch.name}
                className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col grow">
              <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                {appleWatch.brand} • {appleWatch.category}
              </div>
              <h2
                onClick={() => onSelectProduct(appleWatch)}
                className="font-black text-lg sm:text-xl text-white uppercase line-clamp-2 cursor-pointer hover:text-[#00FF66] transition-colors"
              >
                {appleWatch.name}
              </h2>

              <div className="mt-3 flex items-baseline gap-2 font-mono">
                <span className="text-2xl sm:text-3xl font-black text-[#00FF66]">
                  ₹35,900
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 line-through">
                  ₹41,900
                </span>
                <span className="text-xs font-bold text-[#00FF66] bg-[#00FF66]/10 px-1.5 py-0.5 rounded border border-[#00FF66]/20">
                  14% OFF
                </span>
              </div>

              <button
                onClick={() => onSelectProduct(appleWatch)}
                className="mt-4 w-full bg-[#181818] hover:bg-[#242424] text-white border border-white/20 py-3 rounded text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                VIEW LIVE COMPARISON
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Flash Deals Horizontal Carousel */}
      <section className="bg-[#141414] -mx-4 px-4 py-5 sm:rounded-lg sm:mx-0 border-y sm:border border-white/20">
        <div className="flex justify-between items-center mb-3 font-mono">
          <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF3B30]" /> FLASH EXPIRES SOON
          </h2>
          <span className="text-xs font-bold text-[#FF3B30] bg-[#FF3B30]/10 px-2 py-0.5 rounded border border-[#FF3B30]/20">
            {formatTimer()}
          </span>
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar snap-x">
          {/* Flash Item 1 */}
          {razerKb && (
            <div
              onClick={() => onSelectProduct(razerKb)}
              className="min-w-[210px] max-w-[230px] bg-[#121212] border border-white/15 rounded-lg p-3 snap-start hover:border-white/40 transition-all cursor-pointer group"
            >
              <div className="h-32 w-full bg-[#181818] rounded mb-2 overflow-hidden flex items-center justify-center p-2 border border-white/10">
                <img
                  src={razerKb.images.main}
                  alt={razerKb.shortTitle}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xs font-bold font-mono text-white uppercase truncate group-hover:text-[#00FF66]">
                {razerKb.shortTitle}
              </h3>
              <div className="text-[#00FF66] font-mono font-bold text-sm mt-1">
                ₹8,499{' '}
                <span className="text-neutral-500 text-xs line-through font-normal">
                  ₹12,999
                </span>
              </div>
            </div>
          )}

          {/* Flash Item 2 */}
          {nikeShoes && (
            <div
              onClick={() => onSelectProduct(nikeShoes)}
              className="min-w-[210px] max-w-[230px] bg-[#121212] border border-white/15 rounded-lg p-3 snap-start hover:border-white/40 transition-all cursor-pointer group"
            >
              <div className="h-32 w-full bg-[#181818] rounded mb-2 overflow-hidden flex items-center justify-center p-2 border border-white/10">
                <img
                  src={nikeShoes.images.main}
                  alt={nikeShoes.shortTitle}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xs font-bold font-mono text-white uppercase truncate group-hover:text-[#00FF66]">
                {nikeShoes.shortTitle}
              </h3>
              <div className="text-[#00FF66] font-mono font-bold text-sm mt-1">
                ₹6,295{' '}
                <span className="text-neutral-500 text-xs line-through font-normal">
                  ₹9,995
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Coupon Center */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
            ACTIVE PROMOTIONAL CODES
          </h2>
          <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#00FF66]" /> VERIFIED TODAY
          </span>
        </div>

        <div className="space-y-2.5">
          {coupons.map((c) => {
            const isCopied = copiedCouponId === c.id;

            return (
              <div
                key={c.id}
                className="flex items-center justify-between border border-white/15 rounded-lg p-3.5 bg-[#121212] hover:border-white/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white/5 rounded flex items-center justify-center text-xs font-mono font-black text-white border border-white/20 shrink-0">
                    {c.storeCode}
                  </div>
                  <div>
                    <div className="font-bold text-sm sm:text-base text-white uppercase font-mono">
                      {c.title}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-0.5">{c.description}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(c)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer ${
                    isCopied
                      ? 'bg-[#00FF66] text-black'
                      : 'bg-white hover:bg-neutral-200 text-black active:scale-95'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3px]" /> COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> COPY CODE
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending Deals Leaderboard */}
      <section className="space-y-3 pt-2 border-t border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span className="w-2 h-2 bg-white inline-block"></span>
            TRENDING PRICE DROPS
          </h2>
          <span className="text-[11px] font-mono text-neutral-400">LAST 24H</span>
        </div>

        <div className="space-y-3 font-mono">
          {/* List item 1: Samsung SSD */}
          {samsungSsd && (
            <div
              onClick={() => onSelectProduct(samsungSsd)}
              className="flex gap-3 items-center bg-[#121212] p-3 rounded-lg border border-white/15 hover:border-white/40 transition-all cursor-pointer group"
            >
              <div className="text-base font-black text-neutral-500 w-8 text-center shrink-0">
                01
              </div>
              <div className="w-14 h-14 bg-[#181818] rounded overflow-hidden shrink-0 border border-white/10 p-1 flex items-center justify-center">
                <img
                  src={samsungSsd.images.main}
                  alt={samsungSsd.shortTitle}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grow min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase truncate group-hover:text-[#00FF66]">
                  {samsungSsd.name}
                </h3>
                <div className="text-[#00FF66] font-bold text-xs sm:text-sm mt-0.5">
                  ₹8,999
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </div>
          )}

          {/* List item 2: Lodge Skillet */}
          {lodgeSkillet && (
            <div
              onClick={() => onSelectProduct(lodgeSkillet)}
              className="flex gap-3 items-center bg-[#121212] p-3 rounded-lg border border-white/15 hover:border-white/40 transition-all cursor-pointer group"
            >
              <div className="text-base font-black text-neutral-500 w-8 text-center shrink-0">
                02
              </div>
              <div className="w-14 h-14 bg-[#181818] rounded overflow-hidden shrink-0 border border-white/10 p-1 flex items-center justify-center">
                <img
                  src={lodgeSkillet.images.main}
                  alt={lodgeSkillet.shortTitle}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grow min-w-0">
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase truncate group-hover:text-[#00FF66]">
                  {lodgeSkillet.name}
                </h3>
                <div className="text-[#00FF66] font-bold text-xs sm:text-sm mt-0.5">
                  ₹2,450
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
