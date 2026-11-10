import React, { useRef, useState } from 'react';
import { Target, Play, Pause, RotateCcw } from 'lucide-react';
import Footer from '../components/Footer';

export default function UseRefDemo() {
  // Case 1: Direct DOM Manipulation (Focus & Style)
  const inputRef = useRef(null);

  // Case 2: Persisting Mutable Values without causing Re-renders (Timer)
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerIdRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.classList.add('ring-2', 'ring-neonPink');
      setTimeout(() => {
        inputRef.current?.classList.remove('ring-2', 'ring-neonPink');
      }, 1500);
    }
  };

  const startTimer = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerIdRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-6 py-10 w-full space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neonCyan to-neonPurple">
            useRef Hook Demonstration
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Question 3: Concrete interactive examples of <code className="text-neonCyan">useRef</code> for direct DOM access and persistent values without re-render triggers.
          </p>
        </div>

        {/* Demo 1: DOM Focus */}
        <div className="bg-[#0e1026] border border-neonCyan/40 rounded-2xl p-6 shadow-cyanGlow space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="text-neonCyan" /> 1. Direct DOM Node Access (Focus)
          </h2>
          <p className="text-sm text-gray-400">
            Clicking the button invokes <code className="text-neonCyan">inputRef.current.focus()</code> without causing unwanted React component re-renders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Click button to target this input..."
              className="flex-1 bg-[#181a38] border border-gray-700 px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-all"
            />
            <button
              onClick={focusInput}
              className="px-5 py-2.5 rounded-xl bg-neonCyan text-black font-bold text-sm hover:opacity-90 transition shadow-cyanGlow"
            >
              Focus Input Now
            </button>
          </div>
        </div>

        {/* Demo 2: Mutable Ref Interval */}
        <div className="bg-[#0e1026] border border-neonPink/40 rounded-2xl p-6 shadow-pinkGlow space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Play className="text-neonPink" /> 2. Storing Mutable Interval IDs
          </h2>
          <p className="text-sm text-gray-400">
            <code className="text-neonPink">timerIdRef.current</code> persists the <code className="text-neonGreen">setInterval</code> ID across render cycles without needing extra state.
          </p>

          <div className="text-center py-4 bg-[#141634] rounded-xl border border-gray-800">
            <span className="text-5xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-neonCyan">
              {String(seconds).padStart(2, '0')}s
            </span>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={startTimer}
              disabled={isRunning}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold border ${
                isRunning
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-neonGreen bg-neonGreen/10 text-neonGreen hover:bg-neonGreen hover:text-black shadow-greenGlow'
              }`}
            >
              <Play size={16} /> Start
            </button>
            <button
              onClick={pauseTimer}
              disabled={!isRunning}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold border ${
                !isRunning
                  ? 'border-gray-800 text-gray-600 cursor-not-allowed'
                  : 'border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-black'
              }`}
            >
              <Pause size={16} /> Pause
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold border border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}