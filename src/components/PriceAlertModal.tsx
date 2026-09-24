import React, { useState } from 'react';
import { X, Bell, CheckCircle2 } from 'lucide-react';
import { Product, PriceAlert } from '../types';

interface PriceAlertModalProps {
  product: Product;
  onClose: () => void;
  onSaveAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  product,
  onClose,
  onSaveAlert,
}) => {
  const defaultTarget = Math.round(product.currentLowestPrice * 0.9);
  const [targetPrice, setTargetPrice] = useState<string>(String(defaultTarget));
  const [emailNotify, setEmailNotify] = useState<boolean>(true);
  const [pushNotify, setPushNotify] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAlert({
      productId: product.id,
      productName: product.shortTitle,
      productVariant: product.brand,
      productImage: product.images.main,
      targetPrice: Number(targetPrice) || defaultTarget,
      currentPrice: product.currentLowestPrice,
      initialPrice: product.originalPrice,
      emailNotify,
      pushNotify,
      isWatching: true,
    });
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn font-mono">
      <div className="bg-[#0A0A0A] w-full max-w-md rounded-lg shadow-2xl p-5 border border-white/20 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="p-2.5 rounded bg-white text-black">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-white uppercase tracking-tight">SET THRESHOLD WATCHER</h3>
            <p className="text-[11px] text-neutral-400 truncate max-w-[260px] uppercase">{product.name}</p>
          </div>
        </div>

        {saved ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-[#00FF66] mx-auto stroke-[2.5px]" />
            <h4 className="font-black text-base text-white uppercase">PRICE WATCHER ACTIVATED</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Automated polling engine active. You will be notified instantly when price drops below ₹
              {Number(targetPrice).toLocaleString('en-IN')}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-[#141414] border border-white/10 rounded flex items-center justify-between text-xs">
              <span className="text-neutral-400 uppercase font-bold">CURRENT LOWEST</span>
              <span className="font-black text-[#00FF66] text-sm sm:text-base">
                ₹{product.currentLowestPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">
                TRIGGER ALERT BELOW (₹)
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="e.g. 65000"
                className="w-full bg-[#181818] border border-white/20 rounded p-3 text-sm text-white font-black focus:border-white outline-hidden transition-all"
                required
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-white uppercase">EMAIL DISPATCH ALERTS</span>
                <input
                  type="checkbox"
                  checked={emailNotify}
                  onChange={(e) => setEmailNotify(e.target.checked)}
                  className="w-5 h-5 rounded accent-white cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-white uppercase">INSTANT PUSH NOTIFICATIONS</span>
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
              className="w-full bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider py-4 rounded transition-all active:scale-98 cursor-pointer mt-2"
            >
              DEPLOY THRESHOLD WATCHER
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
