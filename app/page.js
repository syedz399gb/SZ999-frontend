'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BannerTicker from '../components/BannerTicker';
import CategoryTabs from '../components/CategoryTabs';
import GameGrid from '../components/GameGrid';
import GameModal from '../components/GameModal';
import BottomNav from '../components/BottomNav';
import DepositModal from '../components/DepositModal';
import { fetchUserBalance } from '../lib/api';
import { Gift, Wallet, User, ArrowDownCircle, ArrowUpCircle, Trophy, ShieldCheck, ChevronRight, Award, History, Headphones } from 'lucide-react';

export default function Home() {
  // Navigation & Category states
  const [activeNav, setActiveNav] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');

  // User & Balance states
  const [balance, setBalance] = useState(1000.0);
  const [sessionToken, setSessionToken] = useState('SZ_SESSION_DEMO_001');

  // Game Modal states
  const [activeGame, setActiveGame] = useState(null);
  const [gameUrl, setGameUrl] = useState('');
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  // Deposit Modal state
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  // Bonus / Daily Reward state
  const [claimedDaily, setClaimedDaily] = useState(false);

  // Fetch initial balance on mount
  useEffect(() => {
    async function loadBalance() {
      try {
        const data = await fetchUserBalance(sessionToken);
        if (data && typeof data.balance === 'number') {
          setBalance(data.balance);
        }
      } catch (err) {
        console.warn('Initial balance fetch error:', err);
      }
    }
    loadBalance();
  }, [sessionToken]);

  // Balance Refresh Handler
  const handleRefreshBalance = async () => {
    try {
      const data = await fetchUserBalance(sessionToken);
      if (data && typeof data.balance === 'number') {
        setBalance(data.balance);
      }
    } catch (err) {
      console.warn('Balance refresh failed:', err);
    }
  };

  // Launch Game Handler
  const handleGameLaunch = ({ game, sessionToken: token, gameUrl: url }) => {
    setActiveGame(game);
    setSessionToken(token);
    setGameUrl(url);
    setIsGameModalOpen(true);
  };

  // Deposit Handler
  const handleDepositSuccess = (amount) => {
    setBalance((prev) => prev + amount);
  };

  // Claim Daily Bonus
  const handleClaimDaily = () => {
    if (!claimedDaily) {
      setBalance((prev) => prev + 50);
      setClaimedDaily(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#07090d] flex justify-center selection:bg-yellow-400 selection:text-black">
      {/* Mobile container - Max 425px centered */}
      <div className="w-full max-w-md min-h-screen bg-[#0d1117] border-x border-yellow-500/10 flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)] pb-16">
        
        {/* Top Header */}
        <Header
          balance={balance}
          onRefreshBalance={handleRefreshBalance}
          onDepositClick={() => setIsDepositModalOpen(true)}
        />

        {/* Main Content Area switched by activeNav */}
        {activeNav === 'home' && (
          <main className="flex-1 flex flex-col">
            {/* Promo Carousel + Live Winning Ticker */}
            <BannerTicker onPromoClick={() => setActiveNav('bonus')} />

            {/* Category Filter Tabs */}
            <CategoryTabs
              activeTab={activeCategory}
              onSelectTab={setActiveCategory}
            />

            {/* Game Cards Grid */}
            <GameGrid
              activeTab={activeCategory}
              onGameLaunch={handleGameLaunch}
              userId="1"
            />
          </main>
        )}

        {/* Bonus Page Sub-view */}
        {activeNav === 'bonus' && (
          <div className="flex-1 px-4 py-4 space-y-3 pb-24 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-yellow-400" />
              <h2 className="text-base font-extrabold uppercase tracking-wide">Reward & Promotions</h2>
            </div>

            {/* Daily Check-in Card */}
            <div className="bg-[#161b22] border border-yellow-500/20 rounded-2xl p-4 shadow-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full uppercase">
                  Daily Check-In
                </span>
                <h3 className="font-extrabold text-sm mt-1 text-white">Claim Free PKR 50</h3>
                <p className="text-[11px] text-gray-400">Log in daily to claim your lucky reward</p>
              </div>
              <button
                onClick={handleClaimDaily}
                disabled={claimedDaily}
                className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                  claimedDaily
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black shadow-md shadow-yellow-500/20 active:scale-95'
                }`}
              >
                {claimedDaily ? 'Claimed' : 'Claim Now'}
              </button>
            </div>

            {/* 100% First Deposit Card */}
            <div className="bg-gradient-to-br from-amber-950/70 via-[#161b22] to-[#161b22] border border-yellow-500/40 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-yellow-300 bg-black/40 px-2 py-0.5 rounded-full uppercase">
                  Welcome Offer
                </span>
                <span className="text-xs font-mono font-bold text-yellow-400">+100% Match</span>
              </div>
              <h3 className="font-extrabold text-sm mt-2 text-white">First Deposit Mega Bonus</h3>
              <p className="text-[11px] text-gray-300 mt-0.5">
                Deposit PKR 1,000+ to receive double credits instantly.
              </p>
              <button
                onClick={() => setIsDepositModalOpen(true)}
                className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-extrabold uppercase tracking-wider shadow"
              >
                Deposit to Claim
              </button>
            </div>

            {/* VIP Cash Rebate */}
            <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <h3 className="font-bold text-sm text-gray-100">VIP Cash Rebates</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Receive 1.2% daily rolling cashback on all Aviator and Slots turnover.
              </p>
            </div>
          </div>
        )}

        {/* Wallet Page Sub-view */}
        {activeNav === 'wallet' && (
          <div className="flex-1 px-4 py-4 space-y-4 pb-24 text-white">
            <div className="bg-gradient-to-br from-[#1c2331] to-[#12161f] border border-yellow-500/30 rounded-2xl p-4 shadow-xl">
              <span className="text-xs font-medium text-gray-400">Total Available Balance</span>
              <div className="text-2xl font-black font-mono text-[#10B981] mt-1">
                PKR {Number(balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsDepositModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs font-extrabold uppercase shadow-md active:scale-95 transition"
                >
                  <ArrowDownCircle className="w-4 h-4" />
                  <span>Deposit</span>
                </button>
                <button
                  onClick={() => alert('Withdrawal request submitted! Minimum withdrawal is PKR 500.')}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 text-xs font-extrabold uppercase active:scale-95 transition"
                >
                  <ArrowUpCircle className="w-4 h-4 text-emerald-400" />
                  <span>Withdraw</span>
                </button>
              </div>
            </div>

            {/* Quick payment channels */}
            <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-3.5 space-y-2">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Supported Gateways
              </h4>
              <div className="flex items-center justify-between text-xs text-gray-300 py-1 border-b border-gray-800/60">
                <span>JazzCash Mobile Account</span>
                <span className="text-emerald-400 font-semibold font-mono">Instant (0%)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300 py-1 border-b border-gray-800/60">
                <span>EasyPaisa Digital Wallet</span>
                <span className="text-emerald-400 font-semibold font-mono">Instant (0%)</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-300 py-1">
                <span>USDT TRC-20 Crypto</span>
                <span className="text-emerald-400 font-semibold font-mono">Instant (0%)</span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Page Sub-view */}
        {activeNav === 'profile' && (
          <div className="flex-1 px-4 py-4 space-y-3 pb-24 text-white">
            {/* User Profile Card */}
            <div className="bg-[#161b22] border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5">
                <div className="w-full h-full bg-[#0d1117] rounded-full flex items-center justify-center text-yellow-400 font-black text-base">
                  SZ
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white">0300****123</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                  <span className="text-yellow-400 font-mono">VIP LEVEL 1</span>
                  <span>•</span>
                  <span>Verified</span>
                </div>
              </div>
            </div>

            {/* Settings & Links */}
            <div className="bg-[#161b22] border border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-800 text-xs">
              <button
                onClick={() => alert('Customer Service: Support available 24/7 on WhatsApp & Telegram')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-gray-800/50 transition text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Headphones className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold text-gray-200">24/7 Live Customer Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>

              <button
                onClick={() => setActiveNav('wallet')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-gray-800/50 transition text-left"
              >
                <div className="flex items-center gap-2.5">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-gray-200">Game & Betting History</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>

              <button
                onClick={() => alert('Security: 2FA Authentication is active.')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-gray-800/50 transition text-left"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-gray-200">Security & Account Protection</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* Pinned Bottom Navigation */}
        <BottomNav
          activeNav={activeNav}
          onSelectNav={setActiveNav}
        />

        {/* Full-Screen Game Viewport Modal */}
        <GameModal
          isOpen={isGameModalOpen}
          onClose={() => setIsGameModalOpen(false)}
          activeGame={activeGame}
          sessionToken={sessionToken}
          gameUrl={gameUrl}
          userBalance={balance}
        />

        {/* Quick Deposit Modal */}
        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={() => setIsDepositModalOpen(false)}
          onDepositSuccess={handleDepositSuccess}
        />

      </div>
    </div>
  );
}
