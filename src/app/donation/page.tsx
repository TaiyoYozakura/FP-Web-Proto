'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function DonationPage() {
  const [activeTab, setActiveTab] = useState('donate');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { state, dispatch } = useApp();
  
  const handleDonate = async (category: string, donationAmount: string) => {
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const donation = {
        amount: parseFloat(donationAmount),
        category,
        date: new Date().toLocaleDateString(),
        status: 'Completed'
      };
      
      dispatch({ type: 'ADD_DONATION', payload: donation });
      setIsProcessing(false);
      setShowSuccess(true);
      setAmount('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const quickAmounts = [1000, 5000, 10000, 25000];

  return (
    <div className="min-h-screen bg-theme-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fadeInUp">
            <div className="flex items-center">
              <div className="text-2xl mr-3">✓</div>
              <div>
                <p className="font-semibold">Donation Successful!</p>
                <p className="text-sm">Thank you for your contribution.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 text-center mb-8">
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

        <div className="flex space-x-1 mb-8 bg-theme-surface rounded-lg p-1 shadow-sm w-fit">
          {['donate', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-theme-secondary hover:text-theme-primary'
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
                    <div key={index} className="card p-6 hover:shadow-md transition-shadow">
                      <div className="text-3xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-bold text-theme-primary mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-4">{category.desc}</p>
                      <button 
                        onClick={() => {
                          setSelectedCategory(category.title);
                          if (amount) {
                            handleDonate(category.title, amount);
                          } else {
                            alert('Please enter an amount first');
                          }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Donate Now
                      </button>
                    </div>
                  ))}
                </div>

                {/* Quick Donation */}
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-theme-primary mb-6">Quick Donation</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt.toString())}
                        className={`p-4 rounded-lg border-2 font-semibold transition-colors ${
                          amount === amt.toString()
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-theme hover:border-blue-300'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-theme-primary mb-2">Custom Amount</label>
                    <input
                      type="number"
                      placeholder="Enter amount in ₹"
                      className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-theme-surface text-theme-primary"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => handleDonate('General Fund', amount)}
                    disabled={!amount || isProcessing}
                    className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-theme-primary mb-6">Donation History</h2>
                <div className="space-y-4">
                  {state.donations.length > 0 ? (
                    state.donations.map((donation, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-theme-primary">{donation.category}</p>
                          <p className="text-sm text-gray-600">{donation.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-theme-primary">₹{donation.amount.toLocaleString()}</p>
                          <p className="text-sm text-green-600">{donation.status}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No donations yet. Make your first donation to support the college!</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-4">Impact Stories</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <p className="text-sm text-gray-600">"Thanks to alumni donations, I could complete my engineering degree."</p>
                  <p className="text-xs text-gray-500 mt-1">- Scholarship Recipient 2024</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-4">Tax Benefits</h3>
              <p className="text-sm text-gray-600 mb-2">Your donations are eligible for tax deduction under Section 80G.</p>
              <p className="text-sm text-gray-600">You will receive a tax certificate via email.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}