/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { BookOpen, X, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { BlogItem } from "../types";
import { BLOGS } from "../data";

export default function JournalView() {
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-zinc-905 font-sans space-y-12" id="blog-journal-viewport">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] text-[#B3922E] font-bold tracking-[0.3em] uppercase">DEHA COUTURE CHRONICLE</span>
        <h1 className="text-4xl font-light font-serif tracking-tight text-zinc-900" style={{ fontFamily: "Georgia, serif" }}>
          The Editorial Journal
        </h1>
        <p className="text-zinc-550 text-xs max-w-sm mx-auto pt-1">
          Essays on modern slow fashion, sustainable cashmere tracing, and ergonomic design.
        </p>
        <div className="w-12 h-0.5 bg-[#B3922E] mx-auto mt-2" />
      </div>

      {/* Grid of Journal Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="journal-listings-grid">
        {BLOGS.map(blog => (
          <article
            key={blog.id}
            onClick={() => setSelectedBlog(blog)}
            className="group bg-white border border-zinc-200 hover:border-[#B3922E]/80 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between p-5 space-y-4 transition-all shadow-xs"
          >
            <div className="space-y-4">
              {/* Cover Image */}
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#F5F4F0] relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-95"
                />
                <span className="absolute bottom-3 left-3 bg-white/95 border border-zinc-200 text-[#B3922E] text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded">
                  {blog.category}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-3 text-[10px] text-zinc-500 font-medium">
                  <span className="flex items-center"><Calendar className="h-3 w-3 mr-1 text-[#B3922E]" /> {blog.date}</span>
                  <span className="flex items-center"><Clock className="h-3 w-3 mr-1 text-[#B3922E]" /> {blog.readTime}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-zinc-900 group-hover:text-[#B3922E] transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-xs text-zinc-650 leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Read Link */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-150 text-xs text-zinc-600">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px] font-semibold">AUTHORED BY: <span className="text-[#B3922E]">{blog.author}</span></span>
              <span className="text-xs text-[#B3922E] font-semibold inline-flex items-center group-hover:translate-x-1.5 transition-transform">
                Read Article <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </span>
            </div>

          </article>
        ))}
      </div>

      {/* IMMERSIVE READING MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" id="journal-immersive-reader">
          <div className="bg-white border border-zinc-200 rounded-2xl w-full max-w-3xl overflow-hidden relative shadow-2xl max-h-[85vh] flex flex-col text-zinc-900">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-5 right-5 z-10 p-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-zinc-600 hover:text-zinc-900 transition-all cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Article Image strip */}
            <div className="h-56 relative bg-zinc-100">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10 z-10" />
              <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover opacity-85" />
              <div className="absolute bottom-4 left-6 z-20">
                <span className="bg-[#B3922E] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                  {selectedBlog.category}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 border-b border-zinc-150 pb-4">
                <span>By: <span className="text-[#B3922E] font-semibold">{selectedBlog.author}</span></span>
                <span>•</span>
                <span>Published: {selectedBlog.date}</span>
                <span>•</span>
                <span>Est: {selectedBlog.readTime}</span>
              </div>

              {/* Header Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight text-left" style={{ fontFamily: "Georgia, serif" }}>
                {selectedBlog.title}
              </h2>

              {/* Main reading content */}
              <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed text-left space-y-4 whitespace-pro-line" id="editorial-body">
                {selectedBlog.content}
              </div>
            </div>

            {/* Reading end-sign */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-150 text-center text-[10px] text-zinc-450 tracking-wider font-semibold">
              DEHA ATELIER PUBLISH SE • Archival Curation
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
