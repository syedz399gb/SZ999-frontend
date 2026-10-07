'use client';

import React, { useState } from 'react';
import { Play, Flame, Star, Sparkles, Loader2, Award, Zap } from 'lucide-react';
import { launchGame } from '../lib/api';

export const GAMES = [
  {
    id: 'aviator',
    name: 'Aviator',
    providerId: 'spribe',
    providerName: 'SPRIBE',
    category: 'crash',
    rtp: '97.0%',
    badge: 'HOT',
    badgeColor: 'bg-red-600',
    multiplier: '1000x',
    bgGradient: 'from-red-900 via-rose-950 to-slate-900',
    iconEmoji: '✈️',
    description: 'Fly high & cash out before it crashes!',
    isHot: true,
  },
  {
    id: 'teen_patti',
    name: '3 Patti',
    providerId: 'jdb',
    providerName: 'JDB GAMING',
    category: 'cards',
    rtp: '98.5%',
    badge: 'POPULAR',
    badgeColor: 'bg-amber-600',
    multiplier: '500x',
    bgGradient: 'from-amber-950 via-yellow-950 to-slate-900',
    iconEmoji: '🃏',
    description: 'Classic Royal 3-card poker thrills',
    isHot: true,
  },
  {
    id: 'dragon_tiger',
    name: 'Dragon vs Tiger',
    providerId: 'evolution',
    providerName: 'EVOLUTION',
    category: 'cards',
    rtp: '96.8%',
    badge: 'LIVE',
    badgeColor: 'bg-emerald-600',
    multiplier: '50x',
    bgGradient: 'from-emerald-950 via-teal-950 to-slate-900',
    iconEmoji: '🐉',
    description: 'Fast paced live Asian card battle',
    isHot: true,
  },
  {
    id: 'fruit_slot_777',
    name: '777 Fruit Slot',
    providerId: 'jili',
    providerName: 'JILI SLOTS',
    category: 'slots',
    rtp: '97.2%',
    badge: 'JACKPOT',
    badgeColor: 'bg-purple-600',
    multiplier: '2500x',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-900',
    iconEmoji: '🎰',
    description: 'Triple 7s with mega bonus spins',
    isHot: true,
  },
  {
    id: 'mines',
    name: 'Mines Gold',
    providerId: 'spribe',
    providerName: 'SPRIBE',
    category: 'crash',
    rtp: '98.0%',
    badge: 'NEW',
    badgeColor: 'bg-blue-600',
    multiplier: '10000x',
    bgGradient: 'from-blue-950 via-cyan-950 to-slate-900',
    iconEmoji: '💣',
    description: 'Uncover gems and dodge the mines',
    isHot: false,
  },
  {
    id: 'andar_bahar',
    name: 'Andar Bahar',
    providerId: 'kingmaker',
    providerName: 'KINGMAKER',
    category: 'cards',
    rtp: '97.5%',
    badge: 'HOT',
    badgeColor: 'bg-red-600',
    multiplier: '200x',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    iconEmoji: '🂠',
    description: 'Instant side bet live action',
    isHot: false,
  },
  {
    id: 'crazy_777',
    name: 'Crazy 777',
    providerId: 'jili',
    providerName: 'JILI SLOTS',
    category: 'slots',
    rtp: '96.5%',
    badge: 'MEGA WIN',
    badgeColor: 'bg-yellow-600',
    multiplier: '3333x',
    bgGradient: 'from-orange-950 via-yellow-950 to-slate-900',
    iconEmoji: '🍒',
    description: 'Classic 3-reel lightning multipliers',
    isHot: false,
  },
  {
    id: 'rocket_crash',
    name: 'Space Crash',
    providerId: 'turbogames',
    providerName: 'TURBO',
    category: 'crash',
    rtp: '97.0%',
    badge: 'TRENDING',
    badgeColor: 'bg-rose-600',
    multiplier: '888x',
    bgGradient: 'from-violet-950 via-fuchsia-950 to-slate-900',
    iconEmoji: '🚀',
    description: 'High altitude multiplier thrill',
    isHot: false,
  },
];

function createSessionToken(prefix, gameId) {
  return `${prefix}_${gameId}_${Date.now()}`;
}

export default function GameGrid({ activeTab = 'all', onGameLaunch, userId = '1' }) {
  const [loadingGameId, setLoadingGameId] = useState(null);

  // Filter games based on selected category tab
  const filteredGames = GAMES.filter((game) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'hot') return game.isHot;
    return game.category === activeTab;
  });

  const handlePlayNow = async (game) => {
    try {
      setLoadingGameId(game.id);
      const result = await launchGame(userId, game.id, game.providerId);
      
      const sessionToken = result?.sessionToken || createSessionToken('SZ_TOKEN', game.id);
      const gameUrl = result?.gameUrl || `https://game-demo.sz999.com/?gameId=${game.id}&provider=${game.providerId}&token=${sessionToken}`;
      
      if (onGameLaunch) {
        onGameLaunch({
          game,
          sessionToken,
          gameUrl,
          apiResponse: result,
        });
      }
    } catch (error) {
      console.error('Failed to launch game:', error);
      // Fallback modal launch so user always sees the simulated game viewport
      if (onGameLaunch) {
        onGameLaunch({
          game,
          sessionToken: createSessionToken('SZ_FALLBACK_TOKEN', game.id),
          gameUrl: `https://game-demo.sz999.com/?gameId=${game.id}`,
          error: error.message,
        });
      }
    } finally {
      setLoadingGameId(null);
    }
  };

  return (
    <div className="w-full px-3 pb-24">
      {/* Section Header */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            {activeTab === 'all'
              ? 'Lobby Games'
              : `${activeTab} Games`}
          </h2>
          <span className="text-[11px] font-mono text-gray-400">
            ({filteredGames.length})
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
          <Sparkles className="w-3 h-3" />
          <span>Real Time</span>
        </div>
      </div>

      {/* 2-Column Game Grid */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        {filteredGames.map((game) => {
          const isLoading = loadingGameId === game.id;

          return (
            <div
              key={game.id}
              className="group relative rounded-2xl overflow-hidden bg-[#161b22] border border-yellow-500/20 hover:border-yellow-400/60 shadow-lg shadow-black/50 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Card Banner & Visual Artwork */}
              <div
                className={`relative h-28 w-full p-2.5 flex flex-col justify-between bg-gradient-to-b ${game.bgGradient} overflow-hidden`}
              >
                {/* Visual Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,215,0,0.15),transparent_70%)] pointer-events-none" />

                {/* Top Badge & RTP */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md text-white tracking-wider shadow-sm uppercase ${game.badgeColor}`}
                  >
                    {game.badge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-yellow-300 bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm border border-yellow-500/30">
                    {game.multiplier}
                  </span>
                </div>

                {/* Large Game Visual/Emoji center-stage */}
                <div className="flex items-center justify-center my-auto transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter">
                    {game.iconEmoji}
                  </span>
                </div>

                {/* Provider tag */}
                <div className="flex items-center justify-between z-10">
                  <span className="text-[9px] font-bold tracking-wider text-gray-300/90 uppercase font-mono">
                    {game.providerName}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold">
                    RTP {game.rtp}
                  </span>
                </div>
              </div>

              {/* Card Details & Play Action */}
              <div className="p-2.5 bg-[#161b22] flex flex-col justify-between flex-1 gap-2">
                <div>
                  <h3 className="font-extrabold text-sm text-gray-100 group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {game.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                    {game.description}
                  </p>
                </div>

                {/* PLAY NOW Button */}
                <button
                  onClick={() => handlePlayNow(game)}
                  disabled={isLoading}
                  className={`w-full py-2 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-95 shadow-md ${
                    isLoading
                      ? 'bg-yellow-600/50 text-yellow-200 cursor-wait'
                      : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black shadow-yellow-500/20 border border-yellow-300/70 hover:shadow-yellow-500/40'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>LAUNCHING...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-black stroke-black" />
                      <span>PLAY NOW</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
