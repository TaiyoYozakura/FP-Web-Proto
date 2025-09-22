'use client';

import { useState } from 'react';

export default function ExcelImport() {
  const [file, setFile] = useState<File | null>(null);
  const [tableName, setTableName] = useState('alumni_data');
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    if (!tableName.trim()) {
      setResult('✗ Error: Please enter a table name');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tableName', tableName.trim());

    try {
      const response = await fetch('/api/excel-import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setResult(`✓ Successfully imported ${data.rowCount} rows to table "${data.tableName}"`);
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setResult(`✗ Error: ${data.error || 'Upload failed'}`);
      }
    } catch (error) {
      setResult(`✗ Upload failed: ${error instanceof Error ? error.message : 'Network error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-theme-primary mb-4">Upload Excel File</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Select Excel File (.xlsx, .xls)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
            />
            {file && (
              <p className="text-sm text-theme-secondary mt-1">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-theme-primary mb-2">
              Table Name
            </label>
            <input
              type="text"
              value={tableName}
              onChange={(e) => setTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
              className="w-full px-3 py-2 border border-theme rounded-lg bg-theme-surface"
              placeholder="Enter table name (letters, numbers, underscore only)"
              maxLength={50}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || isUploading || !tableName.trim()}
            className="bg-theme-primary text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Processing...' : 'Import to Database'}
          </button>
        </div>

        {result && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            result.startsWith('✓') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}