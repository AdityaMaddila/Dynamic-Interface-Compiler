import React from 'react';

const ComponentLibrary = {
  form: ({ schema }) => (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white">{schema.title}</h3>
      {schema.fields?.map((field, idx) => (
        <div key={idx} className="space-y-2">
          <div className="block text-sm text-gray-300">{field.label}</div>
          {field.type === 'text' && (
            <input 
              type="text" 
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          )}
          {field.type === 'select' && (
            <div className="relative">
              <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white cursor-pointer">
                {field.options?.[0] || 'Select option'}
              </div>
            </div>
          )}
          {field.type === 'textarea' && (
            <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white min-h-[80px] focus:ring-2 focus:ring-blue-500">
              Textarea content...
            </div>
          )}
        </div>
      ))}
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Submit
      </button>
    </div>
  ),

  button: ({ schema }) => (
    <button className={`px-4 py-2 rounded font-medium transition-all ${
      schema.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
      schema.variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
      schema.variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' :
      schema.variant === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
      'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
    }`}>
      {schema.text || 'Button'}
    </button>
  ),

  card: ({ schema }) => (
    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
      {schema.title && <h3 className="text-xl font-bold text-white mb-2">{schema.title}</h3>}
      {schema.description && <p className="text-gray-300 mb-4">{schema.description}</p>}
      {schema.content && <div className="text-gray-400">{schema.content}</div>}
      {schema.image && (
        <div className="mb-4">
          <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center text-gray-400">
            Image Placeholder
          </div>
        </div>
      )}
    </div>
  ),

  table: ({ schema }) => (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            {schema.columns?.map((col, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-white font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schema.rows?.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-gray-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),

  navbar: ({ schema }) => (
    <nav className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-white">{schema.brand || 'Brand'}</div>
        <div className="flex space-x-6">
          {schema.links?.map((link, idx) => (
            <div key={idx} className="text-gray-300 hover:text-white cursor-pointer transition-colors">
              {link}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          {schema.actions?.map((action, idx) => (
            <button key={idx} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              {action}
            </button>
          ))}
        </div>
      </div>
    </nav>
  ),

  sidebar: ({ schema }) => (
    <div className={`${schema.width || 'w-64'} bg-gray-800 border-r border-gray-700 h-full`}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{schema.title || 'Menu'}</h3>
      </div>
      <nav className="p-2">
        {schema.items?.map((item, idx) => (
          <div key={idx} className="flex items-center p-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded cursor-pointer transition-colors">
            <span className="w-4 h-4 mr-3 bg-gray-600 rounded"></span>
            {item}
          </div>
        ))}
      </nav>
    </div>
  ),

  modal: ({ schema }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{schema.title || 'Modal Title'}</h3>
          <button className="text-gray-400 hover:text-white">×</button>
        </div>
        <div className="p-4">
          <p className="text-gray-300 mb-4">{schema.content || 'Modal content goes here...'}</p>
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  ),

  input: ({ schema }) => (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Input Label'}</label>
      <input 
        type={schema.type || 'text'}
        placeholder={schema.placeholder || 'Enter text...'}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  ),

  textarea: ({ schema }) => (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Textarea Label'}</label>
      <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 min-h-[100px]">
        {schema.placeholder || 'Enter your text here...'}
      </div>
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  ),

  select: ({ schema }) => (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Select Label'}</label>
      <div className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white cursor-pointer">
        {schema.placeholder || 'Choose an option'}
      </div>
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  ),

  checkbox: ({ schema }) => (
    <div className="space-y-2">
      {schema.options?.map((option, idx) => (
        <label key={idx} className="flex items-center text-gray-300 cursor-pointer">
          <div className="w-4 h-4 mr-3 bg-gray-700 border border-gray-600 rounded"></div>
          {option}
        </label>
      ))}
    </div>
  ),

  radio: ({ schema }) => (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300 mb-3">{schema.label || 'Radio Label'}</label>
      {schema.options?.map((option, idx) => (
        <label key={idx} className="flex items-center text-gray-300 cursor-pointer">
          <div className="w-4 h-4 mr-3 bg-gray-700 border border-gray-600 rounded-full"></div>
          {option}
        </label>
      ))}
    </div>
  ),

  alert: ({ schema }) => (
    <div className={`p-4 rounded-lg border ${
      schema.type === 'success' ? 'bg-green-900 border-green-700 text-green-300' :
      schema.type === 'warning' ? 'bg-yellow-900 border-yellow-700 text-yellow-300' :
      schema.type === 'error' ? 'bg-red-900 border-red-700 text-red-300' :
      'bg-blue-900 border-blue-700 text-blue-300'
    }`}>
      <div className="flex items-center">
        <div className="w-5 h-5 mr-3 rounded-full bg-current opacity-20"></div>
        <div>
          <h4 className="font-medium">{schema.title || 'Alert Title'}</h4>
          <p className="mt-1 text-sm opacity-90">{schema.message || 'Alert message content'}</p>
        </div>
      </div>
    </div>
  ),

  breadcrumb: ({ schema }) => (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {schema.items?.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-gray-500">/</span>}
            <span className={`${idx === schema.items.length - 1 ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-300'} cursor-pointer`}>
              {item}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  ),

  tabs: ({ schema }) => (
    <div>
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {schema.tabs?.map((tab, idx) => (
            <button key={idx} className={`py-2 px-1 border-b-2 font-medium text-sm ${
              idx === 0 ? 'border-blue-500 text-blue-400' : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <p className="text-gray-300">Content for the selected tab...</p>
      </div>
    </div>
  ),

  badge: ({ schema }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      schema.variant === 'success' ? 'bg-green-100 text-green-800' :
      schema.variant === 'warning' ? 'bg-yellow-100 text-yellow-800' :
      schema.variant === 'error' ? 'bg-red-100 text-red-800' :
      'bg-blue-100 text-blue-800'
    }`}>
      {schema.text || 'Badge'}
    </span>
  ),

  progress: ({ schema }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{schema.label || 'Progress'}</span>
        <span className="text-gray-400">{schema.value || 75}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{width: `${schema.value || 75}%`}}
        ></div>
      </div>
    </div>
  ),

  chart: ({ schema }) => (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">{schema.title || 'Chart'}</h3>
      <div className="h-64 flex items-end justify-center space-x-2">
        {[40, 65, 80, 45, 90, 55, 70].map((height, idx) => (
          <div 
            key={idx} 
            className="bg-blue-600 w-8 rounded-t transition-all duration-300 hover:bg-blue-500"
            style={{height: `${height}%`}}
          ></div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-2 text-xs text-gray-400">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day} className="w-8 text-center">{day}</span>
        ))}
      </div>
    </div>
  ),

  list: ({ schema }) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{schema.title || 'List'}</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {schema.items?.map((item, idx) => (
          <div key={idx} className="p-4 hover:bg-gray-750 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">{item}</span>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  grid: ({ schema }) => (
    <div className={`grid gap-4 ${
      schema.columns === 2 ? 'grid-cols-2' :
      schema.columns === 3 ? 'grid-cols-3' :
      schema.columns === 4 ? 'grid-cols-4' :
      'grid-cols-2'
    }`}>
      {Array.from({length: schema.items || 6}).map((_, idx) => (
        <div key={idx} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="w-full h-20 bg-gray-700 rounded mb-3"></div>
          <h4 className="text-white font-medium">Item {idx + 1}</h4>
          <p className="text-gray-400 text-sm">Description here...</p>
        </div>
      ))}
    </div>
  )
};

export default ComponentLibrary;