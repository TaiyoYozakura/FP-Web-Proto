'use client';

import { useApp } from '@/contexts/AppContext';
import { useEffect } from 'react';

const themes = {
  default: {
    '--primary': '#dc2626',
    '--primary-hover': '#b91c1c',
    '--secondary': '#6b7280',
    '--background': '#f9fafb',
    '--surface': '#ffffff',
    '--text-primary': '#111827',
    '--text-secondary': '#6b7280',
    '--border': '#e5e7eb'
  },
  dark: {
    '--primary': '#ef4444',
    '--primary-hover': '#dc2626',
    '--secondary': '#9ca3af',
    '--background': '#111827',
    '--surface': '#1f2937',
    '--text-primary': '#f9fafb',
    '--text-secondary': '#d1d5db',
    '--border': '#374151'
  },
  purple: {
    '--primary': '#6c3185',
    '--primary-hover': '#5a2a6f',
    '--secondary': '#f7c500',
    '--background': '#fefcf7',
    '--surface': '#ffffff',
    '--text-primary': '#2d1b69',
    '--text-secondary': '#6c3185',
    '--border': '#f7c500'
  },
  skyblue: {
    '--primary': '#0ea5e9',
    '--primary-hover': '#0284c7',
    '--secondary': '#fbbf24',
    '--background': '#f0f9ff',
    '--surface': '#ffffff',
    '--text-primary': '#0c4a6e',
    '--text-secondary': '#0369a1',
    '--border': '#bae6fd'
  }
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { state } = useApp();

  useEffect(() => {
    const root = document.documentElement;
    const themeVars = themes[state.theme as keyof typeof themes] || themes.default;
    
    Object.entries(themeVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [state.theme]);

  return <>{children}</>;
}