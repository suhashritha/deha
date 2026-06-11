/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Check, ClipboardList, ShieldAlert, CreditCard, ShoppingCart, MessageSquare, CheckCircle, Package } from "lucide-react";
import { CartItem, Product } from "../types";

interface CheckoutFlowProps {
  cart: CartItem[];
  discountPercent: number;
  appliedCode: string;
  onClearCart: () => void;
  setActiveTab: (tab: string) => void;
}

export default function CheckoutFlow({
  cart,
  discountPercent,
  appliedCode,
  onClearCart,
  setActiveTab
}: CheckoutFlowProps) {
  const [step, setStep] = useState(1); // 1 to 5
  
  // Shipping details state
  const [shippingName, setShippingName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Denmark");

  // Options
  const [deliveryType, setDeliveryType] = useState<"Standard" | "Express">("Standard");
  const [paymentOption, setPaymentOption] = useState<"Credit" | "COD" | "UPI">("Credit");
  const [orderId, setOrderId] = useState("");

  const subtotal = cart.reduce((acc, item) => {
    const activePrice = item.product.discountPrice || item.product.price;
    return acc + activePrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const deliveryFee = deliveryType === "Express" ? 25.00 : (subtotal > 150 ? 0 : 15.00);
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Create random unique order ID
      const randomID = `DEHA-${Math.floor(100000 + Math.random() * 900000)}-${country.substring(0, 3).toUpperCase()}`;
      setOrderId(randomID);
      // Clean Cart bag
      onClearCart();
      setStep(5);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-900 font-sans" id="checkout-container">
      {/* Checkout step line */}
      {step < 5 && (
        <div className="flex justify-between items-center max-w-lg mx-auto mb-10 text-[10px] uppercase font-bold tracking-widest text-[#B3922E]">
          <span className={step >= 1 ? "text-[#B3922E]" : "text-zinc-400"}>1. Shipping</span>
          <span className="text-zinc-200">•</span>
          <span className={step >= 2 ? "text-[#B3922E]" : "text-zinc-400"}>2. Delivery</span>
          <span className="text-zinc-200">•</span>
          <span className={step >= 3 ? "text-[#B3922E]" : "text-zinc-400"}>3. Payment</span>
          <span className="text-zinc-200">•</span>
          <span className={step >= 4 ? "text-[#B3922E]" : "text-zinc-400"}>4. Review</span>
        </div>
      )}

      {/* STEP 1: SHIPPING INFORMATION */}
      {step === 1 && (
        <div className="bg-[#FAF9F5] border border-zinc-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs" id="checkout-step-1">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <Package className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E]">1. Shipping Information</h2>
          </div>

          <form onSubmit={handleStepSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Full Name</label>
              <input
                type="text"
                required
                value={shippingName}
                onChange={e => setShippingName(e.target.value)}
                placeholder="Charlotte Dubois"
                className="w-full bg-white border border-zinc-200 focus:border-[#B3922E] rounded-lg px-4 py-2 text-xs text-zinc-800 outline-none font-medium"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Physical Street Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="14 Gammel Mønt, Apartment 3B"
                className="w-full bg-white border border-zinc-200 focus:border-[#B3922E] rounded-lg px-4 py-2 text-xs text-zinc-800 outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Zip / Postal Code</label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                  placeholder="1117"
                  className="w-full bg-white border border-zinc-200 focus:border-[#B3922E] rounded-lg px-4 py-2 text-xs text-zinc-800 outline-none font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Town / City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Copenhagen"
                  className="w-full bg-white border border-zinc-200 focus:border-[#B3922E] rounded-lg px-4 py-2 text-xs text-zinc-800 outline-none font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Sovereign Country</label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none focus:border-[#B3922E] font-medium"
                >
                  <option value="Denmark">Denmark</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Germany">Germany</option>
                  <option value="United States">United States</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#B3922E] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer focus:outline-none"
            >
              Continue to Delivery
            </button>
          </form>
        </div>
      )}

      {/* STEP 2: DELIVERY METHOD */}
      {step === 2 && (
        <div className="bg-[#FAF9F5] border border-zinc-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs text-zinc-900" id="checkout-step-2">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <ClipboardList className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E]">2. Dispatch / Delivery Standard</h2>
          </div>

          <form onSubmit={handleStepSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Standard Options */}
              <label className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl cursor-pointer hover:border-[#B3922E]/50 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === "Standard"}
                    onChange={() => setDeliveryType("Standard")}
                    className="accent-[#B3922E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800">Carbon-Neutral Copenhagen Post</h4>
                    <p className="text-[11px] text-zinc-500 font-semibold">Scheduled arrival inside 3 to 5 business days.</p>
                  </div>
                </div>
                <span className="text-xs text-[#B3922E] font-bold">{subtotal > 150 ? "FREE" : "$15.00"}</span>
              </label>

              {/* Express option */}
              <label className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl cursor-pointer hover:border-[#B3922E]/50 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryType === "Express"}
                    onChange={() => setDeliveryType("Express")}
                    className="accent-[#B3922E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800">Bespoke Couture Express Courier</h4>
                    <p className="text-[11px] text-zinc-500 font-semibold">Insured express delivery inside 1 to 2 business days.</p>
                  </div>
                </div>
                <span className="text-xs text-[#B3922E] font-bold">$25.00</span>
              </label>

            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2.5 border border-zinc-250 bg-white hover:border-zinc-450 hover:bg-[#FAF9F5] text-zinc-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B3922E] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: PAYMENT TYPE */}
      {step === 3 && (
        <div className="bg-[#FAF9F5] border border-zinc-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs text-zinc-900" id="checkout-step-3">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <CreditCard className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E]">3. Payment Gateway</h2>
          </div>

          <form onSubmit={handleStepSubmit} className="space-y-6">
            <div className="space-y-4">
              
              {/* Credit check */}
              <label className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl cursor-pointer hover:border-[#B3922E]/50 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "Credit"}
                    onChange={() => setPaymentOption("Credit")}
                    className="accent-[#B3922E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800">Secure Premium Credit Card</h4>
                    <p className="text-[11px] text-zinc-500 font-semibold text-zinc-550">Visa, Mastercard, Amex, Diner, JCB supported.</p>
                  </div>
                </div>
                <div className="flex space-x-1.5 text-zinc-500 font-bold text-[9px] border border-zinc-250 rounded px-1.5 py-0.5 bg-zinc-50">3D-SECURE</div>
              </label>

              {/* COD */}
              <label className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl cursor-pointer hover:border-[#B3922E]/50 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "COD"}
                    onChange={() => setPaymentOption("COD")}
                    className="accent-[#B3922E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800 font-bold">Cash on Delivery (COD)</h4>
                    <p className="text-[11px] text-zinc-500 font-semibold">Collect raw funds at the time of mailbox delivery.</p>
                  </div>
                </div>
              </label>

              {/* UPI */}
              <label className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-xl cursor-pointer hover:border-[#B3922E]/50 shadow-2xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentOption === "UPI"}
                    onChange={() => setPaymentOption("UPI")}
                    className="accent-[#B3922E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-800">Instant Secure Mobile Wallet (UPI)</h4>
                    <p className="text-[11px] text-zinc-500 font-semibold">Digital QR payment processing systems.</p>
                  </div>
                </div>
              </label>

            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 border border-zinc-250 bg-white hover:border-zinc-450 hover:bg-[#FAF9F5] text-zinc-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B3922E] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-zinc-850 transition-colors cursor-pointer"
              >
                Continue to Preview
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: PREVIEW & REVIEW ORDER */}
      {step === 4 && (
        <div className="bg-[#FAF9F5] border border-zinc-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-xs text-zinc-900" id="checkout-step-4">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <ClipboardList className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#B3922E]">4. Final Order Review</h2>
          </div>

          <form onSubmit={handleStepSubmit} className="space-y-6">
            
            {/* Split layout: shipping & pricing briefs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
              {/* Shipping Brief */}
              <div className="bg-white border border-zinc-200 p-4 rounded-xl space-y-3 shadow-2xs text-zinc-800">
                <h3 className="font-bold text-[#B3922E] uppercase tracking-wider text-[10px]">Recipient Details</h3>
                <p>
                  <span className="text-zinc-500 font-bold uppercase">NAME:</span> {shippingName}<br />
                  <span className="text-zinc-500 font-bold uppercase">STREET:</span> {address}<br />
                  <span className="text-zinc-500 font-bold uppercase">TOWNSHIP:</span> {zip}, {city} ({country})
                </p>
                <div className="pt-2 border-t border-zinc-150">
                  <p><span className="text-zinc-500 uppercase font-semibold">DISPATCH METHOD:</span> {deliveryType} Courier</p>
                  <p><span className="text-zinc-500 uppercase font-semibold">PROCESSED VIA:</span> Secure {paymentOption}</p>
                </div>
              </div>

              {/* Pricing Brief */}
              <div className="bg-white border border-zinc-200 p-4 rounded-xl space-y-2 shadow-2xs text-zinc-800">
                <h3 className="font-bold text-[#B3922E] uppercase tracking-wider text-[10px]">Calculated Invoice</h3>
                <div className="flex justify-between text-zinc-650 font-medium">
                  <span>Boutique items</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-650 font-bold">
                    <span>Campaign Discount ({appliedCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-650 font-medium">
                  <span>Courier logistics</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#B3922E] border-t border-zinc-150 pt-2">
                  <span>Total Investment</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* List items brief */}
            <div className="bg-white border border-zinc-150 p-4 rounded-xl space-y-3 text-zinc-800">
              <h3 className="font-bold uppercase tracking-wider text-[10px] text-zinc-500">Purchased Curation Bags</h3>
              <div className="divide-y divide-zinc-100 max-h-[160px] overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="py-2 flex items-center justify-between text-xs font-semibold">
                    <span>{item.product.name} ({item.selectedSize} / {item.selectedColor.name}) x {item.quantity}</span>
                    <span className="text-zinc-650">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Secure note */}
            <div className="bg-[#B3922E]/5 border border-[#B3922E]/30 p-3 rounded-lg flex items-start space-x-2 text-[11px] text-zinc-700 font-medium">
              <ShieldAlert className="h-4 w-4 text-[#B3922E] shrink-0 mt-0.5" />
              <p>By executing checkout, your order receives archival security protocols. Dispatch begins in Copenhagen within 12 hours.</p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 border border-zinc-250 bg-white hover:border-zinc-450 hover:bg-[#FAF9F5] text-zinc-700 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-green-650 hover:bg-green-755 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Place Archival Order
              </button>
            </div>

          </form>
        </div>
      )}

      {/* STEP 5: PLACE SUCCESS CONFIRMATION PAGE */}
      {step === 5 && (
        <div className="py-16 text-center space-y-6 bg-white border border-zinc-250 p-8 rounded-2xl max-w-xl mx-auto shadow-lg text-zinc-900" id="checkout-step-5">
          <CheckCircle className="h-16 w-16 text-[#B3922E] mx-auto animate-pulse" />
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-zinc-900 tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
              Order Registered Successfully
            </h2>
            <p className="text-xs text-zinc-550 leading-relaxed max-w-sm mx-auto">
              Your bespoke DEHA procurement is filed inside Indre By HQ repository. An encrypted invoice is forwarded to your cabinet.
            </p>
          </div>

          {/* Random Order ID display */}
          <div className="bg-[#FAF9F5] border border-zinc-200 p-4 rounded-xl flex flex-col items-center max-w-xs mx-auto">
            <span className="text-[10px] text-zinc-450 uppercase tracking-widest select-none font-bold">Tracking registry code</span>
            <span className="text-[#B3922E] font-mono font-bold text-sm tracking-widest pt-1">{orderId}</span>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={() => {
                setActiveTab("home");
                setStep(1);
              }}
              className="px-6 py-2.5 bg-[#B3922E] hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all cursor-pointer"
            >
              Return Home
            </button>
            <p className="text-[10px] text-zinc-400 tracking-wider uppercase block select-none font-bold">3-5 Days tracked carbon-neutral transit active</p>
          </div>
        </div>
      )}

    </div>
  );
}
