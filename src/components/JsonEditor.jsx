import React from 'react';
import { Code, Grid, List } from 'lucide-react';

const JsonEditor = ({ 
  jsonInput, 
  setJsonInput, 
  isValid, 
  componentCount, 
  onClearAll,
  layoutMode = 'list',
  onLayoutModeChange 
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Code className="mr-2" size={20} />
            JSON Schema ({componentCount} components)
          </h3>
          
          {/* Layout Mode Toggle */}
          {onLayoutModeChange && (
            <div className="flex items-center bg-gray-700 rounded p-1">
              <button
                onClick={() => onLayoutModeChange('list')}
                className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
                  layoutMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                title="List Layout"
              >
                <List size={12} className="mr-1" />
                List
              </button>
              <button
                onClick={() => onLayoutModeChange('grid')}
                className={`flex items-center px-2 py-1 rounded text-xs transition-colors ${
                  layoutMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Grid Layout"
              >
                <Grid size={12} className="mr-1" />
                Grid
              </button>
            </div>
          )}
        </div>
        
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
          placeholder={`Your JSON schema will appear here...\n\n${
            layoutMode === 'grid' 
              ? '{\n  "layout": "grid",\n  "components": {\n    "0-0": {...},\n    "1-2": {...}\n  }\n}'
              : '{\n  "layout": "list",\n  "components": [\n    {...},\n    {...}\n  ]\n}'
          }`}
        />
      </div>
      
      {/* Layout Info */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <span>
            Layout: <span className="text-gray-300">{layoutMode}</span> • 
            Components: <span className="text-gray-300">{componentCount}</span>
          </span>
          <span className="text-gray-600">
            {layoutMode === 'grid' ? '🎯 Grid positioning' : '📝 Linear stacking'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;