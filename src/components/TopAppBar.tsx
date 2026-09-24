import React from 'react';
import { Menu, Search, ArrowLeft } from 'lucide-react';
import { ActiveTab } from '../types';

interface TopAppBarProps {
  onOpenMenu: () => void;
  onSearchClick: () => void;
  onLogoClick: () => void;
  activeTab: ActiveTab;
  isProductDetail?: boolean;
  onBack?: () => void;
  title?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  onOpenMenu,
  onSearchClick,
  onLogoClick,
  isProductDetail,
  onBack,
  title = 'DEALCOMPARE',
}) => {
  return (
    <header className="bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 flex justify-between items-center w-full px-4 h-16 transition-all duration-200">
      <div className="flex items-center gap-3">
        {isProductDetail && onBack ? (
          <button
            onClick={onBack}
            className="text-white p-2 -ml-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all border border-transparent hover:border-white/20"
            title="Go back"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button
            onClick={onOpenMenu}
            className="text-white p-2 -ml-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all border border-transparent hover:border-white/20"
            title="Open menu"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        )}
        <button
          onClick={onLogoClick}
          className="text-left font-black text-lg sm:text-xl tracking-tighter uppercase text-white hover:text-neutral-300 transition-colors flex items-center gap-2"
        >
          <span>{title}</span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 border border-white/30 bg-white/5 tracking-widest text-neutral-300 hidden sm:inline-block">
            V2.4
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className="text-white p-2 rounded-lg hover:bg-white/10 border border-white/10 hover:border-white/30 active:scale-95 transition-all flex items-center gap-2"
          title="Search deals"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-white" />
          <span className="hidden md:inline text-xs font-mono font-bold tracking-wider text-neutral-400">
            SEARCH [⌘K]
          </span>
        </button>
      </div>
    </header>
  );
};
