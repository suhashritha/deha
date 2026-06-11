/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Grid, List, SlidersHorizontal, ArrowUpDown, Star, Filter, Heart } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ShopViewProps {
  onSelectProduct: (p: Product) => void;
  onAddToCartDirect: (p: Product) => void;
  onAddToWishlist: (p: Product) => void;
  wishlist: Product[];
}

export default function ShopView({
  onSelectProduct,
  onAddToCartDirect,
  onAddToWishlist,
  wishlist
}: ShopViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(360);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Fashion", "Accessories", "Lifestyle", "New Arrivals", "Trending"];
  const genders = ["All", "Men", "Women", "Kids", "Unisex"];

  // Perform multi-dimensional checks
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const gMatch = selectedGender === "All" || p.gender === selectedGender;
      const cMatch = selectedCategory === "All" || p.category === selectedCategory;
      const priceVal = p.discountPrice || p.price;
      const pMatch = priceVal <= maxPrice;
      
      const searchLower = searchQuery.toLowerCase();
      const sMatch = searchQuery.trim() === "" || 
                     p.name.toLowerCase().includes(searchLower) ||
                     p.description.toLowerCase().includes(searchLower) ||
                     p.brand.toLowerCase().includes(searchLower);

      return gMatch && cMatch && pMatch && sMatch;
    }).sort((a, b) => {
      const aPrice = a.discountPrice || a.price;
      const bPrice = b.discountPrice || b.price;

      if (sortBy === "price-low") return aPrice - bPrice;
      if (sortBy === "price-high") return bPrice - aPrice;
      if (sortBy === "rated") return b.rating - a.rating;
      
      // Default: sort by highest rating count / relevance
      return b.ratingCount - a.ratingCount;
    });
  }, [selectedGender, selectedCategory, maxPrice, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-900 font-sans" id="shop-view-segment">
      {/* Page Title */}
      <div className="text-center space-y-2 mb-12">
        <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">COLLECTIONS HUB</span>
        <h1 className="text-4xl font-light font-serif tracking-tight text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
          Full Collection Catalogue
        </h1>
        <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sticky Sidebar Filters */}
        <div className="space-y-6 lg:sticky lg:top-28 self-start bg-[#FAF9F5] border border-zinc-200 p-5 rounded-2xl shadow-xs animate-none" id="shop-filters-sidebar">
          
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <SlidersHorizontal className="h-4 w-4 text-[#B3922E]" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#B3922E]">Advisory Filters</h2>
          </div>

          {/* Search Query inside Shop */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Search keywords</span>
            <input
              type="text"
              placeholder="Search boutique..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 focus:border-[#B3922E] outline-none"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Category demographic</span>
            <div className="flex flex-wrap gap-1.5" id="demographic-filters">
              {genders.map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                    selectedGender === g
                      ? "bg-[#B3922E] text-white border-[#B3922E]"
                      : "border-zinc-200 text-zinc-650 hover:border-zinc-350 hover:text-[#B3922E] bg-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-sans">Brand Divisions</span>
            <div className="space-y-1">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedCategory === c
                      ? "bg-zinc-100 text-[#B3922E] font-semibold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <span>{c}</span>
                  {selectedCategory === c && <div className="h-1 w-1 bg-[#B3922E] rounded-full" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div className="space-y-2 border-t border-zinc-200 pt-4">
            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-zinc-500">
              <span>Investment Ceiling</span>
              <span className="text-[#B3922E] font-bold">${maxPrice} USD</span>
            </div>
            <input
              type="range"
              min="30"
              max="360"
              step="10"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#B3922E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>MIN: $30</span>
              <span>MAX: $360</span>
            </div>
          </div>

        </div>

        {/* Right Listing Grid/List Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header Controls (Sort, View Mode) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF9F5] border border-zinc-200 p-4 rounded-xl shadow-xs">
            <p className="text-xs text-zinc-600">
              Displaying <span className="text-[#B3922E] font-bold">{filteredProducts.length}</span> curated materials
            </p>

            <div className="flex items-center space-x-4">
              {/* Sort By Dropdown */}
              <div className="flex items-center space-x-1">
                <ArrowUpDown className="h-3.5 w-3.5 text-[#B3922E]" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-white border border-zinc-250 rounded-lg text-xs py-1 px-2.5 text-zinc-805 outline-none focus:border-[#B3922E] cursor-pointer"
                >
                  <option value="latest">Sort: Recommendation</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rated">Ratings: Star Count</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex border border-zinc-200 rounded-lg overflow-hidden bg-white shadow-xs">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-[#B3922E] text-white" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"}`}
                  title="Grid mode"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <div className="w-[1px] bg-zinc-250" />
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 transition-colors cursor-pointer ${viewMode === "list" ? "bg-[#B3922E] text-white" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"}`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Listing Display */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-200 rounded-2xl space-y-4 shadow-xs">
              <Filter className="h-10 w-10 mx-auto text-zinc-300" />
              <p className="text-xs text-zinc-500 uppercase tracking-widest">No available items match your current selections.</p>
              <button
                onClick={() => {
                  setSelectedGender("All");
                  setSelectedCategory("All");
                  setMaxPrice(360);
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 bg-[#B3922E] hover:bg-zinc-800 text-white font-semibold text-xs tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
              >
                Reset Filter States
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(p => {
                const isSaved = wishlist.some(fav => fav.id === p.id);
                const activePrice = p.discountPrice || p.price;
                return (
                  <div
                    key={p.id}
                    className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden p-4 flex flex-col justify-between hover:border-[#B3922E]/80 transition-all duration-300 shadow-xs"
                  >
                    
                    {/* Star Wishlist Toggle */}
                    <button
                      onClick={() => onAddToWishlist(p)}
                      className={`absolute top-6 right-6 z-10 p-1.5 rounded-full border transition-colors cursor-pointer ${
                        isSaved ? "bg-red-500/10 border-red-500/30 text-red-650" : "bg-white/80 border-zinc-200 text-zinc-500 hover:text-zinc-800 shadow-xs"
                      }`}
                    >
                      <Star className={`h-3.5 w-3.5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    <div onClick={() => onSelectProduct(p)} className="cursor-pointer space-y-3">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#F5F4F0] relative">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {!p.inStock && (
                          <div className="absolute inset-0 bg-[#FAF9F5]/80 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-red-500">
                            Out of stock
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider text-[#B3922E] font-semibold">{p.gender} • {p.brand}</span>
                          <span className="text-[10px] text-zinc-500 flex items-center"><Star className="h-3 w-3 text-[#B3922E] mr-1 fill-current" /> {p.rating}</span>
                        </div>
                        <h3 className="text-xs font-bold truncate group-hover:text-[#B3922E] transition-colors text-zinc-900">{p.name}</h3>
                        <p className="text-[11px] text-zinc-600 truncate">{p.material}</p>
                        
                        <div className="flex items-center space-x-1.5 text-xs pt-1">
                          {p.discountPrice ? (
                            <>
                              <span className="text-[#B3922E] font-bold">${p.discountPrice}</span>
                              <span className="text-zinc-400 line-through">${p.price}</span>
                            </>
                          ) : (
                            <span className="text-zinc-700 font-bold">${p.price}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-150">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="w-full py-2 bg-zinc-50 border border-zinc-200 text-zinc-700 hover:border-[#B3922E] hover:text-[#B3922E] hover:bg-white rounded-lg text-[10px] uppercase font-bold tracking-widest transition-colors cursor-pointer"
                      >
                        Inspect details
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(p => {
                const isSaved = wishlist.some(fav => fav.id === p.id);
                const activePrice = p.discountPrice || p.price;
                return (
                  <div
                    key={p.id}
                    className="flex p-4 bg-white border border-zinc-200 rounded-xl hover:border-zinc-350 transition-all items-center space-x-4 shadow-xs"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      onClick={() => onSelectProduct(p)}
                      className="w-24 h-24 object-cover rounded-lg bg-zinc-100 cursor-pointer hover:opacity-80 shrink-0 border border-zinc-150"
                    />
                    
                    <div className="flex-1 min-w-0 space-y-1 cursor-pointer" onClick={() => onSelectProduct(p)}>
                      <span className="text-[9px] uppercase tracking-widest text-[#B3922E] font-semibold">{p.gender} • {p.brand}</span>
                      <h3 className="text-sm font-bold truncate text-zinc-900 hover:text-[#B3922E] transition-colors">{p.name}</h3>
                      <p className="text-xs text-zinc-650 hidden sm:block leading-relaxed line-clamp-2">{p.description}</p>
                      <p className="text-[10px] text-zinc-500">{p.material}</p>
                    </div>

                    {/* Price and Add CTA */}
                    <div className="text-right space-y-3 shrink-0">
                      <div>
                        {p.discountPrice ? (
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#B3922E]">${p.discountPrice}</p>
                            <p className="text-xs text-zinc-400 line-through">${p.price}</p>
                          </div>
                        ) : (
                          <p className="text-sm font-semibold text-zinc-750">${p.price}</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onAddToWishlist(p)}
                          className={`p-1.5 rounded-lg border cursor-pointer ${isSaved ? "bg-red-500/10 border-red-500/30 text-red-650" : "border-zinc-200 text-zinc-450 hover:text-zinc-800 hover:bg-zinc-50"}`}
                        >
                          <Star className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="px-3 py-1.5 bg-[#B3922E] hover:bg-zinc-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer animate-none"
                        >
                          Details
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
