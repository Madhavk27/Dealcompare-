import React, { useState } from 'react';
import {
  Heart,
  TrendingDown,
  Trash2,
  Eye,
  BellRing,
  Plus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Product, PriceAlert } from '../types';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  priceAlerts: PriceAlert[];
  onRemoveWishlist: (productId: string) => void;
  onRemoveAlert: (alertId: string) => void;
  onAddAlert: (newAlert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistProducts,
  priceAlerts,
  onRemoveWishlist,
  onRemoveAlert,
  onAddAlert,
  onSelectProduct,
  allProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'alerts'>('wishlist');
  const [selectedProductId, setSelectedProductId] = useState<string>(
    allProducts[0]?.id || ''
  );
  const [targetPriceInput, setTargetPriceInput] = useState<string>('50000');
  const [emailNotify, setEmailNotify] = useState<boolean>(true);
  const [pushNotify, setPushNotify] = useState<boolean>(true);
  const [justAddedAlert, setJustAddedAlert] = useState<boolean>(false);

  // Total savings calculation
  const totalSavings = wishlistProducts.reduce(
    (acc, p) => acc + (p.priceDropAmount || p.savingsAmount || 0),
    0
  );

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = allProducts.find((p) => p.id === selectedProductId) || allProducts[0];
    const targetPrice = Number(targetPriceInput) || prod.currentLowestPrice * 0.9;

    onAddAlert({
      productId: prod.id,
      productName: prod.shortTitle,
      productVariant: prod.brand,
      productImage: prod.images.main,
      targetPrice,
      currentPrice: prod.currentLowestPrice,
      initialPrice: prod.originalPrice,
      emailNotify,
      pushNotify,
      isWatching: true,
    });

    setJustAddedAlert(true);
    setTimeout(() => setJustAddedAlert(false), 3000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-4 space-y-6 pb-28 animate-fadeIn bg-[#0A0A0A] text-white">
      {/* Header & Tabs */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-white inline-block"></span>
            PORTFOLIO & WATCHLIST
          </h1>
          <span className="text-[11px] font-mono text-neutral-400">TRACKING ENGINE</span>
        </div>

        <div className="flex bg-[#141414] rounded p-1 border border-white/20 font-mono">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-white text-black font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            SAVED ITEMS ({wishlistProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
              activeTab === 'alerts'
                ? 'bg-white text-black font-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ACTIVE ALERTS ({priceAlerts.length})
          </button>
        </div>
      </section>

      {/* Savings Summary Card */}
      <section className="bg-[#121212] rounded-lg p-5 border border-white/20 relative overflow-hidden font-mono space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h2 className="text-xs sm:text-sm font-black text-neutral-300 uppercase tracking-wider">
            PORTFOLIO SAVINGS METRICS
          </h2>
          <span className="text-[10px] text-[#00FF66] font-bold uppercase bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/20">
            OPTIMIZED
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#181818] p-3 rounded border border-white/10">
            <p className="text-[10px] font-bold text-neutral-400 uppercase">TRACKED HARDWARE</p>
            <p className="text-xl sm:text-2xl font-black text-white mt-1">
              {wishlistProducts.length + priceAlerts.length + 8} UNITS
            </p>
          </div>
          <div className="bg-[#181818] p-3 rounded border border-white/10">
            <p className="text-[10px] font-bold text-neutral-400 uppercase">ACTIVE PRICE DROPS</p>
            <p className="text-xl sm:text-2xl font-black text-[#00FF66] mt-1">8 DETECTED</p>
          </div>
        </div>

        <div className="flex justify-between items-end pt-2 border-t border-white/10">
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase">TOTAL MONITORED SAVINGS</p>
            <p className="text-2xl sm:text-3xl font-black text-[#00FF66] mt-0.5">
              ₹{(totalSavings > 0 ? totalSavings + 11450 : 18450).toLocaleString('en-IN')}
            </p>
          </div>

          {/* Sparkline Visual Bars */}
          <div className="flex items-end gap-1.5 h-10 pb-0.5">
            {[30, 50, 40, 70, 60, 90, 100].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-2.5 rounded-t-xs transition-all ${
                  i === 6 ? 'bg-[#00FF66]' : 'bg-[#00FF66]/40'
                }`}
                title={`Savings point ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Wishlist Tab Content */}
      {(activeTab === 'wishlist' || window.innerWidth >= 1024) && (
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00FF66] inline-block"></span>
              SAVED HARDWARE
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">{wishlistProducts.length} ITEMS</span>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12 bg-[#121212] rounded-lg border border-white/15 p-6 space-y-2 font-mono">
              <p className="text-sm font-bold text-white uppercase">NO SAVED PRODUCTS IN PORTFOLIO</p>
              <p className="text-xs text-neutral-400">
                Tap the heart icon on any product to start tracking automated price drops.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#121212] rounded-lg p-4 border border-white/15 flex gap-4 items-start relative hover:border-white/40 transition-all group font-mono"
                >
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded bg-[#181818] border border-white/10 relative cursor-pointer flex items-center justify-center p-2 shrink-0"
                  >
                    <img
                      src={product.images.main}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveWishlist(product.id);
                      }}
                      className="absolute top-1.5 right-1.5 p-1.5 bg-black/80 rounded border border-white/20 text-[#FF3B30] hover:scale-110 transition-all cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-3.5 h-3.5 fill-[#FF3B30]" />
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider mb-0.5">
                      {product.brand}
                    </div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm sm:text-base text-white leading-tight mb-1 truncate cursor-pointer hover:text-[#00FF66] transition-colors uppercase"
                    >
                      {product.shortTitle}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-2 truncate">
                      {product.name}
                    </p>

                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-base sm:text-lg font-black text-white">
                        ₹{product.currentLowestPrice.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice > product.currentLowestPrice && (
                        <span className="text-xs text-neutral-500 line-through">
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {product.savingsAmount > 0 ? (
                      <div className="inline-flex items-center gap-1 bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded text-[#00FF66] text-xs font-bold uppercase">
                        <TrendingDown className="w-3.5 h-3.5" />
                        <span>SAVE ₹{product.savingsAmount.toLocaleString('en-IN')}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-500 uppercase">PRICE STABLE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Price Alerts Tab Content */}
      {(activeTab === 'alerts' || window.innerWidth >= 1024) && (
        <section className="space-y-5 pt-2 border-t border-white/10 font-mono">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              ACTIVE MONITORING ALERTS
            </h2>
            <span className="text-[11px] text-neutral-400">{priceAlerts.length} ACTIVE</span>
          </div>

          {/* Alert Cards */}
          <div className="space-y-3">
            {priceAlerts.map((alert) => {
              const progressPct = Math.min(
                100,
                Math.max(
                  15,
                  Math.round(
                    ((alert.initialPrice - alert.currentPrice) /
                      (alert.initialPrice - alert.targetPrice || 1)) *
                      100
                  )
                )
              );

              return (
                <div
                  key={alert.id}
                  className="bg-[#121212] rounded-lg p-4 border border-white/15 hover:border-white/40 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded bg-[#181818] border border-white/10 overflow-hidden p-1 shrink-0 flex items-center justify-center">
                        <img
                          src={alert.productImage}
                          alt={alert.productName}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-white leading-tight uppercase">
                          {alert.productName}
                        </h3>
                        <p className="text-xs text-neutral-400 uppercase">{alert.productVariant}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveAlert(alert.id)}
                      className="text-neutral-500 hover:text-[#FF3B30] p-1 rounded transition-colors cursor-pointer"
                      title="Delete price alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Target vs Current Bar */}
                  <div className="bg-[#181818] p-3 rounded border border-white/10">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-neutral-400">
                        TARGET: ₹{alert.targetPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[#00FF66]">
                        CURRENT: ₹{alert.currentPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#00FF66] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-white bg-white/5 py-2 px-3 rounded text-xs border border-white/10">
                    <Eye className="w-3.5 h-3.5 text-[#00FF66]" />
                    <span>WATCHING FOR DROP BELOW ₹{alert.targetPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Create New Alert Form */}
          <div className="bg-[#121212] rounded-lg p-5 border border-white/20 space-y-4">
            <h3 className="font-black text-sm sm:text-base text-white uppercase flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#00FF66]" />
              CONFIGURE NEW THRESHOLD ALERT
            </h3>

            {justAddedAlert && (
              <div className="p-3 bg-[#00FF66]/10 border border-[#00FF66]/30 rounded flex items-center gap-2 text-xs font-bold text-[#00FF66] animate-fadeIn uppercase">
                <CheckCircle2 className="w-4 h-4 stroke-[2.5px]" />
                ALERT REGISTERED — REAL-TIME MONITORING ACTIVATED
              </div>
            )}

            <form onSubmit={handleCreateAlert} className="space-y-4">
              {/* Product selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">
                  TARGET PRODUCT
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-[#181818] border border-white/20 rounded p-3 text-xs sm:text-sm text-white focus:border-white outline-hidden cursor-pointer uppercase"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#121212] text-white">
                      {p.name} (₹{p.currentLowestPrice.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Price */}
              <div>
                <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">
                  TARGET TRIGGER PRICE (₹)
                </label>
                <input
                  type="number"
                  value={targetPriceInput}
                  onChange={(e) => setTargetPriceInput(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full bg-[#181818] border border-white/20 rounded p-3 text-xs sm:text-sm text-white focus:border-white outline-hidden transition-all font-mono"
                  required
                />
              </div>

              {/* Toggle Switches */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase">
                    EMAIL DISPATCH NOTIFICATIONS
                  </span>
                  <input
                    type="checkbox"
                    checked={emailNotify}
                    onChange={(e) => setEmailNotify(e.target.checked)}
                    className="w-5 h-5 rounded accent-white cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase">
                    INSTANT PUSH NOTIFICATIONS
                  </span>
                  <input
                    type="checkbox"
                    checked={pushNotify}
                    onChange={(e) => setPushNotify(e.target.checked)}
                    className="w-5 h-5 rounded accent-white cursor-pointer"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black text-xs font-black uppercase tracking-wider py-4 rounded transition-all active:scale-98 cursor-pointer"
              >
                DEPLOY PRICE WATCHER
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
