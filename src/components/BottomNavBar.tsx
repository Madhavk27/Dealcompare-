import React from 'react';
import { Home, Search, Tag, Heart, Bell } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  wishlistCount: number;
  alertCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  wishlistCount,
  alertCount,
}) => {
  const tabs = [
    { id: 'home' as ActiveTab, label: 'HOME', icon: Home },
    { id: 'search' as ActiveTab, label: 'SEARCH', icon: Search },
    { id: 'deals' as ActiveTab, label: 'DEALS', icon: Tag },
    { id: 'wishlist' as ActiveTab, label: 'WISHLIST', icon: Heart, badge: wishlistCount },
    { id: 'alerts' as ActiveTab, label: 'ALERTS', icon: Bell, badge: alertCount },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-white/15 flex justify-around items-center px-2 py-2 pb-safe max-w-lg mx-auto md:max-w-md sm:border-x sm:border-white/15 sm:rounded-t-xl shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-all duration-150 ${
              isActive
                ? 'text-black bg-white font-black scale-95 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'stroke-[2.5px]' : 'stroke-[1.75px]'
                }`}
              />
              {tab.badge !== undefined && tab.badge > 0 && (
                <span
                  className={`absolute -top-1.5 -right-2.5 text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center ring-1 ${
                    isActive
                      ? 'bg-black text-white ring-white'
                      : 'bg-white text-black ring-black'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[9px] font-mono font-bold mt-1 tracking-widest uppercase">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
