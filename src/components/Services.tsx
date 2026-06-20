/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, 
  Microscope, 
  Activity, 
  Sparkles, 
  HeartPulse, 
  Bone, 
  Waves, 
  ShieldAlert, 
  Home, 
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';

// Map icon string names to actual Lucide components safely
const IconResolver = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'Droplet': return <Droplet className={className} />;
    case 'Microscope': return <Microscope className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Bone': return <Bone className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Home': return <Home className={className} />;
    default: return <Droplet className={className} />;
  }
};

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Routine Diagnostics', 'Wellness Packages', 'Pathology', 'Radiology', 'Imaging'];

  const filteredServices = selectedCategory === 'All' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(service => 
        service.category.toLowerCase().includes(selectedCategory.split(' ')[0].toLowerCase()) ||
        (selectedCategory === 'Radiology' && service.id === 'x-ray') ||
        (selectedCategory === 'Imaging' && service.id === 'ultrasound')
      );

  const handleBookTest = (testTitle: string) => {
    // Fill the dropdown in LeadForm and scroll to it
    const dropdown = document.getElementById('lead-test-dropdown') as HTMLSelectElement;
    if (dropdown) {
      dropdown.value = testTitle;
      // trigger event so react state gets notified
      const event = new Event('change', { bubbles: true });
      dropdown.dispatchEvent(event);
    }

    const formElement = document.getElementById('book-test');
    if (formElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = formElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/50 relative">
      <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none top-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 bg-[#0F4C81]/10 text-[#0F4C81] px-3.5 py-1.5 rounded-full mb-3.5">
            <Sparkle className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-bold tracking-widest uppercase font-mono">Premium Clinical Catalog</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Our Professional Diagnostics Catalog
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            Fully certified, double-checked health evaluations. Filter by testing class to browse our primary diagnostic catalog. Book a phlebotomist callback instantly.
          </p>
        </div>

        {/* Dashboard-style Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F4C81] border-[#0F4C81] text-white shadow-md shadow-sky-900/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-[#0F4C81] hover:border-[#0F4C81]/30 hover:bg-sky-50/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Service Bento Cards Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {filteredServices.map((service, index) => {
            const isHighlight = service.popular;
            
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`flex flex-col justify-between p-6 rounded-2xl bg-white border cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  isHighlight 
                    ? 'border-[#0F4C81]/20 shadow-sm hover:shadow-xl hover:border-[#0F4C81]/40' 
                    : 'border-slate-200 hover:border-[#0F4C81]/30 shadow-xs hover:shadow-lg'
                }`}
              >
                {/* Visual Popular Accent Ribbon */}
                {isHighlight && (
                  <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[9px] font-mono font-extrabold uppercase px-3 py-1 rounded-bl-xl tracking-tight">
                    Frequently Booked
                  </div>
                )}

                {/* Card Header Info */}
                <div>
                  
                  {/* Icon and Category Box */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      isHighlight ? 'bg-sky-50 text-[#0F4C81]' : 'bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-[#0F4C81]'
                    } transition-colors`}>
                      <IconResolver name={service.iconName} className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md uppercase">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-[#0F4C81] transition-colors mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Footer details + Auto Book Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">Tariff Charge</p>
                    <p className="text-sm font-extrabold text-slate-800 font-sans">{service.price}</p>
                  </div>

                  <button
                    id={`btn-service-book-${service.id}`}
                    onClick={() => handleBookTest(service.title)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-[#0F4C81] hover:text-amber-500 transition-colors group/btn"
                  >
                    <span>Instant Book</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            )
          })}
        </div>

        {/* Support hotline disclaimer */}
        <div className="mt-14 bg-white border border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs">
          <div className="flex items-start md:items-center space-x-4">
            <div className="bg-amber-50 text-[#F59E0B] p-2.5 rounded-xl shrink-0 mt-1 md:mt-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Need customized clinical profiles or bulk diagnostic quotes?</h4>
              <p className="text-xs text-slate-500 mt-0.5">We help with customized corporate packages, executive packages, and group discounts in Belgharia.</p>
            </div>
          </div>
          
          <button
            id="services-consult-cta"
            onClick={() => handleBookTest('Custom Pathology Consultation')}
            className="w-full md:w-auto shrink-0 bg-slate-900 hover:bg-[#0F4C81] text-white text-xs font-bold px-4.5 py-2.5 rounded-xl text-center cursor-pointer transition-colors"
          >
            Request Free Callback
          </button>
        </div>

      </div>
    </section>
  );
}
