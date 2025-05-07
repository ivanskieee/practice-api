import { createContext, useState, useContext, useEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check if dark mode preference exists in localStorage
  const storedTheme = localStorage.getItem('darkMode');
  const [darkMode, setDarkMode] = useState(storedTheme === 'true');

  // Apply the theme class to the document when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Store the current preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Toggle function to switch between light and dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}