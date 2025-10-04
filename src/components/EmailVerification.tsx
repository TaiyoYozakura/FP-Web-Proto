'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
}

export default function EmailVerification({ email, onVerified }: EmailVerificationProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      // Simulate verification API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production: verify with backend
      if (code === '123456') {
        onVerified();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');

    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Success message would be shown here
    } catch (error) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📧</span>
        </div>
        <h2 className="text-2xl font-bold text-blue-600 mb-2">Verify Your Email</h2>
        <p className="text-gray-600">
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-blue-600 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            maxLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-mono tracking-widest"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || code.length !== 6}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Verifying...
            </div>
          ) : 'Verify Email'}
        </button>

        <div className="text-center">
          <p className="text-gray-600 text-sm mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 hover:text-purple-600 font-semibold text-sm transition-colors disabled:opacity-50"
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </button>
        </div>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            For demo purposes, use code: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
}