import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCartStore } from '../store/useCartStore';
import { Layers, ShoppingCart, Trash2, Palette } from 'lucide-react';
import Footer from '../components/Footer';

export default function StateComparison() {
  // 1. React Context (Theme Accent)
  const { accent, toggleAccent } = useTheme();

  // 2. Zustand Store (Global Cart)
  const { cart, removeFromCart, clearCart, addToCart } = useCartStore();

  const mockItem = {
    id: Date.now(),
    title: 'Cyber Deck HUD v2',
    price: 49.99,
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-6 py-10 w-full space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonGreen to-neonPink">
            State Management: useContext vs Zustand
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Question 4: Hands-on implementation comparing React's native <code className="text-neonCyan">useContext</code> with <code className="text-neonGreen">Zustand</code> state engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Box 1: useContext */}
          <div className="bg-[#0f1128] border border-neonCyan/40 rounded-2xl p-6 shadow-cyanGlow flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-neonCyan font-bold text-lg">
                <Palette /> useContext (Theme State)
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Uses React&apos;s built-in <code className="text-neonCyan">createContext</code> and <code className="text-neonCyan">useContext</code>. Best for low-frequency global settings like themes or current logged-in user.
              </p>

              <div className="p-4 rounded-xl bg-[#151838] border border-gray-700 space-y-2">
                <div className="text-xs text-gray-400 font-mono">Current Context Accent:</div>
                <div className="text-2xl font-black font-mono capitalize" style={{
                  color: accent === 'cyan' ? '#00f3ff' : accent === 'pink' ? '#ff007f' : '#00ff66'
                }}>
                  {accent} Glow
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono text-gray-400">Switch Theme Context:</div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAccent('cyan')}
                  className="flex-1 py-2 text-xs font-bold rounded-lg border border-neonCyan bg-neonCyan/10 text-neonCyan hover:bg-neonCyan hover:text-black"
                >
                  Cyan
                </button>
                <button
                  onClick={() => toggleAccent('pink')}
                  className="flex-1 py-2 text-xs font-bold rounded-lg border border-neonPink bg-neonPink/10 text-neonPink hover:bg-neonPink hover:text-black"
                >
                  Pink
                </button>
                <button
                  onClick={() => toggleAccent('green')}
                  className="flex-1 py-2 text-xs font-bold rounded-lg border border-neonGreen bg-neonGreen/10 text-neonGreen hover:bg-neonGreen hover:text-black"
                >
                  Green
                </button>
              </div>
            </div>
          </div>

          {/* Box 2: Zustand */}
          <div className="bg-[#0f1128] border border-neonGreen/40 rounded-2xl p-6 shadow-greenGlow flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neonGreen font-bold text-lg">
                  <ShoppingCart /> Zustand (Cart Store)
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neonGreen/10 border border-neonGreen/30 text-neonGreen">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Uses external store with zero provider boilerplate. High-speed, avoids unnecessary component tree re-renders.
              </p>

              {/* Cart Items list */}
              <div className="p-3 rounded-xl bg-[#151838] border border-gray-700 max-h-40 overflow-y-auto space-y-2">
                {cart.length === 0 ? (
                  <p className="text-xs text-gray-500 font-mono text-center py-4">Cart is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs font-mono border-b border-gray-800 pb-1">
                      <span className="text-white truncate max-w-[150px]">{item.title} (x{item.quantity})</span>
                      <div className="flex items-center gap-2">
                        <span className="text-neonGreen">${(item.price * item.quantity).toFixed(2)}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addToCart(mockItem)}
                className="flex-1 py-2 rounded-xl bg-neonGreen text-black font-bold text-xs hover:opacity-90 transition shadow-greenGlow"
              >
                + Add Sample Item
              </button>
              <button
                onClick={clearCart}
                className="px-4 py-2 rounded-xl border border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400 text-xs font-mono transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}