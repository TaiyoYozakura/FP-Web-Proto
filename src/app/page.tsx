'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { GraduationCap, Users, Globe, Award, Calendar, Briefcase, Heart, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';

const StatCard = ({ icon: Icon, value, label, color }: any) => (
  <div className="bg-white rounded-lg md:rounded-2xl p-2.5 md:p-4 shadow-lg active:scale-95 transition-all">
    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-xl ${color} flex items-center justify-center mb-1.5 md:mb-3`}>
      <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
    </div>
    <h3 className="text-base md:text-2xl font-bold text-gray-900">{value}</h3>
    <p className="text-[10px] md:text-sm text-gray-600">{label}</p>
  </div>
);

const ServiceCard = ({ icon: Icon, title, desc, link, badge }: any) => (
  <Link href={link} className="group bg-white rounded-lg md:rounded-2xl p-3 md:p-6 shadow-md active:scale-95 transition-all">
    <div className="flex items-start justify-between mb-2 md:mb-4">
      <div className="w-9 h-9 md:w-12 md:h-12 rounded-md md:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
      </div>
      <span className="bg-blue-50 text-blue-600 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-bold">{badge}</span>
    </div>
    <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{title}</h3>
    <p className="text-[11px] md:text-sm text-gray-600 leading-snug md:leading-relaxed">{desc}</p>
  </Link>
);

const NewsCard = ({ title, date, category, preview }: any) => (
  <div className="bg-white rounded-lg md:rounded-2xl p-3 md:p-5 shadow-md active:scale-95 transition-all">
    <div className="flex items-center gap-1.5 md:gap-3 mb-1.5 md:mb-3">
      <span className="bg-blue-50 text-blue-600 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-semibold">{category}</span>
      <span className="text-[9px] md:text-xs text-gray-500">{date}</span>
    </div>
    <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-xs md:text-base">{title}</h3>
    <p className="text-[10px] md:text-sm text-gray-600 leading-snug md:leading-relaxed">{preview}</p>
    <Link href="/news" className="inline-block mt-1.5 md:mt-3 text-blue-600 font-medium text-[10px] md:text-sm">
      Read More →
    </Link>
  </div>
);

export default function HomePage() {
  const [stats, setStats] = useState({ alumni: 0, years: 0, countries: 0, leaders: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const statsData = [
    { icon: GraduationCap, value: `${stats.years}+`, label: 'Years Excellence', color: 'bg-blue-500' },
    { icon: Users, value: `${stats.alumni}K+`, label: 'Active Alumni', color: 'bg-purple-500' },
    { icon: Globe, value: `${stats.countries}+`, label: 'Countries', color: 'bg-green-500' },
    { icon: Award, value: `${stats.leaders}+`, label: 'Industry Leaders', color: 'bg-orange-500' }
  ];

  const services = [
    { icon: Users, title: 'Alumni Directory', desc: 'Connect with 15K+ graduates worldwide', link: '/directory', badge: '15K+' },
    { icon: Briefcase, title: 'Career Services', desc: 'Job opportunities and career guidance', link: '/jobs', badge: '500+' },
    { icon: Calendar, title: 'Events', desc: 'Reunions and networking sessions', link: '/events', badge: '50+' },
    { icon: Heart, title: 'Give Back', desc: 'Support scholarships and development', link: '/donation', badge: '₹10L+' },
    { icon: TrendingUp, title: 'Mentorship', desc: 'Guide students and professionals', link: '/dashboard', badge: '200+' },
    { icon: Globe, title: 'Global Chapters', desc: 'Alumni chapters in major cities', link: '/directory', badge: '25+' }
  ];

  const news = [
    { title: 'Annual Alumni Meet 2024', date: 'Dec 15, 2024', category: 'Event', preview: 'Join us for networking and celebrating achievements.' },
    { title: 'Scholarship Program Launch', date: 'Nov 20, 2024', category: 'News', preview: 'New merit-based scholarships for deserving students.' },
    { title: 'Alumni Achievement Awards', date: 'Oct 30, 2024', category: 'Awards', preview: 'Recognizing outstanding alumni contributions.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.dnyanasadhanacollege.org/Gallery/images/folder1/1a.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-6 md:py-12 text-center text-white">
          <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={isMobile ? 50 : 80} height={isMobile ? 50 : 80} className="mx-auto mb-3 md:mb-6 drop-shadow-2xl" />
          <h1 className="text-xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 drop-shadow-lg">{isMobile ? 'Dnyanasadhana' : 'Dnyanasadhana College'}</h1>
          <p className="text-base md:text-2xl font-medium text-blue-200 mb-3 md:mb-6">Alumni Portal</p>
          <p className="text-xs md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto opacity-90 px-2">{isMobile ? 'Connect with alumni worldwide since 1964' : 'Empowering minds, shaping futures since 1964. Join our distinguished community of alumni worldwide.'}</p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-10">
            {[
              { value: `${stats.alumni}K+`, label: 'Alumni' },
              { value: `${stats.countries}+`, label: 'Countries' },
              { value: `${stats.leaders}+`, label: 'Leaders' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/15 backdrop-blur-md rounded-lg md:rounded-2xl px-3 md:px-6 py-2 md:py-4 border border-white/30 min-w-[80px] md:min-w-[100px]">
                <div className="text-xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-[10px] md:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center px-4">
            {!session?.user ? (
              <>
                <Link href="/register" className="bg-white text-blue-600 px-5 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-2xl font-bold shadow-2xl active:scale-95 transition-all text-xs md:text-base">
                  🚀 {isMobile ? 'Join Network' : 'Join Alumni Network'}
                </Link>
                <Link href="/login" className="border-2 border-white text-white px-5 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-2xl font-bold backdrop-blur-sm active:scale-95 transition-all text-xs md:text-base">
                  🎓 {isMobile ? 'Login' : 'Alumni Login'}
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="bg-white text-blue-600 px-5 md:px-8 py-2.5 md:py-4 rounded-lg md:rounded-2xl font-bold shadow-2xl active:scale-95 transition-all text-xs md:text-base">
                📊 {isMobile ? 'Dashboard' : 'Go to Dashboard'}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 md:py-12 px-3 md:px-4 -mt-8 md:-mt-16 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {statsData.map((stat, i) => <StatCard key={i} {...stat} />)}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-6 md:py-12 px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4 md:mb-10">
            <h2 className="text-lg md:text-4xl font-bold text-gray-900 mb-1 md:mb-3">Alumni Services</h2>
            <p className="text-xs md:text-base text-gray-600">{isMobile ? 'Support for our community' : 'Comprehensive support for our community'}</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
            {services.map((service, i) => <ServiceCard key={i} {...service} />)}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-6 md:py-12 px-3 md:px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 md:mb-8">
            <h2 className="text-base md:text-3xl font-bold text-gray-900">Latest News</h2>
            <Link href="/news" className="text-[10px] md:text-base text-blue-600 font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-6">
            {news.map((item, i) => <NewsCard key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-6 md:py-12 px-3 md:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-4 md:mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                <Image src="https://www.dnyanasadhanacollege.org/images/logo/logo-final.png" alt="Logo" width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} />
                <div>
                  <h3 className="text-sm md:text-xl font-bold">{isMobile ? 'Dnyanasadhana' : 'Dnyanasadhana College'}</h3>
                  <p className="text-white/80 text-[10px] md:text-sm">Alumni Portal</p>
                </div>
              </div>
              <p className="text-white/70 mb-2 md:mb-4 text-[10px] md:text-sm">{isMobile ? 'Excellence since 1964' : 'A premier institution in Thane dedicated to academic excellence since 1964.'}</p>
              <div className="flex gap-2">
                {['facebook', 'twitter', 'linkedin'].map(social => (
                  <Link key={social} href="#" className="w-8 h-8 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center active:scale-95 transition-all">
                    <span className="text-base md:text-xl">📱</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 md:mb-4 text-xs md:text-base">Quick Links</h4>
              <div className="space-y-1 text-white/70 text-[10px] md:text-sm">
                {['/directory', '/events', '/jobs', '/news'].map(link => (
                  <Link key={link} href={link} className="block">
                    → {link.slice(1).charAt(0).toUpperCase() + link.slice(2)}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 md:mb-4 text-xs md:text-base">Contact</h4>
              <div className="space-y-1 text-white/70 text-[10px] md:text-sm">
                <p>📍 Thane, MH</p>
                <p>📞 +91-22-2534-1191</p>
                {!isMobile && <p>✉️ alumni@dnyanasadhana.edu.in</p>}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-3 md:pt-6 text-center text-white/60 text-[9px] md:text-sm">
            © 2024 Dnyanasadhana College{!isMobile && '. All rights reserved. | Built with ❤️ for Alumni'}
          </div>
        </div>
      </footer>
    </div>
  );
}
