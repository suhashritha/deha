/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, Mail, MapPin, Phone, MessageSquare, ChevronDown, ChevronUp, CheckCircle, Send, Globe } from "lucide-react";
import { FAQS } from "../data";

export default function ContactView() {
  const [openFaqIdx, setOpenFaqIdx] = useState<string | null>("f-1");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Clear forms
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-900 font-sans space-y-16" id="contact-view-viewport">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">CLIENT RELATIONS</span>
        <h1 className="text-4xl font-light font-serif tracking-tight text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
          Contact Concierge & FAQ
        </h1>
        <p className="text-zinc-550 text-xs max-w-sm mx-auto pt-1">
          Initiate direct consultation lines or view answers regarding shipping indices, refunds, and material tracing.
        </p>
        <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left COLUMN: FAQ Accordions */}
        <div className="space-y-6" id="faq-accordions-group">
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <HelpCircle className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-base font-bold uppercase tracking-widest font-serif text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3" id="faq-accordions-map">
            {FAQS.map(faq => {
              const isOpen = openFaqIdx === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#FAF9F5] border border-zinc-200 rounded-xl overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : faq.id)}
                    className="w-full text-left p-4 flex items-center justify-between text-xs sm:text-sm font-semibold tracking-wide hover:text-[#B3922E] text-zinc-850 transition-colors focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-[#B3922E]" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-605 leading-relaxed border-t border-zinc-200 pt-3 bg-white/70">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-2 text-[9px] bg-[#B3922E]/10 text-[#B3922E] border border-[#B3922E]/20 px-2 py-0.5 rounded uppercase tracking-wider font-bold">
                        Topic: {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right COLUMN: Bespoke Contact Form */}
        <div className="space-y-6 bg-white border border-zinc-200 p-6 rounded-2xl shadow-xs text-zinc-900" id="contact-consult-wrapper">
          
          <div className="flex items-center space-x-2 border-b border-zinc-200 pb-3">
            <Mail className="h-5 w-5 text-[#B3922E]" />
            <h2 className="text-base font-bold uppercase tracking-widest font-serif text-[#B3922E]" style={{ fontFamily: "Georgia, serif" }}>Bespoke Consultation Lines</h2>
          </div>

          {formSubmitted ? (
            <div className="py-12 text-center space-y-4" id="consult-success">
              <CheckCircle className="h-12 w-12 text-green-650 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold font-serif text-zinc-900">Transmission Flawless</h3>
              <p className="text-xs text-zinc-550 max-w-xs mx-auto">
                Thank you. Your request is registered under archival consultation record. A global DEHA steward will verify via email inside 2 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-5 py-2 bg-[#B3922E] text-white hover:bg-zinc-800 font-semibold text-xs tracking-wider uppercase rounded-lg cursor-pointer"
              >
                Draft New Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="client-consult-form">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full bg-white border border-zinc-200 focus:border-[#B3922E]/75 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Registered Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@mail.com"
                    className="w-full bg-white border border-zinc-200 focus:border-[#B3922E]/75 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Optional Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+45 0000 0000"
                    className="w-full bg-white border border-zinc-200 focus:border-[#B3922E]/75 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Subject Topic</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Silk fit sizing"
                    className="w-full bg-white border border-zinc-200 focus:border-[#B3922E]/75 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Bespoke Inquiries</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Detail your styling preferences or questions regarding leather backplates..."
                  className="w-full bg-white border border-zinc-200 focus:border-[#B3922E]/75 rounded-lg px-3 py-2 text-xs text-zinc-800 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#B3922E] hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer focus:outline-none"
                id="contact-submit-btn"
              >
                <Send className="h-4 w-4" />
                <span>Submit secure consultation</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Office Locations */}
      <div className="border-t border-zinc-200 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center" id="office-locations">
        
        <div className="space-y-2">
          <MapPin className="h-5 w-5 text-[#B3922E] mx-auto text-center" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-800">Copenhagen Atelier (HQ)</h4>
          <p className="text-[11px] text-zinc-550">14 Gammel Mønt, Indre By • Copenhagen, Denmark</p>
        </div>

        <div className="space-y-2">
          <Phone className="h-5 w-5 text-[#B3922E] mx-auto" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-800">Consultation Hotlines</h4>
          <p className="text-[11px] text-zinc-550">+45 88 41 902 • Toll Free Support</p>
        </div>

        <div className="space-y-2">
          <Globe className="h-5 w-5 text-[#B3922E] mx-auto" />
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-800">Global Showrooms</h4>
          <p className="text-[11px] text-zinc-550">Stockholm Nord • Berlin Mitte • Tokyo Roppongi</p>
        </div>

      </div>

    </div>
  );
}
