import React from 'react';
import { X, ArrowRightLeft, Check, Plus, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  products: Product[];
  onClose: () => void;
  onRemoveProduct: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
  onAddProduct: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  products,
  onClose,
  onRemoveProduct,
  onSelectProduct,
  allProducts,
  onAddProduct,
}) => {
  const unselectedProducts = allProducts.filter(
    (ap) => !products.some((p) => p.id === ap.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn font-mono">
      <div className="bg-[#0A0A0A] w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-white/20 text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 bg-[#121212]">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#00FF66]" />
            <h2 className="font-black text-sm sm:text-base text-white uppercase tracking-tight">
              SPECIFICATION & VALUE COMPARISON ({products.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-x-auto p-4 sm:p-5 flex-1 space-y-6">
          {products.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm font-bold text-white uppercase">NO PRODUCTS SELECTED FOR COMPARISON</p>
              <p className="text-xs text-neutral-400">
                Select 2 or more products to view multi-retailer pricing and technical specs.
              </p>
            </div>
          ) : (
            <div className="min-w-[600px] space-y-4">
              {/* Product Cards Row */}
              <div className="grid grid-cols-3 gap-3">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-[#141414] border border-white/20 rounded-lg p-3 relative flex flex-col items-center text-center shadow-lg"
                  >
                    <button
                      onClick={() => onRemoveProduct(prod.id)}
                      className="absolute top-1.5 right-1.5 p-1 text-neutral-400 hover:text-[#FF3B30] rounded hover:bg-white/10 transition-colors cursor-pointer"
                      title="Remove product"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-20 h-20 bg-[#1a1a1a] rounded p-1 border border-white/10 mb-2 flex items-center justify-center">
                      <img
                        src={prod.images.main}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="text-[9px] text-neutral-400 uppercase tracking-widest">{prod.brand}</div>
                    <h3 className="font-bold text-xs text-white uppercase truncate w-full mb-1">
                      {prod.shortTitle}
                    </h3>
                    <div className="text-sm sm:text-base font-black text-[#00FF66]">
                      ₹{prod.currentLowestPrice.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-neutral-500 line-through">
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(prod);
                      }}
                      className="mt-2.5 w-full bg-white hover:bg-neutral-200 text-black py-1.5 rounded text-[11px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                ))}

                {products.length < 3 && unselectedProducts.length > 0 && (
                  <div className="bg-[#121212] border-2 border-dashed border-white/20 rounded-lg p-3 flex flex-col items-center justify-center text-center min-h-[160px]">
                    <span className="text-xs font-bold text-neutral-300 uppercase mb-2">
                      ADD TO COMPARISON
                    </span>
                    <select
                      onChange={(e) => {
                        const p = allProducts.find((item) => item.id === e.target.value);
                        if (p) onAddProduct(p);
                      }}
                      value=""
                      className="w-full text-xs bg-[#181818] border border-white/20 rounded p-2 text-white outline-hidden cursor-pointer uppercase font-mono"
                    >
                      <option value="" disabled className="bg-[#121212]">
                        Choose product...
                      </option>
                      {unselectedProducts.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#121212]">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Comparison Matrix Table */}
              <div className="border border-white/20 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    <tr className="bg-[#181818] border-b border-white/20 font-bold text-white uppercase">
                      <td className="p-3 w-1/4 font-black">DEAL SCORE</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3">
                          <span className="px-2 py-0.5 bg-[#00FF66]/10 text-[#00FF66] font-black rounded border border-[#00FF66]/20">
                            {p.dealScore.overallScore}/100 ({p.dealScore.verdict})
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-white/10">
                      <td className="p-3 font-bold text-neutral-400 bg-[#141414] uppercase">LOWEST RETAILER</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 font-bold text-white">
                          {p.stores[0]?.storeName} (₹{p.stores[0]?.price.toLocaleString('en-IN')})
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-white/10">
                      <td className="p-3 font-bold text-neutral-400 bg-[#141414] uppercase">DISCOUNT RATE</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 font-bold text-[#00FF66]">
                          {p.discountPercent}% OFF (SAVE ₹{p.savingsAmount.toLocaleString('en-IN')})
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-white/10">
                      <td className="p-3 font-bold text-neutral-400 bg-[#141414] uppercase">VERIFIED REVIEWS</td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 font-semibold text-neutral-200">
                          ★ {p.rating} ({p.reviewCount.toLocaleString('en-IN')} reviews)
                        </td>
                      ))}
                    </tr>

                    {/* Common Specs */}
                    {['Display', 'Processor', 'Storage', 'RAM', 'Main Camera', 'Battery'].map(
                      (specTitle) => (
                        <tr key={specTitle} className="border-b border-white/10 last:border-0">
                          <td className="p-3 font-bold text-neutral-400 bg-[#141414] uppercase">
                            {specTitle}
                          </td>
                          {products.map((p) => {
                            const found = p.specifications.find((s) =>
                              s.name.toLowerCase().includes(specTitle.toLowerCase())
                            );
                            return (
                              <td key={p.id} className="p-3 text-white font-medium">
                                {found ? found.value : '—'}
                              </td>
                            );
                          })}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/20 bg-[#121212] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-black font-black text-xs uppercase tracking-wider rounded hover:bg-neutral-200 cursor-pointer"
          >
            CLOSE COMPARISON
          </button>
        </div>
      </div>
    </div>
  );
};
