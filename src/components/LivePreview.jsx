import React from 'react';

const LivePreview = ({ schema, renderComponent }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
      <div className="p-4 border border-gray-200 rounded-md">
        {renderComponent(schema)}
      </div>
    </div>
  );
};

export default LivePreview;