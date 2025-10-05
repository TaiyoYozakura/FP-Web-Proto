'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    graduationYear: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useApp();
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.graduationYear)) {
      setError('Please fill in all required fields');
      return;
    }
    setError('');
    setStep(step + 1);
  };
  
  const handlePrev = () => {
    setError('');
    setStep(step - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
          graduationYear: formData.graduationYear
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'LOGIN', payload: data.user });
        router.push('/dashboard');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-background py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg md:text-xl">
              DC
            </div>
            <div className="text-left">
              <span className="text-base sm:text-lg md:text-xl font-bold text-blue-600 block">Dnyanasadhana College</span>
              <span className="text-xs sm:text-sm text-purple-600">Alumni Portal</span>
            </div>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-2 sm:mb-3">Join Our Alumni Network</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Create your account and connect with fellow alumni</p>
        </div>

        <div className="card p-4 sm:p-6 md:p-8 shadow-lg">
          {/* Progress Steps */}
          <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
            {[1, 2].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } transition-colors`}>
                  {num}
                </div>
                {num < 2 && <div className={`w-12 sm:w-16 md:w-20 h-1 mx-1 sm:mx-2 ${step > num ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}></div>}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-4 sm:mb-6">Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-blue-600 mb-1.5 sm:mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-600 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-600 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-600 mb-2">Graduation Year *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                >
                  <option value="">Select Year</option>
                  {Array.from({length: 50}, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleNext}
                className="btn w-full bg-blue-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 text-base sm:text-lg transition-all duration-200"
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-4 sm:mb-6">Create Password</h2>
              <div>
                <label className="block text-sm font-semibold text-blue-600 mb-2">Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-600 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">After Registration:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>✅ Complete your detailed profile</li>
                  <li>✅ Add professional information</li>
                  <li>✅ Connect with fellow alumni</li>
                  <li>✅ Explore opportunities</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 border border-gray-300 text-blue-900 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : '🎉 Create Account'}
                </button>
              </div>
            </div>
          )}


        </div>

        <div className="text-center mt-4 lg:mt-6">
          <p className="text-gray-600 text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}