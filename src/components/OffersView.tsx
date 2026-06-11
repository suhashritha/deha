/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Ticket, Percent, Sparkles, Gift, Tag, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { PROMO_DEALS } from "../data";

interface OffersViewProps {
  setActiveTab: (tab: string) => void;
}

export default function OffersView({ setActiveTab }: OffersViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [countdownTime, setCountdownTime] = useState({ hours: 9, minutes: 48, seconds: 12 });

  useEffect(() => {
    const clock = setInterval(() => {
      setCountdownTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-900 font-sans space-y-16" id="offers-deals-viewport">
      
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">MEMBERS LOUNGE</span>
        <h1 className="text-4xl font-light font-serif tracking-tight text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
          Active Campaigns & Promos
        </h1>
        <p className="text-zinc-550 text-xs max-w-sm mx-auto pt-1">
          Apply our certified botanical coupons and bulk tier triggers to maximize your shopping index.
        </p>
        <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
      </div>

      {/* Countdown Flash Promotion Card */}
      <div className="bg-linear-to-r from-white to-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative overflow-hidden shadow-xs">
        <div className="absolute -top-10 -left-10 opacity-5 pointer-events-none">
          <Gift className="h-64 w-64 text-[#B3922E]" />
        </div>

        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center space-x-2 text-[#B3922E]">
            <Clock className="h-4 w-4 animate-pulse animate-none" />
            <span className="text-[10px] uppercase font-bold tracking-widest">TEMPORARY METRICS RUNNING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-zinc-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Copenhagen Grand Opening Welcome Deal
          </h2>
          <p className="text-xs text-zinc-650 leading-relaxed max-w-xl">
            We are unlocking a substantial 50% decrease across entire wardrobes, phone wraps, and soy ceramics inside our newly engineered digital boutique. Simply load your shopping bag above $80 and apply code.
          </p>
        </div>

        {/* Live clock bubble */}
        <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-zinc-200 text-center space-y-2">
          <span className="text-[10px] text-[#B3922E] font-bold tracking-widest uppercase block">Campaign Closes In:</span>
          
          <div className="flex justify-center space-x-3">
            <div>
              <p className="text-2xl font-bold font-mono text-[#B3922E]">{String(countdownTime.hours).padStart(2, "0")}</p>
              <p className="text-[9px] text-zinc-450 font-semibold">HOURS</p>
            </div>
            <span className="text-xl font-bold text-[#B3922E]">:</span>
            <div>
              <p className="text-2xl font-bold font-mono text-[#B3922E]">{String(countdownTime.minutes).padStart(2, "0")}</p>
              <p className="text-[9px] text-zinc-450 font-semibold">MINUTES</p>
            </div>
            <span className="text-xl font-bold text-[#B3922E]">:</span>
            <div>
              <p className="text-2xl font-bold font-mono text-[#B3922E]">{String(countdownTime.seconds).padStart(2, "0")}</p>
              <p className="text-[9px] text-zinc-450 font-semibold">SECONDS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Copyable Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="coupons-scroller-grid">
        {PROMO_DEALS.map((deal, dIdx) => (
          <div
            key={deal.id}
            className="bg-white border border-zinc-200 hover:border-zinc-350 rounded-2xl p-6 flex flex-col justify-between space-y-6 transition-all shadow-xs"
            id={`promo-card-${deal.code}`}
          >
            {/* Upper */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#B3922E]/10 text-[#B3922E] border border-[#B3922E]/20 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Active Code Campaign
                </span>
                <span className="text-xs text-zinc-400 font-medium">{deal.expiryDate}</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-[#B3922E]" style={{ fontFamily: "Georgia, serif" }}>
                {deal.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {deal.description}
              </p>
            </div>

            {/* Down Copy block */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-150">
              <div className="text-[9px] text-zinc-400 uppercase tracking-widest">
                MINIMUM ORDER REQUIREMENT: <span className="text-zinc-850 font-mono font-bold">${deal.minimumSpend}</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded font-mono text-xs font-bold tracking-widest text-zinc-800 uppercase">
                  {deal.code}
                </div>
                <button
                  onClick={() => handleCopy(deal.code)}
                  className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    copiedCode === deal.code
                      ? "bg-green-600 text-white"
                      : "bg-[#B3922E] hover:bg-zinc-850 text-white font-semibold"
                  }`}
                >
                  {copiedCode === deal.code ? "COPIED" : "COPY CODE"}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Why DEHA Deals Banner (trust optimizer) */}
      <div className="bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#B3922E]">Bundled Packaging Benefit</h3>
          <p className="text-xs text-zinc-605 font-medium">Spend over $150 and secure complimentary Express Courier Shipping on all premium items.</p>
        </div>
        <button
          onClick={() => setActiveTab("shop")}
          className="px-6 py-2.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer text-[#B3922E] shadow-2xs"
        >
          <span>Shop Collections</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
