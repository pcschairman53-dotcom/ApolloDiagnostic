/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceItem, ReviewItem, FAQItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'blood-test',
    title: 'Blood Test',
    description: 'Routine CBC, lipid, liver function, and kidney tests with sterile collection.',
    iconName: 'Droplet',
    price: 'â‚¹299 onwards',
    category: 'Routine Diagnostics',
    popular: true
  },
  {
    id: 'pathology',
    title: 'Pathology Services',
    description: 'Advanced clinical biochemistry, clinical pathology, and cytology overseen by expert pathologists.',
    iconName: 'Microscope',
    price: 'â‚¹199 onwards',
    category: 'Pathology',
    popular: false
  },
  {
    id: 'thyroid-profile',
    title: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Highly accurate chemiluminescence assays to analyze thyroid hormone counts.',
    iconName: 'Activity',
    price: 'â‚¹499 only',
    category: 'Hormones',
    popular: true
  },
  {
    id: 'diabetes-profile',
    title: 'Diabetes Profile (HbA1c & Blood Sugar)',
    description: 'Includes fasting blood sugar, post-prandial sugar, and average 3-month sugar (HbA1c).',
    iconName: 'Sparkles',
    price: 'â‚¹399 onwards',
    category: 'Metabolic',
    popular: true
  },
  {
    id: 'ecg',
    title: 'ECG (Electrocardiogram)',
    description: 'High-precision 12-lead electrocardiogram testing for rapid cardiac rhythm evaluation.',
    iconName: 'HeartPulse',
    price: 'â‚¹250 only',
    category: 'Cardiac',
    popular: false
  },
  {
    id: 'x-ray',
    title: 'Digital X-Ray',
    description: 'Advanced low-radiation digital imaging for chest, joints, and spine with rapid reporting.',
    iconName: 'Bone',
    price: 'â‚¹350 onwards',
    category: 'Radiology',
    popular: false
  },
  {
    id: 'ultrasound',
    title: 'Ultrasound / USG',
    description: 'Premium pelvic, abdominal, and pregnancy scans conducted by certified radiologists.',
    iconName: 'Waves',
    price: 'â‚¹999 onwards',
    category: 'Imaging',
    popular: true
  },
  {
    id: 'health-checkup',
    title: 'Full Body Health Checkup',
    description: 'Comprehensive 60+ parameters package combining lipid, thyroid, renal, hepatic, and vitals.',
    iconName: 'ShieldAlert',
    price: 'â‚¹1,299 onwards',
    category: 'Wellness Packages',
    popular: true
  },
  {
    id: 'home-collection',
    title: 'Home Sample Collection',
    description: 'Highly hygienic, temperature-controlled sample pickup by certified professional phlebotomists.',
    iconName: 'Home',
    price: 'FREE in Belgharia',
    category: 'On-Demand Service',
    popular: true
  }
];

export const TRUST_CARDS = [
  {
    id: 'accurate-reports',
    title: 'Accurate Reports',
    description: 'ISO-compliant protocols with dual-stage clinical validation ensuring maximum lab reporting accuracy.',
    icon: 'CheckCircle'
  },
  {
    id: 'modern-equipment',
    title: 'Modern Equipment',
    description: 'Equipped with fully automated, high-throughput pathology analyzers from globally recognized leaders.',
    icon: 'Cpu'
  },
  {
    id: 'expert-staff',
    title: 'Expert Staff',
    description: 'Highly dedicated team of experienced, certified MD pathologists, lab biochemists, and gentle phlebotomists.',
    icon: 'Users'
  },
  {
    id: 'affordable',
    title: 'Affordable Pricing',
    description: 'Maximum clinical precision provided at fair, student- and senior-citizen-friendly local tariffs.',
    icon: 'Percent'
  },
  {
    id: 'fast-service',
    title: 'Fast Report Delivery',
    description: 'Receive secure digital reports directly via SMS and WhatsApp inside 12 to 24 hours of sample pickup.',
    icon: 'Clock'
  },
  {
    id: 'trusted-care',
    title: 'Authorized Clinic Network',
    description: 'Apollo Diagnostics franchise with 10,000+ satisfied patients residing in Belgharia, Kolkata.',
    icon: 'Heart'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Anirban Chakraborty',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The environment is very clean and professional. The home collection nurse arrived exactly on time. The report was shared on WhatsApp the same night. Excellent diagnostics facility in Feeder Road!',
    isVerified: true,
    initials: 'AC'
  },
  {
    id: 'rev-2',
    name: 'Priya Sen',
    rating: 5,
    date: '1 month ago',
    comment: 'Very gentle blood extraction. I usually feel nervous, but the phlebotomist was super skilled. Price of thyroid profile and full body blood check is exceptionally reasonable.',
    isVerified: true,
    initials: 'PS'
  },
  {
    id: 'rev-3',
    name: 'Rajesh Kumar Shaw',
    rating: 5,
    date: '2 months ago',
    comment: 'Authorized Apollo Diagnostic center with state of art automated machines. Polite behavior by administrative staff. Found them highly honest compared to other labs in Belgharia.',
    isVerified: true,
    initials: 'RS'
  },
  {
    id: 'rev-4',
    name: 'Amit Ghoshal',
    rating: 5,
    date: '3 months ago',
    comment: 'Very professional. Reports are well structured and they verify details doubly before sample dispatch. Would refer everyone in Kolkata 700056 region.',
    isVerified: true,
    initials: 'AG'
  }
];

export const AI_PREDEFINED_RESPONSES: Record<string, string> = {
  timings: `Apollo Diagnostics Belgharia works on the following schedule:
â€¢ Monday to Saturday: 8:00 AM - 9:00 PM
â€¢ Sunday: 8:00 AM - 12:00 PM (Noon)
Phlebotomists are active during our working hours.`,

  location: `We are conveniently located at:
110 Feeder Road, Belgharia, Kolkata - 700056 (Near local transport nodes). 
Our center is fully accessible with standard clinical sanitation.`,

  booking: `Booking is straightforward:
1. Fill out the "Book Appointment" form under the Service sections.
2. Dial 033-25649604 / 9831285106.
3. Tap the "WhatsApp" widget to coordinate directly through our mobile desk.`,

  home: `Yes! We provide Free Home Sample Collection throughout the Belgharia, Kolkata-56 zone. 
Our healthcare representatives follow clean, single-use, double-masked guidelines.`,

  contact: `You can reach our helpdesk immediately:
â€¢ Landline: 033-25649604
â€¢ Mobile Phones: 9831285106 / 9239028807
â€¢ Email: apollo_diag@yahoo.in`
};
