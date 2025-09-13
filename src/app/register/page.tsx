'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 lg:mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6">
            <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={50} height={50} className="lg:w-15 lg:h-15" />
            <div className="text-left">
              <span className="text-lg lg:text-xl font-bold text-blue-900 block">ST. ANDREWS COLLEGE</span>
              <span className="text-xs lg:text-sm text-gray-600">Alumni Portal</span>
            </div>
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">Join Our Alumni Network</h1>
          <p className="text-gray-600 text-sm lg:text-base">Create your account and connect with fellow alumni</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
          {/* Progress Steps */}
          <div className="flex justify-between mb-6 lg:mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-semibold text-sm lg:text-base ${
                  step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } transition-colors`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-12 lg:w-20 h-1 mx-1 lg:mx-2 ${step > num ? 'bg-blue-600' : 'bg-gray-200'} transition-colors`}></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg lg:text-xl font-bold text-blue-900 mb-4 lg:mb-6">Basic Information</h2>
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Last Name *</label>
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
                <label className="block text-sm font-semibold text-blue-900 mb-2">Email Address *</label>
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
                <label className="block text-sm font-semibold text-blue-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all text-sm lg:text-base"
              >
                Next Step →
              </button>
            </div>
          )}

          {/* Step 2: Academic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-blue-900 mb-6">Academic Information</h2>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Graduation Year *</label>
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
              <h2 className="text-xl font-bold text-blue-900 mb-6">Create Password</h2>
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
                  onClick={handlePrev}
                  className="flex-1 border border-gray-300 text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4 lg:mt-6">
          <p className="text-gray-600 text-sm lg:text-base">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}