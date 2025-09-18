'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FacultyLoginPage() {
  const [formData, setFormData] = useState({
    employeeId: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      if (formData.employeeId && formData.password) {
        alert('Faculty login successful! (Demo)');
        router.push('/');
      } else {
        setError('Please enter valid faculty credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Satish Pradhan Dnyanasadhana College" width={60} height={60} />
            <div className="text-left">
              <span className="text-xl font-bold text-theme-primary block">Satish Pradhan Dnyanasadhana College</span>
              <span className="text-sm text-theme-secondary">Faculty Portal</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-theme-primary mb-3">Faculty Login</h1>
          <p className="text-theme-secondary text-lg">Access your faculty account</p>
        </div>

        <div className="card p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Employee ID</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors bg-theme-surface text-theme-primary"
                placeholder="Enter your employee ID"
                value={formData.employeeId}
                onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
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

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full bg-theme-primary text-white py-4 rounded-lg font-semibold hover:bg-theme-primary-hover disabled:opacity-50 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span>Signing In...</span>
                </div>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-theme-secondary hover:text-theme-primary transition-colors text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}