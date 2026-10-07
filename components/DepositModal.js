'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

const DEPOSIT_METHODS = [
  { id: 'easypaisa', name: 'EasyPaisa', fee: '0%', badge: 'FAST', icon: '🟢' },
  { id: 'jazzcash', name: 'JazzCash', fee: '0%', badge: 'POPULAR', icon: '🔴' },
  { id: 'bank', name: 'Bank Transfer', fee: '0%', badge: 'DIRECT', icon: '🏦' },
  { id: 'usdt', name: 'USDT (TRC20)', fee: '0%', badge: 'CRYPTO', icon: '🪙' },
];

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000, 25000];

export default function DepositModal({ isOpen, onClose, onDepositSuccess }) {
  const [selectedMethod, setSelectedMethod] = useState('easypaisa');
  const [amount, setAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDeposit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      if (onDepositSuccess) {
        onDepositSuccess(Number(amount));
      }
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-[#161b22] border border-yellow-500/30 rounded-2xl p-4 shadow-2xl relative text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <h3 className="text-sm font-extrabold text-white">Quick Deposit</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce mb-2" />
            <h4 className="text-base font-extrabold text-emerald-400">Deposit Successful!</h4>
            <p className="text-xs text-gray-300 mt-1">
              PKR {Number(amount).toLocaleString()} added to your SZ-999 balance.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 mt-3">
            {/* Payment Methods */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DEPOSIT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      selectedMethod === method.id
                        ? 'bg-yellow-500/10 border-yellow-400 text-white'
                        : 'bg-[#0d1117] border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{method.icon}</span>
                      <span className="text-xs font-bold leading-tight">{method.name}</span>
                    </div>
                    <span className="text-[9px] bg-black/40 px-1 py-0.5 rounded text-yellow-400 font-mono">
                      {method.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Deposit Amount (PKR)
              </label>
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
                      amount === amt
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-yellow-300'
                        : 'bg-[#0d1117] border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    +{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(100, Number(e.target.value)))}
                className="w-full bg-[#0d1117] border border-gray-800 focus:border-yellow-400 rounded-xl px-3 py-2 text-sm font-mono text-yellow-400 font-bold focus:outline-none"
                placeholder="Enter custom amount"
              />
            </div>

            {/* Bonus Banner */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-2 flex items-center justify-between text-[11px]">
              <span className="text-yellow-400 font-semibold">
                🎁 +100% First Deposit Bonus Available
              </span>
              <span className="text-[10px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black">
                ACTIVE
              </span>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleDeposit}
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-yellow-500/25 border border-yellow-300 active:scale-95 transition disabled:opacity-50"
            >
              {isProcessing ? 'Processing Deposit...' : `Confirm Deposit (PKR ${Number(amount).toLocaleString()})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
