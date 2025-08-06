import React from 'react';
import { Grid, Save, Download, Settings } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-10 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Grid size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🧪 Dynamic Interface Compiler
            </h1>
            <p className="text-gray-400 text-sm">Drag, drop, and build UI components</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Save size={18} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Download size={18} />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;