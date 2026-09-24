import React from 'react';
import {
  X,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Gamepad2,
  Shirt,
  Home,
  Tag,
  Heart,
  Bell,
  Sparkles,
  ShieldCheck,
  Store,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  onSelectCategory: (category: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  const categories = [
    { id: 'smartphones', name: 'Smartphones', icon: Smartphone },
    { id: 'laptops', name: 'Laptops', icon: Laptop },
    { id: 'headphones', name: 'Headphones', icon: Headphones },
    { id: 'tvs', name: 'Smart TVs', icon: Tv },
    { id: 'gaming', name: 'Gaming & Accessories', icon: Gamepad2 },
    { id: 'fashion', name: 'Footwear & Fashion', icon: Shirt },
    { id: 'home', name: 'Home & Kitchen', icon: Home },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex animate-fadeIn font-mono">
      <div className="w-4/5 max-w-xs bg-[#0A0A0A] text-white h-full p-5 flex flex-col justify-between shadow-2xl border-r border-white/20 overflow-y-auto animate-slideLeft">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-white inline-block"></span>
                <h2 className="font-black text-lg tracking-tight uppercase text-white">DEALCOMPARE</h2>
              </div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">
                AUTONOMOUS PRICE ARBITRAGE
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Nav */}
          <div className="space-y-1">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">
              NAVIGATION REGISTRY
            </span>
            <button
              onClick={() => {
                onNavigateTab('home');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold text-neutral-300 hover:text-black hover:bg-white transition-all text-left uppercase cursor-pointer"
            >
              <Home className="w-4 h-4" /> 01 // DASHBOARD
            </button>
            <button
              onClick={() => {
                onNavigateTab('deals');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold text-neutral-300 hover:text-black hover:bg-white transition-all text-left uppercase cursor-pointer"
            >
              <Tag className="w-4 h-4" /> 02 // TODAY'S ARBITRAGE
            </button>
            <button
              onClick={() => {
                onNavigateTab('wishlist');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold text-neutral-300 hover:text-black hover:bg-white transition-all text-left uppercase cursor-pointer"
            >
              <Heart className="w-4 h-4" /> 03 // SAVED HARDWARE
            </button>
            <button
              onClick={() => {
                onNavigateTab('alerts');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-bold text-neutral-300 hover:text-black hover:bg-white transition-all text-left uppercase cursor-pointer"
            >
              <Bell className="w-4 h-4" /> 04 // PRICE TRIGGERS
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-1 pt-3 border-t border-white/10">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-2">
              MARKET SECTORS
            </span>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all text-left uppercase cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Supported Stores list */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block">
              SYNCHRONIZED RETAILERS
            </span>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-neutral-300">
              <span className="px-2 py-1 bg-[#181818] border border-white/15 rounded">AMAZON</span>
              <span className="px-2 py-1 bg-[#181818] border border-white/15 rounded">FLIPKART</span>
              <span className="px-2 py-1 bg-[#181818] border border-white/15 rounded">CROMA</span>
              <span className="px-2 py-1 bg-[#181818] border border-white/15 rounded">RELIANCE</span>
              <span className="px-2 py-1 bg-[#181818] border border-white/15 rounded">MYNTRA</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 text-center text-xs text-neutral-500 font-mono">
          <p className="font-bold text-white uppercase">DEALCOMPARE // PRO-ENGINE</p>
          <p className="text-[10px] mt-0.5 uppercase tracking-widest text-neutral-400">STATUS: ALL FEEDS SYNCHRONIZED</p>
        </div>
      </div>
    </div>
  );
};
