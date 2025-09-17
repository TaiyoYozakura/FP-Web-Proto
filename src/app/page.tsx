'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import { useApp } from '@/contexts/AppContext';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const { state } = useApp();
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Landing Page Navigation */}
      <div className="sticky-nav bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center py-3">
            <div className="w-full lg:w-auto mb-3 lg:mb-0">
              <SearchBar placeholder="Search alumni, events, news..." className="max-w-md" />
            </div>
            <div className="flex space-x-4 lg:space-x-8">
              <Link href="#about" className="btn text-blue-900 hover:text-red-600 font-semibold text-sm lg:text-base">About</Link>
              <Link href="#services" className="btn text-blue-900 hover:text-red-600 font-semibold text-sm lg:text-base">Services</Link>
              <Link href="#updates" className="btn text-blue-900 hover:text-red-600 font-semibold text-sm lg:text-base">Updates</Link>
              <Link href="/login" className="btn ripple bg-red-600 text-white px-4 py-2 rounded text-sm lg:text-base">Login</Link>
              <Link href="/register" className="btn ripple border-2 border-blue-900 text-blue-900 px-4 py-2 rounded hover:bg-blue-900 hover:text-white text-sm lg:text-base">Register</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen bg-cover bg-center hero-overlay"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/159490/yale-university-landscape-universities-schools-159490.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="hero-overlay absolute inset-0"></div>
        <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen text-center container-padding transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card bg-white/10 backdrop-blur-md p-8 lg:p-16 max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Welcome to <span className="text-yellow-300">AlumniPortal</span> Network
            </h1>
            <p className="text-lead text-white mb-4 font-medium">Connecting Alumni Worldwide</p>
            <p className="text-xl text-gray-200 mb-8 font-light tracking-wide">Connect • Collaborate • Contribute</p>
            <p className="text-lg text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join our vibrant community of distinguished alumni from your institution. 
              Network with professionals across industries, mentor current students, and contribute to our legacy of excellence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              {!state.user ? (
                <>
                  <Link href="/register" className="btn ripple micro-bounce bg-red-600 text-white px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-bold shadow-2xl">
                    Join Alumni Network
                  </Link>
                  <Link href="/login" className="btn ripple micro-bounce border-2 border-white text-white px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-bold hover:bg-white hover:text-blue-900 shadow-2xl">
                    Alumni Login
                  </Link>
                </>
              ) : (
                <Link href="/dashboard" className="btn ripple micro-bounce bg-red-600 text-white px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg text-base lg:text-lg font-bold shadow-2xl">
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* College Stats */}
      <section className="section-padding hero-gradient text-white">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 card-hover">
              <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-300 mb-3">70+</h3>
              <p className="text-body font-medium">Years of Excellence</p>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 card-hover">
              <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-300 mb-3">{state.alumni.length}+</h3>
              <p className="text-body font-medium">Alumni Worldwide</p>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 card-hover">
              <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-300 mb-3">50+</h3>
              <p className="text-body font-medium">Countries Represented</p>
            </div>
            <div className="card bg-white/10 backdrop-blur-sm p-6 lg:p-8 card-hover">
              <h3 className="text-3xl lg:text-5xl font-extrabold text-yellow-300 mb-3">100+</h3>
              <p className="text-body font-medium">Industry Leaders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="services" className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">Alumni Services</h2>
            <p className="text-lead text-gray-600 max-w-2xl mx-auto">Connecting our graduates for lifelong success</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Alumni Directory', desc: 'Connect with classmates and professionals across industries', icon: '🎓', color: 'border-blue-500', link: '/directory' },
              { title: 'Career Network', desc: 'Access job opportunities and mentorship programs', icon: '💼', color: 'border-red-500', link: '/jobs' },
              { title: 'College Events', desc: 'Reunions, seminars, and networking events', icon: '🎉', color: 'border-yellow-500', link: '/events' },
              { title: 'Mentorship Program', desc: 'Guide current students and young professionals', icon: '👨🏫', color: 'border-green-500', link: '/dashboard' },
              { title: 'Giving Back', desc: 'Support scholarships and college development', icon: '❤️', color: 'border-purple-500', link: '/donation' },
              { title: 'Global Network', desc: 'Connect with alumni chapters worldwide', icon: '🌍', color: 'border-indigo-500', link: '/directory' }
            ].map((feature, index) => (
              <Link key={index} href={feature.link} className={`card card-hover micro-pulse border-l-4 ${feature.color} p-8 block group`}>
                <div className="text-5xl mb-6 group-hover:scale-110 micro-bounce transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">{feature.title}</h3>
                <p className="text-body text-gray-600">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section id="updates" className="section-padding bg-white">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-6">Latest Updates</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Annual Alumni Reunion 2024', date: 'December 15, 2024', preview: 'Join us for our biggest alumni gathering featuring distinguished speakers and networking opportunities...', category: 'Event', link: '/events' },
              { title: 'New Scholarship Fund Launched', date: 'November 20, 2024', preview: 'Alumni contributions establish merit-based scholarships for deserving students from economically weaker sections...', category: 'News', link: '/news' },
              { title: 'Distinguished Alumni Awards', date: 'October 30, 2024', preview: 'Celebrating outstanding achievements of our alumni in various fields including business, arts, and social service...', category: 'Achievement', link: '/news' }
            ].map((news, index) => (
              <article key={index} className="card card-hover micro-pulse overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-small font-semibold">{news.category}</span>
                    <span className="text-gray-500 text-small font-medium">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-4 group-hover:text-red-600 transition-colors">{news.title}</h3>
                  <p className="text-body text-gray-600 mb-6">{news.preview}</p>
                  <Link href={news.link} className="btn text-red-600 hover:text-red-800 font-semibold inline-flex items-center group">
                    Read More 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-blue-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/SAC-LOGO.webp" alt="AlumniPortal" width={40} height={40} className="mr-3 lg:w-12 lg:h-12" />
                <div>
                  <h3 className="font-bold text-base lg:text-lg">AlumniPortal</h3>
                  <p className="text-xs lg:text-sm text-gray-300">Global Alumni Network</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs lg:text-sm">Connecting Alumni Worldwide</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm lg:text-base">Quick Links</h4>
              <div className="space-y-2 text-xs lg:text-sm">
                <Link href="/dashboard" className="block text-gray-300 hover:text-yellow-300">Dashboard</Link>
                <Link href="/directory" className="block text-gray-300 hover:text-yellow-300">Alumni Directory</Link>
                <Link href="/events" className="block text-gray-300 hover:text-yellow-300">Events</Link>
                <Link href="/jobs" className="block text-gray-300 hover:text-yellow-300">Career Services</Link>
                <Link href="/news" className="block text-gray-300 hover:text-yellow-300">News</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm lg:text-base">Contact Info</h4>
              <div className="space-y-2 text-xs lg:text-sm text-gray-300">
                <p>📍 Your Institution Address</p>
                <p>📞 Your Contact Number</p>
                <p>📧 alumni@yourinstitution.edu</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm lg:text-base">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-xl lg:text-2xl">📘</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-xl lg:text-2xl">📷</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-xl lg:text-2xl">🐦</Link>
                <Link href="#" className="text-gray-300 hover:text-yellow-300 text-xl lg:text-2xl">💼</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-6 lg:pt-8 text-center">
            <p className="text-gray-400 text-xs lg:text-sm">© 2024 AlumniPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}