'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GraduationCap, Users, Globe, Award, Calendar, Briefcase, Heart, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const [stats, setStats] = useState({ alumni: 0, years: 0, countries: 0, leaders: 0 });
  const { data: session } = useSession();

  useEffect(() => {
    const targets = { alumni: 15, years: 60, countries: 50, leaders: 100 };
    const duration = 2000;
    const steps = 60;
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
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="absolute inset-0 bg-[url('https://www.dnyanasadhanacollege.org/Gallery/images/folder1/1a.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 text-center text-white">
          <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={80} height={80} className="mx-auto mb-6 drop-shadow-2xl" />
          <h1 className="text-3xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Dnyanasadhana College</h1>
          <p className="text-xl lg:text-2xl font-medium text-blue-200 mb-6">Alumni Portal</p>
          <p className="text-base lg:text-lg mb-8 max-w-2xl mx-auto opacity-90">Empowering minds, shaping futures since 1964. Join our distinguished community of alumni worldwide.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { value: `${stats.alumni}K+`, label: 'Alumni' },
              { value: `${stats.countries}+`, label: 'Countries' },
              { value: `${stats.leaders}+`, label: 'Leaders' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/30 min-w-[100px]">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!session?.user ? (
              <>
                <Link href="/register" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl active:scale-95 transition-all">
                  🚀 Join Alumni Network
                </Link>
                <Link href="/login" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/20 active:scale-95 transition-all">
                  🎓 Alumni Login
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl active:scale-95 transition-all">
                📊 Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, value: `${stats.years}+`, label: 'Years Excellence', color: 'bg-blue-500' },
              { icon: Users, value: `${stats.alumni}K+`, label: 'Active Alumni', color: 'bg-purple-500' },
              { icon: Globe, value: `${stats.countries}+`, label: 'Countries', color: 'bg-green-500' },
              { icon: Award, value: `${stats.leaders}+`, label: 'Industry Leaders', color: 'bg-orange-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all active:scale-95">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Alumni Services</h2>
            <p className="text-gray-600">Comprehensive support for our community</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Alumni Directory', desc: 'Connect with 15K+ graduates worldwide', link: '/directory', badge: '15K+' },
              { icon: Briefcase, title: 'Career Services', desc: 'Job opportunities and career guidance', link: '/jobs', badge: '500+' },
              { icon: Calendar, title: 'Events', desc: 'Reunions and networking sessions', link: '/events', badge: '50+' },
              { icon: Heart, title: 'Give Back', desc: 'Support scholarships and development', link: '/donation', badge: '₹10L+' },
              { icon: TrendingUp, title: 'Mentorship', desc: 'Guide students and professionals', link: '/dashboard', badge: '200+' },
              { icon: Globe, title: 'Global Chapters', desc: 'Alumni chapters in major cities', link: '/directory', badge: '25+' }
            ].map((service, i) => (
              <Link key={i} href={service.link} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all active:scale-95">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">{service.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Latest News</h2>
            <Link href="/news" className="text-blue-600 font-medium hover:text-blue-700">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', category: 'Event', preview: 'Join us for networking and celebrating achievements.' },
              { title: 'Scholarship Program Launch', date: 'Nov 20, 2024', category: 'News', preview: 'New merit-based scholarships for deserving students.' },
              { title: 'Alumni Achievement Awards', date: 'Oct 30, 2024', category: 'Awards', preview: 'Recognizing outstanding alumni contributions.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all active:scale-95">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{item.category}</span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.preview}</p>
                <Link href="/news" className="inline-block mt-3 text-blue-600 font-medium text-sm hover:text-blue-700">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={60} height={60} />
                <div>
                  <h3 className="text-xl font-bold">Dnyanasadhana College</h3>
                  <p className="text-white/80 text-sm">Alumni Portal</p>
                </div>
              </div>
              <p className="text-white/70 mb-4">A premier institution in Thane dedicated to academic excellence since 1964.</p>
              <div className="flex gap-3">
                {['facebook', 'twitter', 'linkedin'].map(social => (
                  <Link key={social} href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all active:scale-95">
                    <span className="text-xl">📱</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-white/70 text-sm">
                {['/directory', '/events', '/jobs', '/news'].map(link => (
                  <Link key={link} href={link} className="block hover:text-white transition-colors">
                    → {link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-white/70 text-sm">
                <p>📍 Thane West, Maharashtra</p>
                <p>📞 +91-22-2534-1191</p>
                <p>✉️ alumni@dnyanasadhana.edu.in</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-6 text-center text-white/60 text-sm">
            © 2024 Dnyanasadhana College. All rights reserved. | Built with ❤️ for Alumni
          </div>
        </div>
      </footer>
    </div>
  );
}
