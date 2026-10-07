'use client';

import React from 'react';
import { Flame, PlayingCard as CardsIcon, Trophy, Zap, Sparkles, Coins } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Games', icon: Sparkles, count: '12+' },
  { id: 'hot', label: 'Hot', icon: Flame, count: 'Top' },
  { id: 'crash', label: 'Crash', icon: Zap, count: 'Fast' },
  { id: 'cards', label: 'Cards', icon: Coins, count: 'Live' },
  { id: 'slots', label: 'Slots', icon: Trophy, count: 'Jackpot' },
];

export default function CategoryTabs({ activeTab, onSelectTab }) {
  return (
    <div className="w-full px-3 py-2">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectTab(cat.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/25 border border-yellow-300 font-extrabold scale-[1.02]'
                  : 'bg-[#161b22] text-gray-400 hover:text-gray-200 hover:bg-[#1f2937] border border-gray-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black stroke-[2.5]' : 'text-yellow-400'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1 py-0.2 rounded-full uppercase ${
                  isActive ? 'bg-black/20 text-black' : 'bg-gray-800 text-gray-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
