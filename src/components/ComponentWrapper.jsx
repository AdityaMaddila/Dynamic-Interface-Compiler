import React from 'react';
import { Edit3, Trash2 } from 'lucide-react';

const ComponentWrapper = ({ component, index, onRemove, onEdit }) => {
  return (
    <div className="group relative mb-4 animate-fadeIn">
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex space-x-1">
        <button
          onClick={() => onEdit(index)}
          className="p-1 bg-blue-600 hover:bg-blue-700 rounded text-white shadow-lg transition-colors"
        >
          <Edit3 size={12} />
        </button>
        <button
          onClick={() => onRemove(index)}
          className="p-1 bg-red-600 hover:bg-red-700 rounded text-white shadow-lg transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
      <div className="border border-gray-700 rounded-lg hover:border-gray-600 transition-colors p-1">
        {component}
      </div>
    </div>
  );
};

export default ComponentWrapper;