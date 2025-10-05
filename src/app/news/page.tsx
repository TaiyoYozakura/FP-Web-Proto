'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';
import { Mail, CheckCircle } from 'lucide-react';

const NewsCard = ({ article }: any) => (
  <article className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all active:scale-[0.99]">
    <div className="flex flex-wrap items-center gap-3 mb-3">
      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">{article.category}</span>
      <span className="text-xs text-gray-500">{article.date}</span>
    </div>
    <h2 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h2>
    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>
    <Link href={`/news/${article.id}`} className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
      Read More →
    </Link>
  </article>
);

export default function NewsPage() {
  const [tab, setTab] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { state } = useApp();
  
  const filtered = useMemo(() => {
    if (tab === 'all') return state.news;
    if (tab === 'college') return state.news.filter(n => n.category === 'College Updates');
    if (tab === 'alumni') return state.news.filter(n => n.category === 'Alumni Achievements');
    return state.news;
  }, [state.news, tab]);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'college', label: 'College' },
    { key: 'alumni', label: 'Alumni' }
  ];

  const trending = ['#Innovation2024', '#AlumniAchievements', '#ResearchCenter', '#TechTalks'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">News & Updates</h1>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 scrollbar-hide">
          {tabs.map(t => (
            <button 
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all whitespace-nowrap active:scale-95 ${
                tab === t.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:text-blue-600 shadow-md'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {filtered.map(article => <NewsCard key={article.id} article={article} />)}
          </div>
          
          <div className="space-y-6">
            {/* Trending */}
            <div className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {trending.map(tag => (
                  <div key={tag} className="bg-gray-50 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all active:scale-95">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 shadow-lg text-white">
              <Mail className="w-10 h-10 mb-3 opacity-90" />
              <h3 className="font-bold text-lg mb-2">Newsletter</h3>
              <p className="text-sm opacity-90 mb-4">Stay updated with latest news and events</p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 rounded-xl text-gray-900 outline-none focus:ring-4 focus:ring-white/30 transition-all" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className={`w-full py-3 rounded-xl font-semibold transition-all active:scale-95 ${
                    subscribed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-blue-600 hover:shadow-lg'
                  }`}
                >
                  {subscribed ? <span className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Subscribed</span> : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
