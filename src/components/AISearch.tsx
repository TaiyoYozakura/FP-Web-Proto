'use client';

import { useState } from 'react';

export default function AISearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAISearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockResults = [
      { name: 'Rajesh Sharma', batch: '2018', company: 'Google', match: '95%', reason: 'Software Engineer with AI expertise' },
      { name: 'Priya Mehta', batch: '2019', company: 'Microsoft', match: '87%', reason: 'Similar career path in tech' },
      { name: 'Amit Kumar', batch: '2017', company: 'Amazon', match: '82%', reason: 'Works in same domain' }
    ];
    
    setResults(mockResults);
    setIsSearching(false);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3">🤖</span>
        <h3 className="text-xl font-bold text-purple-800">AI-Powered Alumni Search</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Ask AI: 'Find alumni working in tech companies' or 'Show me batch 2018 entrepreneurs'"
            className="flex-1 px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleAISearch}
            disabled={isSearching}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isSearching ? '🔍 Searching...' : '🚀 AI Search'}
          </button>
        </div>
        
        {results.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-purple-800">🎯 AI Found {results.length} Perfect Matches:</h4>
            {results.map((result, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-purple-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-gray-800">{result.name}</h5>
                    <p className="text-sm text-gray-600">{result.company} • Batch {result.batch}</p>
                    <p className="text-xs text-purple-600 mt-1">💡 {result.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      {result.match} Match
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}