import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neonCyan/20 bg-[#070814] py-6 text-center text-gray-400">
      <div className="max-w-7xl mx-auto px-4 space-y-1">
        <p className="text-sm font-mono tracking-widest text-gray-400">
          MERN STACK SD HUB ASSIGNMENT MODULE
        </p>
        <p className="text-lg font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]">
          Ammaar Quadri
        </p>
      </div>
    </footer>
  );
}