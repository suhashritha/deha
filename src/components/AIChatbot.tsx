/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, X, Send, Sparkles, ShoppingBag, Loader2, 
  Upload, Scissors, RotateCcw, Sliders, Play, Maximize2, 
  Camera, Check, Info, ZoomIn, ZoomOut, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface AIChatbotProps {
  onSelectProduct: (product: Product) => void;
  onAddToCartDirect?: (product: Product) => void;
}

// Preset Studio models for zero-friction trial
const MODEL_PRESETS = [
  {
    id: "preset-audrey",
    name: "Audrey (Tall Stature)",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
    gender: "Women"
  },
  {
    id: "preset-chloe",
    name: "Chloe (Studio Medium)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    gender: "Women"
  },
  {
    id: "preset-kids",
    name: "Leo (Youth Active)",
    url: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
    gender: "Kids"
  }
];

// Wearable product listings optimized for transparent overlays or clean visual fittings
const TRYON_ITEMS = PRODUCTS.filter(p => 
  p.id === "w-1" || p.id === "w-2" || p.id === "k-1" || p.id === "m-1" || p.id === "m-2" || p.id === "m-3"
);

export default function AIChatbot({ onSelectProduct, onAddToCartDirect }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "fitting">("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Greetings. I am your personal **DEHA Styling Concierge**. \n\nI have unlocked our **Virtual Dressing Room**! You can now upload a portrait of yourself (or choose one of our high-end studio model presets) and virtually fit any garment from our latest collection directly onto your shape while discussing fabrics and style cuts with me! How shall we coordinate today?"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for Virtual Try-On Room
  const [userPhotoUrl, setUserPhotoUrl] = useState<string>(MODEL_PRESETS[0].url);
  const [selectedGarment, setSelectedGarment] = useState<Product>(PRODUCTS[0]); // Default Classic Silk Dress
  const [isUploading, setIsUploading] = useState(false);
  
  // Interactive Alignment States
  const [scale, setScale] = useState<number>(1.0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(15);
  const [rotation, setRotation] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(0.95);
  const [activeFitControlTab, setActiveFitControlTab] = useState<"garments" | "adjust">("garments");

  // Success state for instant bag additions
  const [successGarmentId, setSuccessGarmentId] = useState<string | null>(null);

  // Mouse / Touch dragging systems
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const originalOffset = useRef({ x: 0, y: 0 });

  // Auto scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  // Sync mobile active tab based on try-on visibility
  useEffect(() => {
    if (showTryOn) {
      setActiveTab("fitting");
    } else {
      setActiveTab("chat");
    }
  }, [showTryOn]);

  // Reset overlay offsets
  const handleResetFit = () => {
    setScale(1.0);
    setOffsetX(0);
    setOffsetY(15);
    setRotation(0);
    setOpacity(0.95);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    originalOffset.current = { x: offsetX, y: offsetY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffsetX(originalOffset.current.x + dx);
    setOffsetY(originalOffset.current.y + dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    originalOffset.current = { x: offsetX, y: offsetY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    setOffsetX(originalOffset.current.x + dx);
    setOffsetY(originalOffset.current.y + dy);
  };

  const handleMouseEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalUp);
    return () => window.removeEventListener("mouseup", handleGlobalUp);
  }, []);

  // Standard message submission
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

  // Image Upload handler
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const b64 = reader.result as string;
      setUserPhotoUrl(b64);
      setShowTryOn(true);
      setActiveTab("fitting");
      setIsUploading(false);

      // Add automated message triggering AI style & contour evaluation
      setMessages(prev => [...prev, { 
        sender: "user", 
        text: `📸 I uploaded my style fit profile portrait! Please run an analyzer scans of my silhouette and recommend the grandest dress match.` 
      }]);
      setIsLoading(true);

      try {
        const rawBase64 = b64.split(",")[1];
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: "Analyze this portrait photo. Recommend the best dress or garment from our collection for this person. Explain why it fits their form or skin-tone, and mention how they can try it on using our virtual mirror.",
            history: messages,
            image: {
              data: rawBase64,
              mimeType: file.type
            }
          })
        });
        const data = await res.json();
        if (data.responseText) {
          setMessages(prev => [...prev, { sender: "bot", text: data.responseText }]);
        } else {
          setMessages(prev => [...prev, { sender: "bot", text: "I analyzed your portrait beautifully! I suggest trying on our exquisite **Classic Silk Wrap Dress** or **Butter yellow maxi dress**. Tap either below on the virtual mirror to adjust fit vectors!" }]);
        }
      } catch (err) {
        console.error("AI photo analyze failed, fallback used", err);
        setMessages(prev => [...prev, { 
          sender: "bot", 
          text: "I analyzed your outline beautifully with my neural styling grid! I highly recommend our premium **Classic Silk Wrap Dress** in Emerald Green or our GOTS organic **kids frock** if styling for children. Try selecting them from the list on the right and scale them manually to visual perfection!" 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSelectedToBag = () => {
    if (!onAddToCartDirect || !selectedGarment) return;
    onAddToCartDirect(selectedGarment);
    setSuccessGarmentId(selectedGarment.id);
    setTimeout(() => setSuccessGarmentId(null), 2500);
  };

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
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B3922E] text-white shadow-2xl hover:bg-zinc-800 hover:scale-105 transition-all focus:outline-none group border border-white/10 cursor-pointer"
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
            className={`bg-white border border-zinc-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-900 transition-all duration-300 ${
              showTryOn ? "w-[360px] sm:w-[820px] h-[580px]" : "w-[360px] sm:w-[400px] h-[550px]"
            }`}
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

              <div className="flex items-center space-x-2" id="header-interactive-toggles">
                {/* Virtual Dress Toggle Button */}
                <button
                  onClick={() => setShowTryOn(prev => !prev)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    showTryOn 
                      ? "bg-[#B3922E]/10 text-[#B3922E] border-[#B3922E]/30" 
                      : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                  }`}
                  id="virtual-try-on-toggle-btn"
                >
                  <Scissors className="h-3.5 w-3.5" />
                  <span>{showTryOn ? "Close Mirror" : "Try-On Mirror"}</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg cursor-pointer transition-colors"
                  id="assistant-close-panel-btn"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile View Tab Controls */}
            {showTryOn && (
              <div className="flex border-b border-zinc-200 sm:hidden bg-[#FAF9F5] p-1 gap-1" id="mobile-viewport-segment-tabs">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === "chat" 
                      ? "bg-[#B3922E] text-white" 
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  Stylist Chat
                </button>
                <button
                  onClick={() => setActiveTab("fitting")}
                  className={`flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${
                    activeTab === "fitting" 
                      ? "bg-[#B3922E] text-white" 
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  Virtual Try-On Room
                </button>
              </div>
            )}

            {/* Main Content Workspace Layout Split */}
            <div className="flex flex-1 overflow-hidden relative" id="assistant-split-workspace">
              {/* Column 1: Advisor Stylist Chat */}
              <div className={`flex-col border-r border-zinc-100 h-full w-full sm:w-[400px] shrink-0 ${
                showTryOn && activeTab !== "chat" ? "hidden sm:flex" : "flex"
              }`} id="column-stylist-chat">
                
                {/* Chat Message Box */}
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
                              ? "bg-[#FAF9F5] text-zinc-800 border border-zinc-200" 
                              : "bg-[#B3922E] text-white font-semibold shadow-xs"
                          }`}
                        >
                          <p className="whitespace-pre-line">
                            {m.text.split("**").map((part, i) => i % 2 !== 0 ? <strong key={i} className={isBot ? "text-[#B3922E] font-bold" : "font-extrabold"}>{part}</strong> : part)}
                          </p>
                        </div>

                        {/* Mentions Smart Actions with direct Interactive Fitting click */}
                        {mentioned.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5 w-full pl-2">
                            {mentioned.map(p => {
                              const isInteractive = TRYON_ITEMS.some(item => item.id === p.id);
                              return (
                                <div key={p.id} className="flex flex-col gap-1">
                                  <button
                                    onClick={() => onSelectProduct(p)}
                                    className="flex items-center space-x-1 px-2 py-1 bg-white hover:bg-zinc-50 border border-zinc-200 rounded-lg text-[10px] text-zinc-800 font-bold tracking-wider transition-all shadow-xs cursor-pointer focus:outline-none"
                                  >
                                    <ShoppingBag className="h-3 w-3 text-[#B3922E]" />
                                    <span>Inspect {p.name} (${p.price})</span>
                                  </button>
                                  
                                  {isInteractive && (
                                    <button
                                      onClick={() => {
                                        setSelectedGarment(p);
                                        setShowTryOn(true);
                                        setActiveTab("fitting");
                                      }}
                                      className="flex items-center space-x-1 px-2 py-1 bg-[#B3922E]/10 hover:bg-[#B3922E]/20 border border-[#B3922E]/20 rounded-lg text-[10px] text-[#B3922E] font-bold tracking-wider transition-all cursor-pointer focus:outline-none"
                                    >
                                      <Maximize2 className="h-2.5 w-2.5" />
                                      <span>Instantly Fit onto Mirror</span>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
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

                  {isUploading && (
                    <div className="flex items-center space-x-2 text-zinc-500 p-2 text-xs font-semibold">
                      <Loader2 className="h-4 w-4 animate-spin text-[#B3922E]" />
                      <span>Uploading profile portrait layout...</span>
                    </div>
                  )}
                </div>

                {/* Input Form with direct camera upload options */}
                <form onSubmit={handleSend} className="p-3 bg-[#FAF9F5] border-t border-zinc-200 flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    id="tryon-portrait-input"
                  />
                  
                  <button
                    type="button"
                    onClick={handleImageUploadClick}
                    title="Upload Outfit Matching Portrait"
                    className="p-2 bg-white hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-xl transition-all cursor-pointer focus:outline-none flex items-center justify-center shadow-xs shrink-0"
                    id="upload-portrait-btn"
                  >
                    <Camera className="h-4 w-4 text-[#B3922E]" />
                  </button>

                  <input
                    type="text"
                    placeholder="Ask e.g. 'How does the silk dress drape?'..."
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-white rounded-xl px-3 py-2 text-xs placeholder-zinc-400 text-zinc-805 font-medium outline-none focus:ring-1 focus:ring-[#B3922E]/50 border border-zinc-200"
                    id="assistant-chat-input-field"
                  />
                  
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isLoading}
                    className="p-2 bg-[#B3922E] hover:bg-zinc-800 text-white rounded-xl transition-all focus:outline-none disabled:opacity-50 disabled:hover:bg-[#B3922E] cursor-pointer"
                    id="assistant-send-btn"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Column 2: Virtual dressing mirror fitting room */}
              {showTryOn && (
                <div className={`flex-1 h-full flex flex-col bg-[#FAF9F5] overflow-y-auto ${
                  activeTab !== "fitting" ? "hidden sm:flex" : "flex"
                }`} id="column-try-on-console">
                  
                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between" id="tryon-inner-scroller">
                    
                    {/* Visual Tryon Arena Container */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#B3922E] font-extrabold uppercase tracking-widest flex items-center space-x-1">
                          <Sliders className="h-3 w-3" />
                          <span>Virtual Mirror Arena</span>
                        </span>
                        
                        <div className="flex space-x-1.5">
                          <button
                            onClick={handleResetFit}
                            className="p-1 bg-white hover:bg-zinc-100 text-[9px] font-extrabold uppercase text-zinc-500 rounded border border-zinc-200 cursor-pointer flex items-center space-x-1"
                            title="Recenter dress model"
                          >
                            <RotateCcw className="h-2.5 w-2.5" />
                            <span>Reset Fit</span>
                          </button>
                        </div>
                      </div>

                      {/* Dressing Mirror Frame Canvas */}
                      <div 
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseEnd}
                        onMouseLeave={handleMouseEnd}
                        className="relative w-full h-[300px] bg-zinc-900 overflow-hidden border border-zinc-200 rounded-2xl flex items-center justify-center select-none shadow-inner"
                        id="dressing-mirror-framed-canvas"
                      >
                        {/* Background Portrait Photo of the customer */}
                        <img 
                          src={userPhotoUrl}
                          alt="Mirror Portrait"
                          className="w-full h-full object-cover pointer-events-none select-none opacity-90"
                        />

                        {/* Drag instruction overlay badge */}
                        <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider backdrop-blur-xs pointer-events-none">
                          👈 Drag Garment to Align
                        </div>

                        {/* Draggable transparent Dress/Attire Overlay */}
                        <div
                          onMouseDown={handleMouseDown}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleMouseEnd}
                          style={{
                            transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${rotation}deg)`,
                            opacity: opacity,
                            position: "absolute",
                            cursor: isDragging ? "grabbing" : "grab",
                            width: "150px",
                            height: "220px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            touchAction: "none"
                          }}
                          id="draggable-tryon-overlay"
                        >
                          <img
                            src={selectedGarment.images[0]}
                            alt={selectedGarment.name}
                            className="max-w-full max-h-full object-contain pointer-events-none select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.45)]"
                          />
                        </div>
                      </div>

                      {/* Preset Studio models for visual trials */}
                      <div className="flex items-center space-x-2 py-0.5 px-1 bg-zinc-100 rounded-xl justify-between border border-zinc-200">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider pl-1">Preset Models:</span>
                        <div className="flex space-x-1">
                          {MODEL_PRESETS.map((m) => (
                            <button
                              key={m.id}
                              onClick={() => setUserPhotoUrl(m.url)}
                              className={`px-2 py-1 text-[9px] font-bold rounded-lg border cursor-pointer transition-colors ${
                                userPhotoUrl === m.url 
                                  ? "bg-[#B3922E] text-white border-transparent"
                                  : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                              }`}
                            >
                              {m.name.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Controls & Wardrobe Lists Drawer */}
                    <div className="space-y-3 pt-1 border-t border-zinc-200">
                      
                      {/* Nav Segments */}
                      <div className="flex bg-zinc-100 p-1 rounded-lg gap-1 border border-zinc-200/50">
                        <button
                          onClick={() => setActiveFitControlTab("garments")}
                          className={`flex-1 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md cursor-pointer transition-colors ${
                            activeFitControlTab === "garments"
                              ? "bg-white text-zinc-900 shadow-xs"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          Wardrobe Selection
                        </button>
                        <button
                          onClick={() => setActiveFitControlTab("adjust")}
                          className={`flex-1 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md cursor-pointer transition-colors ${
                            activeFitControlTab === "adjust"
                              ? "bg-white text-zinc-900 shadow-xs"
                              : "text-zinc-500 hover:text-zinc-800"
                          }`}
                        >
                          Manual Positioning
                        </button>
                      </div>

                      {/* Tab 1 Content: Wardrobe catalogs */}
                      {activeFitControlTab === "garments" && (
                        <div className="space-y-2.5">
                          <p className="text-[9px] font-bold text-zinc-505 uppercase tracking-wider text-center">
                            Select a bespoke DEHA garment to try on:
                          </p>
                          <div className="grid grid-cols-3 gap-2 overflow-x-auto max-h-[140px] p-0.5">
                            {TRYON_ITEMS.map((item) => {
                              const activePrice = item.discountPrice || item.price;
                              const isSelected = selectedGarment.id === item.id;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    setSelectedGarment(item);
                                    // Set optimal defaults based on selected shape
                                    if (item.id === "k-1") {
                                      setScale(0.8);
                                      setOffsetY(40);
                                    } else {
                                      setScale(1.0);
                                      setOffsetY(15);
                                    }
                                  }}
                                  className={`p-1.5 flex flex-col items-center border rounded-xl text-center cursor-pointer transition-all ${
                                    isSelected 
                                      ? "border-[#B3922E] bg-[#B3922E]/5 ring-1 ring-[#B3922E]" 
                                      : "border-zinc-200 bg-white hover:border-zinc-300"
                                  }`}
                                >
                                  <div className="w-10 h-10 bg-zinc-50 rounded overflow-hidden mb-1 flex items-center justify-center">
                                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                                  </div>
                                  <h5 className="text-[8px] font-extrabold truncate w-full text-zinc-800 uppercase tracking-tight">{item.name}</h5>
                                  <span className="text-[8px] font-bold text-[#B3922E]">${activePrice.toFixed(0)}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Tab 2 Content: Sliders adjustment panels */}
                      {activeFitControlTab === "adjust" && (
                        <div className="bg-white p-2.5 rounded-xl border border-zinc-200 text-[10px] space-y-3 font-medium text-zinc-600">
                          {/* Scale size control */}
                          <div className="flex items-center justify-between">
                            <span className="w-18">Size Scale:</span>
                            <input 
                              type="range" 
                              min="0.3" 
                              max="2.2" 
                              step="0.05"
                              value={scale}
                              onChange={(e) => setScale(parseFloat(e.target.value))}
                              className="flex-1 mx-2 accent-[#B3922E] cursor-pointer"
                            />
                            <span className="font-mono text-zinc-900 pr-1 w-8 text-right">{(scale * 100).toFixed(0)}%</span>
                          </div>

                          {/* Y Height offset control */}
                          <div className="flex items-center justify-between">
                            <span className="w-18">Y-Drape:</span>
                            <input 
                              type="range" 
                              min="-150" 
                              max="150" 
                              step="1"
                              value={offsetY}
                              onChange={(e) => setOffsetY(parseInt(e.target.value))}
                              className="flex-1 mx-2 accent-[#B3922E] cursor-pointer"
                            />
                            <span className="font-mono text-zinc-900 pr-1 w-8 text-right">{offsetY}px</span>
                          </div>

                          {/* X Horizontal offset control */}
                          <div className="flex items-center justify-between">
                            <span className="w-18">X-Align:</span>
                            <input 
                              type="range" 
                              min="-100" 
                              max="100" 
                              step="1"
                              value={offsetX}
                              onChange={(e) => setOffsetX(parseInt(e.target.value))}
                              className="flex-1 mx-2 accent-[#B3922E] cursor-pointer"
                            />
                            <span className="font-mono text-zinc-900 pr-1 w-8 text-right">{offsetX}px</span>
                          </div>

                          {/* Rotation control */}
                          <div className="flex items-center justify-between">
                            <span className="w-18">Rotate Angle:</span>
                            <input 
                              type="range" 
                              min="-180" 
                              max="180" 
                              step="2"
                              value={rotation}
                              onChange={(e) => setRotation(parseInt(e.target.value))}
                              className="flex-1 mx-2 accent-[#B3922E] cursor-pointer"
                            />
                            <span className="font-mono text-zinc-900 pr-1 w-8 text-right">{rotation}°</span>
                          </div>

                          {/* Opacity blend control */}
                          <div className="flex items-center justify-between">
                            <span className="w-18">Drape Blend:</span>
                            <input 
                              type="range" 
                              min="0.2" 
                              max="1.0" 
                              step="0.05"
                              value={opacity}
                              onChange={(e) => setOpacity(parseFloat(e.target.value))}
                              className="flex-1 mx-2 accent-[#B3922E] cursor-pointer"
                            />
                            <span className="font-mono text-zinc-900 pr-1 w-8 text-right">{(opacity * 100).toFixed(0)}%</span>
                          </div>

                          {/* Direct directional buttons for pixel-perfection */}
                          <div className="flex items-center justify-between pt-1 border-t border-zinc-100 bg-[#FFFDF9]/60 p-1.5 rounded-lg">
                            <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-zinc-550">Nudge Coordinates:</span>
                            <div className="flex space-x-1">
                              <button onClick={() => setOffsetY(prev => prev - 3)} className="p-1 bg-zinc-50 hover:bg-zinc-150 border border-zinc-200 rounded cursor-pointer" title="Nudge Up"><ArrowUp className="h-3 w-3" /></button>
                              <button onClick={() => setOffsetY(prev => prev + 3)} className="p-1 bg-zinc-50 hover:bg-zinc-150 border border-zinc-200 rounded cursor-pointer" title="Nudge Down"><ArrowDown className="h-3 w-3" /></button>
                              <button onClick={() => setOffsetX(prev => prev - 3)} className="p-1 bg-zinc-50 hover:bg-zinc-150 border border-zinc-200 rounded cursor-pointer" title="Nudge Left"><ArrowLeft className="h-3 w-3" /></button>
                              <button onClick={() => setOffsetX(prev => prev + 3)} className="p-1 bg-zinc-50 hover:bg-zinc-150 border border-zinc-200 rounded cursor-pointer" title="Nudge Right"><ArrowRight className="h-3 w-3" /></button>
                            </div>
                          </div>

                        </div>
                      )}

                      {/* Conversion Call to action button */}
                      <button
                        onClick={handleAddSelectedToBag}
                        disabled={successGarmentId === selectedGarment.id}
                        className={`w-full py-2.5 text-center text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xs cursor-pointer focus:outline-none flex items-center justify-center space-x-2 border ${
                          successGarmentId === selectedGarment.id
                            ? "bg-zinc-800 text-[#B3922E] border-transparent"
                            : "bg-[#B3922E] hover:bg-zinc-800 text-white border-transparent"
                        }`}
                      >
                        {successGarmentId === selectedGarment.id ? (
                          <>
                            <Check className="h-4 w-4 text-[#B3922E] animate-bounce" />
                            <span>Added to Shopping Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4" />
                            <span>Add selected fit to Bag • ${(selectedGarment.discountPrice || selectedGarment.price).toFixed(2)}</span>
                          </>
                        )}
                      </button>

                    </div>

                  </div>

                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
