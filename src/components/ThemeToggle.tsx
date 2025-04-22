
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-colors dark:bg-black/20 dark:border-white/10 dark:hover:bg-black/30"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
