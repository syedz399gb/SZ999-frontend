'use client';

import React, { useState } from 'react';
import { RefreshCw, PlusCircle, Bell, ShieldCheck } from 'lucide-react';

export default function Header({ balance = 1000.0, onRefreshBalance, onDepositClick }) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (onRefreshBalance) {
      await onRefreshBalance();
    }
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-yellow-500/20 px-3 py-2.5 shadow-lg shadow-black/40">
      <div className="flex items-center justify-between gap-2">
        {/* User Info & Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-yellow-200 p-[2px] shadow-md shadow-yellow-500/30">
              <div className="w-full h-full bg-[#161b22] rounded-full flex items-center justify-center font-black text-sm text-yellow-400 tracking-wider">
                SZ
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-[9px] px-1 py-[1px] rounded-full uppercase border border-[#0d1117]">
              VIP 1
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-gray-200 tracking-wide">
                0300****123
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400 inline" />
            </div>
            <div className="text-[10px] text-gray-400 font-medium">
              ID: <span className="text-gray-300 font-mono">999824</span>
            </div>
          </div>
        </div>

        {/* Balance & Actions */}
        <div className="flex items-center gap-2">
          {/* Balance Pill */}
          <div className="flex items-center bg-[#161b22] border border-emerald-500/30 rounded-full px-2.5 py-1 shadow-inner shadow-black/60">
            <div className="flex flex-col text-right mr-1.5">
              <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider leading-none">
                Balance
              </span>
              <span className="text-xs font-extrabold text-[#10B981] font-mono leading-tight">
                PKR {Number(balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            <button
              onClick={handleRefresh}
              aria-label="Refresh Balance"
              className="text-gray-400 hover:text-yellow-400 active:scale-95 transition-all p-0.5 rounded-full"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-yellow-400' : ''}`} />
            </button>
          </div>

          {/* Deposit Button */}
          <button
            onClick={onDepositClick}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 active:scale-95 text-black font-extrabold text-xs px-2.5 py-1.5 rounded-full shadow-md shadow-yellow-500/25 border border-yellow-300/60 transition duration-150"
          >
            <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Deposit</span>
          </button>
        </div>
      </div>
    </header>
  );
}
