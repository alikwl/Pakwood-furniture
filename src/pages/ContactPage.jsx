import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Send, Sparkles } from 'lucide-react';
import { PAKWOOD_PHONE, PAKWOOD_WA_NUMBER, getWhatsAppLink } from '../utils/whatsapp';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [inquiryType, setInquiryType] = useState('New Furniture Order');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*Salam Pakwood Furniture Multan!*\n\n*Name:* ${name}\n*City:* ${city}\n*Inquiry:* ${inquiryType}\n*Message:* ${message}`;
    const url = `https://wa.me/${PAKWOOD_WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#7A7570] mb-6">
          <a href="#/" className="hover:text-[#B08D57] transition-colors">Home</a>
          <span>/</span>
          <span className="text-[#1E1B18] font-medium">Contact & Multan Showroom</span>
        </div>

        <div className="max-w-2xl mb-10 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B08D57]">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E1B18] tracking-tight">
            Multan Workshop & Direct Consultation
          </h1>
          <p className="text-xs md:text-sm text-[#7A7570] font-light">
            Whether you want to place a custom order, track nationwide delivery, or visit our Multan showroom, we are here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#B08D57]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                Multan Workshop & Gallery
              </h3>
              <p className="text-xs text-[#7A7570] leading-relaxed">
                Hussain Agahi Market, Multan, Punjab, Pakistan.<br />
                Near historical timber square and master woodcarvers alley.
              </p>
            </div>

            {/* Direct Phone & WhatsApp card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-subtle space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                Instant WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#7A7570] leading-relaxed">
                Connect directly with our workshop manager for real-time video tours, fabric swatches, and quote breakdowns.
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${PAKWOOD_WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-subtle transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp: {PAKWOOD_PHONE}</span>
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-subtle space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#B08D57]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1E1B18]">
                Workshop Hours
              </h3>
              <div className="text-xs text-[#7A7570] space-y-1">
                <p>Monday – Saturday: 10:00 AM – 8:00 PM</p>
                <p>Sunday: Closed (Available via WhatsApp emergencies)</p>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#E8E2D9] shadow-subtle space-y-6">
              
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1E1B18]">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#7A7570] mt-1">
                  Fill in your details and message will open seamlessly in your WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Qureshi"
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                      Your City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lahore, Islamabad, Karachi, Multan..."
                      className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl px-3.5 py-2.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="New Furniture Order">New Furniture Order / Catalog</option>
                    <option value="Custom Room Sizing Quote">Custom Room Sizing Quote</option>
                    <option value="Fabric Swatches Request">Request Physical Fabric Swatches</option>
                    <option value="Delivery & Order Status">Delivery & Order Status</option>
                    <option value="Visit Multan Workshop">Schedule Workshop Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18] mb-1.5">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the pieces you are interested in, your preferred wood finish, or any questions..."
                    className="w-full bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-3.5 text-xs text-[#1E1B18] focus:outline-none focus:border-[#B08D57] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-bold text-xs md:text-sm tracking-wide flex items-center justify-center space-x-2 shadow-subtle hover:shadow-elevated transition-all btn-press"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send via WhatsApp ({PAKWOOD_PHONE})</span>
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
