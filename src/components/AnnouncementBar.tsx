'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const announcements = [
    {
      text: "Alumni Meet 2024 registration is now open - Register by December 10th",
      link: "/events",
      type: "event"
    },
    {
      text: "New scholarship program launched - ₹5L fund available for deserving students",
      link: "/donation",
      type: "news"
    },
    {
      text: "500+ new job opportunities posted this month - Check Career Services",
      link: "/jobs",
      type: "jobs"
    },
    {
      text: "Alumni Directory updated with 2,000+ new profiles - Connect with fellow graduates",
      link: "/directory",
      type: "update"
    },
    {
      text: "Tech Talk Series: AI in Business - December 20th, 6 PM - Register now",
      link: "/events",
      type: "event"
    },
    {
      text: "Mentorship Program 2025 applications open - Guide the next generation",
      link: "/dashboard",
      type: "program"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600 text-white py-4 relative overflow-hidden shadow-xl border-y-4 border-blue-700">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Animated background pulse */}
        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        <div className="flex items-center space-x-3 flex-1 relative z-10">
          <svg className="w-6 h-6 flex-shrink-0 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
          <div className="flex-1 overflow-hidden">
            <Link 
              href={announcements[currentIndex].link}
              className="block hover:underline transition-all duration-300 animate-pulse"
            >
              <span className="text-lg font-black tracking-wide text-shadow">
                ⚠️ {announcements[currentIndex].text}
              </span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 relative z-10">
          <div className="flex space-x-1">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all border-2 border-white ${
                  currentIndex === index ? 'bg-white scale-125' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition-colors p-1"
            title="Close announcements"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}