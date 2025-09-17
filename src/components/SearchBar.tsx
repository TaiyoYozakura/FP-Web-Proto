'use client';

import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export default function SearchBar({ 
  placeholder = "Search alumni, events, news...", 
  onSearch,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate search
    onSearch?.(query);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className={`search-container ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <div className="animate-spin text-theme-secondary">⟳</div>
          ) : (
            <span className="text-theme-secondary">🔍</span>
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input w-full pl-12 pr-4 py-3 bg-theme-surface border border-theme rounded-xl text-theme-primary placeholder-theme-secondary focus:border-theme-primary"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-theme-secondary hover:text-theme-primary transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
}