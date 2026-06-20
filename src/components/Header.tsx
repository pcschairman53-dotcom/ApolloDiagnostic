/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'Services', section: 'services' },
    { label: 'Book Test', section: 'book-test' },
    { label: 'Why Us', section: 'why-us' },
    { label: 'AI Clinician', section: 'ai-assistant' },
    { label: 'Location', section: 'location' },
    { label: 'Testimonials', section: 'testimonials' }
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-sky-100' 
          : 'bg-white py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand with Official Identity Representation */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            className="flex items-center space-x-2.5 group"
            id="header-brand-logo"
          >
            <BrandLogo showText={false} size="custom" className="w-11 h-11" />
            <div>
              <div className="flex items-center">
                <span className="font-display font-extrabold text-[15px] sm:text-base text-[#0F4C81] tracking-tight group-hover:text-amber-500 transition-colors">
                  APOLLO DIAGNOSTICS
                </span>
                <span className="ml-1 text-[10px] font-bold text-amber-500 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded-full uppercase leading-none hidden xs:inline-block">
                  Belgharia
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wide text-gray-500 uppercase">
                ISO Certified Diagnostic Care
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.section}
                id={`nav-link-${item.section}`}
                onClick={() => scrollToSection(item.section)}
                className="text-sm font-semibold text-slate-700 hover:text-[#0F4C81] cursor-pointer transition-colors py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F59E0B] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Call / WhatsApp CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              id="header-cta-phone"
              href="tel:03325649604"
              className="flex items-center space-x-1.5 text-xs font-bold text-[#0F4C81] border border-[#0F4C81]/20 hover:border-[#0F4C81] bg-sky-50/50 hover:bg-sky-50 px-3 py-2 rounded-lg transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>033-25649604</span>
            </a>
            
            <a
              id="header-cta-wa"
              href="https://wa.me/919831285106"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded-lg shadow-sm shadow-[#16A34A]/20 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
            
            <a
              id="header-cta-book-direct"
              href="#book-test"
              onClick={(e) => { e.preventDefault(); scrollToSection('book-test'); }}
              className="flex items-center space-x-1 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0F4C81]/90 px-3.5 py-2 rounded-lg cursor-pointer hover:shadow-md transition-all group"
            >
              <span>Book Appointment</span>
              <ArrowUpRight className="w-3 h-3 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburguer Trigger */}
          <div className="flex items-center lg:hidden space-x-2">
            <a 
              href="tel:9831285106"
              className="flex items-center justify-center p-2 rounded-lg bg-sky-50 border border-sky-100 text-[#0F4C81]"
              title="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 bg-slate-50 border border-slate-100 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-slate-100 absolute top-full left-0 right-0 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3.5">
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.section}
                    id={`mobile-nav-link-${item.section}`}
                    onClick={() => scrollToSection(item.section)}
                    className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#0F4C81] hover:bg-slate-50 transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="h-[1px] bg-slate-100 my-2"></div>

              {/* Mobile CTA Dials */}
              <div className="flex flex-col space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    id="mobile-cta-wa"
                    href="https://wa.me/919831285106"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 py-3 rounded-lg text-center"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>WhatsApp Desk</span>
                  </a>
                  
                  <a
                    id="mobile-cta-call"
                    href="tel:9831285106"
                    className="flex items-center justify-center space-x-2 text-xs font-bold text-white bg-[#0F4C81] hover:bg-[#0F4C81]/90 py-3 rounded-lg text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Helpline</span>
                  </a>
                </div>
                
                <a
                  id="mobile-cta-email"
                  href="mailto:apollo_diag@yahoo.in"
                  className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-3 rounded-lg text-center"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>apollo_diag@yahoo.in</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
