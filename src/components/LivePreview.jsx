import React, { useState } from 'react';
import { Eye, Plus, Grid as GridIcon, Maximize2, Minimize2, Trash2, Edit3 } from 'lucide-react';
import ComponentWrapper from './ComponentWrapper';

const GridCell = ({ 
  rowIndex, 
  colIndex, 
  component, 
  onDrop, 
  onDragOver, 
  onRemoveComponent, 
  renderComponent, 
  gridSize 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const cellId = `${rowIndex}-${colIndex}`;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(e, rowIndex, colIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleRemove = () => {
    onRemoveComponent(cellId);
  };

  return (
    <div
      className={`
        w-full h-full border border-dashed rounded-lg transition-all duration-200 relative
        ${isDragOver 
          ? 'border-blue-400 bg-blue-500 bg-opacity-5 scale-[1.02] shadow-lg' 
          : component 
            ? 'border-transparent bg-gray-800 shadow-sm' 
            : 'border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800 hover:bg-opacity-30'
        }
      `}
      style={{ 
        minHeight: gridSize === 'small' ? '80px' : gridSize === 'large' ? '120px' : '100px' 
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {component ? (
        <div className="group relative h-full">
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex space-x-1">
            <button
              onClick={handleRemove}
              className="w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-md transition-all flex items-center justify-center text-xs"
              title="Remove"
            >
              ×
            </button>
          </div>
          <div className="h-full p-1 overflow-hidden rounded-lg">
            {renderComponent(component, cellId)}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full opacity-60 group-hover:opacity-100 transition-opacity">
          <Plus size={16} className="text-gray-500 group-hover:text-gray-400 transition-colors" />
        </div>
      )}
    </div>
  );
};

const LivePreview = ({ 
  components = [], 
  gridComponents = {},
  renderComponent, 
  onDrop, 
  onDragOver, 
  onRemoveComponent,
  layoutMode = 'list',
  draggedComponent
}) => {
  const [gridDimensions, setGridDimensions] = useState({ rows: 4, cols: 3 });
  const [gridSize, setGridSize] = useState('medium');

  const adjustGrid = (dimension, delta) => {
    setGridDimensions(prev => ({
      ...prev,
      [dimension]: Math.max(1, Math.min(4, prev[dimension] + delta))
    }));
  };

  const componentCount = layoutMode === 'grid' 
    ? Object.keys(gridComponents).length 
    : components.length;

  // List view with proper drop zone
  if (layoutMode === 'list') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Eye className="mr-2" size={20} />
            Live Preview ({componentCount} components)
          </h3>
        </div>
        
        <div 
          className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto"
          onDrop={(e) => onDrop(e)}
          onDragOver={onDragOver}
        >
          {components.length > 0 ? (
            <div className="space-y-4">
              {components.map((schema, index) => (
                <ComponentWrapper
                  key={`${schema.type}-${index}`}
                  component={renderComponent(schema, index)}
                  index={index}
                  onRemove={onRemoveComponent}
                  onEdit={(idx) => {/* Edit component */}}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Plus className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-400 text-lg mb-2">Drop components here</p>
                <p className="text-gray-500 text-sm">Drag from the component palette to get started</p>
                {draggedComponent && (
                  <div className="mt-4 p-2 bg-blue-900 bg-opacity-50 rounded border border-blue-500">
                    <p className="text-blue-300 text-sm">Ready to drop: {draggedComponent}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="h-full flex flex-col">
      {/* Header with Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <GridIcon className="mr-2" size={20} />
          Layout Grid ({componentCount} placed)
        </h3>
        
        <div className="flex items-center space-x-2">
          {/* Grid Size Controls */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded p-1">
            <button
              onClick={() => setGridSize('small')}
              className={`p-1 rounded text-xs ${gridSize === 'small' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Small Grid"
            >
              <Minimize2 size={12} />
            </button>
            <button
              onClick={() => setGridSize('medium')}
              className={`p-1 rounded text-xs ${gridSize === 'medium' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Medium Grid"
            >
              <GridIcon size={12} />
            </button>
            <button
              onClick={() => setGridSize('large')}
              className={`p-1 rounded text-xs ${gridSize === 'large' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Large Grid"
            >
              <Maximize2 size={12} />
            </button>
          </div>

          {/* Grid Dimension Controls */}
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <span>Rows:</span>
              <button
                onClick={() => adjustGrid('rows', -1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                -
              </button>
              <span className="w-6 text-center">{gridDimensions.rows}</span>
              <button
                onClick={() => adjustGrid('rows', 1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                +
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
              <span>Cols:</span>
              <button
                onClick={() => adjustGrid('cols', -1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                -
              </button>
              <span className="w-6 text-center">{gridDimensions.cols}</span>
              <button
                onClick={() => adjustGrid('cols', 1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative">
        <div 
          className={`grid w-full h-full ${
            gridSize === 'small' ? 'gap-2' : gridSize === 'large' ? 'gap-4' : 'gap-3'
          }`}
          style={{
            gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`
          }}
        >
          {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) =>
            Array.from({ length: gridDimensions.cols }).map((_, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const component = gridComponents[cellId];
              
              return (
                <GridCell
                  key={cellId}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  component={component}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onRemoveComponent={onRemoveComponent}
                  renderComponent={renderComponent}
                  gridSize={gridSize}
                />
              );
            })
          )}
        </div>

        {componentCount === 0 && (
          <div className="absolute inset-6 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-700 bg-opacity-50 rounded-xl flex items-center justify-center">
                <GridIcon className="text-gray-400" size={24} />
              </div>
              <p className="text-gray-400 text-lg mb-1">Design Your Layout</p>
              <p className="text-gray-500 text-sm">Drag components into the grid</p>
              {draggedComponent && (
                <div className="mt-3 px-3 py-1 bg-blue-900 bg-opacity-30 rounded-full border border-blue-500 pointer-events-auto">
                  <p className="text-blue-300 text-xs">Dragging: {draggedComponent}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Grid Info Footer */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
        <div className="flex justify-between items-center">
          <span>
            {gridDimensions.rows}×{gridDimensions.cols} • {componentCount} placed
          </span>
          <span className="text-gray-500">
            {gridSize} grid
          </span>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;