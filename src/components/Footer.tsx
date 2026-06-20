/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // JSON-LD Local Business and Medical Business SEO Schema
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://apollodiagnosticsbelgharia.in/#medicalbusiness",
        "name": "Apollo Diagnostics Belgharia",
        "alternateName": "Apollo Diagnostics Kolkata Belgharia Center",
        "description": "ISO Certified Premium Diagnostics Center in Belgharia, Kolkata. Specialized pathology, routine diagnostics, blood tests, digital radiology scans with free home collection.",
        "url": "https://apollodiagnosticsbelgharia.in",
        "logo": "https://apollodiagnosticsbelgharia.in/logo.png",
        "telephone": "033-25649604",
        "email": "apollo_diag@yahoo.in",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "110 Feeder Road, Belgharia",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "postalCode": "700056",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "22.658252",
          "longitude": "88.384594"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "21:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "08:00",
            "closes": "12:00"
          }
        ],
        "sameAs": [
          "https://share.google/2sepdjYGdlFbzFcl2"
        ]
      },
      {
        "@type": "DiagnosticLab",
        "name": "Apollo Diagnostics Belgharia",
        "description": "NABL aligned diagnostic pathology testing center for complete health evaluations."
      }
    ]
  };

  const menuItems = [
    { label: 'Services Catalogue', section: 'services' },
    { label: 'Register Appointment', section: 'book-test' },
    { label: 'Why Apollo Diagnostics', section: 'why-us' },
    { label: 'Simulated Clinician Bot', section: 'ai-assistant' },
    { label: 'Our Clinic Location', section: 'location' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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
    <footer id="footer" className="bg-slate-900 text-slate-350 pt-16 pb-8 relative border-t-2 border-[#0F4C81]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* Injecting valid JSON-LD schemas directly into React tree */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Identity column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-lg overflow-hidden border border-white/10 text-white font-sans font-bold text-xs">
                <span>AD</span>
              </div>
              <div>
                <h3 className="text-white font-display font-extrabold text-sm tracking-wide">
                  APOLLO DIAGNOSTICS
                </h3>
                <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider uppercase font-mono">Belgharia Center</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Authorized Diagnostics franchise. Delivering premium pathology and diagnostics care using advanced double-checked automation systems.
            </p>

            <div className="flex space-x-3 text-xs pt-1.5">
              <a 
                id="footer-gprofile-link"
                href="https://share.google/2sepdjYGdlFbzFcl2" 
                target="_blank" 
                rel="noreferrer"
                className="text-amber-500 hover:underline flex items-center space-x-1"
              >
                <span>Google Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick shortcuts */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              Navigation Index
            </h4>
            
            <ul className="space-y-2.5 text-xs">
              {menuItems.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => scrollToSection(item.section)}
                    className="hover:text-white transition-colors cursor-pointer text-left block"
                  >
                    â€¢ {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours info */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              Operational Hours
            </h4>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-200">Monday - Saturday</p>
                  <p className="text-[11px] text-slate-400">8:00 AM - 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-200">Sunday Timeline</p>
                  <p className="text-[11px] text-slate-400">8:00 AM - 12:00 PM (Noon)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Contacts */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-mono font-bold uppercase tracking-widest text-slate-200">
              Helpdesk Contact
            </h4>

            <div className="space-y-3 font-sans text-xs">
              
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">110 Feeder Road, Belgharia, Kolkata - 700056</span>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="tel:03325649604" className="hover:text-white block">033-25649604</a>
                  <a href="tel:9831285106" className="hover:text-white block">9831285106</a>
                  <a href="tel:9239028807" className="hover:text-white block">9239028807</a>
                </div>
              </div>

              <div className="flex items-start space-x-2.5 font-mono text-[11px]">
                <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <a href="mailto:apollo_diag@yahoo.in" className="hover:text-white block">apollo_diag@yahoo.in</a>
              </div>

            </div>
          </div>

        </div>

        {/* Legal Disclaimer Strip */}
        <div className="pt-8 mt-8 border-t border-slate-800 text-[11px] text-slate-500 font-sans flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {currentYear} Apollo Diagnostics Belgharia Franchise and its respective affiliates. All Rights Reserved.
          </p>
          
          <div className="flex items-center space-x-1">
            <span>Engineered with clinical precision</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>in Belgharia, West Bengal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
