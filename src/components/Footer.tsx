/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ShieldCheck, Truck, RotateCcw, Award, Headphones, Instagram, Facebook, Twitter } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-[#F5F4F0] border-t border-zinc-200 text-zinc-900 mt-auto" id="deha-global-footer">
      {/* Trust Badges */}
      <div className="border-b border-zinc-200 bg-[#FAF9F5]/40 py-10" id="footer-trust-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <ShieldCheck className="h-6 w-6 text-[#B3922E]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Secure Checkout</h4>
            <p className="text-[11px] text-zinc-500">Fully encrypted banking with 3D Secure verification protocol.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <Truck className="h-6 w-6 text-[#B3922E]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Pristine Delivery</h4>
            <p className="text-[11px] text-zinc-500">Insured express carbon-neutral dispatch in protective premium wrapping.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <RotateCcw className="h-6 w-6 text-[#B3922E]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">30-Day Returns</h4>
            <p className="text-[11px] text-zinc-500">Return prepaid label shipped inside each order for flawless exchanges.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <Award className="h-6 w-6 text-[#B3922E]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Traceable Materials</h4>
            <p className="text-[11px] text-zinc-500">Verified natural GOTS bio-cotton, cashmere, and high-purity brass castings.</p>
          </div>

          <div className="flex flex-col items-center md:items-start space-y-2">
            <Headphones className="h-6 w-6 text-[#B3922E]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Concierge Suite</h4>
            <p className="text-[11px] text-zinc-500">Direct live response 24/7 client relations for styling & account advisory.</p>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12" id="footer-directory">
        {/* Brand Summary */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-[0.2em] text-[#B3922E]" style={{ fontFamily: "Georgia, serif" }}>
              DEHA
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-[#B3922E]"></div>
          </div>
          <p className="text-sm text-zinc-650 leading-relaxed">
            The global online destination for curated fashion collections, custom-engineered device armor, and hand-fitted architectural stoneware.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="p-2 bg-zinc-200/50 rounded-full hover:bg-[#B3922E]/10 hover:text-[#B3922E] text-zinc-700 transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-200/50 rounded-full hover:bg-[#B3922E]/10 hover:text-[#B3922E] text-zinc-700 transition-all">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="p-2 bg-zinc-200/50 rounded-full hover:bg-[#B3922E]/10 hover:text-[#B3922E] text-zinc-700 transition-all">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Directory Columns */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B3922E] mb-6">Collections</h4>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li><button onClick={() => setActiveTab("shop")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Women Atelier</button></li>
            <li><button onClick={() => setActiveTab("shop")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Men Architecture</button></li>
            <li><button onClick={() => setActiveTab("shop")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Tech Accessories</button></li>
            <li><button onClick={() => setActiveTab("shop")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Stoneware Lifestyle</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B3922E] mb-6">Concierge Advisory</h4>
          <ul className="space-y-3 text-sm text-zinc-600">
            <li><button onClick={() => setActiveTab("contact")} className="hover:text-[#B3922E] transition-colors cursor-pointer">FAQ & Support</button></li>
            <li><button onClick={() => setActiveTab("contact")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Initiate Return</button></li>
            <li><button onClick={() => setActiveTab("contact")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Secure Shipping Info</button></li>
            <li><button onClick={() => setActiveTab("contact")} className="hover:text-[#B3922E] transition-colors cursor-pointer">Bespoke Fitting Services</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#B3922E] mb-6">Contact Suite</h4>
          <p className="text-sm text-zinc-650 mb-3">
            DEHA Retail Group SE<br />
            14 Gammel Mønt, Copenhagen K<br />
            Denmark
          </p>
          <p className="text-sm text-[#B3922E] font-semibold">
            concierge@deha-premium.com
          </p>
        </div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-zinc-200/80 bg-zinc-150 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-450 tracking-wider">
          <p>© 2026 DEHA PREMIUM RETAIL GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-zinc-800 transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Service Standard</a>
            <a href="#" className="hover:text-zinc-800 transition-colors">Sustainability Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
