/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustCounters from '../components/TrustCounters';
import Services from '../components/Services';
import PopularTests from '../components/PopularTests';
import WhyChooseUs from '../components/WhyChooseUs';
import HomeCollectionBanner from '../components/HomeCollectionBanner';
import AIHealthAssistant from '../components/AIHealthAssistant';
import LeadForm from '../components/LeadForm';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import LocationMap from '../components/LocationMap';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';

export default function Home() {
  
  // Custom SEO Meta optimization triggers on mount
  useEffect(() => {
    document.title = "Apollo Diagnostics Belgharia | ISO Certified Diagnostics & Pathology Lab";
    
    // Manage meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Apollo Diagnostics Belgharia - Kolkata (Kolkata - 700056). Book blood tests, lipid thyroid pathology, diabetes profiles, ECG radiology with FREE home sample collection.');

    // Configure main viewport title
    const mainTitle = document.getElementById('header-brand-logo');
    if (mainTitle) {
      mainTitle.focus();
    }
  }, []);

  return (
    <div id="apollo-diagnostics-applet" className="min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-[#0F4C81]/20 selection:text-[#0F4C81]">
      
      {/* 1. Header Navigation */}
      <Header />

      {/* Main Sections flow */}
      <main className="relative">
        
        {/* 2. Hero Interactive Stage */}
        <Hero />

        {/* trust indicators / counters requested */}
        <TrustCounters />

        {/* 3. Specialized Service Lists */}
        <Services />

        {/* popular tests list requested */}
        <PopularTests />

        {/* 4. Why Apollo diagnostics pillars */}
        <WhyChooseUs />

        {/* Home collection call-to-action banner requested */}
        <HomeCollectionBanner />

        {/* 5. Google apps script appointment scheduler */}
        <LeadForm />

        {/* 6. AI virtual clinic concierge */}
        <AIHealthAssistant />

        {/* 7. Public reviews testimonials */}
        <Testimonials />

        {/* FAQ list requested */}
        <FAQ />

        {/* 8. Clinic geographic contact and mapping */}
        <LocationMap />

      </main>

      {/* 9. Footers (includes ld-json schemas) */}
      <Footer />

      {/* 10. Sticky call to actions */}
      <FloatingButtons />

    </div>
  );
}
