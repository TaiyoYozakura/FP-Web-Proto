'use client';

import { useState, useEffect } from 'react';
import { initializeRazorpay, createRazorpayOrder, processRazorpayPayment } from '@/lib/razorpay';

interface Donation {
  id: string;
  donor: string;
  amount: number;
  purpose: string;
  date: string;
  isAnonymous: boolean;
  batch?: string;
  message?: string;
}

interface DonationGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  impact: string;
  donors: number;
}

export default function SmartDonationTracker() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [goals, setGoals] = useState<DonationGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [totalRaised, setTotalRaised] = useState(0);
  const [impactStats, setImpactStats] = useState({
    scholarships: 0,
    infrastructure: 0,
    events: 0,
    research: 0
  });

  useEffect(() => {
    const loadDonationData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockGoals: DonationGoal[] = [
        {
          id: '1',
          title: 'Student Scholarship Fund 2024',
          description: 'Support deserving students with financial assistance for their education',
          targetAmount: 1000000,
          currentAmount: 750000,
          deadline: '2024-12-31',
          category: 'Education',
          impact: '50 students supported',
          donors: 125
        },
        {
          id: '2',
          title: 'Digital Library Upgrade',
          description: 'Modern computers, high-speed internet, and digital resources for students',
          targetAmount: 500000,
          currentAmount: 320000,
          deadline: '2024-06-30',
          category: 'Infrastructure',
          impact: '2000+ students benefited',
          donors: 89
        },
        {
          id: '3',
          title: 'Annual Alumni Meet 2024',
          description: 'Grand reunion event with cultural programs and networking sessions',
          targetAmount: 200000,
          currentAmount: 180000,
          deadline: '2024-03-15',
          category: 'Events',
          impact: '500+ alumni expected',
          donors: 156
        },
        {
          id: '4',
          title: 'Research Innovation Lab',
          description: 'State-of-the-art research facility for commerce and management studies',
          targetAmount: 800000,
          currentAmount: 245000,
          deadline: '2024-09-30',
          category: 'Research',
          impact: 'Future research hub',
          donors: 34
        }
      ];

      const mockDonations: Donation[] = [
        {
          id: '1', donor: 'Rajesh Sharma', amount: 50000, purpose: 'Scholarship Fund',
          date: '2024-01-15', isAnonymous: false, batch: '2018', message: 'Happy to give back to my alma mater!'
        },
        {
          id: '2', donor: 'Anonymous', amount: 25000, purpose: 'Digital Library',
          date: '2024-01-14', isAnonymous: true, message: 'For the future generation'
        },
        {
          id: '3', donor: 'Priya Mehta', amount: 15000, purpose: 'Alumni Meet',
          date: '2024-01-13', isAnonymous: false, batch: '2017', message: 'Looking forward to the reunion!'
        },
        {
          id: '4', donor: 'Amit Kumar', amount: 75000, purpose: 'Scholarship Fund',
          date: '2024-01-12', isAnonymous: false, batch: '2016', message: 'Education is the key to success'
        },
        {
          id: '5', donor: 'Anonymous', amount: 100000, purpose: 'Research Lab',
          date: '2024-01-11', isAnonymous: true, message: 'Supporting innovation'
        }
      ];

      setGoals(mockGoals);
      setDonations(mockDonations);
      
      const total = mockDonations.reduce((sum, d) => sum + d.amount, 0);
      setTotalRaised(total);

      // Calculate impact stats
      setImpactStats({
        scholarships: mockDonations.filter(d => d.purpose.includes('Scholarship')).reduce((sum, d) => sum + d.amount, 0),
        infrastructure: mockDonations.filter(d => d.purpose.includes('Library')).reduce((sum, d) => sum + d.amount, 0),
        events: mockDonations.filter(d => d.purpose.includes('Meet')).reduce((sum, d) => sum + d.amount, 0),
        research: mockDonations.filter(d => d.purpose.includes('Research')).reduce((sum, d) => sum + d.amount, 0)
      });

      setIsLoading(false);
    };

    loadDonationData();
  }, []);

  const handleDonation = async () => {
    if (!donationAmount || !donorName || !selectedGoal) {
      alert('Please fill all required fields');
      return;
    }

    const amount = parseFloat(donationAmount);
    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Initialize Razorpay
    const isRazorpayLoaded = await initializeRazorpay();
    if (!isRazorpayLoaded) {
      alert('Payment gateway failed to load. Please try again.');
      return;
    }

    // Create Razorpay order
    const goalTitle = goals.find(g => g.id === selectedGoal)?.title || 'General';
    const orderData = await createRazorpayOrder(amount, goalTitle);
    
    if (!orderData.success) {
      alert('Failed to create payment order. Please try again.');
      return;
    }

    const options = {
      key: 'rzp_test_1234567890', // Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Dnyanasadhana College',
      description: `Donation for ${goalTitle}`,
      order_id: orderData.order_id,
      handler: (response: any) => {
        // Payment successful
        const newDonation: Donation = {
          id: response.razorpay_payment_id,
          donor: isAnonymous ? 'Anonymous' : donorName,
          amount: amount,
          purpose: goalTitle,
          date: new Date().toISOString().split('T')[0],
          isAnonymous: isAnonymous,
          message: donationMessage
        };

        // Update donations
        setDonations(prev => [newDonation, ...prev]);
        
        // Update goal progress
        setGoals(prev => prev.map(goal => 
          goal.id === selectedGoal 
            ? { ...goal, currentAmount: goal.currentAmount + amount, donors: goal.donors + 1 }
            : goal
        ));

        // Update total
        setTotalRaised(prev => prev + amount);

        // Reset form
        setDonationAmount('');
        setDonorName('');
        setDonationMessage('');
        setIsAnonymous(false);
        setSelectedGoal(null);
        setShowDonationForm(false);

        alert('🎉 Payment successful! Thank you for your generous donation. Tax certificate will be sent to your email.');
      },
      prefill: {
        name: isAnonymous ? 'Anonymous Donor' : donorName,
        email: 'donor@example.com', // You can add email field
        contact: '9999999999' // You can add phone field
      },
      theme: {
        color: '#2563eb' // Blue color matching your theme
      },
      modal: {
        ondismiss: () => {
          console.log('Payment cancelled by user');
        }
      }
    };

    processRazorpayPayment(options);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Education': '🎓',
      'Infrastructure': '🏗️',
      'Events': '🎉',
      'Research': '🔬'
    };
    return icons[category] || '💰';
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded"></div>)}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl mr-3">💰</span>
          <div>
            <h3 className="text-2xl font-bold text-green-800">Smart Donation Tracker</h3>
            <p className="text-gray-600">Real-time impact • ₹{totalRaised.toLocaleString()} raised</p>
          </div>
        </div>
        <button
          onClick={() => setShowDonationForm(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
        >
          💝 Donate Now
        </button>
      </div>

      {/* Impact Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎓</span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">Education</span>
          </div>
          <h4 className="font-bold text-blue-800">Scholarships</h4>
          <p className="text-xl font-bold text-blue-600">₹{(impactStats.scholarships / 100000).toFixed(1)}L</p>
          <p className="text-xs text-blue-600">50+ students supported</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🏗️</span>
            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-bold">Infrastructure</span>
          </div>
          <h4 className="font-bold text-purple-800">Infrastructure</h4>
          <p className="text-xl font-bold text-purple-600">₹{(impactStats.infrastructure / 100000).toFixed(1)}L</p>
          <p className="text-xs text-purple-600">Digital upgrades</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎉</span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Events</span>
          </div>
          <h4 className="font-bold text-green-800">Events</h4>
          <p className="text-xl font-bold text-green-600">₹{(impactStats.events / 100000).toFixed(1)}L</p>
          <p className="text-xs text-green-600">Alumni networking</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🔬</span>
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-bold">Research</span>
          </div>
          <h4 className="font-bold text-orange-800">Research</h4>
          <p className="text-xl font-bold text-orange-600">₹{(impactStats.research / 100000).toFixed(1)}L</p>
          <p className="text-xs text-orange-600">Innovation lab</p>
        </div>
      </div>

      {/* Active Goals */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-800 mb-4">🎯 Active Donation Goals</h4>
        <div className="grid md:grid-cols-2 gap-6">
          {goals.map(goal => {
            const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{getCategoryIcon(goal.category)}</span>
                    <div>
                      <h5 className="font-bold text-gray-800">{goal.title}</h5>
                      <p className="text-sm text-gray-600">{goal.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      {percentage}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{daysLeft} days left</div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4">{goal.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(percentage)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">{goal.donors}</span> donors • <span className="font-semibold">{goal.impact}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedGoal(goal.id);
                    setShowDonationForm(true);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <span className="mr-2">💳</span>
                  Donate Securely
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Donations */}
      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-800 mb-4">🏆 Recent Donations</h4>
        <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
          <div className="space-y-3">
            {donations.slice(0, 10).map(donation => (
              <div key={donation.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {donation.isAnonymous ? '?' : donation.donor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <h6 className="font-semibold text-gray-800">{donation.donor}</h6>
                      <p className="text-sm text-gray-600">{donation.purpose}</p>
                      {donation.message && (
                        <p className="text-xs text-gray-500 italic mt-1">"{donation.message}"</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">₹{donation.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{donation.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-green-800">💝 Make a Donation</h4>
              <button
                onClick={() => setShowDonationForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Goal</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  value={selectedGoal || ''}
                  onChange={(e) => setSelectedGoal(e.target.value)}
                >
                  <option value="">Choose a cause</option>
                  {goals.map(goal => (
                    <option key={goal.id} value={goal.id}>{goal.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Donation Amount (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
                <div className="flex space-x-2 mt-2">
                  {[1000, 5000, 10000, 25000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount.toString())}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded text-sm font-semibold hover:bg-gray-200"
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  disabled={isAnonymous}
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-700">Donate anonymously</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 h-20"
                  placeholder="Leave a message for the college..."
                  value={donationMessage}
                  onChange={(e) => setDonationMessage(e.target.value)}
                ></textarea>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  <strong>Tax Benefit:</strong> Your donation is eligible for 80G tax deduction. 
                  Certificate will be emailed within 24 hours.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 mr-2">🔒</span>
                  <span className="text-sm font-semibold text-blue-800">Secure Payment via Razorpay</span>
                </div>
                <p className="text-xs text-blue-700">
                  Your payment is secured with 256-bit SSL encryption. We accept UPI, Cards, Net Banking & Wallets.
                </p>
              </div>
              
              <button
                onClick={handleDonation}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center"
              >
                <span className="mr-2">💳</span>
                Pay ₹{donationAmount || '0'} via Razorpay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}