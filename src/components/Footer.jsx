import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';
import { PAKWOOD_PHONE, PAKWOOD_WA_NUMBER, getWhatsAppLink } from '../utils/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-[#181513] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2C2623]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2C2623]">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <a href="/" className="inline-block">
              <img
                src="./pakwood-logo-dark.svg"
                alt="Pakwood Furniture Multan"
                className="h-11 w-auto"
              />
            </a>

            <p className="text-xs md:text-sm text-[#A8A39D] font-light leading-relaxed max-w-sm">
              Multan's foremost artisanal furniture atelier since 1988. We build seasoned Sheesham and solid timber suites combining editorial European proportions with Pakistani heirloom durability.
            </p>

            <div className="space-y-2.5 text-xs text-[#ECE7DD]/90">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#B08D57] flex-shrink-0 mt-0.5" />
                <span>Showroom & Workshop: Hussain Agahi Market, Multan, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#B08D57] flex-shrink-0" />
                <a href={`tel:${PAKWOOD_PHONE}`} className="hover:text-[#E5C383] transition-colors">
                  {PAKWOOD_PHONE} (Direct Call)
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a
                  href={`https://wa.me/${PAKWOOD_WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors font-medium"
                >
                  WhatsApp Ordering: {PAKWOOD_PHONE}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C383]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A39D]">
              <li><a href="/collections?category=sofas" className="hover:text-white transition-colors">Sofas & Lounges</a></li>
              <li><a href="/collections?category=beds" className="hover:text-white transition-colors">Luxury Bed Sets</a></li>
              <li><a href="/collections?category=chairs" className="hover:text-white transition-colors">Accent & Cane Chairs</a></li>
              <li><a href="/collections?category=dining" className="hover:text-white transition-colors">Dining Tables & Suites</a></li>
              <li><a href="/collections?category=office" className="hover:text-white transition-colors">Executive Office Desks</a></li>
              <li><a href="/collections?room=Chesterfield" className="hover:text-white transition-colors">Chesterfield Leather</a></li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C383]">
              Patron Care
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A39D]">
              <li><a href="/custom-orders" className="hover:text-white transition-colors">Custom Room Sizing</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">Multan Timber Seasoning</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Visit Multan Workshop</a></li>
              <li><a href={getWhatsAppLink({ type: 'inquiry' })} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">Request Fabric Swatches</a></li>
              <li><span className="text-[#A8A39D]">70% Advance / 30% on Dispatch</span></li>
              <li><span className="text-[#A8A39D]">10-Year Frame Warranty</span></li>
            </ul>
          </div>

          {/* Delivery & Cities */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E5C383]">
              Nationwide Delivery
            </h4>
            <p className="text-xs text-[#A8A39D] leading-relaxed">
              White-glove delivery, crated freight, and room placement across:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Lahore', 'Islamabad', 'Karachi', 'Multan', 'Faisalabad', 'Rawalpindi', 'Peshawar', 'Sialkot', 'Gujranwala', 'Bahawalpur'].map((city) => (
                <span
                  key={city}
                  className="bg-white/5 border border-white/10 text-[10px] text-[#ECE7DD] px-2 py-0.5 rounded"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7570] space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Pakwood Furniture. All rights reserved. Handcrafted in Multan, Pakistan.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>100% Solid Seasoned Timber</span>
            <span>•</span>
            <span className="text-[#E5C383]">Verified WhatsApp Atelier</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
