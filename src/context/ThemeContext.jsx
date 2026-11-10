    import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [accent, setAccent] = useState('cyan'); // 'cyan' | 'pink' | 'green'

  const toggleAccent = (color) => {
    setAccent(color);
  };

  return (
    <ThemeContext.Provider value={{ accent, toggleAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);