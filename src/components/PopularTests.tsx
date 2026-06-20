/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Navigation } from 'lucide-react';

interface TestCard {
  name: string;
  description: string;
  parameters: string[];
  price: string;
  originalPrice: string;
  time: string;
  recommendedFor: string;
  tag?: string;
}

export default function PopularTests() {
  const tests: TestCard[] = [
    {
      name: 'Complete Blood Count (CBC)',
      description: 'Comprehensive blood cell count mapping crucial baseline parameters for infections, anemia & immunity wellness.',
      parameters: ['Hemoglobin', 'WBC Count', 'Platelets', 'RBC Indices'],
      price: '₹299',
      originalPrice: '₹399',
      time: 'Report in 12 Hrs',
      recommendedFor: 'Routine general assessment',
      tag: 'Best Seller'
    },
    {
      name: 'Thyroid Profile (Total T3, T4, TSH)',
      description: 'Gold-standard screening measuring essential thyroid hormone levels crucial for metabolism & energy control.',
      parameters: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'TSH Ultra-sensitive'],
      price: '₹349',
      originalPrice: '₹590',
      time: 'Report in 12 Hrs',
      recommendedFor: 'Weight change & fatigue monitor'
    },
    {
      name: 'Diabetes Wellness (HbA1c)',
      description: 'Accurate sugar screening reporting average glucose levels for the previous 3 months to monitor prediabetes.',
      parameters: ['HbA1c Level', 'Estimated Avg Glucose (eAG)'],
      price: '₹299',
      originalPrice: '₹450',
      time: 'Report in 12 Hrs',
      recommendedFor: 'Blood glucose monitoring',
      tag: 'Essential'
    },
    {
      name: 'Lipid Profile (Cholesterol Panel)',
      description: 'A critical cardiac defense test determining complete blood lipid components & cardiovascular risks indices.',
      parameters: ['Total Cholesterol', 'HDL & LDL Cholesterol', 'Triglycerides', 'VLDL'],
      price: '₹399',
      originalPrice: '₹600',
      time: 'Report in 12 Hrs',
      recommendedFor: 'Cardiac fitness overview'
    },
    {
      name: 'Vitamin D (25-Hydroxy)',
      description: 'High-precision test monitoring bone defense, calcium absorption & biological immunity markers.',
      parameters: ['Vitamin D Total (25-Hydroxy)'],
      price: '₹1,199',
      originalPrice: '₹1,800',
      time: 'Report in 24 Hrs',
      recommendedFor: 'Joint aches & immunity defense'
    },
    {
      name: 'Apollo Executive Health Checkup',
      description: 'Master full-body automated profile assessing total metabolic system integrity, liver/kidney filters & lipid systems.',
      parameters: ['CBC & Hemogram', 'Lipid Profile', 'Sugar fasting', 'Liver Function', 'Kidney Screening'],
      price: '₹1,499',
      originalPrice: '₹2,999',
      time: 'Report in 24 Hrs',
      recommendedFor: 'Annual health status mapping',
      tag: 'Super Value'
    }
  ];

  const handleBookClick = () => {
    const el = document.getElementById('book-test');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="popular-tests" className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest font-mono">
              High Accuracy Diagnostic Tech
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Popular Lab Tests in Belgharia
          </h2>
          <p className="text-slate-600 mt-3 sm:text-lg font-sans">
            Choose from our top selected high-precision diagnostic tests with home sample collection options.
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {tests.map((test, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-lg hover:border-sky-200 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Card Badge Tag */}
              {test.tag && (
                <div className="absolute top-3 right-3 bg-[#0F4C81] text-white text-[10px] font-bold uppercase py-1 px-2.5 rounded-full tracking-wider">
                  {test.tag}
                </div>
              )}

              {/* Top part */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight pr-12 group-hover:text-[#0F4C81] transition-colors duration-250">
                  {test.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 font-sans leading-relaxed">
                  {test.description}
                </p>

                {/* Key parameters list */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-2 font-mono">
                    Includes {test.parameters.length} Key Parameters:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {test.parameters.map((param, pIdx) => (
                      <span
                        key={pIdx}
                        className="bg-slate-50 text-slate-600 text-[10px] font-medium py-1 px-2 rounded-md border border-slate-100"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom part */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-baseline justify-between mb-3.5">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{test.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2 font-medium">{test.originalPrice}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#16A34A] bg-emerald-50 px-2 py-1 rounded">
                    {test.time}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500 mb-4 bg-sky-50/50 p-2 rounded border border-sky-100/30 flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F4C81] mr-2"></span>
                  <span><strong>Ideal For:</strong> {test.recommendedFor}</span>
                </div>

                <button
                  onClick={handleBookClick}
                  className="w-full bg-[#0F4C81] text-white hover:bg-[#0f4c81]/90 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 text-sm shadow-xs transition-colors duration-200"
                >
                  <Navigation className="w-4 h-4 rotate-45" />
                  <span>Choose & Book Collection</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
