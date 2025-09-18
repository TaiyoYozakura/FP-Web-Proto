'use client';

import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function ClientThemeLoader() {
  const { state, dispatch } = useApp();

  useEffect(() => {
    const savedTheme = localStorage.getItem('globalDefaultTheme');
    if (savedTheme && savedTheme !== state.theme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }
  }, []);

  return null;
}