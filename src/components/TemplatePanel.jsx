import React from 'react';
import { defaultTemplates } from '../utils/defaultTemplates';

const TemplatePanel = ({ setJsonInput }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Templates</h3>
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(defaultTemplates).map(([key, template]) => (
          <button
            key={key}
            onClick={() => setJsonInput(JSON.stringify(template, null, 2))}
            className="w-full text-left bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md shadow-sm"
          >
            {template.title || key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePanel;