import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RoomCarousel() {
  const rooms = [
    {
      name: 'Living Room',
      count: '10 Signature Pieces',
      image: './images/banners/banner-sofas.webp',
      link: '#/collections?category=sofas',
      desc: 'Sectional lounges, Turkish velvet tuxedo couches & sculptural bouclé.'
    },
    {
      name: 'Master Bedroom',
      count: '10 Handcrafted Suites',
      image: './images/banners/banner-beds.webp',
      link: '#/collections?category=beds',
      desc: 'Solid Sheesham platform beds, fluted headboards & artisan dressers.'
    },
    {
      name: 'Accent & Lounge Chairs',
      count: '8 Bespoke Chairs',
      image: './images/banners/banner-chairs.webp',
      link: '#/collections?category=chairs',
      desc: 'Mid-century cane armchairs, 360-degree swivels & leather club seating.'
    },
    {
      name: 'Dining & Entertaining',
      count: '6 Royal Dining Sets',
      image: './images/banners/banner-dining.webp',
      link: '#/collections?category=dining',
      desc: 'Thick solid Sheesham tables, butterfly extensions & carver chairs.'
    },
    {
      name: 'Executive Office',
      count: '6 Workstations & Desks',
      image: './images/banners/banner-office.webp',
      link: '#/collections?category=office',
      desc: 'Director desks with cable management, filing credenzas & bookcases.'
    },
    {
      name: 'English Chesterfield',
      count: 'Tufted Icons',
      image: './images/banners/banner-custom-workshop.webp',
      link: '#/collections?room=Chesterfield',
      desc: 'Authentic deep-button tufting, brass studs & waxed leatherite.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header Title with Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#B08D57]">
              Curated Spaces
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1B18] tracking-tight">
              Shop by Room & Ambience
            </h2>
          </div>
          <a
            href="#/collections"
            className="mt-4 md:mt-0 inline-flex items-center space-x-1.5 text-xs md:text-sm font-semibold text-[#8B5A2B] hover:text-[#5C4033] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {rooms.map((room) => (
            <a
              key={room.name}
              href={room.link}
              className="group relative overflow-hidden rounded-xl bg-white shadow-subtle hover:shadow-elevated transition-all duration-300 flex flex-col border border-[#E8E2D9]"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE5DC]">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover object-center img-zoom-hover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                {/* Floating Count Badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1E1B18] text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                  {room.count}
                </span>

                {/* Arrow Icon */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white/90 text-[#1E1B18] flex items-center justify-center shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1E1B18] group-hover:text-[#B08D57] transition-colors">
                    {room.name}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-[#7A7570] font-light leading-relaxed">
                    {room.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E2D9]/60 flex items-center text-xs font-semibold text-[#8B5A2B] group-hover:text-[#5C4033]">
                  <span>Explore Pieces</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
