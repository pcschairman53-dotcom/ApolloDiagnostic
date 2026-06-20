/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  Cpu, 
  Users, 
  Percent, 
  Clock, 
  Heart,
  ShieldCheck,
  ClipboardCheck,
  Check
} from 'lucide-react';
import { TRUST_CARDS } from '../data';

// Map icon string names to actual Lucide components safely
const IconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'CheckCircle': return <CheckCircle className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Percent': return <Percent className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Heart': return <Heart className={className} />;
    default: return <CheckCircle className={className} />;
  }
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-white relative overflow-hidden">
      
      {/* Visual blueprint accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-sky-50 rounded-full blur-3xl -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-50/40 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center space-x-1 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full mb-3 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold tracking-widest uppercase font-mono">Verified Quality Center</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Clinical Precision Built On Years Of Shared Patient Trust
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              As an authorized partner of Apollo Diagnostics in Belgharia, Kolkata, we combine advanced global technologies with personalized local lab care.
            </p>
          </div>
        </div>

        {/* 6 Trust Cards Grid */}
        <div className="grid gap-6.5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {TRUST_CARDS.map((card, index) => (
            <div
              key={card.id}
              id={`trust-card-${card.id}`}
              className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-[#0F4C81]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle background highlight on hover */}
              <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#0F4C81] to-teal-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              {/* Icon Container */}
              <div className="p-3 w-max rounded-xl bg-slate-50 text-slate-600 group-hover:bg-sky-50 group-hover:text-[#0F4C81] transition-all duration-300 mb-5">
                <IconResolver name={card.icon} className="w-6 h-6" />
              </div>

              {/* Title & Info */}
              <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 mb-2 group-hover:text-[#0F4C81] transition-colors">
                {card.title}
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Medical Accreditation Strip representing corporate-grade high trust */}
        <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-[#0F4C81]/10 flex items-center justify-center text-[#0F4C81] shrink-0">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">ISO 9001:2015 Cert</p>
              <p className="text-[10px] font-medium text-slate-400">Strict Quality Assurance</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Dual pathological sign-off</p>
              <p className="text-[10px] font-medium text-slate-400">Certified MD Physicians</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">100% Barcoded samples</p>
              <p className="text-[10px] font-medium text-slate-400">Barcode zero-leakage tech</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">SMS / WA Report Link</p>
              <p className="text-[10px] font-medium text-slate-400">Instant direct cloud download</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
