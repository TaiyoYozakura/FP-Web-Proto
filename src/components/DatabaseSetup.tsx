'use client';

import { useState } from 'react';
import { dbManager } from '@/lib/database';

export default function DatabaseSetup() {
  const [uri, setUri] = useState(process.env.DATABASE_URL || '');
  const [isConnecting, setIsConnecting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleConnect = async () => {
    if (!uri.trim()) {
      setStatus('error');
      setMessage('Please enter a database URI');
      return;
    }

    setIsConnecting(true);
    setStatus('idle');

    try {
      const connected = await dbManager.connect(uri);
      if (connected) {
        await dbManager.createTables();
        setStatus('success');
        setMessage('✅ Database connected successfully!');
      } else {
        setStatus('error');
        setMessage('❌ Failed to connect to database');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Connection error: ${error}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectionStatus = dbManager.getConnectionStatus();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
        <span className="text-blue-600 mr-2">🗄️</span>
        Database Configuration
      </h3>
      
      {connectionStatus?.isConnected && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-semibold">
            ✅ Connected to {connectionStatus.type.toUpperCase()} database
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-blue-600 mb-2">
            Database URI
          </label>
          <input
            type="text"
            value={uri}
            onChange={(e) => setUri(e.target.value)}
            placeholder="postgresql://user:pass@host:port/db or mysql://user:pass@host:port/db"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supports PostgreSQL, MySQL, and SQLite
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Connecting...
            </div>
          ) : 'Connect Database'}
        </button>

        {message && (
          <div className={`p-3 rounded-lg ${
            status === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {message}
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Examples:</strong></p>
          <p>• PostgreSQL: <code>postgresql://user:pass@localhost:5432/alumni_db</code></p>
          <p>• MySQL: <code>mysql://user:pass@localhost:3306/alumni_db</code></p>
          <p>• SQLite: <code>sqlite:./data/alumni.db</code></p>
        </div>
      </div>
    </div>
  );
}