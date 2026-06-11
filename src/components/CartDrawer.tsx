/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Trash2, ChevronRight, ShoppingCart, Percent, Ticket, Sparkles, Heart } from "lucide-react";
import { CartItem, Product, PromoDeal } from "../types";
import { PROMO_DEALS } from "../data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  wishlist: Product[];
  onUpdateQty: (pId: string, sz: string, colHex: string, qty: number) => void;
  onRemoveItem: (pId: string, sz: string, colHex: string) => void;
  onSelectProduct: (p: Product) => void;
  onOpenCheckout: (discountPercent: number, appliedCode: string) => void;
  onRemoveFromWishlist: (p: Product) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  wishlist,
  onUpdateQty,
  onRemoveItem,
  onSelectProduct,
  onOpenCheckout,
  onRemoveFromWishlist
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState("");
  const [activePromo, setActivePromo] = useState<PromoDeal | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = cart.reduce((acc, item) => {
    const activePrice = item.product.discountPrice || item.product.price;
    return acc + activePrice * item.quantity;
  }, 0);

  // Apply code logic
  const handleApplyPromo = () => {
    setPromoError("");
    const matched = PROMO_DEALS.find(d => d.code.toLowerCase() === promoInput.trim().toLowerCase());
    if (!matched) {
      setPromoError("Unrecognized promotional code.");
      return;
    }
    if (subtotal < matched.minimumSpend) {
      setPromoError(`Requires a minimum spend of $${matched.minimumSpend}.`);
      return;
    }
    setActivePromo(matched);
    setPromoInput("");
  };

  const discountAmount = activePromo ? Math.round(subtotal * (activePromo.discountPercent / 100)) : 0;
  const deliveryFee = subtotal > 150 || subtotal === 0 ? 0 : 15.00; // Free above $150
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const handleCheckoutClick = () => {
    onOpenCheckout(activePromo?.discountPercent || 0, activePromo?.code || "");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="cart-drawer-overlay">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#161616] border-l border-white/10 text-white flex flex-col shadow-2xl relative">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between" id="cart-drawer-hdr">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-white/40 hover:text-white transition-colors"
              id="cart-drawer-close-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6" id="cart-items-scroller">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4 text-white/40" id="cart-empty-bag-state">
                <ShoppingCart className="h-10 w-10 mx-auto text-white/20 stroke-[1]" />
                <p className="text-xs uppercase tracking-wider">Your boutique bag is currently empty.</p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white/5 border border-white/10 hover:border-[#D4AF37] text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="cart-listed-items">
                {cart.map((item, idx) => {
                  const p = item.product;
                  const activePrice = p.discountPrice || p.price;
                  return (
                    <div
                      key={idx}
                      className="flex items-start space-x-4 p-3 bg-white/5 border border-white/5 rounded-xl"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        onClick={() => onSelectProduct(p)}
                        className="w-16 h-16 object-cover rounded-lg bg-zinc-900 cursor-pointer hover:opacity-80 shrink-0"
                      />
                      
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4
                          onClick={() => onSelectProduct(p)}
                          className="text-xs font-bold truncate hover:text-[#D4AF37] cursor-pointer"
                        >
                          {p.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-[10px] text-white/40">
                          <span className="uppercase">Size: {item.selectedSize}</span>
                          <span>•</span>
                          <span className="flex items-center">
                            Color: <span className="h-2 w-2 rounded-full inline-block ml-1 border border-white/25" style={{ backgroundColor: item.selectedColor.hex }} />
                          </span>
                        </div>

                        {/* Qty Adjustment */}
                        <div className="flex items-center space-x-3 pt-1">
                          <button
                            onClick={() => onUpdateQty(p.id, item.selectedSize, item.selectedColor.hex, item.quantity - 1)}
                            className="h-5 w-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs hover:bg-white/10"
                          >
                            -
                          </button>
                          <span className="text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(p.id, item.selectedSize, item.selectedColor.hex, item.quantity + 1)}
                            className="h-5 w-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs hover:bg-white/10"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="text-right space-y-3">
                        <p className="text-xs font-semibold text-[#D4AF37]">
                          ${(activePrice * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => onRemoveItem(p.id, item.selectedSize, item.selectedColor.hex)}
                          className="p-1 hover:text-red-400 text-white/30 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* QUICK WISHLIST SYNC PANEL (Aesthetic conversion optimization!) */}
            {wishlist.length > 0 && (
              <div className="mt-8 border-t border-white/5 pt-6" id="cart-quick-wishlist">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center space-x-1">
                  <Heart className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Your Saved Favorites ({wishlist.length})</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {wishlist.slice(0, 4).map(fav => (
                    <div
                      key={fav.id}
                      className="p-2 bg-white/5 border border-white/5 rounded-lg flex items-center space-x-3 hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={fav.images[0]}
                        alt={fav.name}
                        onClick={() => onSelectProduct(fav)}
                        className="w-10 h-10 object-cover rounded-md bg-zinc-900 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => onSelectProduct(fav)}
                          className="text-[10px] font-bold truncate cursor-pointer hover:text-[#D4AF37]"
                        >
                          {fav.name}
                        </h4>
                        <p className="text-[10px] text-[#D4AF37]">${fav.discountPrice || fav.price}</p>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(fav)}
                        className="text-white/30 hover:text-white pb-1 pr-1"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing Summary & Promos */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0d0d0d] space-y-4" id="cart-pricing-section">
              {/* Promo input field */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Ticket className="h-4 w-4 text-[#D4AF37]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-white/50">Apply Luxury Promo</span>
                </div>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="text"
                    placeholder="e.g. DEHA50, GOLD15"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white uppercase outline-none focus:border-[#D4AF37]/50"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-1.5 bg-[#D4AF37] hover:bg-white text-black font-semibold text-xs rounded-lg transition-colors focus:outline-none"
                  >
                    Apply
                  </button>
                </div>
                {activePromo && (
                  <p className="text-[10px] text-[#28A745] font-semibold flex items-center space-x-1 pt-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Applied: {activePromo.title} (-{activePromo.discountPercent}%)</span>
                  </p>
                )}
                {promoError && (
                  <p className="text-[10px] text-[#DC3545] font-semibold pt-1">{promoError}</p>
                )}
              </div>

              {/* Arithmetic breakdown */}
              <div className="space-y-2 text-xs border-t border-white/5 pt-4">
                <div className="flex justify-between text-white/60">
                  <span>Bag Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span className="flex items-center"><Percent className="h-3 w-3 mr-1" /> Promo Cut</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Guaranteed Delivery</span>
                  <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-white/5 pt-2 text-[#D4AF37]">
                  <span>Total Investment</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3 bg-[#D4AF37] hover:bg-white text-black hover:text-[#111111] font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 transition-all focus:outline-none mt-2"
                id="cart-proceed-checkout-btn"
              >
                <span>Proceed To secure checkout</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
