/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { X, Star, Heart, ShoppingCart, ShieldCheck, Sparkles, RefreshCw, Layers } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size: string, color: { name: string; hex: string }) => void;
  onAddToWishlist: (p: Product) => void;
  wishlist: Product[];
}

type TabType = "Description" | "Specifications" | "Shipping" | "Return Policy";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onAddToWishlist,
  wishlist
}: ProductDetailModalProps) {
  if (!product) return null;

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("Description");
  const [degreeMock, setDegreeMock] = useState(false); // 360 simulation modal
  const [degreeAngle, setDegreeAngle] = useState(0); // mock angles

  // Reset states on product changes
  useEffect(() => {
    setActiveImgIdx(0);
    setDegreeMock(false);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize("One Size");
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [product]);

  const isInWishlist = wishlist.some(p => p.id === product.id);

  // Find 3 relative products with similar categorization for smart recommendation links
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCartClick = () => {
    if (!selectedColor && product.colors.length > 0) {
      return;
    }
    onAddToCart(product, selectedSize, selectedColor || { name: "Universal", hex: "#000" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans" id="product-overview-modal-wrapper">
      <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl relative text-zinc-900" id="product-modal-viewport">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-600 hover:text-zinc-900 transition-all focus:outline-none cursor-pointer"
          id="product-modal-close-trigger"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          
          {/* Left: Dynamic Galleries & Mock 360 Viewer */}
          <div className="space-y-4" id="gallery-container">
            {/* Main Stage */}
            <div className="relative aspect-square rounded-xl bg-[#F5F4F0] overflow-hidden border border-zinc-150 flex items-center justify-center">
              {degreeMock ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/40">
                  <span className="text-[10px] uppercase tracking-widest text-[#B3922E] mb-2 font-bold select-none">Mock 360-degree spatial spin</span>
                  <div className="relative w-full h-full flex items-center justify-center max-h-[80%]">
                    {/* Simulated rotation offsets */}
                    <img
                      src={product.images[activeImgIdx]}
                      alt={product.name}
                      style={{ filter: `hue-rotate(${degreeAngle}deg)` }}
                      className="max-h-full max-w-full object-contain rounded-lg transition-all duration-300 pointer-events-none select-none"
                    />
                  </div>
                  <div className="w-full max-w-xs mt-3">
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={degreeAngle}
                      onChange={e => setDegreeAngle(Number(e.target.value))}
                      className="w-full accent-[#B3922E] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-semibold">
                      <span>ANGLE: {degreeAngle}°</span>
                      <span>DRAG ROTATION PREVIEW</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full group">
                  <img
                    src={product.images[activeImgIdx]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 border border-zinc-200 px-3 py-1 rounded-full text-[10px] tracking-wider uppercase text-zinc-650 font-semibold select-none">
                    Pristine Zoom Ready
                  </div>
                </div>
              )}

              {/* Angle Switcher Option */}
              <button
                onClick={() => setDegreeMock(!degreeMock)}
                className={`absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all focus:outline-none cursor-pointer ${
                  degreeMock
                    ? "bg-[#B3922E] border-[#B3922E] text-white font-semibold"
                    : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                }`}
                id="toggle-360-btn"
              >
                <RefreshCw className={`h-3 w-3 ${degreeMock ? "animate-spin" : ""}`} />
                <span>{degreeMock ? "Normal View" : "360° Studio"}</span>
              </button>
            </div>

            {/* Thumbnail Selection Strip */}
            <div className="flex space-x-3 overflow-x-auto pb-1" id="thumb-strip-contain">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImgIdx(i);
                    setDegreeMock(false);
                  }}
                  className={`w-20 h-20 rounded-lg border overflow-hidden shrink-0 transition-all cursor-pointer ${
                    activeImgIdx === i && !degreeMock
                      ? "border-[#B3922E] ring-1 ring-[#B3922E]"
                      : "border-zinc-200 hover:border-zinc-350"
                  }`}
                >
                  <img src={img} alt={`${product.name} preview ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Core Information & Selecting States */}
          <div className="flex flex-col justify-between" id="modal-details-right">
            <div>
              {/* Category, Brand */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#B3922E] font-bold">
                  {product.brand} • {product.category}
                </span>
                {product.isBestSeller && (
                  <span className="bg-[#B3922E]/10 text-[#B3922E] border border-[#B3922E]/25 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                    Seller Favorite
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <h1 className="text-3xl font-bold font-serif tracking-tight mt-2 text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2" id="modal-product-ratings">
                <div className="flex text-[#B3922E]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-[#B3922E]" : "opacity-30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-zinc-500 font-semibold">({product.ratingCount} boutique reviews)</span>
              </div>

              {/* Price Tag */}
              <div className="flex items-center space-x-3 mt-4" id="modal-product-price">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold text-[#B3922E]">${product.discountPrice}</span>
                    <span className="text-sm line-through text-zinc-400">${product.price}</span>
                    <span className="text-[11px] bg-red-500/10 text-red-650 border border-red-500/25 px-2 py-0.5 rounded font-semibold">
                      -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}% DISCOUNT
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold text-zinc-800">${product.price}</span>
                )}
              </div>

              <p className="text-xs text-zinc-650 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* SWATCHES: Colors */}
              {product.colors.length > 0 && (
                <div className="mt-5" id="color-selection-matrix">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B3922E]">Color: <span className="text-zinc-800 font-bold">{selectedColor?.name}</span></span>
                  <div className="flex space-x-3 mt-2">
                    {product.colors.map((col, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(col)}
                        className={`h-7 w-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                          selectedColor?.name === col.name ? "border-[#B3922E]" : "border-zinc-200"
                        }`}
                        title={col.name}
                      >
                        <span className="h-5 w-5 rounded-full block border border-black/20" style={{ backgroundColor: col.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* SWATCHES: Sizes */}
              {product.sizes.length > 0 && (
                <div className="mt-5" id="size-selection-matrix">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#B3922E]">Select Size</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.sizes.map((sz, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 border rounded-lg text-xs font-semibold tracking-wider transition-all uppercase cursor-pointer ${
                          selectedSize === sz
                            ? "border-[#B3922E] bg-[#B3922E]/10 text-[#B3922E]"
                            : "border-zinc-200 text-zinc-650 hover:border-zinc-350 hover:text-zinc-900 bg-white"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Description / Tabs Layout */}
              <div className="mt-6 border-t border-zinc-200 pt-4" id="description-tabs">
                <div className="flex border-b border-zinc-200 space-x-4 pb-1 overflow-x-auto text-[10px] tracking-widest uppercase font-bold text-zinc-500">
                  {(["Description", "Specifications", "Shipping", "Return Policy"] as TabType[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 focus:outline-none transition-colors border-b-2 cursor-pointer ${
                        activeTab === tab ? "text-[#B3922E] border-[#B3922E]" : "border-transparent hover:text-zinc-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-xs text-zinc-650 leading-relaxed min-h-[100px]" id="tab-viewport-contents">
                  {activeTab === "Description" && (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.details.map((detail, dIdx) => (
                        <li key={dIdx}>{detail}</li>
                      ))}
                    </ul>
                  )}
                  {activeTab === "Specifications" && (
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div><span className="text-zinc-500 font-semibold select-none">Fabrication:</span> {product.material}</div>
                      <div><span className="text-zinc-500 font-semibold select-none">Archival SKU:</span> {product.sku}</div>
                      <div><span className="text-zinc-500 font-semibold select-none">Standard Origin:</span> Premium Craft</div>
                      <div><span className="text-zinc-500 font-semibold select-none">Brand Identity:</span> {product.brand}</div>
                    </div>
                  )}
                  {activeTab === "Shipping" && (
                    <p>
                      Complimentary tracked express shipping on boutique coordinates. Your premium collection envelope arrives double-lined inside carbon-neutral gift cartons in strictly 2 to 4 working days.
                    </p>
                  )}
                  {activeTab === "Return Policy" && (
                    <p>
                      Should you determine that your selected fit does not align with your style goals, returns may be completed through pre-paid collection courier slips within 30 days of arrival. Unblemished state required.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Core Action CTAs */}
            <div className="mt-6 space-y-3 border-t border-zinc-200 pt-4">
              <div className="flex items-center space-x-3">
                
                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCartClick}
                  disabled={!product.inStock}
                  className="flex-1 py-3 bg-[#B3922E] hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-widest transition-all rounded-lg flex items-center justify-center space-x-2 focus:outline-none disabled:opacity-50 cursor-pointer"
                  id="add-to-cart-cta-button"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>{product.inStock ? "Add To Cart Bag" : "Currently Out Of Stock"}</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => onAddToWishlist(product)}
                  className={`p-3 rounded-lg border transition-all focus:outline-none cursor-pointer ${
                    isInWishlist
                      ? "border-red-500/30 bg-red-500/10 text-red-650"
                      : "border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                  aria-label="Toggle Wishlist"
                  id="wishlist-toggle-cta-btn"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist ? "fill-red-505 text-red-600" : ""}`} />
                </button>

              </div>

              {/* Guarantees icon line */}
              <div className="flex items-center justify-center space-x-4 text-[10px] tracking-wider text-zinc-500 pt-1 font-semibold">
                <span className="flex items-center"><ShieldCheck className="h-3.5 w-3.5 text-[#B3922E] mr-1" /> Authentic Materials</span>
                <span className="flex items-center"><Layers className="h-3.5 w-3.5 text-[#B3922E] mr-1" /> Copenhagen Design</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
