'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([
    { id: 1, name: 'Sarah Johnson', lastMessage: 'Hey! Are you attending the...', time: '2m ago', unread: 2 },
    { id: 2, name: 'Michael Brown', lastMessage: 'Thanks for the connection!', time: '1h ago', unread: 0 },
    { id: 3, name: 'Emily Davis', lastMessage: 'Great meeting you at the event', time: '2h ago', unread: 1 }
  ]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sarah Johnson', content: 'Hi! Would love to connect and share experiences!', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'Me', content: 'Sure, would be great to connect!', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'Sarah Johnson', content: 'Are you planning to attend the alumni meet?', time: '10:35 AM', isMe: false }
  ]);
  const { state } = useApp();
  const router = useRouter();
  
  useEffect(() => {
    if (!state.user) {
      router.push('/login');
    }
  }, [state.user, router]);
  
  if (!state.user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>;
  }
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 'Me',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Update conversation last message
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat 
        ? { ...conv, lastMessage: message, time: 'now' }
        : conv
    ));
    
    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        'That sounds great!',
        'Thanks for sharing!',
        'I agree with you.',
        'Let me think about it.',
        'Absolutely!'
      ];
      
      const responseMessage = {
        id: messages.length + 2,
        sender: conversations.find(c => c.id === selectedChat)?.name || 'Unknown',
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image src="/SAC-LOGO.webp" alt="St Andrews College" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-bold text-black">St Andrews Alumni Portal</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-black">Dashboard</Link>
              <Link href="/directory" className="text-gray-600 hover:text-black">Directory</Link>
              <Link href="/events" className="text-gray-600 hover:text-black">Events</Link>
              <Link href="/messaging" className="text-red-600 font-semibold">Messages</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Messages</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat === conv.id ? 'bg-red-50 border-l-4 border-l-red-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {conv.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-black truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                  <div>
                    <h3 className="font-bold text-black">Sarah Johnson</h3>
                    <p className="text-sm text-gray-600">Product Manager | Batch 2015</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.isMe 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-black'
                    }`}>
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.isMe ? 'text-red-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}