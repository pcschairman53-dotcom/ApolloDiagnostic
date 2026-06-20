/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle, MessageSquare, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS_DATA.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS_DATA.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-slate-50/50 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 text-amber-600 px-3 py-1 rounded-full mb-3.5 shadow-2xs">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-current" />
            <span className="text-[10px] font-bold tracking-widest uppercase font-mono">Patient Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-3">
            Real Reviews From Verified Families
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            Hear from our satisfied neighbors who chose our Belgharia center for pathology, scans, and routine diagnostics checkups.
          </p>
        </div>

        {/* Google Reviews Consolidated metrics */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs max-w-3xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-50 w-14 h-14 rounded-2xl flex flex-col items-center justify-center border border-amber-100 text-[#F59E0B] text-xl font-bold font-display">
              4.8
            </div>
            <div>
              <div className="flex items-center space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4.5 h-4.5 text-[#F59E0B] fill-current" />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-800 mt-0.5">Verified Laboratory Rating</p>
              <p className="text-xs text-slate-400">Based on 220+ Google Business reviews</p>
            </div>
          </div>

          <a 
            id="testimonials-write-google-review"
            href="https://share.google/2sepdjYGdlFbzFcl2"
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto text-center px-4.5 py-2.5 bg-slate-100 hover:bg-[#0F4C81] text-slate-700 hover:text-white text-xs font-bold rounded-xl transition duration-200 inline-flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write a Google Review</span>
          </a>
        </div>

        {/* Swipeable Carousel Review Unit */}
        <div className="relative max-w-3xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-lg relative"
            >
              <Quote className="absolute right-6 top-6 w-14 h-14 text-slate-100 pointer-events-none" />

              {/* Verified Author Row */}
              <div className="flex items-center space-x-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F4C81] to-sky-600 flex items-center justify-center text-white text-base font-extrabold font-display shadow-inner">
                  {currentReview.initials}
                </div>
                
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-none">{currentReview.name}</h4>
                    {currentReview.isVerified && (
                      <span className="inline-flex items-center space-x-0.5 bg-sky-50 text-[#0F4C81] text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-sky-100 leading-none">
                        <CheckCircle className="w-2.5 h-2.5" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">{currentReview.date}</p>
                </div>
              </div>

              {/* Stars display */}
              <div className="flex items-center space-x-0.5 mb-4">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-current" />
                ))}
              </div>

              {/* Message text description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans italic pr-2">
                "{currentReview.comment}"
              </p>

            </motion.div>
          </AnimatePresence>

          {/* Buttons Navigation circles */}
          <div className="flex items-center justify-between mt-6 px-2">
            
            {/* Dots */}
            <div className="flex space-x-1.5">
              {REVIEWS_DATA.map((rev, index) => (
                <button
                  key={rev.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    currentIndex === index ? 'w-6 bg-[#0F4C81]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Previous Next Buttons inline */}
            <div className="flex space-x-2">
              <button
                id="testimonial-btn-prev"
                onClick={prevReview}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 transition cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                id="testimonial-btn-next"
                onClick={nextReview}
                className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 active:scale-95 transition cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Google Review Highlights cards requested */}
          <div className="mt-16 border-t border-slate-200/60 pt-12">
            <h3 className="text-center text-xs font-bold font-mono tracking-widest text-[#0F4C81] uppercase mb-8">
              Google Review Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Highlight Card 1 */}
              <div className="bg-white border border-slate-200 p-6 overflow-hidden rounded-xl hover:shadow-md hover:border-sky-100 transition duration-300">
                <div className="flex items-center space-x-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-base font-bold text-slate-800 font-display">
                  "Professional service."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Verified review
                  </span>
                </div>
              </div>

              {/* Highlight Card 2 */}
              <div className="bg-white border border-slate-200 p-6 overflow-hidden rounded-xl hover:shadow-md hover:border-sky-100 transition duration-300">
                <div className="flex items-center space-x-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-base font-bold text-slate-800 font-display">
                  "Quick report delivery."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Verified review
                  </span>
                </div>
              </div>

              {/* Highlight Card 3 */}
              <div className="bg-white border border-slate-200 p-6 overflow-hidden rounded-xl hover:shadow-md hover:border-sky-100 transition duration-300">
                <div className="flex items-center space-x-0.5 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-base font-bold text-slate-800 font-display">
                  "Highly recommended."
                </p>
                <div className="mt-4 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Verified review
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
