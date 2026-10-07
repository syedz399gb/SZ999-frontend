'use client';

import React from 'react';
import { Home, Gift, Wallet, User } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home, badge: null },
  { id: 'bonus', label: 'Bonus', icon: Gift, badge: 'HOT' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, badge: null },
  { id: 'profile', label: 'Profile', icon: User, badge: null },
];

export default function BottomNav({ activeNav = 'home', onSelectNav }) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0d1117]/95 backdrop-blur-lg border-t border-yellow-500/20 px-2 py-2 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
      <div className="grid grid-cols-4 gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectNav && onSelectNav(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-yellow-400 font-extrabold'
                  : 'text-gray-400 hover:text-gray-200 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-yellow-400 stroke-[2.5]' : 'stroke-[1.8]'
                  }`}
                />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-3 bg-red-600 text-white text-[8px] font-black px-1 rounded-full uppercase leading-tight animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-wide ${isActive ? 'text-yellow-400' : 'text-gray-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 bg-yellow-400 rounded-full mt-0.5 shadow-sm shadow-yellow-400" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
