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
  },
  oxford: {
    '--primary': '#002147',
    '--primary-hover': '#001a38',
    '--secondary': '#d4af37',
    '--background': '#f8f9fa',
    '--surface': '#ffffff',
    '--text-primary': '#002147',
    '--text-secondary': '#495057',
    '--border': '#d4af37'
  },
  harvard: {
    '--primary': '#a41e22',
    '--primary-hover': '#8b1a1d',
    '--secondary': '#ffffff',
    '--background': '#fefefe',
    '--surface': '#ffffff',
    '--text-primary': '#2c2c2c',
    '--text-secondary': '#666666',
    '--border': '#e9ecef'
  },
  mithibai: {
    '--primary': '#ff6b35',
    '--primary-hover': '#e55a2b',
    '--secondary': '#1e88e5',
    '--background': '#fff8f5',
    '--surface': '#ffffff',
    '--text-primary': '#2c2c2c',
    '--text-secondary': '#666666',
    '--border': '#ffccb3'
  },
  kc: {
    '--primary': '#2e7d32',
    '--primary-hover': '#1b5e20',
    '--secondary': '#ffc107',
    '--background': '#f1f8e9',
    '--surface': '#ffffff',
    '--text-primary': '#1b5e20',
    '--text-secondary': '#388e3c',
    '--border': '#c8e6c9'
  },
  wilson: {
    '--primary': '#1565c0',
    '--primary-hover': '#0d47a1',
    '--secondary': '#bdbdbd',
    '--background': '#f3f7ff',
    '--surface': '#ffffff',
    '--text-primary': '#0d47a1',
    '--text-secondary': '#1976d2',
    '--border': '#bbdefb'
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