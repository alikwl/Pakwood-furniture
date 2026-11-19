import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex items-center space-x-3 pointer-events-auto">
      
      {/* Tooltip greeting */}
      {showTooltip && (
        <div className="hidden sm:flex items-center space-x-2 bg-white text-[#1E1B18] px-4 py-2.5 rounded-2xl shadow-elevated border border-[#E8E2D9] text-xs max-w-xs animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
          <span className="font-medium">
            Questions? Chat with our <strong>Multan Master Carpenter</strong>
          </span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#A8A39D] hover:text-[#1E1B18] ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button with Pulse Effect */}
      <a
        href={getWhatsAppLink({ type: 'inquiry' })}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 animate-wa-pulse"
        title={`Chat with Pakwood on WhatsApp (${PAKWOOD_PHONE})`}
        aria-label="WhatsApp Concierge"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>

    </div>
  );
}
