import React, { useState, useEffect } from 'react';
import { Search, Heart, MessageCircle, Menu, X, ChevronDown, Phone, MapPin, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { PAKWOOD_PHONE, getWhatsAppLink } from '../utils/whatsapp';

export default function Header({ currentPath = '' }) {
  const { wishlist, setIsDrawerOpen, setIsSearchOpen } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    {
      name: 'Shop Catalog',
      href: '/collections',
      hasDropdown: true,
      items: [
        { label: 'All Collections', href: '/collections' },
        { label: 'Sofas & Sectionals', href: '/collections?category=sofas' },
        { label: 'Luxury Bed Sets', href: '/collections?category=beds' },
        { label: 'Accent & Cane Chairs', href: '/collections?category=chairs' },
        { label: 'Dining Sets & Tables', href: '/collections?category=dining' },
        { label: 'Executive Office Desks', href: '/collections?category=office' },
      ]
    },
    { name: 'Sofas', href: '/collections?category=sofas' },
    { name: 'Bedroom', href: '/collections?category=beds' },
    { name: 'Chairs', href: '/collections?category=chairs' },
    { name: 'Dining', href: '/collections?category=dining' },
    { name: 'Office', href: '/collections?category=office' },
    { name: 'Custom Order', href: '/custom-orders' },
    { name: 'Our Craft', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <aside aria-label="Announcement" className="bg-[#181513] text-[#E5C383] text-[11px] md:text-xs py-2 px-4 border-b border-[#2C2623] tracking-wider uppercase font-medium flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between text-center">
          <div className="hidden lg:flex items-center space-x-2 text-[#FAF8F5]/70 lowercase">
            <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
            <span className="capitalize">Hussain Agahi Market, Multan</span>
          </div>

          <div className="w-full lg:w-auto flex items-center justify-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B08D57] animate-pulse"></span>
            <span>Handcrafted in Multan • Nationwide White-Glove Delivery Across Pakistan • 10-Yr Warranty</span>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${PAKWOOD_PHONE}`}
              className="text-[#FAF8F5]/80 hover:text-[#E5C383] transition-colors flex items-center space-x-1"
            >
              <Phone className="w-3 h-3 text-[#B08D57]" />
              <span className="font-semibold">{PAKWOOD_PHONE}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-subtle border-b border-[#E8E2D9] py-3'
            : 'bg-[#FAF8F5] border-b border-[#E8E2D9]/60 py-4 md:py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#1E1B18] hover:text-[#B08D57] transition-colors"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center focus:outline-none">
            <img
              src="./pakwood-logo.svg"
              alt="Pakwood Furniture Multan"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.slice(0, 8).map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setShopDropdownOpen(true)}
                    onMouseLeave={() => setShopDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className="text-[13.5px] font-medium tracking-wide text-[#1E1B18]/85 hover:text-[#B08D57] transition-colors flex items-center space-x-1 py-2"
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </a>

                    {/* Mega Dropdown */}
                    {shopDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-elevated border border-[#E8E2D9] py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {link.items.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-5 py-2.5 text-xs font-medium text-[#1E1B18]/80 hover:text-[#B08D57] hover:bg-[#FAF8F5] transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-[13.5px] font-medium tracking-wide transition-colors relative py-1 ${
                    link.name === 'Custom Order'
                      ? 'text-[#8B5A2B] font-semibold flex items-center space-x-1'
                      : 'text-[#1E1B18]/85 hover:text-[#B08D57]'
                  }`}
                >
                  {link.name === 'Custom Order' && <Sparkles className="w-3 h-3 text-[#B08D57] mr-1" />}
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 md:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-[#1E1B18]/80 hover:text-[#B08D57] hover:bg-white transition-all border border-transparent hover:border-[#E8E2D9]"
              title="Search furniture..."
              aria-label="Search furniture"
            >
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2.5 rounded-full text-[#1E1B18]/80 hover:text-[#B08D57] hover:bg-white transition-all relative border border-transparent hover:border-[#E8E2D9]"
              title="View Wishlist"
              aria-label="View Wishlist"
            >
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#B08D57] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* WhatsApp Ordering Direct Button */}
            <a
              href={getWhatsAppLink({ type: 'inquiry' })}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs md:text-[13px] font-semibold px-3.5 py-2 md:px-4 md:py-2.5 rounded-full shadow-subtle hover:shadow-elevated transition-all btn-press"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="tracking-wide">WhatsApp Order</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Category & Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Pane */}
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-r border-[#E8E2D9]">
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#E8E2D9] flex items-center justify-between bg-white">
              <img src="./pakwood-logo.svg" alt="Pakwood" className="h-9 w-auto" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#7A7570] hover:text-[#1E1B18]"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="p-4 flex-1 overflow-y-auto space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#B08D57] px-3 pt-2 pb-1">
                Explore Collections
              </p>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-[#1E1B18] hover:bg-white hover:text-[#B08D57] transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-[#E8E2D9] mt-4 space-y-3">
                <a
                  href="/custom-orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-xs font-semibold text-[#5C4033] bg-[#EAE5DC]/60 rounded-md"
                >
                  ✨ Custom Furniture & Sizing
                </a>
                <a
                  href={`tel:${PAKWOOD_PHONE}`}
                  className="block px-3 py-2 text-xs text-[#7A7570]"
                >
                  Call Multan Workshop: <strong className="text-[#1E1B18]">{PAKWOOD_PHONE}</strong>
                </a>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#E8E2D9] bg-white">
              <a
                href={getWhatsAppLink({ type: 'inquiry' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3 rounded-lg font-semibold text-sm shadow-subtle"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp ({PAKWOOD_PHONE})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
