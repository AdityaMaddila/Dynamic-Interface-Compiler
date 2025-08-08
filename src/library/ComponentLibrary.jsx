import React, { useState } from 'react';

// Form Component
const FormComponent = ({ schema }) => {
  const [formData, setFormData] = useState({});
  
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white">{schema.title}</h3>
      {schema.fields?.map((field, idx) => {
        const fieldName = field.label?.toLowerCase().replace(/\s+/g, '_') || `field_${idx}`;
        
        return (
          <div key={idx} className="space-y-2">
            <label className="block text-sm text-gray-300">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            
            {field.type === 'text' && (
              <input 
                type="text" 
                value={formData[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            )}
            
            {field.type === 'select' && (
              <select
                value={formData[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an option</option>
                {field.options?.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            )}
            
            {field.type === 'textarea' && (
              <textarea
                value={formData[fieldName] || ''}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                required={field.required}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your message..."
              />
            )}
          </div>
        );
      })}
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

// Button Component
const ButtonComponent = ({ schema }) => (
  <button 
    onClick={() => alert(`${schema.text || 'Button'} clicked!`)}
    className={`px-4 py-2 rounded font-medium transition-all ${
      schema.variant === 'primary' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
      schema.variant === 'secondary' ? 'bg-gray-600 hover:bg-gray-700 text-white' :
      schema.variant === 'danger' ? 'bg-red-600 hover:bg-red-700 text-white' :
      schema.variant === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' :
      'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
    }`}
  >
    {schema.text || 'Button'}
  </button>
);

// Card Component
const CardComponent = ({ schema }) => (
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
);

// Table Component
const TableComponent = ({ schema }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [data, setData] = useState(schema.rows || []);
  
  const handleSort = (columnIndex) => {
    const newDirection = sortColumn === columnIndex && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnIndex);
    setSortDirection(newDirection);
    
    const sortedData = [...data].sort((a, b) => {
      const aVal = a[columnIndex];
      const bVal = b[columnIndex];
      
      if (newDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    setData(sortedData);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            {schema.columns?.map((col, idx) => (
              <th 
                key={idx} 
                onClick={() => handleSort(idx)}
                className="px-4 py-3 text-left text-white font-medium cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span>{col}</span>
                  {sortColumn === idx && (
                    <span className="text-xs">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, idx) => (
            <tr key={idx} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
              {row.map((cell, i) => (
                <td key={i} className="px-4 py-3 text-gray-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Navbar Component
const NavbarComponent = ({ schema }) => (
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
);

// Sidebar Component
const SidebarComponent = ({ schema }) => (
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
);

// Modal Component
const ModalComponent = ({ schema }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full mx-auto">
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
);

// Input Component
const InputComponent = ({ schema }) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Input Label'}</label>
      <input 
        type={schema.inputType || 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={schema.placeholder || 'Enter text...'}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  );
};

// Textarea Component
const TextareaComponent = ({ schema }) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Textarea Label'}</label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={schema.placeholder || 'Enter your text here...'}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-y"
      />
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  );
};

// Select Component
const SelectComponent = ({ schema }) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-2">
      <label className="block text-sm text-gray-300">{schema.label || 'Select Label'}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">{schema.placeholder || 'Choose an option'}</option>
        {schema.options?.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
      {schema.helper && <p className="text-xs text-gray-400">{schema.helper}</p>}
    </div>
  );
};

// Checkbox Component
const CheckboxComponent = ({ schema }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-300 mb-2">Select options:</div>
      {schema.options?.map((option, idx) => (
        <label key={idx} className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => handleCheckboxChange(option)}
            className="hidden"
          />
          <div className={`w-4 h-4 mr-3 border border-gray-600 rounded flex items-center justify-center transition-colors ${
            selectedOptions.includes(option) ? 'bg-blue-600 border-blue-600' : 'bg-gray-700'
          }`}>
            {selectedOptions.includes(option) && (
              <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 20 20">
                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
              </svg>
            )}
          </div>
          <span>{option}</span>
        </label>
      ))}
      {selectedOptions.length > 0 && (
        <div className="text-xs text-blue-400 mt-2">
          Selected: {selectedOptions.join(', ')}
        </div>
      )}
    </div>
  );
};

// Radio Component
const RadioComponent = ({ schema }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  return (
    <div className="space-y-3">
      <label className="block text-sm text-gray-300 mb-3">{schema.label || 'Radio Label'}</label>
      {schema.options?.map((option, idx) => (
        <label key={idx} className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors">
          <input
            type="radio"
            name={`radio-${schema.id || 'default'}`}
            checked={selectedOption === option}
            onChange={() => setSelectedOption(option)}
            className="hidden"
          />
          <div className={`w-4 h-4 mr-3 border border-gray-600 rounded-full flex items-center justify-center transition-colors ${
            selectedOption === option ? 'bg-blue-600 border-blue-600' : 'bg-gray-700'
          }`}>
            {selectedOption === option && (
              <div className="w-2 h-2 bg-white rounded-full"></div>
            )}
          </div>
          <span>{option}</span>
        </label>
      ))}
      {selectedOption && (
        <div className="text-xs text-blue-400 mt-2">
          Selected: {selectedOption}
        </div>
      )}
    </div>
  );
};

// Alert Component
const AlertComponent = ({ schema }) => (
  <div className={`p-4 rounded-lg border ${
    schema.variant === 'success' ? 'bg-green-900 border-green-700 text-green-300' :
    schema.variant === 'warning' ? 'bg-yellow-900 border-yellow-700 text-yellow-300' :
    schema.variant === 'error' ? 'bg-red-900 border-red-700 text-red-300' :
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
);

// Breadcrumb Component
const BreadcrumbComponent = ({ schema }) => {
  const [activePath, setActivePath] = useState(schema.items?.length - 1 || 0);
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {schema.items?.map((item, idx) => (
          <li key={idx} className="flex items-center">
            {idx > 0 && <span className="mx-2 text-gray-500">/</span>}
            <span 
              onClick={() => setActivePath(idx)}
              className={`cursor-pointer transition-colors ${
                idx === activePath 
                  ? 'text-white font-medium' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ol>
      <div className="ml-4 text-xs text-blue-400">
        Active: {schema.items?.[activePath]}
      </div>
    </nav>
  );
};

// Tabs Component
const TabsComponent = ({ schema }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div>
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {schema.tabs?.map((tab, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveTab(idx)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                idx === activeTab 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <h4 className="text-white font-medium mb-2">{schema.tabs?.[activeTab]} Content</h4>
        <p className="text-gray-300">
          This is the content for the "{schema.tabs?.[activeTab]}" tab. 
          You can customize this content based on the selected tab.
        </p>
      </div>
    </div>
  );
};

// Badge Component
const BadgeComponent = ({ schema }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    schema.variant === 'success' ? 'bg-green-100 text-green-800' :
    schema.variant === 'warning' ? 'bg-yellow-100 text-yellow-800' :
    schema.variant === 'error' ? 'bg-red-100 text-red-800' :
    'bg-blue-100 text-blue-800'
  }`}>
    {schema.text || 'Badge'}
  </span>
);

// Progress Component
const ProgressComponent = ({ schema }) => (
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
);

// Chart Component
const ChartComponent = ({ schema }) => (
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
);

// List Component
const ListComponent = ({ schema }) => (
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
);

// Grid Component
const GridComponent = ({ schema }) => (
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
);

//image component 
// Image Component
const ImageComponent = ({ schema }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  return (
    <div className={`${schema.containerClass || ''}`}>
      {schema.title && (
        <h3 className="text-lg font-semibold text-white mb-2">{schema.title}</h3>
      )}
      
      <div 
        className={`relative overflow-hidden rounded-lg ${schema.rounded ? 'rounded-full' : 'rounded-lg'}`}
        style={{ 
          width: schema.width || 'auto', 
          height: schema.height || 'auto',
          aspectRatio: schema.aspectRatio || 'auto'
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error State */}
        {imageError && !isLoading && (
          <div className="bg-gray-700 flex items-center justify-center text-gray-400 min-h-[200px]">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Image not found</p>
              <p className="text-xs text-gray-500 mt-1">
                {schema.alt || 'Failed to load image'}
              </p>
            </div>
          </div>
        )}
        
        {/* Actual Image */}
        {schema.src && (
          <img
            src={schema.src}
            alt={schema.alt || 'Image'}
            className={`${imageError ? 'hidden' : 'block'} w-full h-full object-${schema.fit || 'cover'} transition-transform duration-200 ${
              schema.hover ? 'hover:scale-105' : ''
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={schema.lazy ? 'lazy' : 'eager'}
          />
        )}
        
        {/* Overlay */}
        {schema.overlay && (
          <div className={`absolute inset-0 ${schema.overlay} flex items-center justify-center`}>
            {schema.overlayText && (
              <span className="text-white text-lg font-semibold">{schema.overlayText}</span>
            )}
          </div>
        )}
        
        {/* Click handler */}
        {schema.clickable && (
          <div 
            className="absolute inset-0 cursor-pointer hover:bg-black hover:bg-opacity-20 transition-colors"
            onClick={() => {
              if (schema.onClick) {
                // Handle click action
                if (schema.onClick === 'lightbox') {
                  // Simple lightbox simulation
                  const lightbox = window.open('', '_blank', 'width=800,height=600');
                  lightbox.document.write(`
                    <html>
                      <head><title>${schema.alt || 'Image'}</title></head>
                      <body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;">
                        <img src="${schema.src}" style="max-width:100%;max-height:100%;" alt="${schema.alt || 'Image'}" />
                      </body>
                    </html>
                  `);
                } else if (schema.onClick.startsWith('http')) {
                  window.open(schema.onClick, '_blank');
                } else {
                  alert(`Image clicked: ${schema.alt || 'Image'}`);
                }
              }
            }}
          />
        )}
      </div>
      
      {/* Caption */}
      {schema.caption && (
        <p className="mt-2 text-sm text-gray-400 text-center">{schema.caption}</p>
      )}
    </div>
  );
};
// Component Library Object
const ComponentLibrary = {
  form: FormComponent,
  button: ButtonComponent,
  card: CardComponent,
  table: TableComponent,
  navbar: NavbarComponent,
  sidebar: SidebarComponent,
  modal: ModalComponent,
  input: InputComponent,
  textarea: TextareaComponent,
  select: SelectComponent,
  checkbox: CheckboxComponent,
  radio: RadioComponent,
  alert: AlertComponent,
  breadcrumb: BreadcrumbComponent,
  tabs: TabsComponent,
  badge: BadgeComponent,
  progress: ProgressComponent,
  chart: ChartComponent,
  list: ListComponent,
  grid: GridComponent,
  image: ImageComponent,
};

export default ComponentLibrary;