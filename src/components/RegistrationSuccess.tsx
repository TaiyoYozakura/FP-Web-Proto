'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RegistrationSuccessProps {
  userName: string;
  email: string;
}

export default function RegistrationSuccess({ userName, email }: RegistrationSuccessProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-lg mx-auto text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">Welcome to the Family!</h2>
        <p className="text-gray-600 text-lg">
          Congratulations <strong>{userName}</strong>!<br />
          Your alumni account has been created successfully.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
          <span className="mr-2">🚀</span>
          Complete Your Journey
        </h3>
        <div className="text-sm text-blue-700 space-y-2">
          <div className="flex items-center">
            <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
            <span><strong>Complete Profile</strong> - Add professional details, bio, photo</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
            <span><strong>Connect & Network</strong> - Find classmates and industry peers</span>
          </div>
          <div className="flex items-center">
            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
            <span><strong>Explore Opportunities</strong> - Jobs, events, mentorship</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          href="/profile"
          className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 text-center"
        >
          📝 Complete Profile First (Recommended)
        </Link>
        
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full border-2 border-blue-300 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
        >
          🚀 Skip to Dashboard
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
          <p className="text-xs text-yellow-800 font-semibold">
            ⚠️ Profile Completion: 25% - Add more details to unlock full features!
          </p>
        </div>
        <p className="text-xs text-gray-500">
          Welcome email sent to <strong>{email}</strong>
        </p>
      </div>
    </div>
  );
}