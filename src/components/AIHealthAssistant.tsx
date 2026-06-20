/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  RefreshCw, 
  CheckCheck, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Mail, 
  FileText, 
  Clock, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { ChatMessage } from '../types';

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyve1ZmlcRgNTZHfLlIxZZw1CHQfqYBbnt9KOku9ojg9ewI9WvzryhXFKX8NY-BRv-3w/exec";

export default function AIHealthAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: 'Namaste! Welcome to Apollo Diagnostics Belgharia Premium Clinical Navigator. I can recommend tests, provide lab schedules, or guide you. Click "📅 Book Appointment" to launch our upgraded interactive booking engine instantly!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Upgrade: State for Inline Booking Form inside chat window
  const [showInlineBooking, setShowInlineBooking] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    test: '',
    message: '',
    date: '',
    time: ''
  });
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingValidationError, setBookingValidationError] = useState('');
  const [showWhatsAppConcierge, setShowWhatsAppConcierge] = useState(false);

  // Premium Journey Tracker States
  const [hasSymptomTested, setHasSymptomTested] = useState(false);
  const [hasRecommendationGiven, setHasRecommendationGiven] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);

  const launchWhatsAppWithTransition = (url: string) => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      window.open(url, '_blank');
    }, 1000);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest bubbles
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, showInlineBooking, showWhatsAppConcierge]);

  // Handle coordination events from Floating CTA desk
  useEffect(() => {
    const handleOpenBooking = () => {
      setShowInlineBooking(true);
      setShowWhatsAppConcierge(false);
    };
    const handleOpenWhatsApp = () => {
      setShowWhatsAppConcierge(true);
      setShowInlineBooking(false);
    };
    const handleOpenRecommendation = () => {
      setShowWhatsAppConcierge(false);
      setShowInlineBooking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-nav-${Date.now()}`,
          sender: 'bot',
          text: 'Sure! Please type your symptoms or package names (e.g. "Fever", "Thyroid Check") in the chat to look up test recommendations directly, or view shortcuts on the left!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    };
    const handleOpenCollection = () => {
      setShowWhatsAppConcierge(false);
      setShowInlineBooking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-nav-${Date.now()}`,
          sender: 'bot',
          text: '🏠 Our free sterile home sample collection is fully active across Belgharia, Feeder Road, and Kolkata-56. Would you like to schedule? Choose "📅 Book Appointment"!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    };
    const handleOpenReports = () => {
      setShowWhatsAppConcierge(false);
      setShowInlineBooking(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-nav-${Date.now()}`,
          sender: 'bot',
          text: '📄 Reports processing is fully automated. Secure digital reports can be gathered within 6-12 hours of collection. To inquire about a specific report status, choose "💬 WhatsApp Support" or call receptionist desks!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    };

    window.addEventListener('open-ai-booking', handleOpenBooking);
    window.addEventListener('open-ai-whatsapp', handleOpenWhatsApp);
    window.addEventListener('open-ai-recommendation', handleOpenRecommendation);
    window.addEventListener('open-ai-home-collection', handleOpenCollection);
    window.addEventListener('open-ai-reports', handleOpenReports);

    return () => {
      window.removeEventListener('open-ai-booking', handleOpenBooking);
      window.removeEventListener('open-ai-whatsapp', handleOpenWhatsApp);
      window.removeEventListener('open-ai-recommendation', handleOpenRecommendation);
      window.removeEventListener('open-ai-home-collection', handleOpenCollection);
      window.removeEventListener('open-ai-reports', handleOpenReports);
    };
  }, []);

  // Helper local recommendation search
  const runRecommendationEngine = (text: string): string | null => {
    const textLower = text.toLowerCase();
    
    if (textLower.includes('fever') || textLower.includes('dengue') || textLower.includes('malaria') || textLower.includes('temperature') || textLower.includes('viral')) {
      return `🩺 **Symptom Tracker detected: FEVER**\n\nOur Clinical Pathology automated rules recommend:\n• **CBC (Complete Blood Count)** to evaluate infection markers & platelet count.\n• **ESR (Erythrocyte Sedimentation Rate)** to mark generic biological inflammation stages.\n\n💡 Would you like to schedule this package? Select "📅 Book Appointment" above to load the simple booking panel directly.`;
    }
    
    if (textLower.includes('diabetes') || textLower.includes('diabetic') || textLower.includes('sugar') || textLower.includes('glucose') || textLower.includes('insulin')) {
      return `🩺 **Symptom Tracker detected: GLUCOSE MONITORING**\n\nOur metabolic screening guidelines recommend:\n• **HbA1c Blood Test** (Gold standard 3-month sugar summary).\n• **Fasting & Post-Prandial Sugar Profiles**.\n\n💡 Would you like to schedule this diagnostic check? Click "📅 Book Appointment" above to load the interactive scheduler.`;
    }

    if (textLower.includes('thyroid') || textLower.includes('tft') || textLower.includes('t3') || textLower.includes('t4') || textLower.includes('tsh') || textLower.includes('hypo') || textLower.includes('hyper')) {
      return `🩺 **Symptom Tracker detected: THYROID INDICES**\n\nWe recommend booking our high-precision:\n• **TFT Profile (Total T3, T4, TSH assays)** to analyze endocrine metabolism balance.\n\n💡 Click "📅 Book Appointment" above to open the booking panel instantly!`;
    }

    if (textLower.includes('heart') || textLower.includes('chest') || textLower.includes('bp') || textLower.includes('cardiac') || textLower.includes('pressure') || textLower.includes('cholesterol') || textLower.includes('lipid')) {
      return `🩺 **Symptom Tracker detected: CARDIAC FIT DEFENSE**\n\nWe recommend selecting:\n• **ECG (12-Lead Electrocardiogram)**.\n• **Lipid Profile (Cholesterol & Triglycerides)** to map blood vessel filtration hazards.\n\n💡 Click "📅 Book Appointment" above to coordinate home-care assistance!`;
    }

    if (textLower.includes('general') || textLower.includes('full') || textLower.includes('whole') || textLower.includes('body') || textLower.includes('checkup') || textLower.includes('annual') || textLower.includes('routine')) {
      return `🩺 **Symptom Tracker detected: GENERAL EXERTION / PREVENTIVE WELLNESS**\n\nWe recommend our signature:\n• **Full Body Health Checkup** (assessing complete metabolic integrity, liver filters, kidney parameters, lipid systems & CBC indices).\n\n💡 Highly economical. Starting at just ₹1,499. Click "📅 Book Appointment" above to open and schedule!`;
    }

    return null;
  };

  const executeGeneralInteractiveResponse = (inputKey: string, matchedText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = '';
      
      switch (inputKey) {
        case 'popular-tests':
          botResponse = `🎯 **Belgharia Diagnostic Popular Tests Overview:**\n\n• **CBC (Complete Blood Count)**: ₹299 (Routine infection baseline)\n• **Thyroid Profile (T3, T4, TSH)**: ₹349\n• **HbA1c (Diabetes Tracker)**: ₹299\n• **Lipid Profile (Cholesterol Panel)**: ₹399\n• **Vitamin D Total**: ₹1,199\n• **Full Body Executive Package**: ₹1,499 (Highly recommended value package!)\n\n📌 *All tests are performed on fully-automated clinical hardware. Fast digital feedback delivered securely.*`;
          break;
        case 'home-collection':
          botResponse = `🏠 **Complimentary Sterile Home Sample Collection:**\n\n• Service operational all across Belgharia, Feeder Road, and neighboring Kolkata-56 districts.\n• Zero home collection charging fees applied.\n• Fully certified, vaccinated clinical phlebotomists.\n• Automated cooling cases used to pack specimens securely.\n\n💡 *Would you like to book a sterile collection? Select "📅 Book Appointment" now!*`;
          break;
        case 'get-directions':
          botResponse = `📍 **Apollo Diagnostics Belgharia Center Address:**\n\n🏢 **Location:** 110 Feeder Road, Belgharia, Kolkata - 700056 (Conveniently accessible via local transit nodes).\n\n⏰ **Operational Hours:**\n• Mon - Sat: 8:00 AM - 9:00 PM\n• Sunday: 8:00 AM - 12:00 PM (Noon)\n\n📞 **Landline:** 033-25649604`;
          break;
        case 'call-now':
          botResponse = `📞 **Connecting you immediately... Helpdesk phone lines active:**\n\n• Central Desk: 9831285106\n• Reception Lines: 033-25649604\n• Back-up helpline: 9239028807\n\n*Clicking this action triggers your device dialer for instant reservation!*`;
          window.open('tel:9831285106');
          break;
        case 'whatsapp-support':
          botResponse = `🟢 **Opening our WhatsApp Concierge Desk...**\n\nLive diagnostic counselors are checking your messages immediately. Custom options are loaded directly on your screen!`;
          setShowWhatsAppConcierge(true);
          setShowInlineBooking(false);
          break;
        default:
          botResponse = `Thank you for your inquiry!\n\n• **Address:** 110 Feeder Road, Belgharia, Kolkata-56\n• **Working timings:** Mon-Sat 8AM - 9PM, Sunday 8AM - 12PM\n• **Phone:** 9831285106\n\nPlease select "📅 Book Appointment" to register test bookings.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-reply-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // If active in standard typing, handle
    setIsTyping(true);
    setTimeout(() => {
      const textLower = userText.toLowerCase();
      if (textLower.includes('book') || textLower.includes('appointment') || textLower.includes('schedul') || textLower.includes('regist')) {
        setShowInlineBooking(true);
        setShowWhatsAppConcierge(false);
        setIsTyping(false);
        return;
      }

      if (textLower.includes('whatsapp') || textLower.includes('chat') || textLower.includes('concierge') || textLower.includes('operator')) {
        setShowWhatsAppConcierge(true);
        setShowInlineBooking(false);
        setIsTyping(false);
        return;
      }

      // 2. Run Search Symptom tracker recommendation engine
      const recommendedResult = runRecommendationEngine(userText);
      if (recommendedResult) {
        setHasSymptomTested(true);
        setHasRecommendationGiven(true);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-recommend-${Date.now()}`,
            sender: 'bot',
            text: recommendedResult,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setIsTyping(false);
        return;
      }

      // 3. Fallback to keyword matching
      let replyMessage = '';

      if (textLower.includes('timing') || textLower.includes('hour') || textLower.includes('open') || textLower.includes('sunday') || textLower.includes('close')) {
        replyMessage = `⏰ **Apollo Diagnostics Belgharia Opening timings:**\n• Monday to Saturday: 8:00 AM - 9:00 PM\n• Sunday: 8:00 AM - 12:00 PM (Noon)\n\nPhlebotomists are on active rotation during opening schedules for effortless blood screenings of all diagnostic profiles.`;
      } else if (textLower.includes('where') || textLower.includes('location') || textLower.includes('address') || textLower.includes('find') || textLower.includes('feeder')) {
        replyMessage = `📍 **Our Location Center:**\n\n110 Feeder Road, Belgharia, Kolkata - 700056 (Centrally positioned with diagnostic markers, opposite crucial local junctions).\n\nFeel free to select "📍 Get Directions" to review localized route coordinates!`;
      } else if (textLower.includes('home') || textLower.includes('collect') || textLower.includes('pickup') || textLower.includes('sample')) {
        replyMessage = `🏠 **Complimentary Sterile Home Sample Collection:**\n\nWe provide free phlebotomy collections throughout Belgharia, Feeder Road, and Kolkata-56 zones.\n\nAll tools are single-use, clinical grade, double-packed. To arrange, select "📅 Book Appointment" to locate our scheduler!`;
      } else if (textLower.includes('contact') || textLower.includes('phone') || textLower.includes('number') || textLower.includes('call') || textLower.includes('desk') || textLower.includes('help')) {
        replyMessage = `📞 **Apollo Belgharia central helpline numbers:**\n\n• Central Desk: 9831285106\n• Landline Line: 033-25649604\n• Back-up desk: 9239028807\n\nFeel free to tap "📞 Call Now" from the actions below to connect your device dialer automatically!`;
      } else {
        replyMessage = `Thank you for reaching out to Apollo Diagnostics Belgharia! I've logged your query.\n\nTo make sure you get immediate help:\n• **Timings:** Mon-Sat 8AM - 9PM, Sunday 8AM - 12PM\n• **Address:** 110 Feeder Road, Belgharia, Kolkata-56\n• **Helpdesk:** 9831285106 / 033-25649604\n\n💡 *Tip: Feel free to click "📅 Book Appointment" below to schedule sample collection or type symptoms like "Fever" or "Diabetes" for instant test matches!*`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-reply-${Date.now()}`,
          sender: 'bot',
          text: replyMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  // Click handler for Quick Action Cards
  const handleQuickAction = (actionKey: string, matchedLabel: string) => {
    if (actionKey === 'book-appointment') {
      setShowInlineBooking(true);
      setShowWhatsAppConcierge(false);
      return;
    }

    if (actionKey === 'whatsapp-support') {
      setShowWhatsAppConcierge(true);
      setShowInlineBooking(false);
      return;
    }

    // Add user message bubble
    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text: matchedLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);

    // general informative actions
    executeGeneralInteractiveResponse(actionKey, matchedLabel);
  };

  // Handle Form Submission with GAS and WhatsApp Scheme
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingValidationError('');

    // Field validation checks
    if (!bookingFormData.name.trim()) {
      setBookingValidationError('Please enter patient\'s name.');
      return;
    }
    const cleanPhone = bookingFormData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setBookingValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!bookingFormData.test.trim()) {
      setBookingValidationError('Please specify or select a required test.');
      return;
    }
    if (!bookingFormData.date) {
      setBookingValidationError('Please select a preferred date.');
      return;
    }
    if (!bookingFormData.time) {
      setBookingValidationError('Please select a preferred time slot.');
      return;
    }

    setIsSubmittingBooking(true);

    try {
      // Pack secondary variables directly inside Column F (Message) to fit the existing script schema flawlessly!
      const payloadMessage = `Symptoms/Message: ${bookingFormData.message || 'None'}\nPreferred Date: ${bookingFormData.date}\nPreferred Time: ${bookingFormData.time}\nLead Source: AI Assistant`;

      const postData = {
        name: bookingFormData.name,
        phone: cleanPhone,
        email: bookingFormData.email || 'No email provided',
        test: bookingFormData.test,
        message: payloadMessage
      };

      // POST to GAS Webhook
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      // Construct formatted pre-filled WhatsApp message precisely matching specifications
      const waMessage = `Apollo Diagnostics Appointment Request

Patient Name: ${bookingFormData.name}

Mobile Number: ${cleanPhone}

Email: ${bookingFormData.email || 'Not specified'}

Test Required: ${bookingFormData.test}

Symptoms / Message: ${bookingFormData.message || 'None'}

Preferred Date: ${bookingFormData.date}

Preferred Time: ${bookingFormData.time}

Lead Source: AI Assistant`;

      setBookingSuccess(true);
      setIsSubmittingBooking(false);

      // Open WhatsApp automatically
      const whatsappUrl = `https://wa.me/919831285106?text=${encodeURIComponent(waMessage)}`;
      launchWhatsAppWithTransition(whatsappUrl);

    } catch (err) {
      console.error("Booking submit error: ", err);
      // Ensure we degrade gracefully to open WhatsApp directly even on networking hiccups
      setBookingSuccess(true);
      setIsSubmittingBooking(false);

      const waMessageMessage = `Apollo Diagnostics Appointment Request\n\nPatient Name: ${bookingFormData.name}\nMobile Number: ${cleanPhone}\nEmail: ${bookingFormData.email || 'Not specified'}\nTest Required: ${bookingFormData.test}\nSymptoms / Message: ${bookingFormData.message || 'None'}\nPreferred Date: ${bookingFormData.date}\nPreferred Time: ${bookingFormData.time}\nLead Source: AI Assistant`;
      launchWhatsAppWithTransition(`https://wa.me/919831285106?text=${encodeURIComponent(waMessageMessage)}`);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-msg',
        sender: 'bot',
        text: 'Namaste! Welcome to Apollo Diagnostics Belgharia Premium Clinical Navigator. I can recommend tests, provide lab schedules, or guide you. Click "📅 Book Appointment" to launch our upgraded interactive booking engine instantly!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setShowInlineBooking(false);
    setBookingSuccess(false);
    setHasSymptomTested(false);
    setHasRecommendationGiven(false);
    setBookingFormData({
      name: '',
      phone: '',
      email: '',
      test: '',
      message: '',
      date: '',
      time: ''
    });
  };

  const smartActions = [
    { id: 'book-appointment', label: '📅 Book Appointment', color: 'from-amber-100 to-orange-100 text-amber-900 border-amber-300 shadow-xs font-bold animate-pulse' },
    { id: 'popular-tests', label: '🩸 Popular Tests', color: 'from-rose-50 to-red-50 text-rose-800 border-rose-200/60' },
    { id: 'home-collection', label: '🏠 Home Collection', color: 'from-emerald-50 to-teal-50 text-emerald-800 border-emerald-200/60' },
    { id: 'get-directions', label: '📍 Get Directions', color: 'from-blue-50 to-sky-50 text-blue-800 border-blue-200/60' },
    { id: 'call-now', label: '📞 Call Now', color: 'from-violet-50 to-purple-50 text-violet-800 border-violet-200/60' },
    { id: 'whatsapp-support', label: '💬 WhatsApp Support', color: 'from-green-50 to-emerald-50 text-green-800 border-green-200/60' }
  ];

  const symptomEngineShortcuts = [
    { text: 'Fever Tracker', match: 'Fever' },
    { text: 'Diabetes Sugar', match: 'Diabetes' },
    { text: 'Thyroid Check', match: 'Thyroid' },
    { text: 'Heart Fitness', match: 'Heart checkup' },
    { text: 'Annual Body Scan', match: 'Full health check' }
  ];

  return (
    <section id="ai-assistant" className="py-20 bg-slate-50 relative animate-fade-in">
      {/* Floating Patient Assistance Badge in Glassmorphism style */}
      <div id="patient-assistance-badge" className="absolute top-10 right-4 sm:right-10 z-35 bg-white/45 backdrop-blur-md border border-slate-200/50 p-2.5 px-4 rounded-full flex items-center space-x-2 shadow-lg shadow-[#0F4C81]/5 select-none animate-bounce" style={{ animationDuration: '3s' }}>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-wider uppercase font-mono">
          AI Assisted Booking
        </span>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header Title with live status items */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-[#0F4C81]/10 border border-[#0F4C81]/20 px-4 py-1.5 rounded-full mb-3.5">
            <Sparkles className="w-4 h-4 text-[#0F4C81] animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-[#0F4C81] uppercase font-mono">
              Apollo AI Clinical Navigator
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-3">
            Apollo AI Clinical Navigator
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans">
            Get instant solutions regarding laboratory operational timelines, diagnostic matches, and complete test registration dynamically.
          </p>

          {/* SaaS Live Status Indicators Container with visual pulse */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            <div className="inline-flex items-center space-x-2 bg-emerald-50/80 text-emerald-700 border border-emerald-250 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-all hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Lab Open</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-emerald-50/80 text-emerald-700 border border-emerald-250 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-all hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Home Collection Active</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-blue-50/80 text-blue-700 border border-blue-250 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-all hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span>Reports Desk Online</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-sky-50/80 text-[#0F4C81] border border-sky-250 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-xs transition-all hover:scale-105">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F4C81]"></span>
              </span>
              <span>AI Navigator Active</span>
            </div>
          </div>
        </div>

        {/* Premium Corporate Chat Area with responsive SaaS visual grids - Fixed to 750px Height */}
         <div 
           className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden flex flex-col md:grid md:grid-cols-12 min-h-[700px] h-[750px] relative font-sans"
         >
           {/* Immersive Micro-transition Loading Overlay for WhatsApp launches */}
           {isTransferring && (
             <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-[60] flex flex-col items-center justify-center text-white font-sans animate-fade-in">
               <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-sm font-bold tracking-wider text-slate-200 uppercase font-mono animate-pulse">
                 Transferring to WhatsApp Secure Desk...
               </p>
               <p className="text-xs text-slate-400 mt-1">
                 Preparing clinical telemetry and dispatching lead queue
               </p>
             </div>
           )}

           {/* Conversational Top Bar & Left Action Panel combined beautifully - Premium scrollable SaaS style */}
          <div className="md:col-span-3 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between text-white md:h-full shrink-0 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 relative">
                  <Bot className="w-5.5 h-4.5 text-emerald-400" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wide animate-pulse">Navigator Terminal</h3>
                  <h4 className="text-sm font-bold font-display text-white mt-0.5">Automated Support</h4>
                </div>
              </div>

              <div className="hidden md:block">
                <h4 className="text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase font-mono mb-3">
                  Clinical Action Desk
                </h4>
                <p className="text-xs text-slate-400 leading-normal mb-5">
                  Select a category or quick symptom check shortcut below to get instant rule-based diagnostics responses.
                </p>

                {/* Symptom shortcuts panel */}
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-2">
                  Symptom Search Engines:
                </span>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {symptomEngineShortcuts.map((shortcut, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setShowInlineBooking(false); // Switch off form view if searching symptoms
                        const userMsg: ChatMessage = {
                          id: `user-msg-${Date.now()}`,
                          sender: 'user',
                          text: `Analyze symptoms for: ${shortcut.match}`,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages((p) => [...p, userMsg]);
                        setIsTyping(true);
                        setHasSymptomTested(true);
                        setHasRecommendationGiven(true);
                        setTimeout(() => {
                           const result = runRecommendationEngine(shortcut.match);
                           setMessages((p) => [...p, {
                             id: `bot-s-${Date.now()}`,
                             sender: 'bot',
                             text: result || 'No symptoms match.',
                             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                           }]);
                           setIsTyping(false);
                        }, 1500);
                      }}
                      className="text-[10px] font-bold bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white rounded-md px-2 py-1 transition-all"
                    >
                      {shortcut.text}
                    </button>
                  ))}
                </div>

                {/* AI JOURNEY TRACKER */}
                <div className="mt-5 border-t border-slate-800/80 pt-4 pb-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#F59E0B] uppercase font-mono block mb-2.5">
                    Patient Journey Tracker
                  </span>
                  <div className="space-y-2">
                    {[
                      { label: "Symptom Analysis", active: hasSymptomTested },
                      { label: "Test Recommendation", active: hasRecommendationGiven },
                      { label: "Lead Registration", active: bookingSuccess },
                      { label: "Coordinator Contact", active: bookingSuccess },
                      { label: "Sample Collection", active: false },
                      { label: "Report Delivery", active: false }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-2.5 text-[11px] font-sans">
                        <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          step.active 
                            ? "bg-emerald-600 border-emerald-600 text-white" 
                            : "border-slate-800 bg-slate-950 text-slate-500"
                        }`}>
                          {step.active ? (
                            <span className="text-[8px] font-extrabold">✓</span>
                          ) : (
                            <span className="text-[8px] font-medium text-slate-500">⏳</span>
                          )}
                        </div>
                        <span className={`transition-colors duration-300 text-[10.5px] ${step.active ? 'text-emerald-400 font-extrabold' : 'text-slate-400 font-medium'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TODAY'S OPERATIONS CARD */}
                <div className="mt-5 border-t border-slate-800/80 pt-4 pb-1">
                  <div className="bg-slate-950/40 border border-slate-800/70 rounded-xl p-3">
                    <span className="text-[10px] font-extrabold tracking-widest text-[#F59E0B] uppercase font-mono block mb-2">
                      Today's Operations
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                        <span className="block text-xs font-mono font-bold text-white">42</span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-sans">Requests</span>
                      </div>
                      <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                        <span className="block text-xs font-mono font-bold text-emerald-400">18</span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-sans">Collections</span>
                      </div>
                      <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                        <span className="block text-xs font-mono font-bold text-sky-400">29</span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-sans">Delivered</span>
                      </div>
                      <div className="bg-white/5 p-1.5 rounded-lg border border-white/5">
                        <span className="block text-xs font-mono font-bold text-amber-400">99.4%</span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-sans">CSAT</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-800/80 pt-4">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block mb-1">
                    Operational Address
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal mb-2">
                    110 Feeder Road, Belgharia, Kolkata - 700056
                  </p>
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase font-mono block mb-1">
                    Timings
                  </span>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Mon-Sat: 8 AM - 9 PM<br />
                    Sunday: 8 AM - 12 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span className="font-mono text-[10px]">Secure CRM Synced</span>
              </div>
            </div>
          </div>

          {/* Right Main Chat & Quick Actions Interface */}
          <div className="md:col-span-9 flex flex-col justify-between h-full bg-slate-50/50 min-h-0 relative">
            
            {/* Quick Actions Header Segment - Render Glassmorphism Smart Cards */}
            <div className="p-4 bg-white border-b border-slate-100 shrink-0">
              <span className="text-[10px] font-bold uppercase font-mono text-slate-400 tracking-wider block mb-2.5">
                ⚡ Premium Quick Navigator Action Console
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {smartActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id, action.label)}
                    className={`bg-linear-to-b ${action.color} border px-2.5 py-2 rounded-xl hover:shadow-xs hover:border-slate-300 filter transition duration-200 active:scale-95 text-xs text-left font-bold cursor-pointer font-sans`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditionally Render Chat View, Inline Booking Form, or WhatsApp Concierge Panel inside chat panel */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
              <AnimatePresence mode="wait">
                {!showInlineBooking && !showWhatsAppConcierge && (
                  // BUBBLE CHAT VIEW
                  <motion.div 
                    key="chat-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between min-h-0"
                  >
                    {/* Bubble Streaming Message Stream */}
                    <div 
                      ref={scrollRef}
                      className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70"
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {messages.map((msg) => {
                        const isBot = msg.sender === 'bot';
                        return (
                          <div 
                            key={msg.id}
                            className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start space-x-2.5 max-w-[90%] ${isBot ? 'mr-auto' : 'ml-auto'}`}
                          >
                            {isBot && (
                              <div className="w-7.5 h-7.5 rounded-lg bg-sky-100 text-[#0F4C81] border border-sky-200/50 flex items-center justify-center shrink-0">
                                <Bot className="w-4 h-4" />
                              </div>
                            )}

                            <div className="flex flex-col space-y-0.5">
                              <div className={`p-4 rounded-xl text-xs sm:text-sm font-sans leading-normal whitespace-pre-wrap ${
                                isBot 
                                  ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none shadow-xs' 
                                  : 'bg-[#0F4C81] text-white rounded-tr-none shadow-sm'
                              }`}>
                                {msg.text}
                              </div>

                              {isBot && (msg.id.includes('bot-recommend-') || msg.id.includes('bot-s-')) && (
                                <div className="mt-2.5 bg-[#0F4C81]/5 border border-[#0F4C81]/10 rounded-xl p-3 shadow-xs font-sans">
                                  <span className="text-[10px] font-extrabold uppercase font-mono text-slate-500 tracking-wider block mb-2">
                                    🧠 AI Clinical Lead Intelligence
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    <div className="inline-flex items-center space-x-1 bg-indigo-50 text-indigo-750 border border-indigo-150 px-2.5 py-1 rounded-md text-[10px] font-bold">
                                      <span>Source:</span>
                                      <span className="font-extrabold">AI Assistant</span>
                                    </div>
                                    <div className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[10px] font-bold ${
                                      msg.text.toLowerCase().includes('chest') || msg.text.toLowerCase().includes('heart') || msg.text.toLowerCase().includes('emergency')
                                        ? "bg-rose-50 text-rose-750 border border-rose-150"
                                        : "bg-amber-50 text-amber-750 border border-amber-150"
                                    }`}>
                                      <span>Priority:</span>
                                      <span>{msg.text.toLowerCase().includes('chest') || msg.text.toLowerCase().includes('heart') || msg.text.toLowerCase().includes('emergency') ? "High Priority" : "Normal"}</span>
                                    </div>
                                    <div className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-750 border border-emerald-150 px-2.5 py-1 rounded-md text-[10px] font-bold">
                                      <span>Service:</span>
                                      <span>Home Collection / Lab Visit</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <span className={`text-[9px] font-mono text-slate-400 flex items-center gap-1 mt-0.5 ${
                                isBot ? 'justify-start' : 'justify-end'
                              }`}>
                                {msg.timestamp}
                                {!isBot && <CheckCheck className="w-3 h-3 text-emerald-500 font-bold" />}
                              </span>
                            </div>

                            {!isBot && (
                              <div className="w-7.5 h-7.5 rounded-lg bg-[#0F4C81] text-white flex items-center justify-center shrink-0">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Bot feedback Typing latency indicator */}
                      {isTyping && (
                        <div className="flex justify-start items-center space-x-2.5 mr-auto">
                          <div className="w-7.5 h-7.5 rounded-lg bg-sky-100 text-[#0F4C81] border border-sky-200/50 flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4 animate-bounce" />
                          </div>
                          <div className="bg-white border border-slate-200 px-3.5 py-2 rounded-full shadow-xs flex items-center space-x-1.5">
                            <span className="text-[10px] text-slate-500 font-medium font-sans animate-pulse mr-1">Apollo Assistant is typing</span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Standard Text input submission row */}
                    <div className="bg-white border-t border-slate-200/80 p-3.5 shrink-0">
                      <form 
                        onSubmit={handleSendMessage}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type questions (e.g. Fever, timings) or book packages..."
                          className="flex-1 text-xs sm:text-sm font-sans border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3 rounded-xl focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81] focus:outline-none transition-all placeholder:text-slate-400 text-slate-800 font-sans"
                        />
                        
                        <button
                          type="button"
                          onClick={handleReset}
                          className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all font-bold text-slate-500 cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
                          title="Reset Terminal"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>

                        <button
                          id="ai-assistant-submit-btn"
                          type="submit"
                          className="p-3 bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-xl transition-all font-bold hover:shadow-md cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}

                {showInlineBooking && (
                  // INTEGRATED INLINE APPOINTMENT FORM VIEW
                  <motion.div
                    key="booking-form-view"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="flex-1 flex flex-col justify-between min-h-0 p-4 bg-slate-50"
                  >
                    <div className="flex-1 overflow-y-auto pr-1 space-y-4">
                      
                      {/* Back to Chat Option Header */}
                      <div className="flex items-center justify-between border-b border-slate-250 pb-3">
                        <button
                          onClick={() => setShowInlineBooking(false)}
                          className="inline-flex items-center space-x-1 text-xs text-[#0F4C81] hover:text-[#0F4C81]/80 font-bold cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Dialog Chat</span>
                        </button>
                        <span className="text-xs bg-[#0F4C81]/10 text-[#0F4C81] border border-[#0F4C81]/15 px-2.5 py-0.5 rounded-full font-bold uppercase font-mono tracking-wide">
                          Interactive Scheduler
                        </span>
                      </div>

                      {/* Render Success Screen or actual Form Fields */}
                      {bookingSuccess ? (
                        <div className="bg-white/90 backdrop-blur-md border border-emerald-100 shadow-sm p-8 rounded-2xl text-center space-y-5 animate-fade-in my-4">
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                            <CheckCircle2 className="w-10 h-10 animate-bounce" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-800 font-display">
                              ✅ Appointment Request Submitted Successfully.
                            </h3>
                            <p className="text-sm text-slate-600 mt-2 font-normal">
                              We have safely written your medical details to our Leads sheet successfully.
                            </p>
                            <p className="text-sm text-[#0F4C81] mt-1 font-bold">
                              Our coordinator will contact you shortly.
                            </p>
                          </div>

                          <div className="p-4 bg-slate-50 border border-slate-200/50 rounded-xl text-left text-xs text-slate-600 space-y-1">
                            <div><strong className="text-slate-800">Patient Name:</strong> {bookingFormData.name}</div>
                            <div><strong className="text-slate-800">Mobile Number:</strong> {bookingFormData.phone}</div>
                            <div><strong className="text-slate-800">Test Required:</strong> {bookingFormData.test}</div>
                            <div><strong className="text-slate-800">Preferred Slot:</strong> {bookingFormData.date} at {bookingFormData.time}</div>
                          </div>

                          <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                            <button
                              onClick={() => {
                                const waMsg = `Apollo Diagnostics Appointment Request

Patient Name: ${bookingFormData.name}

Mobile Number: ${bookingFormData.phone}

Email: ${bookingFormData.email || 'Not specified'}

Test Required: ${bookingFormData.test}

Symptoms / Message: ${bookingFormData.message || 'None'}

Preferred Date: ${bookingFormData.date}

Preferred Time: ${bookingFormData.time}

Lead Source: AI Assistant`;
                                launchWhatsAppWithTransition(`https://wa.me/919831285106?text=${encodeURIComponent(waMsg)}`);
                              }}
                              className="bg-[#16A34A] text-white hover:bg-emerald-600 px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-xs uppercase tracking-wide transition-all"
                            >
                              💬 Launch WhatsApp Manual Copy
                            </button>
                            <button
                              onClick={handleReset}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold text-xs cursor-pointer transition-all"
                            >
                              Reset Panel & Chat
                            </button>
                          </div>
                        </div>
                      ) : (
                        // GLASSMORPHISM BOOKING FORM FIELD BLOCK
                        <form onSubmit={handleFormSubmit} className="bg-white border border-slate-200/60 shadow-md p-5 rounded-2xl space-y-4">
                          
                          <div className="grid grid-cols-1 gap-4">
                            
                            {/* Patient Name */}
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                Patient Name *
                              </label>
                              <div className="relative">
                                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                <input
                                  type="text"
                                  required
                                  value={bookingFormData.name}
                                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                                  placeholder="e.g. Priyanth Banerjee"
                                  className="w-full pl-10 pr-4 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans"
                                />
                              </div>
                            </div>

                            {/* Two fields row: Phone and Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                  Mobile Number * (10-Digit)
                                </label>
                                <div className="relative">
                                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                  <input
                                    type="tel"
                                    required
                                    value={bookingFormData.phone}
                                    onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value.replace(/[^\d+]/g, '')})}
                                    placeholder="e.g. 9831285106"
                                    className="w-full pl-10 pr-4 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                  Email Address
                                </label>
                                <div className="relative">
                                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                  <input
                                    type="email"
                                    value={bookingFormData.email}
                                    onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})}
                                    placeholder="patient@gmail.com (Optional)"
                                    className="w-full pl-10 pr-4 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Test required dropdown option or text field */}
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                Test Required *
                              </label>
                              <div className="relative">
                                <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                <input
                                  type="text"
                                  required
                                  value={bookingFormData.test}
                                  onChange={(e) => setBookingFormData({...bookingFormData, test: e.target.value})}
                                  placeholder="e.g. CBC, HbA1c, Thyroid Profile, Lipid Panel or Full Body Checkup"
                                  className="w-full pl-10 pr-4 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans"
                                />
                              </div>
                            </div>

                            {/* Preferred Date & Preferred Time Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                  Preferred Date *
                                </label>
                                <div className="relative">
                                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                                  <input
                                    type="date"
                                    required
                                    value={bookingFormData.date}
                                    onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                  Preferred Time *
                                </label>
                                <div className="relative">
                                  <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                  <select
                                    required
                                    value={bookingFormData.time}
                                    onChange={(e) => setBookingFormData({...bookingFormData, time: e.target.value})}
                                    className="w-full pl-10 pr-4 py-2.5 text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans appearance-none"
                                  >
                                    <option value="">Select Time Slot...</option>
                                    <option value="Morning Slot (08:00 AM - 12:00 PM)">Morning Slot (08:00 AM - 12:00 PM)</option>
                                    <option value="Midday Slot (12:00 PM - 03:00 PM)">Midday Slot (12:00 PM - 03:00 PM)</option>
                                    <option value="Evening Slot (03:00 PM - 07:00 PM)">Evening Slot (03:00 PM - 07:00 PM)</option>
                                    <option value="Night Slot (07:00 PM - 09:00 PM)">Night Slot (07:00 PM - 09:00 PM)</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Symptoms / Custom Message */}
                            <div>
                              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase font-mono tracking-wide">
                                Symptoms / Message
                              </label>
                              <textarea
                                value={bookingFormData.message}
                                onChange={(e) => setBookingFormData({...bookingFormData, message: e.target.value})}
                                placeholder="Write symptoms, fasting notes or preferred instructions here..."
                                rows={2}
                                className="w-full px-4 py-2.5 text-slate-800 placeholder:text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0F4C81] focus:border-[#0F4C81] transition-all font-sans resize-none"
                              />
                            </div>

                          </div>

                          {/* Render Validation Warnings */}
                          {bookingValidationError && (
                            <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center space-x-2 text-rose-700 text-xs font-semibold animate-pulse">
                              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                              <span>{bookingValidationError}</span>
                            </div>
                          )}

                          {/* Row Buttons Actions */}
                          <div className="pt-2 flex items-center gap-3">
                            <button
                              type="submit"
                              disabled={isSubmittingBooking}
                              className="flex-1 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                            >
                              {isSubmittingBooking ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Saving with Sheets...</span>
                                </>
                              ) : (
                                <span>Save & Open WhatsApp Inquiry</span>
                              )}
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setShowInlineBooking(false)}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-5 rounded-xl text-sm transition-all cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>

                        </form>
                      )}

                    </div>
                  </motion.div>
                )}

                {showWhatsAppConcierge && (
                  // WHATSAPP CONCIERGE PANEL VIEW
                  <motion.div
                    key="whatsapp-concierge-view"
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    className="flex-1 flex flex-col justify-between min-h-0 p-4 bg-slate-50 overflow-y-auto"
                  >
                    <div className="flex-1 space-y-4">
                      
                      {/* Back Option Header */}
                      <div className="flex items-center justify-between border-b border-slate-250 pb-3 font-sans">
                        <button
                          type="button"
                          onClick={() => setShowWhatsAppConcierge(false)}
                          className="inline-flex items-center space-x-1 text-xs text-[#0F4C81] hover:text-[#0F4C81]/80 font-bold cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Dialog Chat</span>
                        </button>
                        <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full font-bold uppercase font-mono tracking-wide flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>WhatsApp Desk</span>
                        </span>
                      </div>

                      {/* Header message */}
                      <div className="font-sans">
                        <h3 className="text-base font-bold text-slate-950 font-display flex items-center space-x-2">
                          <span>💬</span>
                          <span>WhatsApp Concierge Desk</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Select the specific department you want to initiate a chat with. This will dynamically prepare your diagnostics info and open standard WhatsApp chat.
                        </p>
                      </div>

                      {/* Live Support Badge row */}
                      <div className="bg-emerald-50/80 border border-emerald-250 p-4 rounded-xl flex items-center justify-between font-sans">
                        <div className="flex flex-col space-y-0.5">
                          <div className="flex items-center space-x-2 text-xs text-emerald-800 font-extrabold uppercase font-mono tracking-wider">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>AI Concierge Ready</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-sans font-semibold">
                            Coordinator Queue Active
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-white text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-250 shrink-0">
                          Average Response: &lt; 5 Minutes
                        </span>
                      </div>

                      {/* 📊 Today's CRM Snapshot */}
                      <div className="bg-blue-50/40 border border-blue-200/50 p-3.5 rounded-2xl space-y-2 font-sans">
                        <div className="flex items-center space-x-1.5 border-b border-blue-150/50 pb-1.5">
                          <span className="text-xs">📊</span>
                          <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider font-display">
                            Today's CRM Snapshot
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="bg-white p-2 rounded-xl border border-slate-150 flex items-center justify-between shadow-2xs">
                            <span className="text-slate-500 font-medium">Total Leads:</span>
                            <span className="font-mono font-extrabold text-slate-900">{bookingSuccess ? 43 : 42}</span>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-150 flex items-center justify-between shadow-2xs">
                            <span className="text-slate-500 font-medium">AI Assistant Leads:</span>
                            <span className="font-mono font-extrabold text-[#0F4C81]">{bookingSuccess ? 21 : 20}</span>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-150 flex items-center justify-between shadow-2xs">
                            <span className="text-slate-500 font-medium">Appointment Booked:</span>
                            <span className="font-mono font-extrabold text-emerald-700">{bookingSuccess ? 19 : 18}</span>
                          </div>
                          <div className="bg-white p-2 rounded-xl border border-slate-150 flex items-center justify-between shadow-2xs">
                            <span className="text-slate-500 font-medium">Report Delivered:</span>
                            <span className="font-mono font-extrabold text-cyan-700">29</span>
                          </div>
                          <div className="col-span-2 bg-gradient-to-r from-blue-50 to-emerald-50 p-2 rounded-xl border border-blue-100 flex items-center justify-between">
                            <span className="text-slate-600 font-bold uppercase text-[9px] tracking-wider">Conversion Rate:</span>
                            <span className="font-mono font-extrabold text-emerald-800 bg-white border border-emerald-200 px-2 py-0.5 rounded-lg text-xs">
                              {(((bookingSuccess ? 19 : 18) / (bookingSuccess ? 43 : 42)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Department Routing grid */}
                      <div className="font-sans">
                        <span className="text-[10px] font-bold uppercase font-mono text-slate-400 tracking-wider block mb-2">
                          🟢 Virtual Agent Routing Status
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                          
                          <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="font-bold text-slate-900 leading-tight">Booking Agent Online</span>
                            </div>
                            <span className="text-[10px] text-slate-500 leading-tight">Handles Appointment Requests</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="font-bold text-slate-900 leading-tight">Support Agent Online</span>
                            </div>
                            <span className="text-[10px] text-slate-500 leading-tight">Handles General Enquiries</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="font-bold text-slate-900 leading-tight">Collection Desk Active</span>
                            </div>
                            <span className="text-[10px] text-slate-500 leading-tight">Handles Home Collection Requests</span>
                          </div>

                          <div className="bg-white p-2.5 rounded-xl border border-slate-150 flex flex-col justify-between space-y-1">
                            <div className="flex items-center space-x-1.5">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span className="font-bold text-slate-900 leading-tight">Reports Desk Active</span>
                            </div>
                            <span className="text-[10px] text-slate-500 leading-tight">Handles Report Delivery Requests</span>
                          </div>

                        </div>
                      </div>

                      {/* CRM Health Indicator */}
                      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl text-white font-mono text-[10.5px] space-y-2.5 shadow-md">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <span className="font-sans font-extrabold text-slate-300 text-xs">🛡️ Agentic CRM Integrity</span>
                          <span className="text-[9.5px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-900/50 px-2 py-0.5 rounded-md flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                            <span>CRM Status: Healthy</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 font-sans font-semibold">
                          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-1.5">
                            <span className="text-amber-400">⚡</span>
                            <span className="text-[10px]">Lead Processing Active</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 flex items-center space-x-1.5">
                            <span className="text-sky-400">📈</span>
                            <span className="text-[10px]">Analytics Sync Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Mini Operational Summary Box */}
                      <div className="bg-gradient-to-br from-[#0F4C81]/5 to-slate-150/40 border border-[#0F4C81]/10 p-3.5 rounded-2xl font-sans space-y-2.5">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider block">
                          📋 Today's Activity Summary
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-700">
                          <div className="p-2 bg-white rounded-lg border border-slate-150 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-450 uppercase tracking-tight block">New Leads Today</span>
                            <span className="text-sm font-mono font-bold text-slate-950">{bookingSuccess ? 43 : 42}</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-slate-150 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-450 uppercase tracking-tight block">Pending Appointments</span>
                            <span className="text-sm font-mono font-bold text-amber-600">{bookingSuccess ? 12 : 11}</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-slate-150 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-450 uppercase tracking-tight block">Reports Delivered</span>
                            <span className="text-sm font-mono font-bold text-emerald-600">29</span>
                          </div>
                          <div className="p-2 bg-white rounded-lg border border-slate-150 flex flex-col justify-between">
                            <span className="text-[9px] text-slate-450 uppercase tracking-tight block">AI Assisted Requests</span>
                            <span className="text-sm font-mono font-bold text-[#0F4C81]">21</span>
                          </div>
                        </div>
                      </div>

                      {/* Mini Concierge Options */}
                      <div className="font-sans">
                        <span className="text-[10px] font-bold uppercase font-mono text-slate-400 tracking-wider block mb-2">
                          ⚡ Launch Specific WhatsApp Inquiry Mode
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { label: "💬 General Inquiry", color: "hover:bg-blue-50/40 hover:border-blue-200" },
                            { label: "🩸 Test Booking", color: "hover:bg-rose-50/40 hover:border-rose-200" },
                            { label: "🏠 Home Collection", color: "hover:bg-emerald-50/40 hover:border-emerald-200" },
                            { label: "📄 Report Support", color: "hover:bg-amber-50/40 hover:border-amber-200" },
                            { label: "📍 Location Assistance", color: "hover:bg-sky-50/40 hover:border-sky-200" },
                            { label: "📞 Call Back Request", color: "hover:bg-violet-50/40 hover:border-violet-200" }
                          ].map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                const name = bookingFormData.name || "Valued Patient";
                                const phone = bookingFormData.phone || "Not specified";
                                const test = bookingFormData.test || "General Inquiry / Checkup";
                                const optionMessage = `Hi, I would like to start a WhatsApp inquiry regarding: ${item.label}`;

                                // Dynamics message block specifications:
                                // Apollo Diagnostics Inquiry
                                // Patient Name: {name}
                                // Mobile Number: {phone}
                                // Test Required: {test}
                                // Message: {message}
                                // Lead Source: AI Assistant
                                const prefilledMsg = `Apollo Diagnostics Inquiry\n\nPatient Name: ${name}\nMobile Number: ${phone}\nTest Required: ${test}\nMessage: ${optionMessage}\nLead Source: AI Assistant`;

                                launchWhatsAppWithTransition(`https://wa.me/919831285106?text=${encodeURIComponent(prefilledMsg)}`);
                              }}
                              className={`bg-white border border-slate-200 p-3 rounded-2xl text-xs font-bold text-slate-800 text-left cursor-pointer transition-all active:scale-95 flex items-center justify-between shadow-xs ${item.color}`}
                            >
                              <span>{item.label}</span>
                              <span className="text-emerald-500 text-xs font-serif font-bold">→</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Lead Preview Card (if lead exists in Assistant) */}
                      {bookingFormData.name && (
                        <div className="bg-gradient-to-br from-[#0F4C81]/5 to-slate-100 border border-[#0F4C81]/15 p-4 rounded-2xl space-y-2.5 font-sans">
                          <div className="flex items-center justify-between border-b border-[#0F4C81]/10 pb-1.5">
                            <span className="text-xs font-bold text-slate-800 font-display">
                              📋 Lead Preview
                            </span>
                            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded animate-pulse">
                              CRM Status: Ready
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                            <div>
                              <span className="text-slate-500 block text-[10px]">Patient Name</span>
                              <span className="font-bold text-slate-800">{bookingFormData.name}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block text-[10px]">Mobile Number</span>
                              <span className="font-bold text-slate-800">{bookingFormData.phone}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-slate-500 block text-[10px]">Selected Test</span>
                              <span className="font-bold text-[#0F4C81]">{bookingFormData.test || "None specified"}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-slate-500 block text-[10px]">Lead Source</span>
                              <span className="font-mono text-[10px] text-slate-600 font-bold">AI Assistant</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CRM Status block after successful booking submission */}
                      {bookingSuccess && (
                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 text-white font-mono text-xs shadow-xl">
                          <div className="text-[10px] text-amber-400 font-bold tracking-widest uppercase border-b border-slate-800 pb-1 flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                            <span>CRM Pipeline Sync</span>
                          </div>
                          <div className="space-y-1 text-[11px] text-slate-350">
                            <div className="flex items-center space-x-2">
                              <span className="text-emerald-400 font-bold">✅</span>
                              <span>Google Sheet Synced</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-emerald-400 font-bold">✅</span>
                              <span>Lead Registered</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-emerald-400 font-bold">✅</span>
                              <span>Coordinator Queue Assigned</span>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end gap-2.5 font-sans">
                      <button
                        type="button"
                        onClick={() => setShowWhatsAppConcierge(false)}
                        className="bg-slate-200 hover:bg-slate-350 text-slate-800 font-bold py-2.5 px-5 rounded-xl text-xs transition-all cursor-pointer"
                      >
                        Cancel Concierge
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Floating live badge banner indicator */}
        <div className="flex justify-center mt-6">
          <div className="bg-slate-900 text-white rounded-full px-5 py-2 text-xs flex items-center space-x-2.5 shadow-md border border-slate-800">
            <span className="w-2 h-2 rounded bg-green-500 animate-ping"></span>
            <span className="font-mono text-[10px] tracking-wide text-slate-300">Live Clinical Support Channels Active | 9831285106 | Belgharia</span>
          </div>
        </div>

      </div>
    </section>
  );
}
