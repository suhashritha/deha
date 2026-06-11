/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Clock, Bell, ArrowRight, ShieldCheck, Truck, Percent, Sparkles } from "lucide-react";
import { Product, PromoDeal } from "../types";
import { PRODUCTS, PROMO_DEALS } from "../data";

interface HomeViewProps {
  onSelectProduct: (p: Product) => void;
  setActiveTab: (tab: string) => void;
  onAddToCartDirect: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  wishlist: Product[];
}

export default function HomeView({
  onSelectProduct,
  setActiveTab,
  onAddToCartDirect,
  onAddToWishlist,
  wishlist
}: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdownTime, setCountdownTime] = useState({ hours: 14, minutes: 32, seconds: 45 });

  // Promotional sliders
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop",
      title: "Discover Style.",
      italic: "Define Yourself.",
      subtitle: "Explore curated fashion, accessories, and lifestyle essentials designed for modern urban professionals."
    },
    {
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
      title: "Pure Materials.",
      italic: "Absolute Longevity.",
      subtitle: "Finely woven Mongolian cashmere and authentic Mulberry wrap silks that hold posture gracefully."
    },
    {
      img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1400&auto=format&fit=crop",
      title: "Minimal Design.",
      italic: "Modern Spaces.",
      subtitle: "Sand-casted heavy brass phone aligners and natural unrefined stoneware candle pottery."
    }
  ];

  // Auto Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 }; // Loop resetting
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter out best sellers for initial grid layout engagement
  const featuredProducts = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 font-sans" id="home-view-canvas">
      
      {/* 1. Hero Animated Slider Section */}
      <section className="relative h-[85vh] overflow-hidden bg-[#FAF9F5] flex items-center" id="hero-slider-segment">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Dark contrast gradient mask to preserve text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5]/90 via-[#FAF9F5]/40 to-transparent h-full z-10" />
            <img
              src={slides[currentSlide].img}
              alt="Luxury fashion background"
              className="w-full h-full object-cover opacity-80 scale-105"
            />
          </motion.div>
        </AnimatePresence>
 
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#B3922E] text-xs font-bold tracking-[0.4em] uppercase block"
            >
              SS26 PREMIUM COUTURE LINE
            </motion.span>
            
            <motion.h1
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl font-light leading-[0.95] tracking-tight text-zinc-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {slides[currentSlide].title} <br />
              <span className="italic font-serif text-[#B3922E]">{slides[currentSlide].italic}</span>
            </motion.h1>
 
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-650 text-base sm:text-lg max-w-lg leading-relaxed"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
 
            <motion.div
              initial={{ y: 35, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={() => setActiveTab("shop")}
                className="px-8 py-3.5 bg-[#B3922E] text-white font-bold text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors cursor-pointer rounded"
              >
                Discover Collection
              </button>
              <button
                onClick={() => setActiveTab("offers")}
                className="px-8 py-3.5 border border-zinc-300 hover:border-[#B3922E] hover:text-[#B3922E] text-zinc-750 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded hover:bg-zinc-100"
              >
                Seasonal Deals
              </button>
            </motion.div>
          </div>
        </div>
 
        {/* Thumbnail Slide Indicator Controls */}
        <div className="absolute right-8 bottom-8 z-20 flex space-x-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all ${
                currentSlide === i ? "w-8 bg-[#B3922E]" : "w-3 bg-zinc-300"
              } rounded-full`}
            />
          ))}
        </div>
      </section>
 
      {/* 2. Promo Coupons Banner with Live Count Down */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="seasonal-promo-countdown-bar">
        <div className="bg-[#FAF9F5] border border-zinc-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xs">
          
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Percent className="h-48 w-48 text-[#B3922E]" />
          </div>
 
          <div className="space-y-2 z-10">
            <span className="bg-[#B3922E]/10 text-[#B3922E] border border-[#B3922E]/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
              Limited Flash Promotion
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 tracking-tight leading-tight">
              Get 50% Off Select Wardrobes & Accessories
            </h2>
            <p className="text-xs text-zinc-500">
              Apply code <span className="text-[#B3922E] font-mono font-bold">DEHA50</span> on checkouts exceeding $80. Expires soon.
            </p>
          </div>
 
          {/* Countdown Clock */}
          <div className="flex space-x-3 z-10 shrink-0" id="countdown-visuals">
            <div className="flex flex-col items-center">
              <div className="bg-white border border-zinc-200 rounded-xl w-14 h-14 flex items-center justify-center shadow-xs">
                <span className="text-xl font-bold font-mono text-[#B3922E]">{String(countdownTime.hours).padStart(2, "0")}</span>
              </div>
              <span className="text-[10px] text-zinc-450 uppercase mt-1">HRS</span>
            </div>
            <div className="text-xl text-[#B3922E] font-bold self-center pb-5">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white border border-zinc-200 rounded-xl w-14 h-14 flex items-center justify-center shadow-xs">
                <span className="text-xl font-bold font-mono text-[#B3922E]">{String(countdownTime.minutes).padStart(2, "0")}</span>
              </div>
              <span className="text-[10px] text-zinc-450 uppercase mt-1">MIN</span>
            </div>
            <div className="text-xl text-[#B3922E] font-bold self-center pb-5">:</div>
            <div className="flex flex-col items-center">
              <div className="bg-white border border-zinc-200 rounded-xl w-14 h-14 flex items-center justify-center shadow-xs">
                <span className="text-xl font-bold font-mono text-[#B3922E]">{String(countdownTime.seconds).padStart(2, "0")}</span>
              </div>
              <span className="text-[10px] text-zinc-450 uppercase mt-1">SEC</span>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* 3. Featured Structured Layout Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-categories-grid">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">CURATED PERSPECTIVE</span>
          <h2 className="text-3xl font-light font-serif text-zinc-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
            Prêt-à-Porter & Design Categories
          </h2>
          <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="categories-grid-wrapper">
          
          {/* Fashion Group */}
          <div
            onClick={() => setActiveTab("shop")}
            className="group relative h-[380px] rounded-2xl overflow-hidden border border-zinc-200 flex flex-col justify-end p-8 cursor-pointer bg-white shadow-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent h-full z-10 transition-opacity duration-300 group-hover:opacity-90" />
            <img
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"
              alt="Fashion selection"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[#B3922E] text-[10px] uppercase tracking-widest font-bold">COUTURE</span>
              <h3 className="text-xl font-serif text-zinc-900">Fashion & Garments</h3>
              <p className="text-xs text-zinc-600 group-hover:text-zinc-800 transition-colors">Silk dresses, cashmere Sweaters, wool outerwear.</p>
              <span className="text-xs text-[#B3922E] inline-flex items-center pt-2 font-semibold">
                Explore Wardrobes <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>
 
          {/* Armor, Tech, Phone Accessories */}
          <div
            onClick={() => setActiveTab("shop")}
            className="group relative h-[380px] rounded-2xl overflow-hidden border border-zinc-200 flex flex-col justify-end p-8 cursor-pointer bg-white shadow-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent h-full z-10 transition-opacity duration-300 group-hover:opacity-90" />
            <img
              src="https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=800&auto=format&fit=crop"
              alt="Accessories selection"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[#B3922E] text-[10px] uppercase tracking-widest font-bold">DEVICE PROTECT</span>
              <h3 className="text-xl font-serif text-zinc-900">Luxury Technical Line</h3>
              <p className="text-xs text-zinc-600 group-hover:text-zinc-800 transition-colors">Vegan cases for iPhone, sand-blasted brass docks.</p>
              <span className="text-xs text-[#B3922E] inline-flex items-center pt-2 font-semibold">
                Explore Accessories <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>
 
          {/* Architectural Living & Lifestyle */}
          <div
            onClick={() => setActiveTab("shop")}
            className="group relative h-[380px] rounded-2xl overflow-hidden border border-zinc-200 flex flex-col justify-end p-8 cursor-pointer bg-white shadow-xs"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent h-full z-10 transition-opacity duration-300 group-hover:opacity-90" />
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
              alt="Lifestyle selection"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="relative z-20 space-y-1">
              <span className="text-[#B3922E] text-[10px] uppercase tracking-widest font-bold">ATMOSPHERICS</span>
              <h3 className="text-xl font-serif text-zinc-900">Atmospheric Living</h3>
              <p className="text-xs text-zinc-600 group-hover:text-zinc-800 transition-colors">Soy stone candles, heavy linen journals, curated oils.</p>
              <span className="text-xs text-[#B3922E] inline-flex items-center pt-2 font-semibold">
                Explore Lifestyle <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>
          </div>
 
        </div>
      </section>
 
      {/* 4. Interactive Product Grid (Best Sellers Feature) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-products-best-sellers">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 border-b border-zinc-200 pb-6">
          <div className="space-y-1 mb-4 sm:mb-0 text-center sm:text-left">
            <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">ALWAYS COVETED</span>
            <h2 className="text-3xl font-light font-serif text-zinc-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              The DEHA Iconic Styles
            </h2>
          </div>
          <button
            onClick={() => setActiveTab("shop")}
            className="px-5 py-2.5 border border-zinc-200 hover:border-[#B3922E] text-zinc-700 hover:text-[#B3922E] text-xs font-semibold uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 hover:bg-zinc-50 cursor-pointer"
          >
            <span>Browse Full Boutique</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="iconics-grid">
          {featuredProducts.map(p => {
            const isSaved = wishlist.some(fav => fav.id === p.id);
            return (
              <div
                key={p.id}
                className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col justify-between p-4 hover:border-zinc-350 hover:-translate-y-1 transition-all duration-300 shadow-xs"
                id={`home-product-${p.id}`}
              >
                {/* Save Heart & Labels */}
                <div className="absolute top-6 right-6 z-20">
                  <button
                    onClick={() => onAddToWishlist(p)}
                    className={`p-2 rounded-full border transition-colors ${
                      isSaved
                        ? "bg-red-500/10 border-red-500/30 text-red-650"
                        : "bg-white/80 border-zinc-200 text-zinc-500 hover:text-zinc-800"
                    }`}
                  >
                    <Star className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>
 
                <div 
                  onClick={() => onSelectProduct(p)}
                  className="cursor-pointer space-y-4"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F4F0] relative">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {p.discountPrice && (
                      <span className="absolute bottom-3 left-3 bg-[#B3922E] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                        PROMO RATE
                      </span>
                    )}
                  </div>
 
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400">{p.brand}</span>
                    <h3 className="text-sm font-semibold text-zinc-900 truncate group-hover:text-[#B3922E] transition-colors">
                      {p.name}
                    </h3>
                    <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-xs">
                      {p.discountPrice ? (
                        <>
                          <span className="text-[#B3922E] font-bold">${p.discountPrice}</span>
                          <span className="text-zinc-400 line-through">${p.price}</span>
                        </>
                      ) : (
                        <span className="text-zinc-700 font-semibold">${p.price}</span>
                      )}
                    </div>
                  </div>
                </div>
 
                <div className="mt-4 pt-3 border-t border-zinc-150">
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="w-full py-2 bg-zinc-50 border border-zinc-200 hover:border-[#B3922E] text-zinc-700 hover:text-[#B3922E] hover:bg-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors focus:outline-none cursor-pointer"
                  >
                    Inspect Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
 
      {/* 5. Styled Testimonial Reviews Carousel */}
      <section className="bg-zinc-100/50 border-y border-zinc-200 py-16" id="home-customer-testimonials">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
          <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">DEHA COMMUNITY VOICE</span>
          
          <div className="space-y-4">
            <div className="flex justify-center text-[#B3922E] space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#B3922E] text-[#B3922E]" />
              ))}
            </div>
            
            <blockquote className="text-xl sm:text-2xl font-light font-serif italic text-zinc-800 leading-relaxed max-w-3xl mx-auto">
              &ldquo;The luxury silk wraps arrived in a heavy premium Copenhagen casing. The weight of the silk exceeds high-street boutiques completely. Genuine quality.&rdquo;
            </blockquote>
 
            <div className="flex items-center justify-center space-x-3 pt-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=60&auto=format&fit=crop"
                alt="Charlotte Dubois"
                className="w-10 h-10 rounded-full object-cover border border-[#B3922E]"
              />
              <div className="text-left">
                <p className="text-xs font-semibold text-zinc-900">Charlotte Dubois</p>
                <p className="text-[10px] text-zinc-550 uppercase tracking-widest">Verified Collector • Denmark</p>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* 6. Newsletter Subscription Card */}
      <section className="max-w-3xl mx-auto px-4 pb-20 text-center space-y-6" id="home-newsletter-module">
        <div className="p-8 sm:p-12 bg-white border border-zinc-200 rounded-2xl space-y-6 shadow-sm">
          <Sparkles className="h-8 w-8 text-[#B3922E] mx-auto animate-pulse" />
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#B3922E] tracking-tight animate-none" style={{ fontFamily: "Georgia, serif" }}>
              Join the DEHA Circle
            </h2>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Receive seasonal curation booklets, early-access notifications for raw denim millings, and exclusive promotion events.
            </p>
          </div>
 
          <form
            onSubmit={e => {
              e.preventDefault();
              alert("Thank you. You have been placed on DEHA's early curation roster.");
            }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="YOUR REGISTERED EMAIL ADDRESS"
              required
              className="flex-1 bg-[#F5F4F0] border border-zinc-200 rounded-lg px-4 py-3 text-xs tracking-wider placeholder-zinc-400 text-zinc-850 focus:border-[#B3922E] outline-none"
            />
            <button
               type="submit"
               className="px-6 py-3 bg-[#B3922E] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
             >
               Subscribe
            </button>
          </form>
        </div>
      </section>
 
    </div>
  );
}
