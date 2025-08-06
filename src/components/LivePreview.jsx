import React from 'react';
import { Eye, Plus } from 'lucide-react';
import ComponentWrapper from './ComponentWrapper';

const LivePreview = ({ components, renderComponent, onDrop, onDragOver, onRemoveComponent }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Eye className="mr-2" size={20} />
          Live Preview ({components.length} components)
        </h3>
      </div>
      <div 
        className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-y-auto"
        onDrop={onDrop}
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
                onEdit={(idx) => {/* Future: Edit specific component */}}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;