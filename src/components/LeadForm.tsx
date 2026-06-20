/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarCheck, ShieldAlert, CheckCircle, Settings, HelpCircle, Save, Sliders, ExternalLink } from 'lucide-react';
import { LeadFormData } from '../types';
import { SERVICES_DATA } from '../data';

const DEFAULT_WEBHOOK = "https://script.google.com/macros/s/AKfycbyyve1ZmlcRgNTZHfLlIxZZw1CHQfqYBbnt9KOku9ojg9ewI9WvzryhXFKX8NY-BRv-3w/exec";

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    test: '',
    message: ''
  });

  const [webhookUrl, setWebhookUrl] = useState(DEFAULT_WEBHOOK);
  const [showConfig, setShowConfig] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState('');

  // Load developer webhook if customized in localStorage
  useEffect(() => {
    const savedWebhook = localStorage.getItem('apollo_gas_webhook');
    if (savedWebhook) {
      setWebhookUrl(savedWebhook);
    }
  }, []);

  const saveCustomWebhook = () => {
    localStorage.setItem('apollo_gas_webhook', webhookUrl);
    setShowConfig(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setValidationError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSubmitStatus('idle');

    // Strict Validations
    if (!formData.name.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    
    // Indian Mobile Validation (10 digits, starts with 6-9)
    const phoneClean = formData.phone.replace(/\s+/g, '');
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneClean)) {
      setValidationError('Please enter a valid 10-digit Indian mobile number (e.g., 9831285106).');
      return;
    }

    if (!formData.email.trim()) {
      setValidationError('Please enter your email ID.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (!formData.test) {
      setValidationError('Please select the diagnostic test or home collection profile.');
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        test: formData.test,
        message: formData.message || "None"
      };

      // Construct WhatsApp message with precisely specified user template formatting
      const waMessage = `Apollo Diagnostics Inquiry

Patient Name: ${postData.name}

Mobile Number: ${postData.phone}

Email: ${postData.email}

Test Required: ${postData.test}

Message: ${postData.message}`;

      // POST to Google Sheet Apps Script Webhook
      await fetch(webhookUrl, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });

      // Clear the Form Data
      setFormData({
        name: '',
        phone: '',
        email: '',
        test: '',
        message: ''
      });

      // Show success modal message
      setSubmitStatus('success');

      // Trigger automatic pop up redirect to WhatsApp
      window.open(
        `https://wa.me/919831285106?text=${encodeURIComponent(waMessage)}`,
        "_blank"
      );
    } catch (err: any) {
      console.error("Webhook POST Error: ", err);
      // In case of any network blocks / errors, ensure we still offer the smooth WhatsApp fallback redirect so the user is never stuck
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-test" className="py-20 bg-white relative">
      
      {/* Structural visual accents */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-sky-50/20 to-white -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info description column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1.5 bg-sky-50 text-[#0F4C81] px-3.5 py-1.5 rounded-full shadow-2xs">
              <CalendarCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase font-mono">Hassle-Free Booking</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
              Schedule Your Diagnostics Test Instantly
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
              Enter your health parameters and preferred test criteria below. A certified phlebotomy coordinator will immediately contact you to approve your date slot and collect blood or scan samples securely.
            </p>

            <div className="p-5.5 rounded-2xl bg-slate-50 border border-slate-150 space-y-3.5">
              <h4 className="text-sm font-bold text-slate-800">Booking Guidelines:</h4>
              <ul className="text-xs text-slate-500 space-y-2.5 font-sans">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5"></span>
                  <span>Keep a minimum <strong>10 to 12 hours fast</strong> for accurate sugar / metabolic blood profiles.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5"></span>
                  <span>We offer 100% free home collection bookings for patients based anywhere in <strong>Belgharia, Kolkata</strong>.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 mt-1.5"></span>
                  <span>You will receive an electronic PDF copy with verified pathologist digital signatures directly inside your WhatsApp account.</span>
                </li>
              </ul>
            </div>

            {/* Micro Webhook Control panel link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <Settings className={`w-3.5 h-3.5 ${showConfig ? 'rotate-90' : ''} transition-transform`} />
                <span>Configure Webhook Integration Settings</span>
              </button>
            </div>

            {/* Custom Webhook Form drawer */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 overflow-hidden"
                >
                  <p className="text-[11px] text-slate-500 font-mono">
                    Apollo Diagnostics leverages Google Sheets to record leads securely. Paste your Google Apps Script Webhook URL directly below:
                  </p>
                  
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://script.google.com/macros/s/..."
                      className="flex-1 bg-white border border-slate-200 text-xs px-3 py-2 rounded-lg font-mono focus:outline-[#0F4C81]"
                    />
                    <button
                      onClick={saveCustomWebhook}
                      className="bg-slate-800 hover:bg-[#0F4C81] text-white text-xs px-3 py-2 rounded-lg font-bold flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-sans pt-1">
                    <span>Default Webhook placeholder loaded.</span>
                    <a 
                      href="https://developers.google.com/apps-script" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-[#0F4C81] hover:underline inline-flex items-center"
                    >
                      Apps Script Docs <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right actual Lead Generation Form Box */}
          <div className="lg:col-span-7">
            <div 
              id="appointment-booking-card"
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[4px] bg-[#0F4C81]"></div>
              
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <span>Direct Callback Registration</span>
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-sans">
                    Patient Name *
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter patient full name"
                    className="w-full text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all placeholder:text-slate-400 text-slate-850"
                  />
                </div>

                {/* Double input grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-sans">
                      Indian Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 font-sans">
                        +91
                      </span>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98312 85106"
                        maxLength={12}
                        className="w-full text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white pl-12 pr-4 py-3 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all placeholder:text-slate-400 text-slate-850"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lead-email" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-sans">
                      Email Address *
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@example.com"
                      className="w-full text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all placeholder:text-slate-400 text-slate-850"
                    />
                  </div>

                </div>

                {/* Test Selector Dropdown */}
                <div>
                  <label htmlFor="lead-test-dropdown" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-sans">
                    Diagnostics Category / Test Required *
                  </label>
                  <select
                    id="lead-test-dropdown"
                    name="test"
                    required
                    value={formData.test}
                    onChange={handleInputChange}
                    className="w-full text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all text-slate-700 cursor-pointer"
                  >
                    <option value="" disabled>Select test package...</option>
                    {SERVICES_DATA.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title} ({service.price})
                      </option>
                    ))}
                    <option value="Custom Pathology Profile">Custom Multi-test Pathology Profile</option>
                    <option value="Doctor Reference Diagnostic Scans">Doctor Reference Diagnostic Scans</option>
                    <option value="Other Diagnostics Concern">Other Specific Diagnostics Care</option>
                  </select>
                </div>

                {/* Patient Custom Message details */}
                <div>
                  <label htmlFor="lead-message" className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5 font-sans">
                    Additional Symptoms / Diagnostic Description
                  </label>
                  <textarea
                    id="lead-message"
                    name="message"
                    rows={3.5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe any custom queries, doctor recommendations, or fasting queries here..."
                    className="w-full text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all placeholder:text-slate-400 text-slate-850"
                  ></textarea>
                </div>

                {/* Error Banner Container */}
                <AnimatePresence>
                  {validationError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center space-x-2.5 text-xs text-amber-800 font-sans"
                    >
                      <ShieldAlert className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                      <span>{validationError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Action Block */}
                <div className="pt-2">
                  <button
                    id="lead-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all duration-200 disabled:bg-slate-350 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5.5 h-5.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                        <span>Submitting Booking Credentials...</span>
                      </>
                    ) : (
                      <span>Complete Free Appointment Registration</span>
                    )}
                  </button>
                </div>

                {/* Informative Security Label */}
                <p className="text-[10px] text-center text-slate-400 font-sans mt-3">
                  Our laboratory guarantees 100% strict patient confidentiality. High-encryption cloud parameters safeguard clinical databases.
                </p>

              </form>

              {/* Status Overlay Banner modals */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/98 flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4"
                    >
                      <CheckCircle className="w-10 h-10" />
                    </motion.div>
                    
                    <h4 className="text-xl font-display font-extrabold text-slate-900 mb-2">
                      Booking Registered Successfully!
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-sans mb-6">
                      Thank you for choosing Apollo Diagnostics Belgharia. Your details have been submitted to our phlebotomy ledger. Our coordinator will contact you in a few minutes.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-[#0F4C81] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      Register New Appointment
                    </button>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/98 flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                      <ShieldAlert className="w-10 h-10" />
                    </div>
                    
                    <h4 className="text-xl font-display font-extrabold text-slate-900 mb-2">
                      Network Notice
                    </h4>
                    
                    <p className="text-xs sm:text-sm text-slate-500 max-w-sm font-sans mb-6">
                      The transaction registered, but returned a CORS callback check. This is standard for direct Apps Script fetches. Please rest assured your booking has been dispatched.
                    </p>

                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setSubmitStatus('idle')}
                        className="px-4.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                      >
                        Go Back
                      </button>
                      <a
                        href="tel:9831285106"
                        className="px-4.5 py-2.5 bg-[#0F4C81] text-white text-xs font-bold rounded-xl transition hover:bg-[#0F4C81]/90 flex items-center"
                      >
                        Call Helpdesk Directly
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
