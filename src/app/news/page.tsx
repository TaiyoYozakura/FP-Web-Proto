'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useApp } from '@/contexts/AppContext';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { state } = useApp();
  
  const filteredNews = useMemo(() => {
    if (activeTab === 'all') return state.news;
    if (activeTab === 'college') return state.news.filter(n => n.category === 'College Updates');
    if (activeTab === 'alumni') return state.news.filter(n => n.category === 'Alumni Achievements');
    return state.news;
  }, [state.news, activeTab]);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-6 lg:mb-8">News & Updates</h1>
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['all', 'college', 'alumni'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 lg:px-6 py-2 rounded-md font-semibold transition-colors text-sm lg:text-base ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}>
              {tab === 'all' ? 'All News' : tab === 'college' ? 'College Updates' : 'Alumni Achievements'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {filteredNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm p-4 lg:p-8 hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-xs lg:text-sm">{article.date}</span>
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-3 lg:mb-4">{article.title}</h2>
                <p className="text-gray-600 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">{article.excerpt}</p>
                <Link href={`/news/${article.id}`} className="text-red-600 hover:text-red-800 font-semibold text-sm lg:text-base">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Trending Topics</h3>
              <div className="space-y-2 lg:space-y-3">
                {['#Innovation2024', '#AlumniAchievements', '#ResearchCenter', '#TechTalks'].map((tag) => (
                  <div key={tag} className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors text-sm">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <h3 className="font-bold text-black mb-4 text-sm lg:text-base">Newsletter</h3>
              <p className="text-gray-600 mb-4 text-sm lg:text-base">Stay updated with the latest news and events</p>
              <div className="space-y-3">
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    className={`w-full py-2 rounded-lg font-semibold transition-colors text-sm ${
                      subscribed 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {subscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}