'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const news = [
    { id: 1, title: 'College Ranks #1 in Innovation Index 2024', category: 'College Updates', date: 'Nov 1, 2024', excerpt: 'Our college has been ranked #1 in the National Innovation Index 2024...' },
    { id: 2, title: 'Alumni Spotlight: Sarah Johnson Wins Award', category: 'Alumni Achievements', date: 'Oct 28, 2024', excerpt: 'Sarah Johnson, Class of 2015, has been awarded the Young Entrepreneur of the Year...' },
    { id: 3, title: 'New Research Center Opens', category: 'College Updates', date: 'Oct 25, 2024', excerpt: 'The state-of-the-art AI Research Center is now open for students and faculty...' }
  ];

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
            {news.map((article) => (
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
                <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm" />
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}