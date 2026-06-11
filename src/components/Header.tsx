/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, User, X, Flame, Sparkles, Gift } from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS } from "../data";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  wishlist,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onSelectProduct
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for sticky transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Instant Predictive Search
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        p.gender.toLowerCase().includes(query)
    );
    setSearchResults(filtered.slice(0, 5));
  }, [searchQuery]);

  // Focus search input when open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "offers", label: "Deals" },
    { id: "blog", label: "Journal" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" }
  ];

  const totalCartQty = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF9F5]/95 backdrop-blur-md shadow-xs border-b border-zinc-200/80 py-3"
            : "bg-transparent py-5"
        }`}
        id="deha-main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setActiveTab("home")}
            id="brand-logo-container"
          >
            <span 
              className="text-2xl font-bold tracking-[0.25em] text-[#B3922E] group-hover:text-zinc-900 transition-colors"
              style={{ fontFamily: "Georgia, serif" }}
            >
              DEHA
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-[#B3922E] self-end mb-1"></div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="header-nav-menu">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  // Ensure scrolling to top on view changes
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative py-1 text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#B3922E] ${
                  activeTab === item.id ? "text-[#B3922E]" : "text-zinc-700"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#B3922E]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5" id="header-actions-section">
            
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-zinc-700 hover:text-[#B3922E] transition-colors focus:outline-none"
              aria-label="Toggle Search Panel"
              id="header-search-btn"
            >
              <Search className="h-5 w-5 stroke-[1.8]" />
            </button>

            {/* Profile Dashboard */}
            <button
              onClick={onOpenAccount}
              className="p-1.5 text-zinc-700 hover:text-[#B3922E] transition-colors focus:outline-none"
              aria-label="User Account Profile"
              id="header-user-btn"
            >
              <User className="h-5 w-5 stroke-[1.8]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-zinc-700 hover:text-[#B3922E] transition-colors focus:outline-none"
              aria-label="View Wishlist"
              id="header-wishlist-btn"
            >
              <Heart className="h-5 w-5 stroke-[1.8]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B3922E] text-[10px] font-bold text-white shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-1.5 text-zinc-700 hover:text-[#B3922E] transition-colors focus:outline-none"
              aria-label="View Cart Bag"
              id="header-cart-btn"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
              {totalCartQty > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B3922E] text-[10px] font-bold text-white shadow-sm">
                  {totalCartQty}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Modern Glassmorphic Instant Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000]/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4"
            id="search-overlay-fullscreen"
          >
            <motion.div
              initial={{ y: -40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: -40, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
              id="search-card-container"
            >
              {/* Input Area */}
              <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
                <Search className="h-5 w-5 text-zinc-400 mr-3 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Query premium collections, material (silk), category, brand..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-base text-zinc-800 placeholder-zinc-400 bg-transparent border-none outline-none focus:ring-0"
                  id="search-query-input-field"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100"
                  id="search-close-inner-btn"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Suggestions and Live Results */}
              <div className="p-5 max-h-[350px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div id="search-predictive-results">
                    <p className="text-xs font-semibold tracking-wider text-[#B3922E] uppercase mb-3">
                      Suited Product Matches
                    </p>
                    <div className="space-y-4">
                      {searchResults.map(p => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onSelectProduct(p);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center space-x-4 p-2 hover:bg-zinc-50 rounded-xl cursor-pointer transition-colors"
                          id={`search-result-${p.id}`}
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-12 h-12 object-cover rounded-lg bg-zinc-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-zinc-800 truncate">
                              {p.name}
                            </h4>
                            <p className="text-xs text-zinc-400 truncate">{p.brand} • {p.material}</p>
                          </div>
                          <div className="text-right">
                            {p.discountPrice ? (
                              <span className="text-sm font-bold text-[#B3922E]">
                                ${p.discountPrice}
                              </span>
                            ) : (
                              <span className="text-sm font-semibold text-zinc-650">
                                ${p.price}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : searchQuery.trim() ? (
                  <div className="text-center py-6 text-zinc-400" id="search-empty-state">
                    No pristine matches for &ldquo;{searchQuery}&rdquo;. Try typing &apos;Silk&apos;, &apos;Brass&apos; or &apos;Case&apos;.
                  </div>
                ) : (
                  <div id="search-popular-searches">
                    <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4">
                      Trending Searches
                    </p>
                    <div className="flex flex-wrap gap-2 text-zinc-800">
                      {["Mulberry Silk", "Mongolian Cashmere", "Vegan Case", "Solid Brass", "Overalls"].map(
                        term => (
                          <button
                            key={term}
                            onClick={() => setSearchQuery(term)}
                            className="px-3 py-1.5 bg-zinc-100 hover:bg-[#B3922E]/10 hover:text-[#B3922E] rounded-full text-xs font-semibold tracking-wider uppercase transition-colors"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                    
                    <div className="mt-6 p-4 bg-[#B3922E]/5 rounded-xl border border-[#B3922E]/12 flex items-start space-x-3">
                      <Sparkles className="h-5 w-5 text-[#B3922E] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-semibold text-[#B3922E]">AI Conversational Search</h4>
                        <p className="text-xs text-zinc-600 mt-1">
                          Looking for specific size recommendation or style matcher? Tap the floating Chatbot in the corner for natural assistance!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
