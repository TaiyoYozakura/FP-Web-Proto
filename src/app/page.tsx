'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Card, CardBody, Button, Chip, Divider } from '@heroui/react';
import { GraduationCap, Users, Globe, Award, Calendar, Briefcase, Heart, MessageCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnnouncementBar from '@/components/AnnouncementBar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';

// Lazy load heavy components
const QuickActions = dynamic(() => import('@/components/QuickActions'), {
  loading: () => <LoadingSpinner size="sm" />
});
const LiveChat = dynamic(() => import('@/components/LiveChat'), {
  loading: () => <LoadingSpinner size="sm" />
});

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [stats, setStats] = useState({ alumni: 0, years: 0, countries: 0, leaders: 0 });
  const { data: session } = useSession();
  const router = useRouter();

  // Animated counter effect
  useEffect(() => {
    setIsVisible(true);
    const targets = { alumni: 15, years: 60, countries: 50, leaders: 100 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        alumni: Math.floor(targets.alumni * progress),
        years: Math.floor(targets.years * progress),
        countries: Math.floor(targets.countries * progress),
        leaders: Math.floor(targets.leaders * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-rotating news carousel
  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsIndex(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(newsTimer);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        <Navbar />
      
      <AnnouncementBar />
      


      {/* Interactive Hero Section */}
      <section 
        className="relative min-h-screen bg-cover bg-center flex items-center overflow-hidden"
        style={{ 
          backgroundImage: 'url(https://www.dnyanasadhanacollege.org/Gallery/images/folder1/1a.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>
        
        {/* Static decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '80%', top: '30%', animationDelay: '1s' }} />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '60%', top: '70%', animationDelay: '2s' }} />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '30%', top: '80%', animationDelay: '0.5s' }} />
          <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse" style={{ left: '90%', top: '10%', animationDelay: '1.5s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <div className="animate-fadeInUp">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-shadow">
              Dnyanasadhana College
              <span className="block text-3xl lg:text-4xl font-medium mt-4 text-blue-300 animate-pulse">Alumni Portal</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto text-shadow">
              Empowering minds, shaping futures since 1964. Join our distinguished community of alumni 
              who continue to excel in commerce, arts, and sciences worldwide.
            </p>
            
            {/* Interactive stats preview */}
            <div className="flex justify-center space-x-8 mb-8 text-center">
              <div className="hover:scale-110 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-blue-300">{stats.alumni}K+</div>
                <div className="text-sm opacity-80">Alumni</div>
              </div>
              <div className="hover:scale-110 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-purple-300">{stats.countries}+</div>
                <div className="text-sm opacity-80">Countries</div>
              </div>
              <div className="hover:scale-110 transition-transform cursor-pointer">
                <div className="text-2xl font-bold text-blue-300">{stats.leaders}+</div>
                <div className="text-sm opacity-80">Leaders</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!session?.user ? (
                <>
                  <Button
                    as={Link}
                    href="/register"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Join Alumni Network
                  </Button>
                  <Button
                    as={Link}
                    href="/login"
                    variant="bordered"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-purple-600/20 hover:border-purple-300 font-semibold px-8 py-4 shadow-lg hover:shadow-xl backdrop-blur-sm transform hover:scale-105 transition-all"
                  >
                    Alumni Login
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  href="/dashboard"
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Trusted by Thousands of Alumni Worldwide</h2>
            <p className="text-xl text-gray-600">Join a network that spans industries, continents, and generations</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center mb-16">
            <Card className="hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl">
              <CardBody className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stats.years}+</h3>
                <p className="text-gray-600 font-medium">Years of Excellence</p>
                <Chip size="sm" variant="flat" color="primary" className="mt-2">Since 1964</Chip>
              </CardBody>
            </Card>
            <Card className="hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl">
              <CardBody className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold text-purple-600 mb-2">{stats.alumni}K+</h3>
                <p className="text-gray-600 font-medium">Active Alumni</p>
                <Chip size="sm" variant="flat" color="secondary" className="mt-2">Verified profiles</Chip>
              </CardBody>
            </Card>
            <Card className="hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl">
              <CardBody className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-green-600 mb-2">{stats.countries}+</h3>
                <p className="text-gray-600 font-medium">Countries</p>
                <Chip size="sm" variant="flat" color="success" className="mt-2">Global presence</Chip>
              </CardBody>
            </Card>
            <Card className="hover:scale-105 transition-transform cursor-pointer shadow-lg hover:shadow-xl">
              <CardBody className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-4xl font-bold text-orange-600 mb-2">{stats.leaders}+</h3>
                <p className="text-gray-600 font-medium">Industry Leaders</p>
                <Chip size="sm" variant="flat" color="warning" className="mt-2">C-level executives</Chip>
              </CardBody>
            </Card>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Verified Network</h4>
              <p className="text-sm text-theme-secondary">All alumni profiles are verified by the college administration</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Secure Platform</h4>
              <p className="text-sm text-theme-secondary">Enterprise-grade security with encrypted data protection</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-theme-primary mb-2">Always Active</h4>
              <p className="text-sm text-theme-secondary">24/7 platform availability with 99.9% uptime guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-theme-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-theme-primary mb-4">Alumni Services</h2>
            <p className="text-xl text-theme-secondary max-w-3xl mx-auto">Comprehensive support for our alumni community</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Alumni Directory', 
                desc: 'Connect with fellow graduates across industries and locations', 
                link: '/directory', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ), 
                count: '15K+' 
              },
              { 
                title: 'Career Services', 
                desc: 'Job opportunities, career guidance, and professional development', 
                link: '/jobs', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 002 2m0 0h4m-4 0a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2m-4 0V8a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2" />
                  </svg>
                ), 
                count: '500+' 
              },
              { 
                title: 'Networking Events', 
                desc: 'Regular meetups, reunions, and professional networking sessions', 
                link: '/events', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ), 
                count: '50+' 
              },
              { 
                title: 'Mentorship', 
                desc: 'Guide current students and connect with industry professionals', 
                link: '/dashboard', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ), 
                count: '200+' 
              },
              { 
                title: 'Giving Back', 
                desc: 'Support scholarships and contribute to college development', 
                link: '/donation', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ), 
                count: '₹10L+' 
              },
              { 
                title: 'Global Chapters', 
                desc: 'Connect with alumni chapters in major cities worldwide', 
                link: '/directory', 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                count: '25+' 
              }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="card p-8 hover:shadow-lg transition-all group hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-theme-primary">{service.icon}</div>
                  <span className="bg-theme-primary/10 text-theme-primary px-3 py-1 rounded-full text-sm font-bold">{service.count}</span>
                </div>
                <h3 className="text-xl font-semibold text-theme-primary mb-3 group-hover:text-theme-secondary transition-colors">{service.title}</h3>
                <p className="text-theme-secondary leading-relaxed">{service.desc}</p>
                <div className="mt-4 text-theme-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-theme-primary mb-4">What Our Alumni Say</h2>
            <p className="text-xl text-theme-secondary">Success stories from our global community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                  RS
                </div>
              </div>
              <blockquote className="text-theme-secondary mb-6 italic">
                "The alumni network opened doors I never knew existed. Within 6 months of graduation, I landed my dream job at a Fortune 500 company through a connection made here."
              </blockquote>
              <div>
                <h4 className="font-semibold text-theme-primary">Rajesh Sharma</h4>
                <p className="text-sm text-theme-secondary">Software Engineer, Google • Class of 2018</p>
              </div>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  PM
                </div>
              </div>
              <blockquote className="text-theme-secondary mb-6 italic">
                "Being part of this portal helped me find mentors, business partners, and lifelong friends. It's more than networking—it's a family."
              </blockquote>
              <div>
                <h4 className="font-semibold text-theme-primary">Priya Mehta</h4>
                <p className="text-sm text-theme-secondary">Entrepreneur, Tech Startup • Class of 2015</p>
              </div>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-red-500 to-yellow-600 flex items-center justify-center text-white text-2xl font-bold">
                  AK
                </div>
              </div>
              <blockquote className="text-theme-secondary mb-6 italic">
                "The career services and job board are exceptional. I've hired 5 talented graduates through this platform for my company."
              </blockquote>
              <div>
                <h4 className="font-semibold text-theme-primary">Amit Kumar</h4>
                <p className="text-sm text-theme-secondary">VP Engineering, Microsoft • Class of 2012</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section id="news" className="py-20 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-theme-primary mb-4">Latest News</h2>
            <p className="text-xl text-theme-secondary">Stay updated with college and alumni activities</p>
          </div>
          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNewsIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentNewsIndex === index ? 'bg-theme-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <Link href="/news" className="text-theme-primary font-medium hover:text-theme-secondary transition-colors">
                View All News →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', preview: 'Join us for networking, keynote sessions, and celebrating achievements of our distinguished alumni.', category: 'Event', attendees: '500+' },
                { title: 'Scholarship Program Launch', date: 'Nov 20, 2024', preview: 'New merit-based scholarships established through generous alumni contributions for deserving students.', category: 'News', amount: '₹5L' },
                { title: 'Alumni Achievement Awards', date: 'Oct 30, 2024', preview: 'Recognizing outstanding contributions of our alumni in business, social service, and innovation.', category: 'Awards', winners: '25' }
              ].map((news, index) => (
                <article key={index} className={`card p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 ${
                  currentNewsIndex === index ? 'ring-2 ring-theme-primary' : ''
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-theme-primary/10 text-theme-primary px-3 py-1 rounded-full text-sm font-medium">{news.category}</span>
                    <span className="text-theme-secondary text-sm">{news.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-theme-primary mb-3">{news.title}</h3>
                  <p className="text-theme-secondary mb-4 leading-relaxed">{news.preview}</p>
                  <div className="flex items-center justify-between">
                    <Link href="/news" className="text-theme-primary font-medium hover:text-theme-secondary transition-colors">
                      Read More →
                    </Link>
                    <span className="text-sm font-bold text-theme-secondary">
                      {news.attendees || news.amount || `${news.winners} Winners`}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer id="about" className="bg-theme-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Dnyanasadhana College" width={60} height={60} className="mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">Dnyanasadhana College</h3>
                  <p className="text-white/80">Alumni Portal</p>
                </div>
              </div>
              <p className="text-white/80 text-lg leading-relaxed max-w-md">
                A premier institution in Thane dedicated to academic excellence in Commerce, Arts, and Science, 
                nurturing leaders for tomorrow.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-3">
                <Link href="/directory" className="block text-white/80 hover:text-white transition-colors">Alumni Directory</Link>
                <Link href="/events" className="block text-white/80 hover:text-white transition-colors">Events</Link>
                <Link href="/jobs" className="block text-white/80 hover:text-white transition-colors">Career Services</Link>
                <Link href="/news" className="block text-white/80 hover:text-white transition-colors">News & Updates</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-white/80">
                <p>Dnyanasadhana College</p>
                <p>Thane West, Maharashtra</p>
                <p>Phone: +91-22-2534-1191</p>
                <p>Email: alumni@dnyanasadhana.edu.in</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12.013C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60">© 2024 Dnyanasadhana College. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
        <Suspense fallback={<LoadingSpinner />}>
          <QuickActions />
          <LiveChat />
        </Suspense>
        
        <CookieConsent />
        <Analytics />
      </div>
    </ErrorBoundary>
  );
}