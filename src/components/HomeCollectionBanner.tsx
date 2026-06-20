/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MessageSquare, Truck, ShieldCheck } from 'lucide-react';

export default function HomeCollectionBanner() {
  return (
    <section className="relative overflow-hidden py-10 bg-slate-900 text-white">
      {/* Visual background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,163,74,0.15),transparent_40%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(15,76,129,0.25),transparent_40%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-r from-[#0F4C81] to-teal-800 rounded-2xl p-8 sm:p-12 shadow-xl border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="bg-white/10 p-4 rounded-xl shrink-0 backdrop-blur-md border border-white/20">
              <Truck className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full mb-2">
                🏠 ZERO COLLECTION CHARGES
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                Free Home Sample Collection Available
              </h2>
              <p className="text-sky-100 text-sm sm:text-base mt-2 max-w-xl font-sans">
                Avoid clinic queues. Our certified, fully vaccinated phlebotomists will arrive at your doorstep in Belgharia for flawless, sterile testing.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0 justify-end">
            <a
              id="banner-cta-phone"
              href="tel:9831285106"
              className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-900 font-bold py-3.5 px-6 rounded-xl transition duration-200 active:scale-95 shadow-lg w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#0F4C81]" />
              <div className="text-left">
                <span className="block text-[10px] uppercase text-slate-500 font-medium">Click to Call</span>
                <span className="block text-sm font-bold">98312 85106</span>
              </div>
            </a>

            <a
              id="banner-cta-whatsapp"
              href="https://wa.me/919831285106"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition duration-200 active:scale-95 w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <div className="text-left">
                <span className="block text-[10px] uppercase text-emerald-200 font-medium font-mono">Chat on WhatsApp</span>
                <span className="block text-sm font-bold">Inquire & Book</span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
