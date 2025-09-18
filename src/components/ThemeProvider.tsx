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
    '--border': '#e5e7eb',
    '--theme-border': '#d1d5db'
  },
  dark: {
    '--primary': '#ef4444',
    '--primary-hover': '#dc2626',
    '--secondary': '#9ca3af',
    '--background': '#111827',
    '--surface': '#1f2937',
    '--text-primary': '#f9fafb',
    '--text-secondary': '#d1d5db',
    '--border': '#374151',
    '--theme-border': '#4b5563'
  },
  purple: {
    '--primary': '#673ab7',
    '--primary-hover': '#5e35b1',
    '--secondary': '#ffc107',
    '--background': '#faf8ff',
    '--surface': '#ffffff',
    '--text-primary': '#4a148c',
    '--text-secondary': '#7b1fa2',
    '--border': '#f3e5f5',
    '--theme-border': '#e1bee7'
  },
  skyblue: {
    '--primary': '#03a9f4',
    '--primary-hover': '#0288d1',
    '--secondary': '#ff9800',
    '--background': '#f1f8ff',
    '--surface': '#ffffff',
    '--text-primary': '#01579b',
    '--text-secondary': '#0277bd',
    '--border': '#e1f5fe',
    '--theme-border': '#b3e5fc'
  },
  oxford: {
    '--primary': '#002147',
    '--primary-hover': '#001635',
    '--secondary': '#c5a572',
    '--background': '#fefefe',
    '--surface': '#ffffff',
    '--text-primary': '#002147',
    '--text-secondary': '#4a5568',
    '--border': '#e2e8f0',
    '--theme-border': '#cbd5e0'
  },
  harvard: {
    '--primary': '#a51c30',
    '--primary-hover': '#8b1538',
    '--secondary': '#f8f9fa',
    '--background': '#ffffff',
    '--surface': '#ffffff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#6c757d',
    '--border': '#dee2e6',
    '--theme-border': '#ced4da'
  },
  mithibai: {
    '--primary': '#ff5722',
    '--primary-hover': '#e64a19',
    '--secondary': '#2196f3',
    '--background': '#fafafa',
    '--surface': '#ffffff',
    '--text-primary': '#212121',
    '--text-secondary': '#757575',
    '--border': '#e0e0e0',
    '--theme-border': '#bdbdbd'
  },
  kc: {
    '--primary': '#4caf50',
    '--primary-hover': '#388e3c',
    '--secondary': '#ffeb3b',
    '--background': '#f8fdf8',
    '--surface': '#ffffff',
    '--text-primary': '#1b5e20',
    '--text-secondary': '#4caf50',
    '--border': '#e8f5e8',
    '--theme-border': '#c8e6c9'
  },
  wilson: {
    '--primary': '#1976d2',
    '--primary-hover': '#1565c0',
    '--secondary': '#90caf9',
    '--background': '#f5f7fa',
    '--surface': '#ffffff',
    '--text-primary': '#0d47a1',
    '--text-secondary': '#1976d2',
    '--border': '#e3f2fd',
    '--theme-border': '#bbdefb'
  },
  dnyanasadhana: {
    '--primary': '#1e3a8a',
    '--primary-hover': '#1e40af',
    '--secondary': '#f59e0b',
    '--background': '#f8fafc',
    '--surface': '#ffffff',
    '--text-primary': '#1e293b',
    '--text-secondary': '#475569',
    '--border': '#e2e8f0',
    '--theme-border': '#cbd5e1'
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