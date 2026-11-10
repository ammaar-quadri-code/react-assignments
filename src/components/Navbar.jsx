import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UserCheck, ShoppingBag, Eye, Cpu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Real Estate', icon: Home },
    { to: '/credentials', label: 'Credentials Table', icon: UserCheck },
    { to: '/products', label: 'Products (10/Page)', icon: ShoppingBag },
    { to: '/use-ref', label: 'useRef Demo', icon: Eye },
    { to: '/state-management', label: 'Context vs Zustand', icon: Cpu },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0c0d21]/90 backdrop-blur-md border-b border-neonCyan/30 px-6 py-4 shadow-cyanGlow">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonGreen to-neonPink">
          NEON<span className="text-white">CORE</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 border ${
                  active
                    ? 'border-neonCyan bg-neonCyan/15 text-neonCyan shadow-cyanGlow'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-neonPurple/50 hover:bg-neonPurple/10'
                }`}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}