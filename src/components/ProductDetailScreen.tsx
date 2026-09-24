import React, { useState } from 'react';
import {
  ChevronRight,
  ShieldCheck,
  Heart,
  Star,
  Store,
  Sparkles,
  TrendingDown,
  ThumbsUp,
  Truck,
  Building2,
  Copy,
  Check,
  Bell,
  PlusCircle,
  ExternalLink,
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onNavigateToCategory: (cat: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenSetAlert: (product: Product) => void;
  onCompareProduct: (product: Product) => void;
  onCopyCoupon: (code: string) => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onNavigateToCategory,
  onToggleWishlist,
  isWishlisted,
  onOpenSetAlert,
  onCompareProduct,
  onCopyCoupon,
}) => {
  const [activeImageKey, setActiveImageKey] = useState<string>('main');
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('90D');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Gallery images
  const galleryItems = [
    { key: 'main', label: 'Main view', url: product.images.main },
    ...(product.images.front ? [{ key: 'front', label: 'Front view', url: product.images.front }] : []),
    ...(product.images.back ? [{ key: 'back', label: 'Back view', url: product.images.back }] : []),
    ...(product.images.side ? [{ key: 'side', label: 'Side view', url: product.images.side }] : []),
    ...(product.images.lifestyle ? [{ key: 'lifestyle', label: 'Lifestyle', url: product.images.lifestyle }] : []),
  ];

  const currentDisplayImage =
    galleryItems.find((g) => g.key === activeImageKey)?.url || product.images.main;

  const handleCopy = (code: string) => {
    onCopyCoupon(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Price history for active tab
  const activeHistory =
    timeRange === '7D'
      ? product.priceHistory.days7
      : timeRange === '30D'
      ? product.priceHistory.days30
      : timeRange === '1Y'
      ? product.priceHistory.days365
      : product.priceHistory.days90;

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-[#0A0A0A] text-white min-h-screen pb-36 animate-fadeIn">
      {/* Breadcrumb navigation */}
      <nav className="px-4 py-3 text-xs font-mono text-neutral-400 flex items-center gap-1.5 border-b border-white/10 overflow-x-auto whitespace-nowrap uppercase tracking-wider">
        <button onClick={onBack} className="hover:text-white transition-colors">
          INDEX
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <button
          onClick={() => onNavigateToCategory(product.category)}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <span className="hover:text-white transition-colors">
          {product.brand}
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
        <span className="text-white font-bold truncate max-w-[180px] sm:max-w-none">
          {product.shortTitle}
        </span>
      </nav>

      {/* Main product summary container */}
      <div className="px-4 pt-4 space-y-6">
        {/* Product Gallery */}
        <section>
          <div className="w-full aspect-4/3 sm:aspect-16/9 md:aspect-2/1 max-h-[380px] bg-[#141414] rounded-lg overflow-hidden relative border border-white/15 flex items-center justify-center p-6 mb-3 group">
            <img
              src={currentDisplayImage}
              alt={product.name}
              className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Badges over image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 font-mono">
              <span className="bg-[#00FF66] text-black text-[10px] font-black px-2.5 py-1 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5px]" />
                BEST PRICE GUARANTEED
              </span>
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              className="absolute top-3 right-3 bg-black/80 backdrop-blur-md p-2.5 rounded text-white hover:text-red-400 transition-all border border-white/20 active:scale-90"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isWishlisted ? 'fill-[#FF3B30] text-[#FF3B30]' : 'text-white'
                }`}
              />
            </button>
          </div>

          {/* Thumbnails row */}
          {galleryItems.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              {galleryItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveImageKey(item.key)}
                  className={`w-16 h-16 shrink-0 bg-[#141414] rounded border overflow-hidden flex items-center justify-center p-1 transition-all ${
                    activeImageKey === item.key
                      ? 'border-white ring-2 ring-white/30 scale-98'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Product Title & Ratings */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 px-2 py-0.5 rounded">
              {product.brand}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase">
              MODEL: {product.id.toUpperCase()}
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-black text-white leading-tight uppercase tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 font-mono">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-neutral-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-bold text-white">
              {product.rating}
            </span>
            <span className="text-xs text-neutral-400">
              ({product.reviewCount.toLocaleString('en-IN')} VERIFIED REVIEWS)
            </span>
          </div>

          {/* Pricing Box */}
          <div className="bg-[#121212] rounded-lg p-4 sm:p-5 border border-white/20 shadow-xl relative overflow-hidden space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                  INDEX LOWEST PRICE
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#00FF66]">
                    ₹{product.currentLowestPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm sm:text-base font-mono text-neutral-500 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="bg-[#00FF66] text-black text-xs font-mono font-black px-2.5 py-1 uppercase tracking-wider inline-block">
                  {product.discountPercent}% OFF
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 font-mono text-xs">
              <span className="text-neutral-300 flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                <Store className="w-3.5 h-3.5 text-white" />
                VERIFIED STORES: {product.stores.length}
              </span>
              {product.savingsAmount > 0 && (
                <span className="text-[#00FF66] flex items-center gap-1 bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded font-bold">
                  <TrendingDown className="w-3.5 h-3.5" /> SAVE ₹{product.savingsAmount.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Smart Deal Score Card */}
        <section className="bg-[#121212] rounded-lg p-4 sm:p-5 border border-white/20 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-mono font-black uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#00FF66]" />
                SMART DEAL INTELLIGENCE SCORE
              </h2>
              <div className="mt-1 flex items-baseline gap-1 font-mono">
                <span className="text-3xl sm:text-4xl font-black text-[#00FF66]">
                  {product.dealScore.overallScore}
                </span>
                <span className="text-sm font-bold text-neutral-500">/100</span>
              </div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-white mt-0.5">
                VERDICT: {product.dealScore.verdict}
              </div>
            </div>

            <div className="w-14 h-14 rounded border-2 border-[#00FF66] flex items-center justify-center bg-white/5 shadow-xs">
              <ThumbsUp className="w-6 h-6 text-[#00FF66]" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed pt-2 border-t border-white/10">
            {product.dealScore.summary}
          </p>
        </section>

        {/* Compare Stores Section */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              LIVE RETAILER COMPARISON
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">{product.stores.length} QUOTES AVAILABLE</span>
          </div>

          <div className="space-y-2.5">
            {product.stores.map((store) => {
              const isBest = store.badge === 'BEST PRICE';

              return (
                <div
                  key={store.id}
                  className={`rounded-lg p-4 border transition-all ${
                    isBest
                      ? 'bg-[#181818] border-2 border-white shadow-xl relative'
                      : 'bg-[#121212] border-white/15'
                  }`}
                >
                  {isBest && (
                    <div className="inline-block bg-[#00FF66] text-black text-[9px] font-mono font-black px-2 py-0.5 uppercase tracking-widest mb-2">
                      BEST CURRENT PRICE
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded flex items-center justify-center text-xs font-black font-mono text-white shrink-0 border border-white/20"
                        style={{ backgroundColor: store.storeColor || '#1f1f1f' }}
                      >
                        {store.storeName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-sm sm:text-base text-white uppercase block font-mono">
                          {store.storeName}
                        </span>
                        {store.deliveryText && (
                          <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                            <Truck className="w-3 h-3 text-[#00FF66]" />
                            {store.deliveryText.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-lg sm:text-xl font-black text-white">
                        ₹{store.price.toLocaleString('en-IN')}
                      </div>
                      {store.discountPercent !== undefined && store.discountPercent > 0 && (
                        <span className="text-[10px] font-bold text-[#00FF66]">
                          {store.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {store.bankOffer && (
                    <div className="mt-2.5 text-[11px] font-mono text-neutral-300 flex items-center gap-1.5 bg-white/5 p-2 rounded border border-white/10">
                      <Building2 className="w-3.5 h-3.5 text-[#00FF66]" />
                      <span>{store.bankOffer}</span>
                    </div>
                  )}

                  {isBest && (
                    <button
                      onClick={() =>
                        alert(
                          `Redirecting to ${store.storeName} for ₹${store.price.toLocaleString('en-IN')}`
                        )
                      }
                      className="w-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-black uppercase tracking-wider py-3 rounded mt-3 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                    >
                      GO TO {store.storeName.toUpperCase()} <ExternalLink className="w-3.5 h-3.5 stroke-[2.5px]" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Available Offers */}
        {product.offers && product.offers.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
                VERIFIED PROMO CODES
              </h2>
              <span className="text-[11px] font-mono text-neutral-400">TESTED TODAY</span>
            </div>

            <div className="space-y-2">
              {product.offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#121212] border border-white/15 rounded-lg p-3.5 flex items-start justify-between gap-3 hover:border-white/40 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 border border-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white uppercase font-mono">
                        {offer.discountText}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono mt-0.5">{offer.description}</p>
                    </div>
                  </div>

                  {offer.code && (
                    <button
                      onClick={() => handleCopy(offer.code!)}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white text-black hover:bg-neutral-200 rounded text-xs font-mono font-black uppercase tracking-wider transition-all"
                    >
                      {copiedCode === offer.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-black stroke-[3px]" /> COPIED
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> {offer.code}
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Price History Chart */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              90-DAY PRICE HISTORY ARCHIVE
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">INTERVAL: {timeRange}</span>
          </div>

          <div className="bg-[#121212] rounded-lg border border-white/20 p-4 sm:p-5 space-y-4 shadow-xl">
            {/* Recommendation tag */}
            <div className="bg-white/5 border border-white/20 rounded p-3 flex items-start gap-2.5 font-mono">
              <Sparkles className="w-4 h-4 text-[#00FF66] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm font-bold text-white uppercase">
                  RECOMMENDATION: <span className="text-[#00FF66]">BUY NOW</span>
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">{product.dealScore.advice}</p>
              </div>
            </div>

            {/* Time range selector tabs */}
            <div className="flex bg-[#181818] rounded p-1 border border-white/15 font-mono">
              {(['7D', '30D', '90D', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`flex-1 py-1.5 text-center text-xs font-bold uppercase transition-all rounded ${
                    timeRange === t
                      ? 'bg-white text-black font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Stats highlight blocks */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="bg-[#181818] p-3 rounded border border-white/10">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold">HISTORIC HIGH</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  ₹{product.dealScore.highestPriceIn90Days.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-[#181818] p-3 rounded border border-white/10">
                <span className="text-[10px] text-neutral-500 block uppercase font-bold">90-DAY AVERAGE</span>
                <span className="text-xs sm:text-sm font-bold text-neutral-300">
                  ₹{product.dealScore.averagePriceIn90Days.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white/10 p-3 rounded border border-[#00FF66]">
                <span className="text-[10px] text-[#00FF66] block font-black uppercase">CURRENT LOW</span>
                <span className="text-xs sm:text-sm font-black text-[#00FF66]">
                  ₹{product.currentLowestPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* SVG Interactive Chart Curve */}
            <div className="w-full pt-2">
              <div className="relative h-48 w-full border-b border-l border-white/20 pb-2 pl-2">
                {/* Y-axis labels */}
                <div className="absolute -left-1 top-0 bottom-6 flex flex-col justify-between text-[10px] text-neutral-500 font-mono pointer-events-none">
                  <span>₹80k</span>
                  <span>₹76k</span>
                  <span>₹72k</span>
                  <span>₹68k</span>
                </div>

                {/* SVG Curve Line */}
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="detailChartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00FF66" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00FF66" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="#333333" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#333333" strokeDasharray="3 3" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="#333333" strokeDasharray="3 3" />

                  {/* Shaded area */}
                  <polygon
                    fill="url(#detailChartGradient)"
                    points="0,10 20,12 40,35 60,65 80,68 100,80 100,100 0,100"
                  />

                  {/* Smooth curve line */}
                  <path
                    d="M 0 10 Q 20 12 40 35 T 60 65 T 80 68 T 100 80"
                    fill="none"
                    stroke="#00FF66"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Historical Dots */}
                  <circle cx="0" cy="10" r="3" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="20" cy="12" r="3" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="40" cy="35" r="3" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="60" cy="65" r="3.5" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
                  <circle cx="80" cy="68" r="3" fill="#00FF66" stroke="#000000" strokeWidth="1.5" />
                  <circle cx="100" cy="80" r="4" fill="#00FF66" stroke="#FFFFFF" strokeWidth="2" />
                </svg>

                {/* Lowest tooltip marker */}
                <div className="absolute top-[52%] left-[55%] -translate-x-1/2 bg-white text-black text-[10px] font-mono font-black px-2 py-0.5 rounded shadow-md pointer-events-none uppercase">
                  RECORD LOW: ₹64,999
                </div>

                {/* X-axis labels */}
                <div className="absolute -bottom-5 left-0 right-0 flex justify-between text-[10px] text-neutral-500 font-mono px-1 uppercase">
                  <span>90D</span>
                  <span>75D</span>
                  <span>60D</span>
                  <span>45D</span>
                  <span>30D</span>
                  <span>15D</span>
                  <span>TODAY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons in body */}
        <section className="space-y-2.5 pt-2 font-mono">
          <button
            onClick={() => onOpenSetAlert(product)}
            className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-4 rounded flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            <Bell className="w-4 h-4 stroke-[2.5px]" />
            CREATE TARGET PRICE ALERT
          </button>

          <button
            onClick={() => onCompareProduct(product)}
            className="w-full bg-[#181818] hover:bg-[#222222] text-white font-bold text-xs uppercase tracking-wider py-4 rounded flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#00FF66]" />
            ADD ANOTHER PRODUCT TO COMPARE
          </button>
        </section>

        {/* Specifications Table */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              HARDWARE SPECIFICATIONS
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">VERIFIED DATA</span>
          </div>

          <div className="bg-[#121212] rounded-lg border border-white/20 overflow-hidden divide-y divide-white/10 font-mono">
            {product.specifications.map((spec, index) => (
              <div
                key={index}
                className={`flex text-xs sm:text-sm p-3.5 ${
                  index % 2 === 1 ? 'bg-[#161616]' : 'bg-[#121212]'
                }`}
              >
                <div className="w-1/3 font-bold text-neutral-400 uppercase tracking-wider">{spec.name}</div>
                <div className="w-2/3 font-medium text-white">{spec.value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-[56px] left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/20 p-3 z-30 shadow-2xl max-w-lg mx-auto md:max-w-md sm:border-x sm:border-white/20">
        <div className="flex gap-2.5 font-mono">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`flex-1 py-3 px-3 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all ${
              isWishlisted
                ? 'bg-[#FF3B30]/20 text-[#FF3B30] border-[#FF3B30]'
                : 'bg-[#141414] text-white border-white/20 hover:border-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-[#FF3B30]' : ''}`}
            />
            {isWishlisted ? 'SAVED' : 'WISHLIST'}
          </button>

          <button
            onClick={() => onOpenSetAlert(product)}
            className="flex-1 bg-white hover:bg-neutral-200 text-black py-3 px-3 rounded font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl transition-all active:scale-98 cursor-pointer"
          >
            <Bell className="w-4 h-4 stroke-[2.5px]" />
            SET ALERT
          </button>
        </div>
      </div>
    </div>
  );
};
