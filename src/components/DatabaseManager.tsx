'use client';

import { useState, useEffect } from 'react';
import { DatabaseConfig } from '@/lib/database';

export default function DatabaseManager() {
  const [configs, setConfigs] = useState<DatabaseConfig[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConfig, setNewConfig] = useState({
    name: '',
    type: 'sqlite' as 'sqlite' | 'mysql' | 'postgresql',
    path: '',
    host: '',
    port: 5432,
    username: '',
    password: '',
    database: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      const response = await fetch('/api/database');
      const data = await response.json();
      setConfigs(data.configs || []);
    } catch {
      console.error('Failed to fetch database configs');
    }
  };

  const handleAddConfig = async () => {
    // Validation
    if (!newConfig.name.trim()) {
      setError('Database name is required');
      return;
    }
    
    if (newConfig.type === 'sqlite' && !newConfig.path.trim()) {
      setError('File path is required for SQLite');
      return;
    }
    
    if (newConfig.type !== 'sqlite' && (!newConfig.host.trim() || !newConfig.database.trim())) {
      setError('Host and database name are required');
      return;
    }

    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', ...newConfig })
      });

      if (response.ok) {
        fetchConfigs();
        setShowAddForm(false);
        setNewConfig({
          name: '', type: 'sqlite', path: '', host: '', port: 5432,
          username: '', password: '', database: ''
        });
        setError('');
      } else {
        setError('Failed to add database configuration');
      }
    } catch (error) {
      setError('Network error occurred');
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setActive', id })
      });
      fetchConfigs();
    } catch (error) {
      console.error('Failed to set active database:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-theme-primary">Database Connections</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary text-white px-4 py-2 rounded-lg text-sm"
        >
          Add Database
        </button>
      </div>

      {/* Add Database Form */}
      {showAddForm && (
        <div className="card p-6">
          <h4 className="font-semibold text-theme-primary mb-4">Add New Database</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">Name</label>
              <input
                type="text"
                value={newConfig.name}
                onChange={(e) => setNewConfig({...newConfig, name: e.target.value})}
                className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-theme-primary mb-2">Type</label>
              <select
                value={newConfig.type}
                onChange={(e) => setNewConfig({...newConfig, type: e.target.value as 'sqlite' | 'mysql' | 'postgresql'})}
                className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
              >
                <option value="sqlite">SQLite</option>
                <option value="mysql">MySQL</option>
                <option value="postgresql">PostgreSQL</option>
              </select>
            </div>
            {newConfig.type === 'sqlite' ? (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-theme-primary mb-2">File Path</label>
                <input
                  type="text"
                  value={newConfig.path}
                  onChange={(e) => setNewConfig({...newConfig, path: e.target.value})}
                  className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
                  placeholder="./data/database.db"
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">Host</label>
                  <input
                    type="text"
                    value={newConfig.host}
                    onChange={(e) => setNewConfig({...newConfig, host: e.target.value})}
                    className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">Port</label>
                  <input
                    type="number"
                    value={newConfig.port}
                    onChange={(e) => setNewConfig({...newConfig, port: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">Username</label>
                  <input
                    type="text"
                    value={newConfig.username}
                    onChange={(e) => setNewConfig({...newConfig, username: e.target.value})}
                    className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-primary mb-2">Database</label>
                  <input
                    type="text"
                    value={newConfig.database}
                    onChange={(e) => setNewConfig({...newConfig, database: e.target.value})}
                    className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
                  />
                </div>
              </>
            )}
          </div>
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg mt-4">
              {error}
            </div>
          )}
          <div className="flex space-x-3 mt-4">
            <button
              onClick={handleAddConfig}
              className="bg-theme-primary text-white px-4 py-2 rounded-lg"
            >
              Add Database
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setError('');
              }}
              className="border border-theme text-theme-primary px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Database List */}
      <div className="space-y-4">
        {configs.map((config) => (
          <div key={config.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-theme-primary">{config.name}</h4>
                <p className="text-sm text-theme-secondary">
                  {config.type.toUpperCase()} - {config.type === 'sqlite' ? config.path : `${config.host}:${config.port}`}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  config.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {config.isActive ? 'Active' : 'Inactive'}
                </span>
                {!config.isActive && (
                  <button
                    onClick={() => handleSetActive(config.id)}
                    className="text-theme-primary hover:text-theme-secondary text-sm font-medium"
                  >
                    Set Active
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}