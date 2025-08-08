import React, { useState } from 'react';
import { Lightbulb, Copy, Check, Search, BookOpen, Code, Settings, Calendar, Hash, Type } from 'lucide-react';

const ValidationHelperPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('logic');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const maxX = window.innerWidth - 800;
      const maxY = window.innerHeight - 600;
      
      setPosition({
        x: Math.max(-400, Math.min(newX, maxX)),
        y: Math.max(-300, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const openModal = () => {
    setPosition({ x: 0, y: 0 });
    setIsOpen(true);
  };

  const helperFunctions = [
    {
      name: 'isEmpty',
      syntax: 'isEmpty(value)',
      description: 'Check if value is empty, null, undefined, or whitespace only',
      example: 'if (isEmpty(values.Name)) return "Name is required";',
      category: 'validation'
    },
    {
      name: 'isEmail',
      syntax: 'isEmail(email)',
      description: 'Validate email format using RFC compliant regex',
      example: 'if (!isEmail(values.Email)) return "Invalid email format";',
      category: 'validation'
    },
    {
      name: 'isPhone',
      syntax: 'isPhone(phone)',
      description: 'Validate phone number (international format, 7-16 digits)',
      example: 'if (values.Phone && !isPhone(values.Phone)) return "Invalid phone";',
      category: 'validation'
    },
    {
      name: 'length',
      syntax: 'length(value)',
      description: 'Get string length (returns 0 for null/undefined)',
      example: 'if (length(values.Password) < 8) return "Password too short";',
      category: 'utility'
    },
    {
      name: 'includes',
      syntax: 'includes(str, substr)',
      description: 'Check if string contains substring (case-sensitive)',
      example: 'if (!includes(values.Email, "@company.com")) return "Use company email";',
      category: 'utility'
    },
    {
      name: 'Math.min',
      syntax: 'Math.min(a, b, ...)',
      description: 'Return minimum value from arguments',
      example: 'if (values.Age < Math.min(18, values.MinAge)) return "Too young";',
      category: 'math'
    },
    {
      name: 'Math.max',
      syntax: 'Math.max(a, b, ...)',
      description: 'Return maximum value from arguments',
      example: 'if (values.Score > Math.max(100, values.MaxScore)) return "Score too high";',
      category: 'math'
    },
    {
      name: 'Math.abs',
      syntax: 'Math.abs(num)',
      description: 'Return absolute value',
      example: 'if (Math.abs(values.Balance) > 1000) return "Balance limit exceeded";',
      category: 'math'
    }
  ];

  const structuredRules = {
    text: [
      {
        rule: 'required',
        params: 'none',
        description: 'Field must not be empty or whitespace only',
        example: '{ "rule": "required", "message": "This field is required" }'
      },
      {
        rule: 'minLength',
        params: 'value: number',
        description: 'Minimum character count (excluding whitespace)',
        example: '{ "rule": "minLength", "value": 3, "message": "Min 3 characters" }'
      },
      {
        rule: 'maxLength',
        params: 'value: number',
        description: 'Maximum character count (including whitespace)',
        example: '{ "rule": "maxLength", "value": 50, "message": "Max 50 characters" }'
      },
      {
        rule: 'pattern',
        params: 'value: string (regex)',
        description: 'Custom regex pattern validation',
        example: '{ "rule": "pattern", "value": "^[A-Za-z\\\\s]+$", "message": "Letters only" }'
      }
    ],
    format: [
      {
        rule: 'email',
        params: 'none',
        description: 'RFC 5322 compliant email format',
        example: '{ "rule": "email", "message": "Please enter a valid email" }'
      },
      {
        rule: 'phone',
        params: 'none',
        description: 'International phone format (+1234567890)',
        example: '{ "rule": "phone", "message": "Enter valid phone number" }'
      },
      {
        rule: 'url',
        params: 'none',
        description: 'Valid HTTP/HTTPS URL format',
        example: '{ "rule": "url", "message": "Enter a valid URL" }'
      }
    ],
    numeric: [
      {
        rule: 'min',
        params: 'value: number',
        description: 'Minimum numeric value (inclusive)',
        example: '{ "rule": "min", "value": 18, "message": "Must be 18 or older" }'
      },
      {
        rule: 'max',
        params: 'value: number',
        description: 'Maximum numeric value (inclusive)',
        example: '{ "rule": "max", "value": 100, "message": "Cannot exceed 100" }'
      },
      {
        rule: 'integer',
        params: 'none',
        description: 'Whole numbers only (no decimals)',
        example: '{ "rule": "integer", "message": "Enter a whole number" }'
      }
    ],
    date: [
      {
        rule: 'date',
        params: 'none',
        description: 'Valid date format (YYYY-MM-DD)',
        example: '{ "rule": "date", "message": "Enter valid date" }'
      },
      {
        rule: 'minDate',
        params: 'value: string (YYYY-MM-DD)',
        description: 'Minimum date constraint',
        example: '{ "rule": "minDate", "value": "2024-01-01", "message": "Date must be after Jan 1, 2024" }'
      },
      {
        rule: 'maxDate',
        params: 'value: string (YYYY-MM-DD)',
        description: 'Maximum date constraint',
        example: '{ "rule": "maxDate", "value": "2024-12-31", "message": "Date must be before Dec 31, 2024" }'
      }
    ],
    advanced: [
      {
        rule: 'match',
        params: 'value: string (field name)',
        description: 'Must match another field\'s value',
        example: '{ "rule": "match", "value": "password", "message": "Passwords must match" }'
      },
      {
        rule: 'contains',
        params: 'value: string',
        description: 'Must contain specific substring',
        example: '{ "rule": "contains", "value": "@", "message": "Must contain @ symbol" }'
      }
    ]
  };

  const logicExamples = [
    {
      title: 'Basic Required Field',
      code: 'if (isEmpty(values.Name)) return "Name is required";\nreturn true;'
    },
    {
      title: 'Email Validation',
      code: 'if (!isEmail(values.Email)) return "Invalid email format";\nreturn true;'
    },
    {
      title: 'Password Strength',
      code: 'if (length(values.Password) < 8) return "Password too short";\nif (!includes(values.Password, "@") && !includes(values.Password, "#")) return "Password needs special character";\nreturn true;'
    }
  ];

  const filteredFunctions = helperFunctions.filter(func =>
    func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    func.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFilteredRules = (rules) => {
    if (!searchTerm) return rules;
    return rules.filter(rule =>
      rule.rule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'logic': return <Code size={16} />;
      case 'text': return <Type size={16} />;
      case 'format': return <BookOpen size={16} />;
      case 'numeric': return <Hash size={16} />;
      case 'date': return <Calendar size={16} />;
      case 'advanced': return <Settings size={16} />;
      default: return null;
    }
  };

  const tabs = [
    { id: 'logic', label: 'Logic Functions', count: filteredFunctions.length },
    { id: 'text', label: 'Text Rules', count: getFilteredRules(structuredRules.text).length },
    { id: 'format', label: 'Format Rules', count: getFilteredRules(structuredRules.format).length },
    { id: 'numeric', label: 'Numeric Rules', count: getFilteredRules(structuredRules.numeric).length },
    { id: 'date', label: 'Date Rules', count: getFilteredRules(structuredRules.date).length },
    { id: 'advanced', label: 'Advanced Rules', count: getFilteredRules(structuredRules.advanced).length }
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group relative overflow-hidden"
        title="Validation Help"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <Lightbulb size={20} className="group-hover:animate-pulse relative z-10" />
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="bg-gray-900 rounded-2xl border border-gray-600 shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col relative overflow-hidden"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            {/* Drag Handle & Header */}
            <div 
              className="drag-handle flex items-center justify-between p-5 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 cursor-move select-none"
              onMouseDown={handleMouseDown}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-400 bg-opacity-20 rounded-lg">
                  <Lightbulb className="text-yellow-400" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Validation Helper</h2>
                  <p className="text-sm text-gray-400">Drag to move • Click tabs to navigate</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200 p-2 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 min-h-0">
              {/* Navigation Sidebar */}
              <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white text-sm"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 group ${
                          activeTab === tab.id
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded ${
                            activeTab === tab.id ? 'bg-blue-500' : 'bg-gray-600 group-hover:bg-gray-500'
                          }`}>
                            {getTabIcon(tab.id)}
                          </div>
                          <span className="font-medium text-sm">{tab.label}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          activeTab === tab.id
                            ? 'bg-blue-400 text-blue-900'
                            : 'bg-gray-600 text-gray-300 group-hover:bg-gray-500'
                        }`}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 border-t border-gray-700 bg-gray-800">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>💡 Click items to copy</div>
                    <div>🔍 Use search to filter</div>
                    {searchTerm && (
                      <div className="text-blue-400">Filtering: "{searchTerm}"</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-800">
                {/* Logic Functions Tab */}
                {activeTab === 'logic' && (
                  <div className="space-y-8">
                    {/* Helper Functions */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Code size={24} className="mr-3 text-blue-400" />
                        Helper Functions ({filteredFunctions.length})
                      </h3>
                      {filteredFunctions.length === 0 ? (
                        <div className="text-gray-400 text-center py-12 bg-gray-700 rounded-xl border-2 border-dashed border-gray-600">
                          <Search size={48} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg">No functions found</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {filteredFunctions.map((func, idx) => (
                            <div key={idx} className="bg-gray-700 rounded-lg p-5 border border-gray-600 hover:border-blue-500 transition-all duration-300 hover:shadow-lg group">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-mono text-blue-400 font-bold text-lg mb-2">{func.syntax}</h4>
                                  <p className="text-gray-200 text-sm">{func.description}</p>
                                  <span className="inline-block mt-2 px-2 py-1 bg-blue-600 bg-opacity-20 text-blue-300 text-xs rounded">
                                    {func.category}
                                  </span>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(func.example)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200 rounded group-hover:scale-110"
                                  title="Copy example"
                                >
                                  {copiedCode === func.example ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                </button>
                              </div>
                              <div className="mt-3">
                                <div className="text-xs text-gray-400 mb-1">Example:</div>
                                <code className="block bg-gray-900 p-3 rounded text-sm text-green-400 font-mono border border-gray-600">
                                  {func.example}
                                </code>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Logic Examples */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <BookOpen size={24} className="mr-3 text-green-400" />
                        Complete Examples
                      </h3>
                      <div className="grid gap-4">
                        {logicExamples.map((example, idx) => (
                          <div key={idx} className="bg-gray-700 rounded-lg p-5 border border-gray-600 hover:border-green-500 transition-all duration-300 hover:shadow-lg group">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-bold">{example.title}</h4>
                              <button
                                onClick={() => copyToClipboard(example.code)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-green-600 transition-all duration-200 rounded group-hover:scale-110"
                                title="Copy code"
                              >
                                {copiedCode === example.code ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                              </button>
                            </div>
                            <pre className="bg-gray-900 p-3 rounded text-sm text-green-400 font-mono overflow-x-auto border border-gray-600">
                              {example.code}
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Structured Rules Tabs */}
                {activeTab !== 'logic' && structuredRules[activeTab] && (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center capitalize">
                      {getTabIcon(activeTab)}
                      <span className="ml-3">{activeTab} Validation Rules ({getFilteredRules(structuredRules[activeTab]).length})</span>
                    </h3>
                    {(() => {
                      const filteredRules = getFilteredRules(structuredRules[activeTab]);
                      return filteredRules.length === 0 ? (
                        <div className="text-gray-400 text-center py-12 bg-gray-700 rounded-xl border-2 border-dashed border-gray-600">
                          <Search size={48} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg">No rules found</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {filteredRules.map((rule, idx) => (
                            <div key={idx} className="bg-gray-700 rounded-lg p-5 border border-gray-600 hover:border-purple-500 transition-all duration-300 hover:shadow-lg group">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h4 className="font-mono text-purple-400 font-bold text-lg mb-2">{rule.rule}</h4>
                                  {rule.params !== 'none' && (
                                    <p className="text-gray-300 text-sm mb-2">
                                      Parameters: <code className="text-yellow-400 bg-gray-800 px-2 py-1 rounded text-xs">{rule.params}</code>
                                    </p>
                                  )}
                                  <p className="text-gray-200 text-sm">{rule.description}</p>
                                </div>
                                <button
                                  onClick={() => copyToClipboard(rule.example)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-200 rounded group-hover:scale-110"
                                  title="Copy example"
                                >
                                  {copiedCode === rule.example ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                </button>
                              </div>
                              <div className="mt-3">
                                <div className="text-xs text-gray-400 mb-1">Example JSON:</div>
                                <pre className="bg-gray-900 p-3 rounded text-sm text-blue-400 font-mono overflow-x-auto border border-gray-600">
                                  {rule.example}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationHelperPopup;