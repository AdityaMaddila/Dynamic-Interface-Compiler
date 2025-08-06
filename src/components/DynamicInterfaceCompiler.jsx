import React, { useState, useCallback } from 'react';
import Header from './Header';
import ComponentPalette from './ComponentPalette';
import JsonEditor from './JsonEditor';
import LivePreview from './LivePreview';
import ComponentLibrary from '../library/ComponentLibrary';
import { defaultTemplates } from '../utils/defaultTemplates';

const DynamicInterfaceCompiler = () => {
  const [components, setComponents] = useState([]);
  const [gridComponents, setGridComponents] = useState({});
  const [jsonInput, setJsonInput] = useState('{"layout": "list", "components": []}');
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [isJsonValid, setIsJsonValid] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [layoutMode, setLayoutMode] = useState('list');

  const renderComponent = useCallback((schema, index) => {
    const Component = ComponentLibrary[schema.type];
    if (!Component) return <div className="text-red-400 text-xs p-2">Unknown: {schema.type}</div>;
    return <Component schema={schema} key={index} />;
  }, []);

  const handleDragStart = (componentType) => {
    setDraggedComponent(componentType);
  };

  const handleDrop = (e, rowIndex = null, colIndex = null) => {
    e.preventDefault();
    
    if (draggedComponent && defaultTemplates[draggedComponent]) {
      const newSchema = { 
        ...defaultTemplates[draggedComponent],
        id: `${draggedComponent}_${Date.now()}`
      };

      if (layoutMode === 'grid' && rowIndex !== null && colIndex !== null) {
        const cellId = `${rowIndex}-${colIndex}`;
        const updatedGridComponents = {
          ...gridComponents,
          [cellId]: newSchema
        };
        
        setGridComponents(updatedGridComponents);
        setJsonInput(JSON.stringify({
          layout: 'grid',
          components: updatedGridComponents
        }, null, 2));
      } else if (layoutMode === 'list') {
        const updatedComponents = [...components, newSchema];
        setComponents(updatedComponents);
        setJsonInput(JSON.stringify({
          layout: 'list',
          components: updatedComponents
        }, null, 2));
      }
      
      setIsJsonValid(true);
    }
    setDraggedComponent(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveComponent = (identifier) => {
    if (layoutMode === 'grid') {
      const updatedGridComponents = { ...gridComponents };
      delete updatedGridComponents[identifier];
      setGridComponents(updatedGridComponents);
      setJsonInput(JSON.stringify({
        layout: 'grid',
        components: updatedGridComponents
      }, null, 2));
    } else {
      const updatedComponents = components.filter((_, i) => i !== identifier);
      setComponents(updatedComponents);
      setJsonInput(JSON.stringify({
        layout: 'list',
        components: updatedComponents
      }, null, 2));
    }
  };

  const handleClearAll = () => {
    setComponents([]);
    setGridComponents({});
    setJsonInput(JSON.stringify({
      layout: layoutMode,
      components: layoutMode === 'grid' ? {} : []
    }, null, 2));
    setIsJsonValid(true);
  };

  const handleLayoutModeChange = (mode) => {
    setLayoutMode(mode);
    if (mode === 'grid') {
      setJsonInput(JSON.stringify({
        layout: 'grid',
        components: gridComponents
      }, null, 2));
    } else {
      setJsonInput(JSON.stringify({
        layout: 'list',
        components: components
      }, null, 2));
    }
  };

  // Update components when JSON changes
  React.useEffect(() => {
    try {
      if (jsonInput.trim()) {
        const parsed = JSON.parse(jsonInput);
        
        if (parsed.layout === 'grid' && parsed.components && typeof parsed.components === 'object') {
          setGridComponents(parsed.components);
          setLayoutMode('grid');
          setIsJsonValid(true);
        } else if (parsed.layout === 'list' && Array.isArray(parsed.components)) {
          setComponents(parsed.components);
          setLayoutMode('list');
          setIsJsonValid(true);
        } else if (Array.isArray(parsed)) {
          // Backward compatibility
          setComponents(parsed);
          setLayoutMode('list');
          setIsJsonValid(true);
        } else if (parsed.components) {
          if (Array.isArray(parsed.components)) {
            setComponents(parsed.components);
            setLayoutMode('list');
          } else {
            setGridComponents(parsed.components);
            setLayoutMode('grid');
          }
          setIsJsonValid(true);
        }
      } else {
        setComponents([]);
        setGridComponents({});
        setIsJsonValid(true);
      }
    } catch (error) {
      setIsJsonValid(false);
    }
  }, [jsonInput]);

  const getComponentCount = () => {
    return layoutMode === 'grid' 
      ? Object.keys(gridComponents).length 
      : components.length;
  };

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
              componentCount={getComponentCount()}
              onClearAll={handleClearAll}
              layoutMode={layoutMode}
              onLayoutModeChange={handleLayoutModeChange}
            />
          </div>

          {/* Live Preview */}
          <div className="w-full lg:w-1/2 bg-gray-900 flex flex-col">
            <LivePreview 
              components={components}
              gridComponents={gridComponents}
              renderComponent={renderComponent}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onRemoveComponent={handleRemoveComponent}
              layoutMode={layoutMode}
              draggedComponent={draggedComponent}
            />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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

        .bg-gray-850 {
          background-color: #1f2937;
        }

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

        [draggable="true"] {
          cursor: grab;
        }
        
        [draggable="true"]:active {
          cursor: grabbing;
        }

        .grid-cell:hover {
          transform: scale(1.02);
        }

        .drag-over {
          background: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default DynamicInterfaceCompiler;