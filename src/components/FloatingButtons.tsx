/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const [showMiniMenu, setShowMiniMenu] = useState(false);

  const handleMiniMenuAction = (action: string) => {
    setShowMiniMenu(false);
    
    // Find AI Assistant element
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    // Delay a bit to allow scroll to complete, then dispatch event
    setTimeout(() => {
      if (action === 'book') {
        window.dispatchEvent(new CustomEvent('open-ai-booking'));
      } else if (action === 'recommend') {
        window.dispatchEvent(new CustomEvent('open-ai-recommendation'));
      } else if (action === 'collection') {
        window.dispatchEvent(new CustomEvent('open-ai-home-collection'));
      } else if (action === 'reports') {
        window.dispatchEvent(new CustomEvent('open-ai-reports'));
      } else if (action === 'whatsapp') {
        window.dispatchEvent(new CustomEvent('open-ai-whatsapp'));
      }
    }, 600);
  };

  return (
    <div 
      id="floating-cta-actions"
      className="fixed bottom-6 right-5 z-40 flex flex-col space-y-3.5 items-end pointer-events-none"
    >
      
      {/* Mini Support Menu */}
      <AnimatePresence>
        {showMiniMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="pointer-events-auto flex flex-col space-y-1.5 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-2xl rounded-2xl p-3.5 w-60 z-50 mb-1 font-sans"
          >
            <div className="border-b border-slate-100 pb-1.5 mb-1.5">
              <span className="text-[10px] font-bold tracking-widest text-[#0F4C81] uppercase font-mono block">
                Concierge Support
              </span>
              <span className="text-[9px] text-slate-500 font-sans">
                Select an automated task assistant:
              </span>
            </div>
            
            <button
              onClick={() => handleMiniMenuAction('book')}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:bg-[#0F4C81]/5 p-2 rounded-xl text-left cursor-pointer transition-all"
            >
              <span>📅</span>
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => handleMiniMenuAction('recommend')}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:bg-[#0F4C81]/5 p-2 rounded-xl text-left cursor-pointer transition-all"
            >
              <span>🩸</span>
              <span>Test Recommendation</span>
            </button>
            <button
              onClick={() => handleMiniMenuAction('collection')}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:bg-[#0F4C81]/5 p-2 rounded-xl text-left cursor-pointer transition-all"
            >
              <span>🏠</span>
              <span>Home Collection</span>
            </button>
            <button
              onClick={() => handleMiniMenuAction('reports')}
              className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:bg-[#0F4C81]/5 p-2 rounded-xl text-left cursor-pointer transition-all"
            >
              <span>📄</span>
              <span>Reports</span>
            </button>
            <button
              onClick={() => handleMiniMenuAction('whatsapp')}
              className="flex items-center space-x-2 text-xs font-bold text-emerald-800 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-100/60 p-2 rounded-xl text-left cursor-pointer transition-all"
            >
              <span>💬</span>
              <span>WhatsApp Support</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Verified WhatsApp Direct FAB */}
      <button
        id="fab-whatsapp"
        onClick={() => setShowMiniMenu(!showMiniMenu)}
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer"
        title="WhatsApp Support Desk"
      >
        <MessageSquare className="w-5.5 h-5.5 fill-current" />
      </button>

      {/* 2. Direct Mobile Dial FAB */}
      <a
        id="fab-phone"
        href="tel:9831285106"
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white shadow-xl hover:scale-110 active:scale-95 transition-all outline-none focus:ring-2 focus:ring-sky-500/50"
        title="Dial Helpline Now"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>

      {/* 3. Scroll to Top Trigger (AnimatePresence) */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            id="fab-scroll-to-top"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.82 }}
            onClick={scrollToTop}
            className="pointer-events-auto flex items-center justify-center w-10.5 h-10.5 rounded-xl bg-slate-900/90 text-white shadow-lg sm:hover:bg-slate-900 active:scale-95 cursor-pointer transition-all border border-white/10"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4.5 h-4.5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
