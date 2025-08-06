import React from 'react';
import { Plus, Trash2, Download } from 'lucide-react';

const SchemaManager = ({ schemas, setSchemas, currentSchema, setCurrentSchema, setJsonInput }) => {
  const addNewSchema = () => {
    const newSchema = {
      id: `schema-${Date.now()}`,
      name: 'New Component',
      schema: {
        type: 'text',
        title: 'New Component',
        content: 'Edit this component in the JSON editor'
      }
    };
    const updated = [...schemas, newSchema];
    setSchemas(updated);
    setCurrentSchema(newSchema);
    setJsonInput(JSON.stringify(newSchema.schema, null, 2));
  };

  const deleteSchema = (id) => {
    if (schemas.length === 1) return alert('Cannot delete the last schema');
    const updated = schemas.filter(s => s.id !== id);
    setSchemas(updated);
    if (currentSchema.id === id) {
      const next = updated[0];
      setCurrentSchema(next);
      setJsonInput(JSON.stringify(next.schema, null, 2));
    }
  };

  const exportSchema = () => {
    const data = JSON.stringify(schemas, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schemas.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Schema Manager</h2>
        <div className="flex gap-2">
          <button onClick={addNewSchema} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-md text-sm">
            <Plus size={16} /> New
          </button>
          <button onClick={exportSchema} className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-md text-sm">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {schemas.map(schema => (
          <div key={schema.id} className="flex items-center">
            <button
              onClick={() => {
                setCurrentSchema(schema);
                setJsonInput(JSON.stringify(schema.schema, null, 2));
              }}
              className={`px-3 py-1.5 rounded-l-md text-sm ${currentSchema.id === schema.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {schema.name}
            </button>
            {schemas.length > 1 && (
              <button onClick={() => deleteSchema(schema.id)} className="px-2 py-1.5 bg-red-500 text-white rounded-r-md text-sm">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchemaManager;