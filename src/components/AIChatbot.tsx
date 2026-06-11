/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Sparkles, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface AIChatbotProps {
  onSelectProduct: (product: Product) => void;
}

export default function AIChatbot({ onSelectProduct }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Greetings. I am your personal **DEHA Styling Concierge**. How may I guide your luxury fashion or accessory selection today? Ask me about sizes, colors, material lineage, or active promotions."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userMsg = inputVal.trim();
    setInputVal("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages
        })
      });
      const data = await res.json();
      if (data.responseText) {
        setMessages(prev => [...prev, { sender: "bot", text: data.responseText }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { sender: "bot", text: `I experienced a minor latency connection error. However, we have pristine items like our Classic Wrap Denim and Camel Trench Coats active. How can I help?` }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "bot", text: "I experienced a digital connection timeout. Rest assured, our local servers are processing. Feel free to explore our premium categories in the meantime!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract products found in text to attach smart custom clickable buttons!
  const getMentionedProducts = (text: string): Product[] => {
    const textLower = text.toLowerCase();
    return PRODUCTS.filter(p => textLower.includes(p.name.toLowerCase()) || textLower.includes(p.id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="deha-floating-ai-assistant">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B3922E] text-white shadow-2xl hover:bg-zinc-850 hover:scale-105 transition-all focus:outline-none group border border-white/10 cursor-pointer"
            id="assistant-launcher-btn"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            className="w-[360px] sm:w-[400px] h-[550px] bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900"
            id="assistant-chat-panel"
          >
            {/* Header */}
            <div className="p-4 bg-[#FAF9F5] border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-[#B3922E]/10 rounded-lg border border-[#B3922E]/20">
                  <Sparkles className="h-4 w-4 text-[#B3922E] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#B3922E]">DEHA AI Concierge</h3>
                  <p className="text-[10px] text-zinc-500 tracking-wider font-bold">ONLINE • ALWAYS ACTIVE</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg cursor-pointer transition-colors"
                id="assistant-close-panel-btn"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FFFDF9]/60" 
              id="assistant-messages-scroll-area"
            >
              {messages.map((m, idx) => {
                const isBot = m.sender === "bot";
                const mentioned = isBot ? getMentionedProducts(m.text) : [];
                
                return (
                  <div key={idx} className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        isBot 
                          ? "bg-[#FAF9F5] text-zinc-805 border border-zinc-200" 
                          : "bg-[#B3922E] text-white font-semibold shadow-xs"
                      }`}
                    >
                      {/* Very simple Bold markdown parser to display formatted messages nicely */}
                      <p>
                        {m.text.split("**").map((part, i) => i % 2 !== 0 ? <strong key={i} className={isBot ? "text-[#B3922E] font-bold" : "font-extrabold"}>{part}</strong> : part)}
                      </p>
                    </div>

                    {/* Mentions Smart Actions */}
                    {mentioned.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 w-full pl-2">
                        {mentioned.map(p => (
                          <button
                            key={p.id}
                            onClick={() => onSelectProduct(p)}
                            className="flex items-center space-x-2 px-2.5 py-1 bg-white hover:bg-[#B3922E]/10 border border-zinc-200 rounded-lg text-[11px] text-[#B3922E] font-semibold tracking-wider transition-all shadow-xs cursor-pointer focus:outline-none"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>Inspect {p.name} (${p.price})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center space-x-2 text-zinc-500 p-2 text-xs font-semibold">
                  <Loader2 className="h-4 w-4 animate-spin text-[#B3922E]" />
                  <span>Drafting tailored recommendations...</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-[#FAF9F5] border-t border-zinc-200 flex items-center space-x-2">
              <input
                type="text"
                placeholder="Ask e.g. 'Recommend silk wrapping dresses'..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-white rounded-xl px-3 py-2 text-xs placeholder-zinc-400 text-zinc-855 font-medium outline-none focus:ring-1 focus:ring-[#B3922E]/50 border border-zinc-200"
                id="assistant-chat-input-field"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isLoading}
                className="p-2 bg-[#B3922E] hover:bg-zinc-850 text-white rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:hover:bg-[#B3922E] cursor-pointer"
                id="assistant-send-btn"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
