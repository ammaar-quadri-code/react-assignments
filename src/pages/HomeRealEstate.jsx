import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, Maximize2, Sparkles, Building2 } from 'lucide-react';
import Footer from '../components/Footer';

const properties = [
  {
    id: 1,
    title: 'Cyberpunk Penthouse',
    location: 'Neo-Tokyo District 9',
    price: '$1,450,000',
    beds: 3,
    baths: 2,
    area: '2,200 sqft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    type: 'Penthouse'
  },
  {
    id: 2,
    title: 'Neon Horizon Villa',
    location: 'Cyber Palm Islands',
    price: '$2,890,000',
    beds: 5,
    baths: 4,
    area: '4,500 sqft',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
    type: 'Villa'
  },
  {
    id: 3,
    title: 'Matrix Modern Condo',
    location: 'Sector 7 Tech Hub',
    price: '$780,000',
    beds: 2,
    baths: 2,
    area: '1,350 sqft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    type: 'Condo'
  }
];

export default function HomeRealEstate() {
  const [filterType, setFilterType] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = properties.filter((p) => {
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase()) ||
                          p.location.toLowerCase().includes(query.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 py-12 w-full space-y-16">
        {/* Hero Section */}
        <div className="relative text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neonCyan/40 bg-neonCyan/10 text-neonCyan text-xs tracking-widest font-mono uppercase shadow-cyanGlow">
            <Sparkles size={14} /> Luxury Cyber Real Estate
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Find Your Dream Home In <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonGreen to-neonPurple">
              The Neon Metaverse
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg">
            High-tech architectural properties engineered for tomorrow. Fully dynamic, verified smart contracts and premium spaces.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 p-2 bg-[#101228] border border-neonPurple/40 rounded-2xl shadow-pinkGlow">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 bg-[#181a38] rounded-xl">
              <Search size={18} className="text-neonCyan" />
              <input
                type="text"
                placeholder="Search city, district, or building..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm focus:outline-none text-white placeholder-gray-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#181a38] text-neonGreen font-semibold border border-neonGreen/30 px-4 py-2 rounded-xl text-sm focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Villa">Villa</option>
              <option value="Condo">Condo</option>
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
              <Building2 className="text-neonCyan" /> Featured Residences
            </h2>
            <span className="text-sm font-mono text-neonGreen">Showing {filtered.length} Properties</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#0e1024] border border-gray-800 rounded-2xl overflow-hidden hover:border-neonCyan transition-all duration-300 hover:shadow-cyanGlow flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-neonPink/60 text-neonPink px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.type}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0c0d21]/90 backdrop-blur-md text-neonCyan font-mono font-bold px-3 py-1 rounded-lg border border-neonCyan/30">
                    {item.price}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-neonCyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MapPin size={14} className="text-neonPurple" /> {item.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-800/80 text-xs text-gray-300 font-mono text-center">
                    <span className="flex items-center justify-center gap-1"><Bed size={14} className="text-neonCyan" /> {item.beds} Beds</span>
                    <span className="flex items-center justify-center gap-1"><Bath size={14} className="text-neonGreen" /> {item.baths} Baths</span>
                    <span className="flex items-center justify-center gap-1"><Maximize2 size={14} className="text-neonPink" /> {item.area}</span>
                  </div>

                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 border border-neonCyan/50 text-neonCyan hover:bg-neonCyan hover:text-black font-semibold text-sm transition-all duration-300 shadow-cyanGlow">
                    Schedule Virtual Tour
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}