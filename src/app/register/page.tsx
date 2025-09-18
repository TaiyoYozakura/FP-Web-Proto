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
    phone: '',
    graduationYear: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useApp();
  const router = useRouter();

  const handleNext = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email)) {
      setError('Please fill in all required fields');
      return;
    }
    if (step === 2 && !formData.graduationYear) {
      setError('Please select your graduation year');
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
    
    // Check if email already exists
    const existingUser = state.alumni.find(a => a.email === formData.email);
    if (existingUser) {
      setError('Email already registered');
      setIsLoading(false);
      return;
    }
    
    setTimeout(() => {
      dispatch({ 
        type: 'REGISTER', 
        payload: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          graduationYear: formData.graduationYear,
          isLoggedIn: true,
          id: ''
        }
      });
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-theme-background py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" width={60} height={60} />
            <div className="text-left">
              <span className="text-xl font-bold text-theme-primary block">Dnyanasadhana College</span>
              <span className="text-sm text-theme-secondary">Alumni Portal</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-theme-primary mb-3">Join Our Alumni Network</h1>
          <p className="text-theme-secondary text-lg">Create your account and connect with fellow alumni</p>
        </div>

        <div className="card p-8 shadow-lg">
          {/* Progress Steps */}
          <div className="flex justify-between mb-6 lg:mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= num ? 'bg-theme-primary text-white' : 'bg-gray-200 text-gray-600'
                } transition-colors`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-20 h-1 mx-2 ${step > num ? 'bg-theme-primary' : 'bg-gray-200'} transition-colors`}></div>}
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
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-theme-primary mb-6">Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-theme-primary mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-2">Email Address *</label>
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
                <label className="block text-sm font-semibold text-theme-primary mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button
                onClick={handleNext}
                className="btn w-full bg-theme-primary text-white py-4 rounded-lg font-semibold hover:bg-theme-primary-hover text-lg"
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 2: Academic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-theme-primary mb-6">Academic Information</h2>
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-2">Graduation Year *</label>
                <select
                  required
                  className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                >
                  <option value="">Select Year</option>
                  {Array.from({length: 50}, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 border border-gray-300 text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Password */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-theme-primary mb-6">Create Password</h2>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 border border-gray-300 text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4 lg:mt-6">
          <p className="text-theme-secondary text-lg">
            Already have an account?{' '}
            <Link href="/login" className="text-theme-primary hover:text-theme-secondary font-semibold">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}