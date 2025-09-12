'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const news = [
    { id: 1, title: 'College Ranks #1 in Innovation Index 2024', category: 'College Updates', date: 'Nov 1, 2024', excerpt: 'Our college has been ranked #1 in the National Innovation Index 2024...' },
    { id: 2, title: 'Alumni Spotlight: Sarah Johnson Wins Award', category: 'Alumni Achievements', date: 'Oct 28, 2024', excerpt: 'Sarah Johnson, Class of 2015, has been awarded the Young Entrepreneur of the Year...' },
    { id: 3, title: 'New Research Center Opens', category: 'College Updates', date: 'Oct 25, 2024', excerpt: 'The state-of-the-art AI Research Center is now open for students and faculty...' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-header.png" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-gray-600 hover:text-black">Directory</Link>
              <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
              <Link href="/jobs" className="text-gray-600 hover:text-black">Jobs</Link>
              <Link href="/news" className="text-red-600 font-semibold">News</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">News & Updates</h1>

        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm w-fit">
          {['all', 'college', 'alumni'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab ? 'bg-red-600 text-white' : 'text-gray-600 hover:text-black'
              }`}
            >
              {tab === 'all' ? 'All News' : tab === 'college' ? 'College Updates' : 'Alumni Achievements'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {news.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-sm p-8 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>
                  <span className="text-gray-500 text-sm">{article.date}</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-4">{article.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                <Link href={`/news/${article.id}`} className="text-red-600 hover:text-red-800 font-semibold">
                  Read More →
                </Link>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['#Innovation2024', '#AlumniAchievements', '#ResearchCenter', '#TechTalks'].map((tag) => (
                  <div key={tag} className="bg-gray-100 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold text-black mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-4">Stay updated with the latest news and events</p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
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