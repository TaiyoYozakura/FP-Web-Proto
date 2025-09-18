'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { state, dispatch } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login - find user in alumni list
    const user = state.alumni.find(a => a.email === formData.email);
    
    setTimeout(() => {
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6 lg:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
            <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={50} height={50} className="lg:w-15 lg:h-15" />
            <div className="text-left">
              <span className="text-lg lg:text-xl font-bold text-theme-primary block">ST. ANDREWS COLLEGE</span>
              <span className="text-xs lg:text-sm text-theme-secondary">Alumni Portal</span>
            </div>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-theme-primary mb-2">Welcome Back</h1>
          <p className="text-theme-secondary text-sm lg:text-base">Sign in to your alumni account</p>
        </div>

        <div className="bg-theme-surface rounded-2xl shadow-xl p-6 lg:p-8 border border-theme">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-theme text-theme-primary focus:ring-theme-primary" />
                <span className="ml-2 text-sm text-theme-secondary">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-theme-primary hover:text-theme-secondary font-semibold">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn ripple w-full bg-theme-primary text-white py-3 rounded-lg font-semibold hover:bg-theme-primary-hover disabled:opacity-50 text-sm lg:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white mr-2"></div>
                  <span className="text-sm lg:text-base">Signing In...</span>
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 lg:mt-8 text-center">
            <p className="text-theme-secondary text-sm lg:text-base">
              Don't have an account?{' '}
              <Link href="/register" className="text-theme-primary hover:text-theme-secondary font-semibold">Register here</Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-4 lg:mt-6">
          <Link href="/" className="text-theme-secondary hover:text-theme-primary transition-colors text-sm lg:text-base">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}