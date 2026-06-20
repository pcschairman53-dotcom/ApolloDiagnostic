/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Phone, ExternalLink, Navigation, Compass, Bus, Train } from 'lucide-react';

export default function LocationMap() {
  const addressString = "110 Feeder Road, Belgharia, Kolkata - 700056";
  const directionUrl = "https://www.google.com/maps/dir/?api=1&destination=110+Feeder+Road+Belgharia+Kolkata+700056";
  const rawMapsUrl = "https://maps.google.com/?q=Apollo+Diagnostics+Belgharia+110+Feeder+Road+Kolkata";

  return (
    <section id="location" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1 bg-sky-50 border border-sky-100 text-[#0F4C81] px-3.5 py-1.5 rounded-full mb-3.5">
            <Compass className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase font-mono">Patient Transit Access</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-2">
            Visit Our Medical Lab In Belgharia
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            Our center is situated on the bustling Feeder Road, making it highly accessible via rail, bus, and rickshaw routes.
          </p>
        </div>

        {/* Bento Collage layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel transit indicators */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80">
            
            <div className="space-y-5">
              <h3 className="text-lg font-display font-bold text-slate-900">Diagnostic Hub Spot</h3>
              
              <div className="space-y-4">
                
                {/* Real physical address spot */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-white text-[#0F4C81] border border-slate-150 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Street Address</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">{addressString}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Feeder Road Corridor, Belgharia, Kolkata</p>
                  </div>
                </div>

                {/* Primary telephone slots */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-white text-[#0F4C81] border border-slate-150 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Direct Desk Helpdesk</h4>
                    <p className="text-sm font-semibold text-slate-800 mt-0.5">033-25649604</p>
                    <p className="text-xs text-slate-400 mt-0.5">Cellular: 9831285106 / 9239028807</p>
                  </div>
                </div>

              </div>

              {/* Local Public Transport directions */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Nearby Transit Terminals:</h4>
                
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Train className="w-4 h-4 text-[#0F4C81] shrink-0" />
                  <span>3 mins walk from <strong>Belgharia Railway Station</strong> (approx. 250m)</span>
                </div>

                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Bus className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Directly located on primary <strong>Feeder Road Bus Route</strong></span>
                </div>
              </div>
            </div>

            {/* Direct Action triggers */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
              <a
                id="location-cta-get-directions"
                href={directionUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition duration-200"
              >
                <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Get Directions</span>
              </a>

              <a
                id="location-cta-open-maps"
                href={rawMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-1 bg-white hover:bg-slate-100 border border-slate-250 text-slate-700 text-xs font-bold py-3 px-4 rounded-xl transition duration-200"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right panel actual embedded Google map */}
          <div className="lg:col-span-7 h-[360px] lg:h-auto rounded-3xl overflow-hidden border border-slate-200 relative group shadow-sm bg-slate-100">
            <iframe
              id="google-maps-embed-frame"
              title="Apollo Diagnostics Belgharia Map coordinates"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m4!2m3!1s0x39f89fbff2aaaaab:0xc76595bf7be3ea!3m2!1d22.658252!2d88.384594!5e0!3m2!1sen!2sin!4v1703215682000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[10%] group-hover:grayscale-0 transition duration-500 absolute inset-0"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
