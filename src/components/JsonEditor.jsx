import React from 'react';
import { Code, Grid, List, Check, X, Trash2 } from 'lucide-react';
import ValidationHelperPopup from './ValidationHelperPopup';

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
      {/* Header Section */}
      <div className="bg-gray-800 border-b border-gray-700">
        {/* Top Row - Title and Main Actions */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-blue-600 bg-opacity-20 rounded-lg">
                <Code className="text-blue-400" size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">
                JSON Schema
              </h3>
              <div className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md font-medium">
                {componentCount} {componentCount === 1 ? 'component' : 'components'}
              </div>
            </div>
            
            {/* JSON Status Indicator */}
            <div className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              isValid 
                ? 'bg-green-900 bg-opacity-40 text-green-300 border border-green-800' 
                : 'bg-red-900 bg-opacity-40 text-red-300 border border-red-800'
            }`}>
              {isValid ? (
                <>
                  <Check size={14} className="mr-1.5" />
                  Valid JSON
                </>
              ) : (
                <>
                  <X size={14} className="mr-1.5" />
                  Invalid JSON
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Validation Helper */}
            <ValidationHelperPopup />
            
            {/* Clear All Button */}
            {componentCount > 0 && (
              <button
                onClick={onClearAll}
                className="flex items-center px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-all duration-200 hover:shadow-lg group"
                title="Clear all components"
              >
                <Trash2 size={14} className="mr-1.5 group-hover:animate-pulse" />
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {/* Bottom Row - Layout Controls and Info */}
        <div className="flex items-center justify-between px-6 py-3 bg-gray-900 bg-opacity-50 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            {/* Layout Mode Toggle */}
            {onLayoutModeChange && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400 font-medium">Layout:</span>
                <div className="flex items-center bg-gray-700 rounded-lg p-1 border border-gray-600">
                  <button
                    onClick={() => onLayoutModeChange('list')}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      layoutMode === 'list' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                    title="List Layout - Components stack vertically"
                  >
                    <List size={14} className="mr-1.5" />
                    List
                  </button>
                  <button
                    onClick={() => onLayoutModeChange('grid')}
                    className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                      layoutMode === 'grid' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-600'
                    }`}
                    title="Grid Layout - Components use row/column positioning"
                  >
                    <Grid size={14} className="mr-1.5" />
                    Grid
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Layout Info */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-gray-400">
              <span className="mr-2">
                {layoutMode === 'grid' ? '🎯' : '📝'}
              </span>
              <span>
                {layoutMode === 'grid' ? 'Grid positioning enabled' : 'Linear stacking mode'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Editor Section */}
      <div className="flex-1 p-6">
        <div className="h-full relative">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm p-5 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200 shadow-inner"
            placeholder={`Your JSON schema will appear here...\n\n${
              layoutMode === 'grid' 
                ? '{\n  "layout": "grid",\n  "components": {\n    "0-0": {...},\n    "1-2": {...}\n  }\n}'
                : '{\n  "layout": "list",\n  "components": [\n    {...},\n    {...}\n  ]\n}'
            }`}
          />
          
          {/* Corner Info Badge */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-gray-800 bg-opacity-90 border border-gray-600 rounded-lg text-xs text-gray-400 backdrop-blur-sm">
            {jsonInput.length} characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;