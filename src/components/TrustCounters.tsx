/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Users, FileText, CalendarCheck, Zap } from 'lucide-react';

export default function TrustCounters() {
  const [patients, setPatients] = useState(9000);
  const [tests, setTests] = useState(24000);

  useEffect(() => {
    const patientInterval = setInterval(() => {
      setPatients((prev) => {
        if (prev >= 10000) {
          clearInterval(patientInterval);
          return 10000;
        }
        return prev + 125;
      });
    }, 15);

    const testsInterval = setInterval(() => {
      setTests((prev) => {
        if (prev >= 25000) {
          clearInterval(testsInterval);
          return 25000;
        }
        return prev + 155;
      });
    }, 10);

    return () => {
      clearInterval(patientInterval);
      clearInterval(testsInterval);
    };
  }, []);

  const counters = [
    {
      id: 'patients',
      label: 'Trusted Patients In Kolkata',
      target: '10,000+',
      current: `${patients.toLocaleString()}+`,
      icon: Users,
      color: 'bg-blue-50 text-[#0F4C81]'
    },
    {
      id: 'tests',
      label: 'Clinical Tests Completed',
      target: '25,000+',
      current: `${tests.toLocaleString()}+`,
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      id: 'years',
      label: 'Years of Lab Service',
      target: '10+ Years',
      current: '10+ Years',
      icon: CalendarCheck,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      id: 'speed',
      label: 'Fast Report Delivery',
      target: '12-24 Hrs',
      current: '12-24 Hrs',
      icon: Zap,
      color: 'bg-cyan-50 text-cyan-600'
    }
  ];

  return (
    <section className="bg-white py-10 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {counters.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="flex flex-col items-center text-center p-4 rounded-2xl border border-slate-100 hover:border-sky-100 hover:shadow-xs transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${item.color} mb-3.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  {item.current}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider font-sans">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
