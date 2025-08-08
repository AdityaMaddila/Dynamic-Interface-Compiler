import React, { useState, useEffect } from 'react';
import { Save, Download, Check, RefreshCw, X, Sparkles } from 'lucide-react';

const Header = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  theme = 'dark', 
  onThemeChange,
  // Add these new props to get current JSON editor data
  currentJsonData = null,
  jsonEditorContent = '',
  onGetCurrentData = null, // Callback to get current state from parent
  onLoadSavedData = null // Callback to load saved data back to parent
}) => {
  const [actionStates, setActionStates] = useState({
    save: 'idle', // idle, loading, success, error
    download: 'idle'
  });
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSave, setAutoSave] = useState(true);

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedProject = localStorage.getItem('currentProject');
        if (savedProject && onLoadSavedData) {
          const projectData = JSON.parse(savedProject);
          onLoadSavedData(projectData);
          setLastSaved(new Date(projectData.timestamp));
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };

    loadSavedData();
  }, [onLoadSavedData]);

  // Auto-save functionality
  useEffect(() => {
    if (!autoSave) return;
    
    const interval = setInterval(() => {
      if (lastSaved) {
        const now = new Date();
        const diff = now - lastSaved;
        if (diff > 30000) { // Auto-save every 30 seconds
          handleAutoSave();
        }
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [lastSaved, autoSave]);

  const updateActionState = (action, state) => {
    setActionStates(prev => ({ ...prev, [action]: state }));
  };

  const handleAutoSave = async () => {
    try {
      // Get current data from parent component or JSON editor
      const currentData = onGetCurrentData ? onGetCurrentData() : {
        timestamp: new Date().toISOString(),
        jsonContent: jsonEditorContent,
        components: JSON.parse(localStorage.getItem('formComponents') || '[]'),
        layout: localStorage.getItem('layoutMode') || 'list',
        version: '1.0'
      };
      
      localStorage.setItem('autoSave', JSON.stringify(currentData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  const handleSave = async () => {
    updateActionState('save', 'loading');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current data from parent component or props
      const currentData = onGetCurrentData ? onGetCurrentData() : {
        jsonContent: jsonEditorContent,
        currentJsonData: currentJsonData,
        components: JSON.parse(localStorage.getItem('formComponents') || '[]'),
        layout: localStorage.getItem('layoutMode') || 'list'
      };
      
      // Save current state
      const saveData = {
        id: Date.now(),
        name: `UI Design ${new Date().toLocaleDateString()}`,
        timestamp: new Date().toISOString(),
        jsonContent: currentData.jsonContent,
        parsedJsonData: currentData.currentJsonData,
        components: currentData.components,
        layout: currentData.layout,
        version: '1.0'
      };
      
      // Save to localStorage (in real app, this would be an API call)
      const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
      savedProjects.push(saveData);
      localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
      localStorage.setItem('currentProject', JSON.stringify(saveData));
      
      setLastSaved(new Date());
      updateActionState('save', 'success');
      
      // Reset to idle after 2 seconds
      setTimeout(() => updateActionState('save', 'idle'), 2000);
      
    } catch (error) {
      console.error('Save failed:', error);
      updateActionState('save', 'error');
      setTimeout(() => updateActionState('save', 'idle'), 3000);
    }
  };

  const handleDownload = async () => {
    updateActionState('download', 'loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get current data from parent component or props
      const currentData = onGetCurrentData ? onGetCurrentData() : {
        jsonContent: jsonEditorContent,
        currentJsonData: currentJsonData,
        components: JSON.parse(localStorage.getItem('formComponents') || '[]'),
        layout: localStorage.getItem('layoutMode') || 'list'
      };

      // Determine what data to export based on what's available
      let exportData = {};
      
      if (currentData.currentJsonData) {
        // If we have parsed JSON data, use that
        exportData = currentData.currentJsonData;
      } else if (currentData.jsonContent) {
        // If we have raw JSON content, try to parse it
        try {
          exportData = JSON.parse(currentData.jsonContent);
        } catch (parseError) {
          // If parsing fails, export the raw content
          exportData = {
            rawContent: currentData.jsonContent,
            error: 'Could not parse JSON content',
            timestamp: new Date().toISOString()
          };
        }
      } else {
        // Fallback to component data
        exportData = {
          components: currentData.components,
          layout: currentData.layout,
          timestamp: new Date().toISOString()
        };
      }

      // Add metadata to the export
      const downloadData = {
        metadata: {
          name: `json-export-${Date.now()}`,
          created: new Date().toISOString(),
          version: '1.0',
          generator: 'Dynamic Interface Compiler'
        },
        data: exportData
      };
      
      // Create JSON file
      const fileName = `json-export-${Date.now()}.json`;
      const fileContent = JSON.stringify(downloadData, null, 2);
      const mimeType = 'application/json';
      
      // Create and download file
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      updateActionState('download', 'success');
      setTimeout(() => updateActionState('download', 'idle'), 2000);
      
    } catch (error) {
      console.error('Download failed:', error);
      updateActionState('download', 'error');
      setTimeout(() => updateActionState('download', 'idle'), 3000);
    }
  };

  const getButtonContent = (action, defaultIcon, defaultText) => {
    const state = actionStates[action];
    
    switch (state) {
      case 'loading':
        return {
          icon: <RefreshCw size={18} className="animate-spin" />,
          text: 'Processing...',
          className: 'bg-yellow-600/20 border-yellow-500/30 text-yellow-300 cursor-wait'
        };
      case 'success':
        return {
          icon: <Check size={18} />,
          text: action === 'save' ? 'Saved!' : action === 'download' ? 'Downloaded!' : 'Updated!',
          className: 'bg-green-600/20 border-green-500/30 text-green-300'
        };
      case 'error':
        return {
          icon: <X size={18} />,
          text: 'Failed',
          className: 'bg-red-600/20 border-red-500/30 text-red-300'
        };
      default:
        return {
          icon: defaultIcon,
          text: defaultText,
          className: 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-300 hover:text-white hover:scale-105 active:scale-95'
        };
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-gray-900/70 border-b border-white/10 shadow-2xl">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-purple-600/8 to-cyan-600/8"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-4 right-20 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-2 right-40 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm group"
              title={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                {sidebarOpen ? (
                  // Close icon - two crossing lines
                  <>
                    <div className="absolute w-5 h-0.5 bg-gray-300 group-hover:bg-white transform rotate-45 transition-all duration-200"></div>
                    <div className="absolute w-5 h-0.5 bg-gray-300 group-hover:bg-white transform -rotate-45 transition-all duration-200"></div>
                  </>
                ) : (
                  // Hamburger icon - three horizontal lines
                  <>
                    <div className="w-5 h-0.5 bg-gray-300 group-hover:bg-white mb-1 transition-all duration-200 group-hover:translate-x-0.5"></div>
                    <div className="w-4 h-0.5 bg-gray-300 group-hover:bg-white mb-1 transition-all duration-200 group-hover:w-5"></div>
                    <div className="w-3 h-0.5 bg-gray-300 group-hover:bg-white transition-all duration-200 group-hover:w-5 group-hover:-translate-x-0.5"></div>
                  </>
                )}
              </div>
            </button>
            
            {/* Brand */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Sparkles size={20} className="text-white animate-pulse" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30 animate-pulse"></div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Dynamic Interface Compiler
                </h1>
                <p className="text-gray-400 text-sm flex items-center">
                  Drag, drop, and build UI components
                  {lastSaved && (
                    <span className="ml-2 text-xs text-green-400">
                      • Last saved {new Date(lastSaved).toLocaleTimeString()}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section - Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={actionStates.save === 'loading'}
              className={`group relative flex items-center px-4 py-2.5 rounded-xl border transition-all duration-300 backdrop-blur-sm font-medium text-sm ${
                getButtonContent('save', <Save size={18} />, 'Save').className
              }`}
              title="Save current design"
            >
              <div className="flex items-center space-x-2">
                {getButtonContent('save', <Save size={18} />, 'Save').icon}
                <span className="hidden sm:block">
                  {getButtonContent('save', <Save size={18} />, 'Save').text}
                </span>
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* Download Button */}
            <button
              onClick={handleDownload}
              disabled={actionStates.download === 'loading'}
              className={`group relative flex items-center px-4 py-2.5 rounded-xl border transition-all duration-300 backdrop-blur-sm font-medium text-sm ${
                getButtonContent('download', <Download size={18} />, 'Export').className
              }`}
              title="Export current JSON data"
            >
              <div className="flex items-center space-x-2">
                {getButtonContent('download', <Download size={18} />, 'Export').icon}
                <span className="hidden sm:block">
                  {getButtonContent('download', <Download size={18} />, 'Export').text}
                </span>
              </div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;