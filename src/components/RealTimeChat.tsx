'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  avatar: string;
}

export default function RealTimeChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState(12);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate real-time messages
    const interval = setInterval(() => {
      const randomMessages = [
        'Anyone from 2018 batch working at Google?',
        'Great networking event last week! 🎉',
        'Looking for mentorship in data science',
        'Hiring software engineers at my startup!',
        'Alumni meet in Mumbai next month 📅'
      ];
      
      const randomUsers = ['Rahul S.', 'Priya M.', 'Amit K.', 'Sneha P.', 'Vikram R.'];
      
      if (Math.random() > 0.7) {
        const newMsg: Message = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          avatar: `https://ui-avatars.com/api/?name=${randomUsers[Math.floor(Math.random() * randomUsers.length)]}&background=random`
        };
        
        setMessages(prev => [...prev.slice(-20), newMsg]);
        setOnlineUsers(prev => Math.floor(Math.random() * 5) + 10);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date(),
      avatar: 'https://ui-avatars.com/api/?name=You&background=4f46e5'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-96 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-gray-800">💬 Alumni Live Chat</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
              🟢 {onlineUsers} Online
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start space-x-3 ${msg.user === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <img src={msg.avatar} alt={msg.user} className="w-8 h-8 rounded-full" />
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.user === 'You' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm font-semibold mb-1">{msg.user}</p>
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-70 mt-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-sm">Someone is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            📤 Send
          </button>
        </div>
      </div>
    </div>
  );
}