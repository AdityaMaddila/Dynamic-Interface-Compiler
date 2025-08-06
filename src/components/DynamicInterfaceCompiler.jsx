import React, { useState, useCallback } from 'react';
import SchemaManager from './SchemaManager';
import JsonEditor from './JsonEditor';
import TemplatePanel from './TemplatePanel';
import LivePreview from './LivePreview';
import Footer from './Footer';
import { defaultTemplates } from '../utils/defaultTemplates';
import ComponentLibrary from '../library/ComponentLibrary'; // Assuming you have a component library for rendering schemas


const DynamicInterfaceCompiler = () => {
  const [schemas, setSchemas] = useState([
    {
      id: 'demo-form',
      name: 'Demo Form',
      schema: defaultTemplates.form,
    },
  ]);
  const [currentSchema, setCurrentSchema] = useState(schemas[0]);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(schemas[0].schema, null, 2));
  const [activeTab, setActiveTab] = useState('editor');
  const [renderKey, setRenderKey] = useState(0);

  const renderComponent = useCallback((schema) => {
    const Component = ComponentLibrary[schema.type];
    if (!Component) return <div>Unknown component type</div>;
    return <Component schema={schema} key={renderKey} />;
  }, [renderKey]);

  const applySchema = (parsedSchema) => {
    const updated = schemas.map(s => s.id === currentSchema.id ? { ...s, schema: parsedSchema } : s);
    setSchemas(updated);
    setCurrentSchema(prev => ({ ...prev, schema: parsedSchema }));
    setRenderKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 mb-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold">🧪 Dynamic Interface Compiler</h1>
          <p className="text-gray-600">Build UI components from JSON schemas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md">
            <SchemaManager
              schemas={schemas}
              setSchemas={setSchemas}
              currentSchema={currentSchema}
              setCurrentSchema={setCurrentSchema}
              setJsonInput={setJsonInput}
            />

            <div className="border-b border-gray-200">
              <nav className="flex">
                {['editor', 'templates'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {activeTab === 'editor' ? (
              <JsonEditor
                jsonInput={jsonInput}
                setJsonInput={setJsonInput}
                applySchema={applySchema}
              />
            ) : (
              <TemplatePanel setJsonInput={setJsonInput} />
            )}
          </div>

          <LivePreview schema={currentSchema.schema} renderComponent={renderComponent} />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DynamicInterfaceCompiler;