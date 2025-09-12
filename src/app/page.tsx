'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-6 text-sm">
        <div className="container mx-auto flex justify-between">
          <span>📧 alumni@standrewscollege.ac.in | 📞 +91 22 2640 0348</span>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-yellow-300">Student Portal</Link>
            <Link href="#" className="hover:text-yellow-300">Faculty Portal</Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b-4 border-blue-900">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={80} height={80} />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">ST. ANDREWS COLLEGE</h1>
                <p className="text-sm text-gray-600">BANDRA (WEST), MUMBAI</p>
                <p className="text-xs text-red-600 font-semibold">ALUMNI PORTAL</p>
              </div>
            </div>
            <div className="flex space-x-8">
              <Link href="#about" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">About</Link>
              <Link href="#events" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Events</Link>
              <Link href="/directory" className="text-blue-900 hover:text-red-600 font-semibold transition-colors">Directory</Link>
              <Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">Login</Link>
              <Link href="/register" className="border-2 border-blue-900 text-blue-900 px-6 py-2 rounded hover:bg-blue-900 hover:text-white transition-colors">Register</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.7), rgba(220, 38, 38, 0.2)), url(/St-Andrews-Bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className={`flex flex-col items-center justify-center h-full text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 max-w-4xl">
            <h1 className="text-6xl font-bold text-white mb-6">
              Welcome to <span className="text-yellow-300">St Andrews</span> Alumni Network
            </h1>
            <p className="text-2xl text-white mb-4">Excellence in Education Since 1951</p>
            <p className="text-xl text-gray-200 mb-8">Connect • Collaborate • Contribute</p>
            <p className="text-lg text-gray-100 mb-12 leading-relaxed">
              Join our vibrant community of distinguished alumni from St Andrews College, Bandra West. 
              Network with professionals across industries, mentor current students, and contribute to our legacy of excellence.
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/register" className="bg-red-600 text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-red-700 transform hover:scale-105 transition-all shadow-2xl">
                Join Alumni Network
              </Link>
              <Link href="/login" className="border-3 border-white text-white px-10 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all shadow-2xl">
                Alumni Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* College Stats */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-4xl font-bold text-yellow-300 mb-2">70+</h3>
              <p className="text-lg">Years of Excellence</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-4xl font-bold text-yellow-300 mb-2">5000+</h3>
              <p className="text-lg">Alumni Worldwide</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-4xl font-bold text-yellow-300 mb-2">50+</h3>
              <p className="text-lg">Countries Represented</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-4xl font-bold text-yellow-300 mb-2">100+</h3>
              <p className="text-lg">Industry Leaders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Alumni Services</h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Connecting our graduates for lifelong success</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Alumni Directory', desc: 'Connect with classmates and professionals across industries', icon: '🎓', color: 'border-blue-500' },
              { title: 'Career Network', desc: 'Access job opportunities and mentorship programs', icon: '💼', color: 'border-red-500' },
              { title: 'College Events', desc: 'Reunions, seminars, and networking events', icon: '🎉', color: 'border-yellow-500' },
              { title: 'Mentorship Program', desc: 'Guide current students and young professionals', icon: '👨🏫', color: 'border-green-500' },
              { title: 'Giving Back', desc: 'Support scholarships and college development', icon: '❤️', color: 'border-purple-500' },
              { title: 'Global Network', desc: 'Connect with alumni chapters worldwide', icon: '🌍', color: 'border-indigo-500' }
            ].map((feature, index) => (
              <div key={index} className={`bg-white border-l-4 ${feature.color} p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">Latest Updates</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Annual Alumni Reunion 2024', date: 'December 15, 2024', preview: 'Join us for our biggest alumni gathering featuring distinguished speakers and networking opportunities...', category: 'Event' },
              { title: 'New Scholarship Fund Launched', date: 'November 20, 2024', preview: 'Alumni contributions establish merit-based scholarships for deserving students from economically weaker sections...', category: 'News' },
              { title: 'Distinguished Alumni Awards', date: 'October 30, 2024', preview: 'Celebrating outstanding achievements of our alumni in various fields including business, arts, and social service...', category: 'Achievement' }
            ].map((news, index) => (
              <article key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">{news.category}</span>
                    <span className="text-gray-500 text-sm">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{news.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{news.preview}</p>
                  <Link href="#" className="text-red-600 hover:text-red-800 font-semibold">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={50} height={50} className="mr-3" />
                <div>
                  <h3 className="font-bold text-lg">St Andrews College</h3>
                  <p className="text-sm text-gray-300">Bandra West, Mumbai</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">Excellence in Education Since 1951</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="#" className="block text-gray-300 hover:text-yellow-300">About College</Link>
                <Link href="/directory" className="block text-gray-300 hover:text-yellow-300">Alumni Directory</Link>
                <Link href="/events" className="block text-gray-300 hover:text-yellow-300">Events</Link>
                <Link href="/jobs" className="block text-gray-300 hover:text-yellow-300">Career Services</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>📍 St Andrews College, Bandra West, Mumbai - 400050</p>
                <p>📞 +91 22 2640 0348</p>
                <p>📧 alumni@standrewscollege.ac.in</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-2xl">📘</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-2xl">📷</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-2xl">🐦</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-2xl">💼</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center">
            <p className="text-gray-400">© 2024 St Andrews College Alumni Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}