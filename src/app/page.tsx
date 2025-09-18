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
      
      {/* Clean Navigation Bar */}
      <div className="sticky-nav bg-theme-surface shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <Link href="#about" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors">About</Link>
              <Link href="#programs" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors">Programs</Link>
              <Link href="#alumni" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors">Alumni</Link>
              <Link href="#news" className="text-theme-primary hover:text-theme-secondary font-medium transition-colors">News</Link>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar placeholder="Search..." className="w-64" />
              <Link href="/login" className="btn bg-theme-primary text-white px-6 py-2 rounded-lg font-medium">Portal Login</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Hero Section */}
      <section 
        className="relative min-h-screen bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: 'url(https://www.dnyanasadhanacollege.org/Gallery/images/folder1/1a.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Dnyanasadhana College
            <span className="block text-3xl lg:text-4xl font-medium mt-4 text-yellow-300">Alumni Portal</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto">
            Empowering minds, shaping futures since 1964. Join our distinguished community of alumni 
            who continue to excel in commerce, arts, and sciences worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!state.user ? (
              <>
                <Link href="/register" className="btn bg-theme-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                  Join Alumni Network
                </Link>
                <Link href="/login" className="btn border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-theme-primary">
                  Alumni Login
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn bg-theme-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-theme-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <h3 className="text-4xl font-bold text-theme-primary mb-2">60+</h3>
              <p className="text-theme-secondary font-medium">Years of Excellence</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-theme-primary mb-2">{state.alumni.length}K+</h3>
              <p className="text-theme-secondary font-medium">Alumni Network</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-theme-primary mb-2">50+</h3>
              <p className="text-theme-secondary font-medium">Countries</p>
            </div>
            <div className="p-6">
              <h3 className="text-4xl font-bold text-theme-primary mb-2">100+</h3>
              <p className="text-theme-secondary font-medium">Industry Leaders</p>
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
              { title: 'Alumni Directory', desc: 'Connect with fellow graduates across industries and locations', link: '/directory' },
              { title: 'Career Services', desc: 'Job opportunities, career guidance, and professional development', link: '/jobs' },
              { title: 'Networking Events', desc: 'Regular meetups, reunions, and professional networking sessions', link: '/events' },
              { title: 'Mentorship', desc: 'Guide current students and connect with industry professionals', link: '/dashboard' },
              { title: 'Giving Back', desc: 'Support scholarships and contribute to college development', link: '/donation' },
              { title: 'Global Chapters', desc: 'Connect with alumni chapters in major cities worldwide', link: '/directory' }
            ].map((service, index) => (
              <Link key={index} href={service.link} className="card p-8 hover:shadow-lg transition-all group">
                <h3 className="text-xl font-semibold text-theme-primary mb-3">{service.title}</h3>
                <p className="text-theme-secondary leading-relaxed">{service.desc}</p>
              </Link>
            ))}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', preview: 'Join us for networking, keynote sessions, and celebrating achievements of our distinguished alumni.', category: 'Event' },
              { title: 'Scholarship Program Launch', date: 'Nov 20, 2024', preview: 'New merit-based scholarships established through generous alumni contributions for deserving students.', category: 'News' },
              { title: 'Alumni Achievement Awards', date: 'Oct 30, 2024', preview: 'Recognizing outstanding contributions of our alumni in business, social service, and innovation.', category: 'Awards' }
            ].map((news, index) => (
              <article key={index} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-theme-primary/10 text-theme-primary px-3 py-1 rounded-full text-sm font-medium">{news.category}</span>
                  <span className="text-theme-secondary text-sm">{news.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-theme-primary mb-3">{news.title}</h3>
                <p className="text-theme-secondary mb-4 leading-relaxed">{news.preview}</p>
                <Link href="/news" className="text-theme-primary font-medium hover:text-theme-secondary transition-colors">
                  Read More →
                </Link>
              </article>
            ))}
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
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60">© 2024 Dnyanasadhana College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}