import React, { useState, useCallback } from 'react';
import Header from './Header';
import ComponentPalette from './ComponentPalette';
import JsonEditor from './JsonEditor';
import LivePreview from './LivePreview';
import ComponentLibrary from '../library/ComponentLibrary'; // Assuming this is where your components are defined
import { defaultTemplates } from '../utils/defaultTemplates';
const DynamicInterfaceCompiler = () => {
  const [components, setComponents] = useState([]);
  const [jsonInput, setJsonInput] = useState('[]');
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [isJsonValid, setIsJsonValid] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderComponent = useCallback((schema, index) => {
    const Component = ComponentLibrary[schema.type];
    if (!Component) return <div className="text-red-400">Unknown component type: {schema.type}</div>;
    return <Component schema={schema} key={index} />;
  }, []);

  const handleDragStart = (componentType) => {
    setDraggedComponent(componentType);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedComponent && defaultTemplates[draggedComponent]) {
      const newSchema = { 
        ...defaultTemplates[draggedComponent],
        id: `${draggedComponent}_${Date.now()}`
      };
      const updatedComponents = [...components, newSchema];
      setComponents(updatedComponents);
      setJsonInput(JSON.stringify(updatedComponents, null, 2));
      setIsJsonValid(true);
    }
    setDraggedComponent(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveComponent = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
    setJsonInput(JSON.stringify(updatedComponents, null, 2));
  };

  const handleClearAll = () => {
    setComponents([]);
    setJsonInput('[]');
    setIsJsonValid(true);
  };

  // Update components when JSON changes
  React.useEffect(() => {
    try {
      if (jsonInput.trim()) {
        const parsed = JSON.parse(jsonInput);
        if (Array.isArray(parsed)) {
          setComponents(parsed);
          setIsJsonValid(true);
        } else {
          // If it's a single object, wrap it in an array
          setComponents([parsed]);
          setIsJsonValid(true);
        }
      } else {
        setComponents([]);
        setIsJsonValid(true);
      }
    } catch (error) {
      setIsJsonValid(false);
    }
  }, [jsonInput]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80 bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden flex-shrink-0`}>
          <div className="p-6 h-full overflow-y-auto">
            <ComponentPalette onDragStart={handleDragStart} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* JSON Editor */}
          <div className="w-full lg:w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col">
            <JsonEditor 
              jsonInput={jsonInput} 
              setJsonInput={setJsonInput}
              isValid={isJsonValid}
              componentCount={components.length}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Live Preview */}
          <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col">
            <LivePreview 
              components={components}
              renderComponent={renderComponent}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onRemoveComponent={handleRemoveComponent}
            />
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .bg-gray-750 {
          background-color: #374151;
        }

        /* Scrollbar Styling */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        /* Custom drag cursor */
        [draggable="true"] {
          cursor: grab;
        }
        
        [draggable="true"]:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default DynamicInterfaceCompiler;