import React from 'react';
import { Play } from 'lucide-react';

const JsonEditor = ({ jsonInput, setJsonInput, applySchema }) => {
  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      applySchema(parsed);
    } catch (err) {
      alert('Invalid JSON: ' + err.message);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <label className="text-sm font-medium text-gray-700">JSON Schema Editor</label>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="w-full h-96 p-3 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your JSON schema here..."
      />
      <button onClick={handleApply} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        <Play size={16} /> Apply & Render
      </button>
    </div>
  );
};

export default JsonEditor;