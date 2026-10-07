'use client';

import React, { useState, useEffect } from 'react';
import { X, Maximize2, Minimize2, Copy, Check, Shield, RotateCw, Play, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function GameModal({ isOpen, onClose, activeGame, sessionToken, gameUrl, userBalance = 1000 }) {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(1.0);
  const [isPlayingSim, setIsPlayingSim] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [winAmount, setWinAmount] = useState(0);

  // Aviator simulator animation
  useEffect(() => {
    let interval;
    if (isOpen && activeGame?.id === 'aviator' && isPlayingSim && !crashed && !cashedOut) {
      interval = setInterval(() => {
        setSimulatedScore((prev) => {
          const next = +(prev + 0.05).toFixed(2);
          // Random crash condition around 2.5x to 6x
          if (next > 3.8 && Math.random() < 0.08) {
            setCrashed(true);
            setIsPlayingSim(false);
            return next;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isOpen, activeGame, isPlayingSim, crashed, cashedOut]);

  if (!isOpen || !activeGame) return null;

  const handleCopyToken = () => {
    if (sessionToken) {
      navigator.clipboard?.writeText(sessionToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartSim = () => {
    setSimulatedScore(1.0);
    setCrashed(false);
    setCashedOut(false);
    setWinAmount(0);
    setIsPlayingSim(true);
  };

  const handleCashOut = () => {
    if (isPlayingSim && !crashed && !cashedOut) {
      setCashedOut(true);
      setIsPlayingSim(false);
      setWinAmount(Math.round(100 * simulatedScore));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-3 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="w-full max-w-md h-full sm:h-[94vh] bg-[#0d1117] border border-yellow-500/30 rounded-none sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-yellow-500/10">
        {/* Top Control Bar */}
        <div className="bg-[#161b22] px-3 py-2 border-b border-yellow-500/20 flex items-center justify-between gap-2 flex-shrink-0">
          {/* Game Title & Provider */}
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeGame.iconEmoji || '🎮'}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-white leading-tight">
                  {activeGame.name}
                </h3>
                <span className="flex items-center gap-1 text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-mono">
                {activeGame.providerName}
              </p>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              title="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-500/30 text-red-300 hover:text-white transition"
              title="Close Game"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Session Token Info Strip */}
        <div className="bg-[#12161f] px-3 py-1.5 border-b border-gray-800/80 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-gray-400 overflow-hidden">
            <Shield className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
            <span className="text-gray-400 truncate">
              Token: <span className="text-yellow-400 font-semibold">{sessionToken ? `${sessionToken.slice(0, 16)}...` : 'AUTHENTICATED'}</span>
            </span>
          </div>

          <button
            onClick={handleCopyToken}
            className="flex items-center gap-1 text-[10px] bg-gray-800 hover:bg-gray-700 px-2 py-0.5 rounded text-gray-300 transition flex-shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-yellow-400" />
                <span>Copy Token</span>
              </>
            )}
          </button>
        </div>

        {/* Game Viewport / Iframe Area */}
        <div className="relative flex-1 bg-black flex flex-col justify-center items-center overflow-hidden">
          {/* Simulated Game Interface */}
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-b from-[#111622] via-[#0b0e14] to-black relative">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* In-Game Header Overlay */}
            <div className="flex items-center justify-between z-10 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-800">
              <span className="text-xs font-bold text-gray-300">
                Lobby ID: <span className="text-yellow-400">#999-LIVE</span>
              </span>
              <span className="text-xs font-mono font-extrabold text-[#10B981]">
                PKR {Number(userBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Game Screen Content Based on Game ID */}
            {activeGame.id === 'aviator' ? (
              <div className="my-auto flex flex-col items-center justify-center text-center z-10">
                <div className="relative w-48 h-48 flex items-center justify-center rounded-full border-4 border-yellow-500/20 bg-yellow-500/5 shadow-[0_0_50px_rgba(255,215,0,0.1)]">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl animate-bounce">✈️</span>
                    <span
                      className={`text-4xl font-black font-mono tracking-tight ${
                        crashed ? 'text-red-500' : 'text-yellow-400'
                      }`}
                    >
                      {crashed ? 'FLEW AWAY!' : `${simulatedScore.toFixed(2)}x`}
                    </span>
                    {cashedOut && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full mt-1 border border-emerald-500/40">
                        Cashed out: +PKR {winAmount}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  {!isPlayingSim ? (
                    <button
                      onClick={handleStartSim}
                      className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/30 active:scale-95 transition"
                    >
                      BET 100 PKR & FLY
                    </button>
                  ) : (
                    <button
                      onClick={handleCashOut}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-black text-xs rounded-xl shadow-lg shadow-yellow-500/30 active:scale-95 transition animate-pulse"
                    >
                      CASH OUT ({(100 * simulatedScore).toFixed(0)} PKR)
                    </button>
                  )}
                </div>
              </div>
            ) : activeGame.id === 'fruit_slot_777' || activeGame.category === 'slots' ? (
              <div className="my-auto flex flex-col items-center justify-center text-center z-10">
                <div className="bg-[#161b22] border-2 border-yellow-500/40 rounded-2xl p-4 shadow-2xl shadow-yellow-500/10">
                  <div className="flex gap-3 text-4xl bg-black/80 p-4 rounded-xl border border-yellow-500/30">
                    <span className="animate-pulse">🍒</span>
                    <span className="animate-pulse">7️⃣</span>
                    <span className="animate-pulse">💎</span>
                  </div>
                  <div className="text-xs text-yellow-400 font-bold mt-2">
                    MEGA JACKPOT: PKR 2,500,000
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-xs font-semibold text-gray-400">
                    Interactive Reels Synced via WebSocket
                  </span>
                </div>
              </div>
            ) : (
              <div className="my-auto flex flex-col items-center justify-center text-center z-10">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-yellow-500/20 to-amber-500/20 border border-yellow-500/40 flex items-center justify-center text-5xl mb-3 shadow-lg shadow-black">
                  {activeGame.iconEmoji || '🎮'}
                </div>
                <h4 className="text-lg font-black text-white">{activeGame.name}</h4>
                <p className="text-xs text-gray-400 max-w-xs mt-1">
                  Connecting to live casino dealer room via encrypted game session stream.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fair Play Certified (RNG 97.8%)</span>
                </div>
              </div>
            )}

            {/* Bottom In-Game Actions */}
            <div className="z-10 bg-black/70 backdrop-blur-md rounded-xl p-2.5 border border-gray-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-mono">Provably Fair Engine</span>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-1 rounded-lg text-xs font-bold transition"
              >
                Return to Lobby
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#161b22] px-3 py-2 border-t border-yellow-500/20 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
          <span>SZ-999 Gaming Hub</span>
          <button
            onClick={onClose}
            className="text-yellow-400 hover:underline font-bold text-xs"
          >
            Exit Game
          </button>
        </div>
      </div>
    </div>
  );
}
