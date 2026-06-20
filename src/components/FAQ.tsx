/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: 'Do you provide home collection services in Belgharia?',
      answer: 'Yes! We provide complimentary professional home sample collection services across Belgharia and surrounding neighborhoods. Our fully trained, certified phlebotomists follow rigorous safety and sterile packing protocols.'
    },
    {
      question: 'What are your operational timings?',
      answer: 'Our laboratory and customer helpdesk are fully active from Monday to Sunday: 7:00 AM to 8:30 PM. Home sample collections can be pre-booked starting from 6:30 AM onwards for fasting-appropriate measurements.'
    },
    {
      question: 'How long does digital report delivery take?',
      answer: 'For standard tests (such as CBC, Thyroid Profile, HbA1c, and Liver screening), verified digital reports are securely compiled and shared on your WhatsApp & Email within 12 to 24 hours. Specialized packages may take up to 24-48 hours.'
    },
    {
      question: 'How can I book a diagnostic test?',
      answer: 'Booking is extremely simple! You can arrange your session by filling out our Quick Booking Form above, clicking any "WhatsApp Us" button, or calling our helpline directly at 9831285106. Our diagnostics booking support is available to assist instantly.'
    },
    {
      question: 'Is fasting required for my diagnostic tests?',
      answer: 'Fasting requirements depend entirely on the specified diagnostic test. Standard lipid portfolios, fasting sugar tests, and broad metabolic assessments typically require an overnight fast of 10-12 hours during which only water is permitted. Please verify with our support desk during confirmation.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#0F4C81]" />
            <span className="text-[10px] font-bold text-[#0F4C81] uppercase tracking-widest font-mono">
              Apollo Helpdesk Accordion Answers
            </span>
          </div>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-2 font-sans">
            Got questions? We have answers. If you need any assistance, reach out directly.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#0F4C81] bg-sky-50/15 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-[#0F4C81] transition-colors focus:outline-none"
                >
                  <span className="text-base sm:text-lg pr-4 font-display font-bold leading-tight">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0F4C81] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {/* Animated expand/collapse slide */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-56 opacity-100 border-t border-dashed border-slate-200/60' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-5 text-[#526071] text-sm leading-relaxed font-sans bg-white/70">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
