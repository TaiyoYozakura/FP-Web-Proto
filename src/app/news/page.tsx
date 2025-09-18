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
    <div className="min-h-screen bg-theme-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-theme-primary mb-8">News & Updates</h1>
        <div className="flex flex-wrap gap-1 mb-8 bg-theme-surface rounded-lg p-1 shadow-sm w-fit">
          {['all', 'college', 'alumni'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-theme-primary text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}>
              {tab === 'all' ? 'All News' : tab === 'college' ? 'College Updates' : 'Alumni Achievements'}
            </button>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {filteredNews.map((article) => (
              <article key={article.id} className="card p-8 hover:shadow-lg transition-all">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-theme-primary/10 text-theme-primary px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                  <span className="text-theme-secondary text-sm">{article.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-theme-primary mb-4">{article.title}</h2>
                <p className="text-theme-secondary mb-6 leading-relaxed">{article.excerpt}</p>
                <Link href={`/news/${article.id}`} className="text-theme-primary hover:text-theme-secondary font-semibold">
                  Read More →
                </Link>
              </article>
            ))}
          </div>
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-6 text-lg">Trending Topics</h3>
              <div className="space-y-3">
                {['#Innovation2024', '#AlumniAchievements', '#ResearchCenter', '#TechTalks'].map((tag) => (
                  <div key={tag} className="bg-theme-background px-3 py-2 rounded-lg text-theme-secondary hover:bg-theme-primary/10 hover:text-theme-primary cursor-pointer transition-colors">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-6">
              <h3 className="font-bold text-theme-primary mb-6 text-lg">Newsletter</h3>
              <p className="text-theme-secondary mb-4">Stay updated with the latest news and events</p>
              <div className="space-y-3">
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 border border-theme rounded-lg focus:ring-2 focus:ring-theme-primary focus:border-theme-primary bg-theme-surface text-theme-primary" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit"
                    className={`btn w-full py-3 rounded-lg font-semibold transition-colors ${
                      subscribed 
                        ? 'bg-green-600 text-white' 
                        : 'bg-theme-primary text-white hover:bg-theme-primary-hover'
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