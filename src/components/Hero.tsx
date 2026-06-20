/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MessageSquare, Phone, Calendar, Star, Users, Award, Clock } from 'lucide-react';

export default function Hero() {
  const [patientsCount, setPatientsCount] = useState(9000);
  const [reviewsCount, setReviewsCount] = useState(150);

  // Smooth counter effect for realistic live SaaS dashboard feel
  useEffect(() => {
    const patientTimer = setInterval(() => {
      setPatientsCount((prev) => {
        if (prev >= 10000) {
          clearInterval(patientTimer);
          return 10000;
        }
        return prev + 85;
      });
    }, 15);

    const reviewTimer = setInterval(() => {
      setReviewsCount((prev) => {
        if (prev >= 220) {
          clearInterval(reviewTimer);
          return 220;
        }
        return prev + 3;
      });
    }, 25);

    return () => {
      clearInterval(patientTimer);
      clearInterval(reviewTimer);
    };
  }, []);

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('book-test');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-sky-50 via-white to-slate-50 overflow-hidden"
    >
      {/* Decorative Grid Line Accents for premium SaaS blueprint design */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f4c810d_1px,transparent_1px),linear-gradient(to_bottom,#0f4c810d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Trust Banner Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-sky-100/70 border border-sky-200 px-3.5 py-1.5 rounded-full w-fit mx-auto"
          >
            <ShieldCheck className="w-4 h-4 text-[#0F4C81]" />
            <span className="text-xs font-bold text-[#0F4C81] tracking-wide uppercase font-mono">
              ISO 9001:2015 ACCREDITED LAB PROCESSES
            </span>
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight text-center"
          >
            Trusted Diagnostic Care <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#0F4C81] to-[#16A34A] bg-clip-text text-transparent">
              For Your Entire Family
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans text-center"
          >
            Experience top-tier testing accuracy and swift reports at <strong className="text-slate-800">Apollo Diagnostics Belgharia</strong>. Fully automated clinical hardware, verified phlebotomists, and direct digital report delivery.
          </motion.p>

          {/* Direct High-converting CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:items-center justify-center pt-2 w-full max-w-xl mx-auto"
          >
            <a
              id="hero-cta-book-appointment"
              href="#book-test"
              onClick={handleBookClick}
              className="flex items-center justify-center space-x-2 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold py-3.5 px-6 rounded-xl hover:shadow-lg transition-all duration-250 cursor-pointer active:scale-[0.98] w-full sm:w-auto"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Sample Collection</span>
            </a>

            <a
              id="hero-cta-call"
              href="tel:9831285106"
              className="flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-xl transition-all w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 text-[#0F4C81]" />
              <span>Call Helpdesk</span>
            </a>

            <a
              id="hero-cta-whatsapp"
              href="https://wa.me/919831285106"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-xl hover:shadow-sm transition-all w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </motion.div>

          {/* Verification highlights with direct visual icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 mt-6 border-t border-slate-200/80 w-full"
          >
            <div className="flex items-start space-x-2 justify-center sm:justify-start">
              <div className="bg-amber-100 p-1.5 rounded-lg text-[#F59E0B] shrink-0 mt-0.5">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">4.8+ Stars</h4>
                <p className="text-[11px] font-medium text-slate-500 font-sans">{reviewsCount}+ Google Reviews</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 justify-center sm:justify-start">
              <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-600 shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">{patientsCount.toLocaleString()}+</h4>
                <p className="text-[11px] font-medium text-slate-500 font-sans">Tested Patients</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 justify-center sm:justify-start">
              <div className="bg-sky-100 p-1.5 rounded-lg text-[#0F4C81] shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">10+ Years</h4>
                <p className="text-[11px] font-medium text-slate-500 font-sans">Lab Excellence</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 justify-center sm:justify-start">
              <div className="bg-cyan-100 p-1.5 rounded-lg text-cyan-600 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-slate-800">12-24 Hours</h4>
                <p className="text-[11px] font-medium text-slate-500 font-sans">Swift Delivery</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
