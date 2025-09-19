'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the Alumni Portal Query Bot. I can help you with registration, profile updates, alumni directory, events, jobs, and donations. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "How to register?",
    "Find alumni",
    "Update profile",
    "Job postings",
    "Events info"
  ];

  const alumniPortalKnowledge = {
    // Registration & Login
    "register": "To register: Click 'Join Alumni Network' → Fill registration form → Verify email → Complete profile setup.",
    "login": "Login options: Alumni Login (main portal), Student Login, or Faculty Login. Use your registered email and password.",
    "password": "Forgot password? Click 'Forgot Password' on login page → Enter email → Check inbox for reset link.",
    
    // Profile Management
    "profile": "Update profile: Dashboard → My Profile → Edit sections (Personal Info, Work Experience, Education, Contact Details) → Save changes.",
    "photo": "Add profile photo: Go to My Profile → Click profile picture area → Upload image (max 5MB, JPG/PNG).",
    
    // Alumni Directory
    "directory": "Alumni Directory: Search by name, graduation year, location, or industry → Use filters → Click 'Connect' to message alumni.",
    "search": "Search alumni: Use search bar in Directory → Filter by city, company, batch year → View profiles → Send connection requests.",
    "connect": "Connect with alumni: Find them in Directory → Click 'Connect' → Send personalized message → Wait for acceptance.",
    
    // Events
    "events": "Events: View upcoming reunions, networking sessions, webinars → Register online → Add to calendar → Receive reminders.",
    "reunion": "Annual reunion: Check Events page → Register early → Book accommodation → Join WhatsApp group for updates.",
    
    // Jobs & Career
    "jobs": "Job opportunities: Career Services section → Browse postings → Apply directly → Post jobs for other alumni.",
    "career": "Career services: Job board, resume tips, interview guidance, mentorship programs, industry networking.",
    "post": "Post jobs: Career Services → 'Post Job' → Fill details → Review → Publish (free for alumni).",
    
    // Donations
    "donate": "Donations: Visit Donation page → Choose amount → Select cause (scholarships/infrastructure) → Secure payment → Get receipt.",
    "scholarship": "Scholarships: Alumni donations fund merit-based scholarships for deserving students. Contribute via Donation page.",
    
    // Technical Support
    "support": "Technical support: Use this chat, email alumni@dnyanasadhana.edu.in, or call +91-22-2534-1191 during office hours.",
    "mobile": "Mobile app: Currently web-based portal. Optimized for mobile browsers. Native app coming soon.",
    
    // General Info
    "about": "Dnyanasadhana College Alumni Portal: Connect 15K+ alumni worldwide, find jobs, attend events, give back to college.",
    "contact": "Contact: Email alumni@dnyanasadhana.edu.in, Phone +91-22-2534-1191, Address: Thane West, Maharashtra."
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check if question is related to alumni portal
    const portalKeywords = ['alumni', 'portal', 'register', 'login', 'profile', 'directory', 'event', 'job', 'career', 'donate', 'scholarship', 'connect', 'search', 'reunion', 'college', 'dnyanasadhana'];
    const isPortalRelated = portalKeywords.some(keyword => message.includes(keyword));
    
    if (!isPortalRelated) {
      return "I can only help with Alumni Portal related questions. Please ask about registration, profile updates, alumni directory, events, jobs, or donations.";
    }
    
    // Find best matching response
    for (const [key, response] of Object.entries(alumniPortalKnowledge)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Default portal help
    return "I help with Alumni Portal queries. Ask about: Registration, Profile updates, Alumni Directory, Events, Job postings, Donations, or Technical support.";
  };

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 bg-theme-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-theme-primary text-white p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Alumni Portal Assistant</h3>
                <p className="text-sm opacity-90">Available 24/7 for portal queries</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-sm px-4 py-3 rounded-xl text-sm shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-theme-primary text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex space-x-1 items-center">
                    <span className="text-sm text-gray-500 mr-2">Typing</span>
                    <div className="w-2 h-2 bg-theme-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-theme-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-5 py-3 bg-white border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs bg-theme-primary/10 text-theme-primary px-3 py-2 rounded-lg hover:bg-theme-primary hover:text-white transition-all duration-200 font-medium"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-5 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about alumni portal features..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-sm bg-gray-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="bg-theme-primary text-white px-4 py-3 rounded-xl hover:bg-theme-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}