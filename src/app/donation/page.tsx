'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DonationPage() {
  const [activeTab, setActiveTab] = useState('donate');
  const [amount, setAmount] = useState('');

  const quickAmounts = [1000, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-header.png" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-gray-600 hover:text-black">Directory</Link>
              <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-12 text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Support Your Alma Mater</h1>
          <p className="text-xl mb-6">Your contribution makes a difference in shaping future leaders</p>
          <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-2xl font-bold mb-2">Total Raised: ₹2.5 Crores</p>
            <div className="bg-white bg-opacity-30 rounded-full h-4 mb-2">
              <div className="bg-white rounded-full h-4 w-2/3"></div>
            </div>
            <p>65% of Annual Goal</p>
          </div>
        </div>

        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['donate', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'donate' ? 'Make a Donation' : 'My Donations'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'donate' && (
              <div className="space-y-8">
                {/* Donation Categories */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Scholarship Fund', desc: 'Support deserving students with financial aid', icon: '🎓' },
                    { title: 'Infrastructure Development', desc: 'Build better facilities and labs', icon: '🏗️' },
                    { title: 'Research Programs', desc: 'Fund cutting-edge research initiatives', icon: '🔬' },
                    { title: 'Sports & Activities', desc: 'Support extracurricular programs', icon: '⚽' }
                  ].map((category, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-bold text-black mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-4">{category.desc}</p>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Donate Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Donation */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-black mb-6">Quick Donation</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className={`p-4 rounded-lg border-2 font-semibold transition-colors ${
                          amount === amt.toString()
                            ? 'border-red-600 bg-red-50 text-red-600'
                            : 'border-gray-300 hover:border-red-300'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-black mb-2">Custom Amount</label>
                    <input
                      type="number"
                      placeholder="Enter amount in ₹"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button className="w-full bg-red-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-red-700 transition-colors">
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-black mb-6">Donation History</h2>
                <div className="space-y-4">
                  {[
                    { date: 'Nov 15, 2024', amount: '₹5,000', category: 'Scholarship Fund', status: 'Completed' },
                    { date: 'Oct 20, 2024', amount: '₹2,500', category: 'Infrastructure', status: 'Completed' }
                  ].map((donation, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-black">{donation.category}</p>
                        <p className="text-sm text-gray-600">{donation.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-black">{donation.amount}</p>
                        <p className="text-sm text-green-600">{donation.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Impact Stories</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="text-sm text-gray-600">"Thanks to alumni donations, I could complete my engineering degree."</p>
                  <p className="text-xs text-gray-500 mt-1">- Scholarship Recipient 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Tax Benefits</h3>
              <p className="text-sm text-gray-600 mb-2">Your donations are eligible for tax deduction under Section 80G.</p>
              <p className="text-sm text-gray-600">You will receive a tax certificate via email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}