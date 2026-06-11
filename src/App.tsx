/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import ShopView from "./components/ShopView";
import OffersView from "./components/OffersView";
import JournalView from "./components/JournalView";
import ContactView from "./components/ContactView";
import CheckoutFlow from "./components/CheckoutFlow";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import AIChatbot from "./components/AIChatbot";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";
import { Heart, User, Clock, Trash2, ArrowLeft, Bookmark, RotateCcw, AlertCircle, ShoppingBag, Eye, X } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Applied promo metadata
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  // Simulated Order History
  const [orders, setOrders] = useState([
    {
      id: "DEHA-491206-DK",
      date: "May 12, 2026",
      items: "Classic Silk Wrap Dress (M / Emerald Green) x1",
      total: 159.00,
      status: "Dispatched from Indre By"
    },
    {
      id: "DEHA-184962-DE",
      date: "April 20, 2026",
      items: "Solid Brass Magnetic Charging Dock x1",
      total: 89.00,
      status: "Delivered & Verified"
    }
  ]);

  // Loading state variables
  useEffect(() => {
    // Scroll to top on changing tab
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // 1. ADD TO CART
  const handleAddToCart = (p: Product, size: string, color: { name: string; hex: string }) => {
    setCart(prev => {
      const existsIdx = prev.findIndex(item => 
        item.product.id === p.id && 
        item.selectedSize === size && 
        item.selectedColor.hex === color.hex
      );

      if (existsIdx > -1) {
        const copy = [...prev];
        copy[existsIdx].quantity += 1;
        return copy;
      } else {
        return [...prev, { product: p, quantity: 1, selectedSize: size, selectedColor: color }];
      }
    });
    setIsCartOpen(true);
    setSelectedProduct(null); // Simple close product popup
  };

  const handleAddToCartDirect = (p: Product) => {
    const size = p.sizes && p.sizes.length > 0 ? p.sizes[0] : "One Size";
    const color = p.colors && p.colors.length > 0 ? p.colors[0] : { name: "Universal", hex: "#000" };
    handleAddToCart(p, size, color);
  };

  // 2. QUANTITY ADJUST
  const handleUpdateQty = (pId: string, sz: string, colHex: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(pId, sz, colHex);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === pId && item.selectedSize === sz && item.selectedColor.hex === colHex)
        ? { ...item, quantity: qty }
        : item
    ));
  };

  // 3. REMOVE ITEM
  const handleRemoveItem = (pId: string, sz: string, colHex: string) => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === pId && item.selectedSize === sz && item.selectedColor.hex === colHex)
    ));
  };

  // 4. WISHLIST TOGGLE
  const handleAddToWishlist = (p: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === p.id);
      if (exists) {
        return prev.filter(item => item.id !== p.id);
      } else {
        return [...prev, p];
      }
    });
  };

  const handleRemoveFromWishlist = (p: Product) => {
    setWishlist(prev => prev.filter(item => item.id !== p.id));
  };

  // 5. TRIGGER CHECKOUT SWITCH
  const handleOpenCheckout = (percent: number, code: string) => {
    setDiscountPercent(percent);
    setAppliedCode(code);
    setActiveTab("checkout");
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col selection:bg-[#B3922E]/20 selection:text-zinc-900" id="deha-master-root">
      
      {/* GLOBAL HEADER HEADER */}
      <Header
        activeTab={activeTab === "checkout" ? "shop" : activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If viewing normal collections, make sure checkout is closed
        }}
        cart={cart}
        wishlist={wishlist}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectProduct={setSelectedProduct}
      />

      {/* VIEWPORT ROUTER GRID */}
      <main className="flex-grow pt-24 pb-16" id="deha-applet-routing-panels">
        
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <HomeView
            onSelectProduct={setSelectedProduct}
            setActiveTab={setActiveTab}
            onAddToCartDirect={handleAddToCartDirect}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        )}

        {/* TAB 2: SHOP */}
        {activeTab === "shop" && (
          <ShopView
            onSelectProduct={setSelectedProduct}
            onAddToCartDirect={handleAddToCartDirect}
            onAddToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        )}

        {/* TAB 3: DEALS */}
        {activeTab === "offers" && (
          <OffersView setActiveTab={setActiveTab} />
        )}

        {/* TAB 4: JOURNAL */}
        {activeTab === "blog" && (
          <JournalView />
        )}

        {/* TAB 5: ABOUT US */}
        {activeTab === "about" && (
          <div className="max-w-4xl mx-auto px-4 py-8 text-zinc-900 space-y-12" id="about-us-container">
            <div className="text-center space-y-2">
              <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">COPENHAGEN DESIGN STUDIO</span>
              <h1 className="text-4xl font-light font-serif tracking-tight text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
                Behind the Monolith
              </h1>
              <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-200 border border-zinc-200 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop"
                alt="Architecture Design Space"
                className="w-full h-full object-cover opacity-85"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm leading-relaxed text-zinc-700" id="about-us-details">
              <div className="space-y-4">
                <h3 className="font-bold text-zinc-900 uppercase tracking-widest text-[11px] text-[#B3922E]">Minimalism & Materials</h3>
                <p>
                  Established on the canals of Copenhagen, DEHA (The Design and Aesthetic Collective) emerged to redefine user interactions with physical garments and domestic tech elements. We strip away decorative excess to expose raw structural geometries in pure fibers.
                </p>
                <p>
                  We believe that the articles you select to place over your skin or atop your walnut office desks should emit an aura of quiet confidence.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-zinc-900 uppercase tracking-widest text-[11px] text-[#B3922E]">Our Sustainable Promise</h3>
                <p>
                  Every piece of denim we handle is hand-loomed inside Kojima Mills displaying authentic red selvedge seam margins. Our Mongolian yarns trace back directly to ethical pasture community blocks ensuring safe grazing rotations and non-toxic washes.
                </p>
                <p>
                  No synthetic plastic filaments are added to clothing, and all phone armors leverage completely biodegradable pebbled TPU casings.
                </p>
              </div>
            </div>

            {/* Aesthetic Pillars */}
            <div className="border-t border-zinc-200 pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-xs">
                <h4 className="text-sm font-serif font-bold text-[#B3922E] mb-1">Copenhagen Design</h4>
                <p className="text-[11px] text-zinc-500">Architectural drafts curated at Gammel Mønt.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-xs">
                <h4 className="text-sm font-serif font-bold text-[#B3922E] mb-1">Traceable Origins</h4>
                <p className="text-[11px] text-zinc-500">GOTS Certified Organic outputs and natural soy wax.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-zinc-200 shadow-xs">
                <h4 className="text-sm font-serif font-bold text-[#B3922E] mb-1">Aesthetic Loyalty</h4>
                <p className="text-[11px] text-zinc-500">Guaranteed replacement and repairs for leather products.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CONTACT */}
        {activeTab === "contact" && (
          <ContactView />
        )}

        {/* SECURE CHECKOUT PAGE */}
        {activeTab === "checkout" && (
          <CheckoutFlow
            cart={cart}
            discountPercent={discountPercent}
            appliedCode={appliedCode}
            onClearCart={() => setCart([])}
            setActiveTab={setActiveTab}
          />
        )}

      </main>

      {/* FLOAT CONCIERGE CHATBOT BOT */}
      <AIChatbot onSelectProduct={setSelectedProduct} onAddToCartDirect={handleAddToCartDirect} />

      {/* GLOBAL FOOTER COMPONENT */}
      <Footer setActiveTab={setActiveTab} />

      {/* SLIDE DRAWERS: CART BAG */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        wishlist={wishlist}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onSelectProduct={setSelectedProduct}
        onOpenCheckout={handleOpenCheckout}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* SLIDE DRAWERS: WISHLIST ACCORDION */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="wishlist-overlay-panel">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsWishlistOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white border-l border-zinc-200 text-zinc-900 flex flex-col shadow-2xl relative">
              
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E] flex items-center space-x-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Your Curated Wishlist ({wishlist.length})</span>
                </h2>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scroll list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 text-zinc-400 space-y-2">
                    <Heart className="h-8 w-8 mx-auto text-zinc-200" />
                    <p className="text-xs uppercase tracking-wider">No style icons saved yet.</p>
                  </div>
                ) : (
                  wishlist.map(p => {
                    const activePrice = p.discountPrice || p.price;
                    return (
                      <div key={p.id} className="flex space-x-3 p-3 bg-zinc-50 border border-zinc-200 rounded-xl items-center hover:border-zinc-300 transition-colors">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          onClick={() => {
                            setSelectedProduct(p);
                            setIsWishlistOpen(false);
                          }}
                          className="w-12 h-12 object-cover rounded bg-zinc-100 cursor-pointer"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsWishlistOpen(false);
                            }}
                            className="text-xs font-bold truncate cursor-pointer hover:text-[#B3922E]"
                          >
                            {p.name}
                          </h4>
                          <p className="text-xs text-[#B3922E] font-semibold">${activePrice.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5 text-right">
                          <button
                            onClick={() => {
                              handleAddToCartDirect(p);
                              setIsWishlistOpen(false);
                            }}
                            className="px-2 py-1 bg-[#B3922E] text-white hover:bg-zinc-800 transition-colors font-semibold text-[10px] uppercase rounded"
                          >
                            Add To Bag
                          </button>
                          <button
                            onClick={() => handleRemoveFromWishlist(p)}
                            className="text-[10px] text-zinc-400 hover:text-red-600 text-right underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* SLIDE DRAWERS: ACCOUNT AND ORDERS STATUS LIST */}
      {isAccountOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans" id="account-overlay-panel">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsAccountOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-zinc-900 flex flex-col shadow-2xl relative">
              
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E] flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Bespoke Client Profile</span>
                </h2>
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scroll list */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                {/* Client brief */}
                <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                  <p className="text-xs uppercase text-zinc-450 font-bold">Traceable Identity</p>
                  <h3 className="text-sm font-bold text-zinc-900">Premium DEHA Collector</h3>
                  <p className="text-xs text-zinc-500">Steward: mallapureddysuhashritha@gmail.com</p>
                  <p className="text-[10px] text-[#B3922E] uppercase font-bold tracking-wider">MEMBER LEVEL: PLATINUM ADVISOR</p>
                </div>

                {/* Orders History list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#B3922E] flex items-center space-x-1.5 pb-2 border-b border-zinc-200">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Purchase & Return History</span>
                  </h4>

                  {orders.map((ord, idx) => (
                    <div key={idx} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-[10px] tracking-wide">
                        <span className="font-mono text-[#B3922E] font-bold">{ord.id}</span>
                        <span className="text-zinc-400">{ord.date}</span>
                      </div>
                      <p className="text-xs text-zinc-700">{ord.items}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-zinc-200 text-[11px]">
                        <span className="text-zinc-800">Invoice: <span className="font-bold text-[#B3922E]">${ord.total.toFixed(2)}</span></span>
                        <span className="bg-[#B3922E]/10 text-[#B3922E] px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Saved addresses brief */}
                <div className="space-y-3 border-t border-zinc-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-600">Registered Shipping Hub</p>
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-700 leading-relaxed">
                    Charlotte Dubois<br />
                    14 Gammel Mønt, Apartment 3B<br />
                    1117 Copenhagen, Denmark
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILED MODAL OVERVIEW popup */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          wishlist={wishlist}
        />
      )}

    </div>
  );
}
