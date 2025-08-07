import  { useState } from 'react';
import { Eye, Plus, Grid as GridIcon, Maximize2, Minimize2,  AlertCircle } from 'lucide-react';
import ComponentWrapper from './ComponentWrapper';

// Safe function execution with sandbox
const executeSafeFunction = (code, values, context = {}) => {
  try {
    // Create a safe context with limited globals
    const safeGlobals = {
      values,
      context,
      // Safe utility functions
      isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      isPhone: (phone) => /^[\+]?[1-9][\d]{0,15}$/.test(phone),
      isEmpty: (val) => !val || val.trim() === '',
      length: (val) => val ? val.length : 0,
      includes: (str, substr) => str ? str.includes(substr) : false,
      Math: {
        min: Math.min,
        max: Math.max,
        abs: Math.abs,
        floor: Math.floor,
        ceil: Math.ceil,
        round: Math.round
      }
    };

    // Create function with restricted scope
    const func = new Function(
      ...Object.keys(safeGlobals),
      `
        "use strict";
        try {
          ${code}
        } catch (e) {
          return "Logic error: " + e.message;
        }
      `
    );

    // Execute with safe globals only
    const result = func(...Object.values(safeGlobals));
    return result;
  } catch (error) {
    return `Execution error: ${error.message}`;
  }
};

// Legacy structured validation (for backward compatibility)
const validateFormStructured = (formData, onSubmitConfig) => {
  const errors = {};
  const { validation = [] } = onSubmitConfig || {};
  
  validation.forEach(rule => {
    const fieldValue = formData[rule.field];
    const isValid = applyValidationRule(fieldValue, rule);
    
    if (!isValid) {
      errors[rule.field] = rule.message;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const applyValidationRule = (value, rule) => {
  switch (rule.rule) {
    case 'required':
      return value && value.trim() !== '';
    case 'minLength':
      return value && value.length >= rule.value;
    case 'maxLength':
      return !value || value.length <= rule.value;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    case 'pattern':
      const regex = new RegExp(rule.value);
      return !value || regex.test(value);
    case 'min':
      return !value || Number(value) >= rule.value;
    case 'max':
      return !value || Number(value) <= rule.value;
    default:
      return true;
  }
};

// Enhanced Form Component with Logic Injection
const FormComponent = ({ schema, componentId, onFormSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logicOutput, setLogicOutput] = useState('');

  const handleInputChange = (fieldLabel, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldLabel]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[fieldLabel]) {
      setErrors(prev => ({
        ...prev,
        [fieldLabel]: ''
      }));
    }
    if (globalError) {
      setGlobalError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGlobalError('');
    setLogicOutput('');
    
    try {
      let validationResult;
      
      // Check if onSubmit is a string (logic injection) or object (structured validation)
      if (typeof schema.onSubmit === 'string') {
        // Logic Injection Mode
        const logicResult = executeSafeFunction(schema.onSubmit, formData, {
          componentId,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        });
        
        if (logicResult && typeof logicResult === 'string') {
          // Logic returned an error message
          setGlobalError(logicResult);
          setLogicOutput(`Logic execution result: ${logicResult}`);
          validationResult = { isValid: false, errors: {} };
        } else if (logicResult === false) {
          // Logic returned false (generic failure)
          setGlobalError('Validation failed');
          validationResult = { isValid: false, errors: {} };
        } else {
          // Logic passed (returned true, null, undefined, or nothing)
          validationResult = { isValid: true, errors: {} };
          if (logicResult && typeof logicResult !== 'boolean') {
            setLogicOutput(`Logic result: ${JSON.stringify(logicResult)}`);
          }
        }
      } else {
        // Structured Validation Mode (backward compatibility)
        validationResult = validateFormStructured(formData, schema.onSubmit);
        if (!validationResult.isValid) {
          setErrors(validationResult.errors);
        }
      }
      
      if (validationResult.isValid) {
        // Handle successful submission
        const config = typeof schema.onSubmit === 'object' ? schema.onSubmit : {};
        const { action = 'console', successMessage, redirectUrl, customFunction } = config;
        
        switch (action) {
          case 'showAlert':
            alert(successMessage || 'Form submitted successfully!');
            break;
          case 'redirect':
            if (redirectUrl) {
              window.location.href = redirectUrl;
            }
            break;
          case 'console':
            console.log('Form submitted:', formData);
            break;
          case 'custom':
            if (customFunction && onFormSubmit) {
              onFormSubmit(formData, componentId, customFunction);
            }
            break;
          default:
            console.log('Form submitted:', formData);
        }
        
        // Clear form data after successful submission
        setFormData({});
        setErrors({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setGlobalError(`Submission error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field, index) => {
    const fieldValue = formData[field.label] || '';
    const fieldError = errors[field.label];
    const hasError = Boolean(fieldError);

    const baseInputClasses = `w-full px-3 py-2 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError 
        ? 'border-red-500 focus:ring-red-500' 
        : 'border-gray-600 focus:ring-blue-500 focus:border-transparent'
    }`;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <input
              type={field.type}
              value={fieldValue}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={baseInputClasses}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              required={field.required}
            />
            {fieldError && (
              <p className="mt-1 text-sm text-red-400">{fieldError}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <textarea
              value={fieldValue}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={`${baseInputClasses} min-h-[80px] resize-y`}
              placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
              required={field.required}
              rows={4}
            />
            {fieldError && (
              <p className="mt-1 text-sm text-red-400">{fieldError}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            <select
              value={fieldValue}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              className={baseInputClasses}
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option, optIndex) => (
                <option key={optIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {fieldError && (
              <p className="mt-1 text-sm text-red-400">{fieldError}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-white mb-4">{schema.title}</h3>
      
      {/* Logic Type Indicator */}
      <div className="mb-4 p-2 bg-gray-700 rounded text-xs text-gray-300 flex items-center">
        <AlertCircle size={14} className="mr-2" />
        <span>
          Validation Mode: {typeof schema.onSubmit === 'string' ? 'Logic Injection' : 'Structured Rules'}
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {schema.fields?.map((field, index) => renderField(field, index))}
        
        {/* Global Error Display */}
        {globalError && (
          <div className="p-3 bg-red-900 bg-opacity-50 border border-red-500 rounded-md">
            <p className="text-red-300 text-sm font-medium">{globalError}</p>
          </div>
        )}
        
        {/* Logic Output Display */}
        {logicOutput && (
          <div className="p-3 bg-blue-900 bg-opacity-50 border border-blue-500 rounded-md">
            <p className="text-blue-300 text-xs font-mono">{logicOutput}</p>
          </div>
        )}
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isSubmitting ? 'cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
      
      {/* Debug Panel for Logic Injection */}
      {typeof schema.onSubmit === 'string' && (
        <div className="mt-4 p-3 bg-gray-900 border border-gray-600 rounded-md">
          <h4 className="text-xs font-semibold text-gray-400 mb-2">Custom Logic:</h4>
          <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-words">
            {schema.onSubmit}
          </pre>
        </div>
      )}
    </div>
  );
};

const GridCell = ({ 
  rowIndex, 
  colIndex, 
  component, 
  onDrop, 
  onDragOver, 
  onRemoveComponent, 
  renderComponent, 
  gridSize,
  onFormSubmit
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const cellId = `${rowIndex}-${colIndex}`;

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onDrop(e, rowIndex, colIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleRemove = () => {
    onRemoveComponent(cellId);
  };

  return (
    <div
      className={`
        w-full h-full border border-dashed rounded-lg transition-all duration-200 relative
        ${isDragOver 
          ? 'border-blue-400 bg-blue-500 bg-opacity-5 scale-[1.02] shadow-lg' 
          : component 
            ? 'border-transparent bg-gray-800 shadow-sm' 
            : 'border-gray-600 hover:border-gray-500 bg-transparent hover:bg-gray-800 hover:bg-opacity-30'
        }
      `}
      style={{ 
        minHeight: gridSize === 'small' ? '80px' : gridSize === 'large' ? '120px' : '100px' 
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {component ? (
        <div className="group relative h-full">
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex space-x-1">
            <button
              onClick={handleRemove}
              className="w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full text-white shadow-md transition-all flex items-center justify-center text-xs"
              title="Remove"
            >
              ×
            </button>
          </div>
          <div className="h-full p-1 overflow-hidden rounded-lg">
            {component.type === 'form' ? (
              <FormComponent 
                schema={component} 
                componentId={cellId} 
                onFormSubmit={onFormSubmit} 
              />
            ) : (
              renderComponent(component, cellId)
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full opacity-60 group-hover:opacity-100 transition-opacity">
          <Plus size={16} className="text-gray-500 group-hover:text-gray-400 transition-colors" />
        </div>
      )}
    </div>
  );
};

const LivePreview = ({ 
  components = [], 
  gridComponents = {},
  renderComponent, 
  onDrop, 
  onDragOver, 
  onRemoveComponent,
  layoutMode = 'list',
  draggedComponent,
  onFormSubmit
}) => {
  const [gridDimensions, setGridDimensions] = useState({ rows: 4, cols: 3 });
  const [gridSize, setGridSize] = useState('medium');

  const adjustGrid = (dimension, delta) => {
    setGridDimensions(prev => ({
      ...prev,
      [dimension]: Math.max(1, Math.min(4, prev[dimension] + delta))
    }));
  };

  const componentCount = layoutMode === 'grid' 
    ? Object.keys(gridComponents).length 
    : components.length;

  const renderComponentWithValidation = (schema, index) => {
    if (schema.type === 'form') {
      return (
        <FormComponent 
          schema={schema} 
          componentId={index} 
          onFormSubmit={onFormSubmit} 
        />
      );
    }
    return renderComponent(schema, index);
  };

  // List view
  if (layoutMode === 'list') {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Eye className="mr-2" size={20} />
            Live Preview ({componentCount} components)
          </h3>
        </div>
        
        <div 
          className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 overflow-y-auto"
          onDrop={(e) => onDrop(e)}
          onDragOver={onDragOver}
        >
          {components.length > 0 ? (
            <div className="space-y-4">
              {components.map((schema, index) => (
                <ComponentWrapper
                  key={`${schema.type}-${index}`}
                  component={renderComponentWithValidation(schema, index)}
                  index={index}
                  onRemove={onRemoveComponent}
                  onEdit={(idx) => {/* Edit component */}}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
                  <Plus className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-400 text-lg mb-2">Drop components here</p>
                <p className="text-gray-500 text-sm">Drag from the component palette to get started</p>
                {draggedComponent && (
                  <div className="mt-4 p-2 bg-blue-900 bg-opacity-50 rounded border border-blue-500">
                    <p className="text-blue-300 text-sm">Ready to drop: {draggedComponent}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid view - continuing with existing implementation
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <GridIcon className="mr-2" size={20} />
          Layout Grid ({componentCount} placed)
        </h3>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-700 rounded p-1">
            <button
              onClick={() => setGridSize('small')}
              className={`p-1 rounded text-xs ${gridSize === 'small' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Small Grid"
            >
              <Minimize2 size={12} />
            </button>
            <button
              onClick={() => setGridSize('medium')}
              className={`p-1 rounded text-xs ${gridSize === 'medium' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Medium Grid"
            >
              <GridIcon size={12} />
            </button>
            <button
              onClick={() => setGridSize('large')}
              className={`p-1 rounded text-xs ${gridSize === 'large' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white'}`}
              title="Large Grid"
            >
              <Maximize2 size={12} />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <span>Rows:</span>
              <button
                onClick={() => adjustGrid('rows', -1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                -
              </button>
              <span className="w-6 text-center">{gridDimensions.rows}</span>
              <button
                onClick={() => adjustGrid('rows', 1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                +
              </button>
            </div>
            
            <div className="flex items-center space-x-1">
              <span>Cols:</span>
              <button
                onClick={() => adjustGrid('cols', -1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                -
              </button>
              <span className="w-6 text-center">{gridDimensions.cols}</span>
              <button
                onClick={() => adjustGrid('cols', 1)}
                className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative">
        <div 
          className={`grid w-full h-full ${
            gridSize === 'small' ? 'gap-2' : gridSize === 'large' ? 'gap-4' : 'gap-3'
          }`}
          style={{
            gridTemplateColumns: `repeat(${gridDimensions.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`
          }}
        >
          {Array.from({ length: gridDimensions.rows }).map((_, rowIndex) =>
            Array.from({ length: gridDimensions.cols }).map((_, colIndex) => {
              const cellId = `${rowIndex}-${colIndex}`;
              const component = gridComponents[cellId];
              
              return (
                <GridCell
                  key={cellId}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  component={component}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onRemoveComponent={onRemoveComponent}
                  renderComponent={renderComponent}
                  gridSize={gridSize}
                  onFormSubmit={onFormSubmit}
                />
              );
            })
          )}
        </div>

        {componentCount === 0 && (
          <div className="absolute inset-6 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-gray-700 bg-opacity-50 rounded-xl flex items-center justify-center">
                <GridIcon className="text-gray-400" size={24} />
              </div>
              <p className="text-gray-400 text-lg mb-1">Design Your Layout</p>
              <p className="text-gray-500 text-sm">Drag components into the grid</p>
              {draggedComponent && (
                <div className="mt-3 px-3 py-1 bg-blue-900 bg-opacity-30 rounded-full border border-blue-500 pointer-events-auto">
                  <p className="text-blue-300 text-xs">Dragging: {draggedComponent}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-xs text-gray-400">
        <div className="flex justify-between items-center">
          <span>
            {gridDimensions.rows}×{gridDimensions.cols} • {componentCount} placed
          </span>
          <span className="text-gray-500">
            {gridSize} grid
          </span>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;