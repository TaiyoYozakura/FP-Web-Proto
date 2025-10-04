'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card, CardBody, Input, Button, Checkbox } from '@heroui/react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.ok) {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-background flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              DC
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-blue-600 block">Dnyanasadhana College</span>
              <span className="text-sm text-purple-600">Alumni Portal</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-blue-600 mb-3">Alumni Login</h1>
          <p className="text-gray-600 text-lg">Sign in to your alumni account</p>
        </div>

        <Card className="shadow-lg">
          <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email Address"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              isRequired
              color="primary"
              variant="bordered"
              classNames={{
                label: "text-blue-600 font-semibold"
              }}
            />

            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              isRequired
              color="primary"
              variant="bordered"
              classNames={{
                label: "text-blue-600 font-semibold"
              }}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <Checkbox size="sm" color="primary">
                <span className="text-gray-600">Remember me</span>
              </Checkbox>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-purple-600 font-semibold">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              size="lg"
              color="primary"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-lg">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors">Register here</Link>
              </p>
            </div>
          </CardBody>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-lg">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}