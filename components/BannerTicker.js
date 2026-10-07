'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, ChevronLeft, ChevronRight, Gift, Flame, Zap } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    title: '100% FIRST DEPOSIT BONUS',
    subtitle: 'Get up to PKR 25,000 instantly on your first deposit!',
    badge: 'EXCLUSIVE',
    tag: 'NEW MEMBER',
    gradient: 'from-amber-600 via-yellow-500 to-amber-700',
    accentIcon: Gift,
  },
  {
    id: 2,
    title: 'AVIATOR 1000x JACKPOT',
    subtitle: 'Highest multiplier payout this week! Bet from PKR 50.',
    badge: 'HOT GAME',
    tag: 'SUPER MULTIPLIER',
    gradient: 'from-rose-700 via-red-600 to-amber-600',
    accentIcon: Flame,
  },
  {
    id: 3,
    title: 'DAILY CASH REBATES & VIP',
    subtitle: 'Unlimited 1.2% daily cash rebate credited automatically.',
    badge: 'VIP CLUB',
    tag: 'DAILY REWARD',
    gradient: 'from-indigo-800 via-purple-700 to-amber-600',
    accentIcon: Zap,
  },
];

const WINNERS = [
  { user: '0321***908', amount: '5,000', game: 'Aviator' },
  { user: '0304***112', amount: '18,500', game: 'Teen Patti' },
  { user: '0345***874', amount: '35,000', game: 'Dragon vs Tiger' },
  { user: '0312***456', amount: '8,200', game: '777 Fruit Slot' },
  { user: '0333***661', amount: '12,000', game: 'Aviator' },
  { user: '0301***789', amount: '50,000', game: 'Mines' },
  { user: '0342***543', amount: '15,400', game: 'Roulette 3D' },
];

export default function BannerTicker({ onPromoClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);

  return (
    <div className="w-full space-y-2.5 px-3 pt-3">
      {/* Banner Carousel */}
      <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 shadow-lg shadow-black/60 bg-[#161b22]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BANNERS.map((banner) => {
            const Icon = banner.accentIcon;
            return (
              <div
                key={banner.id}
                className="w-full flex-shrink-0 cursor-pointer relative"
                onClick={() => onPromoClick && onPromoClick(banner)}
              >
                <div
                  className={`relative p-4 h-36 flex flex-col justify-between bg-gradient-to-br ${banner.gradient} overflow-hidden`}
                >
                  {/* Decorative Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_60%)] pointer-events-none" />
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-25">
                    <Icon className="w-24 h-24 text-white" />
                  </div>

                  {/* Top tags */}
                  <div className="flex items-center gap-2 z-10">
                    <span className="bg-black/40 backdrop-blur-sm text-yellow-300 border border-yellow-400/40 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {banner.badge}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {banner.tag}
                    </span>
                  </div>

                  {/* Banner Content */}
                  <div className="z-10 pr-12">
                    <h3 className="text-base font-black text-white tracking-wide drop-shadow-md">
                      {banner.title}
                    </h3>
                    <p className="text-xs text-white/90 line-clamp-2 mt-0.5 font-medium leading-snug drop-shadow-sm">
                      {banner.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="z-10 flex items-center justify-between text-[11px] font-bold text-yellow-200">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                      Claim Now
                    </span>
                    <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full text-white/90">
                      Tap to view
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel controls */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm transition"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-5 bg-yellow-400' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Live Winning Ticker Marquee */}
      <div className="flex items-center bg-[#161b22]/90 border border-yellow-500/20 rounded-xl px-2.5 py-1.5 shadow-md shadow-black/30 overflow-hidden">
        <div className="flex items-center gap-1.5 pr-2 border-r border-yellow-500/30 text-yellow-400 flex-shrink-0 z-10 bg-[#161b22]">
          <Volume2 className="w-4 h-4 animate-pulse text-yellow-400" />
          <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 hidden sm:inline">
            Notice
          </span>
        </div>

        <div className="overflow-hidden relative flex-1 ml-2">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {/* Repeat winners list for seamless infinite loop */}
            {[...WINNERS, ...WINNERS].map((item, index) => (
              <div key={index} className="inline-flex items-center gap-1.5 text-xs text-gray-300">
                <span className="text-gray-400 font-mono">User {item.user}</span>
                <span className="text-gray-400">won</span>
                <span className="text-yellow-400 font-bold font-mono">
                  PKR {item.amount}
                </span>
                <span className="text-gray-400">in</span>
                <span className="text-emerald-400 font-semibold">{item.game}</span>
                <span className="text-yellow-500/50 mx-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
