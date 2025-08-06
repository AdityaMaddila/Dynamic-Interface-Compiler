import React from 'react';
import { Code } from 'lucide-react';

const JsonEditor = ({ jsonInput, setJsonInput, isValid, componentCount, onClearAll }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Code className="mr-2" size={20} />
          JSON Schema ({componentCount} components)
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-1 rounded text-xs font-medium ${
            isValid ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
          }`}>
            {isValid ? 'Valid JSON' : 'Invalid JSON'}
          </div>
          {componentCount > 0 && (
            <button
              onClick={onClearAll}
              className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 p-4">
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm p-4 rounded border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Your JSON schema array will appear here..."
        />
      </div>
    </div>
  );
};

export default JsonEditor;