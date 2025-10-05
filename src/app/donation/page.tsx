'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SmartDonationTracker from '@/components/SmartDonationTracker';
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <SmartDonationTracker />
        
        {/* Legacy donation form below */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💳 Quick Donation (Legacy)</h2>
        
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
        
        {/* Hero Section - Dnyanasadhana Design */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 sm:p-8 md:p-12 text-center mb-6 sm:mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute w-32 h-32 bg-white rounded-full -top-16 -left-16"></div>
            <div className="absolute w-24 h-24 bg-white rounded-full top-20 right-10"></div>
            <div className="absolute w-16 h-16 bg-white rounded-full bottom-10 left-1/4"></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-3 sm:gap-4">
              <img src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">Support Dnyanasadhana College</h1>
                <p className="text-sm sm:text-base md:text-lg opacity-90">Building Tomorrow's Leaders Since 1964</p>
              </div>
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4">Your generous contribution helps us continue our mission of academic excellence in Commerce, Arts, and Sciences</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 max-w-md mx-auto border border-white/30">
              <p className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Total Alumni Contributions: ₹10.2 Crores</p>
              <div className="bg-white/30 rounded-full h-4 mb-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full h-4 w-3/4 shadow-sm"></div>
              </div>
              <p className="text-sm opacity-90">75% of Annual Development Goal Achieved</p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 mb-6 sm:mb-8 bg-theme-surface rounded-lg p-1 shadow-sm w-full sm:w-fit overflow-x-auto">
          {['donate', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-4 sm:px-5 md:px-6 py-2 rounded-md text-sm sm:text-base font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab ? 'bg-blue-600 text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              {tab === 'donate' ? 'Make a Donation' : 'My Donations'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'donate' && (
              <div className="space-y-8">
                {/* Donation Categories - Dnyanasadhana Focus */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                  {[
                    { 
                      title: 'Merit Scholarships', 
                      desc: 'Support bright students from economically weaker sections', 
                      icon: '🎓',
                      impact: '₹2.5L raised',
                      color: 'from-blue-500 to-blue-600'
                    },
                    { 
                      title: 'Digital Library & Labs', 
                      desc: 'Modern computer labs and digital learning resources', 
                      icon: '💻',
                      impact: '₹5.2L raised',
                      color: 'from-purple-500 to-purple-600'
                    },
                    { 
                      title: 'Commerce Research Center', 
                      desc: 'Advanced research in commerce and management studies', 
                      icon: '📊',
                      impact: '₹1.8L raised',
                      color: 'from-green-500 to-green-600'
                    },
                    { 
                      title: 'Cultural & Sports Complex', 
                      desc: 'Enhanced facilities for arts, sports and cultural activities', 
                      icon: '🏆',
                      impact: '₹3.1L raised',
                      color: 'from-orange-500 to-orange-600'
                    }
                  ].map((category, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-100">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-xl sm:text-2xl text-white mb-3 sm:mb-4 shadow-lg`}>
                        {category.icon}
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-600 mb-2">{category.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 leading-relaxed">{category.desc}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">{category.impact}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedCategory(category.title);
                          if (amount) {
                            handleDonate(category.title, amount);
                          } else {
                            alert('Please enter an amount first');
                          }
                        }}
                        className={`w-full bg-gradient-to-r ${category.color} text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg transition-all transform hover:scale-105`}
                      >
                        Contribute Now
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
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-blue-600 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Success Stories
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4 bg-blue-50 p-3 rounded-r-lg">
                  <p className="text-sm text-gray-700 italic">"Alumni scholarship helped me pursue B.Com and now I'm a CA. Forever grateful to Dnyanasadhana family!"</p>
                  <p className="text-xs text-blue-600 mt-2 font-semibold">- Priya Mehta, CA • Class of 2020</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-4 bg-purple-50 p-3 rounded-r-lg">
                  <p className="text-sm text-gray-700 italic">"New computer lab funded by alumni made my IT dreams possible. Now working at TCS!"</p>
                  <p className="text-xs text-purple-600 mt-2 font-semibold">- Rahul Sharma, Software Engineer • Class of 2022</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-700 mb-4 flex items-center">
                <span className="text-green-600 mr-2">💰</span>
                Tax Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <p className="text-sm text-gray-700">100% tax deduction under Section 80G of Income Tax Act</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <p className="text-sm text-gray-700">Instant tax certificate via email</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">✓</span>
                  <p className="text-sm text-gray-700">Recognized by Government of Maharashtra</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
                <p className="text-xs text-green-600 font-semibold">Registration No: 80G/2024/DNYANA/001</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}