import React from 'react';
import { 
  Palette, Grid, Edit3, Layers, Move, Navigation, 
  Menu, Square, Type, List, CheckSquare, Circle,
  AlertCircle, MoreHorizontal, Activity, Star,
  BarChart, Folder, Layout, FileText, Table
} from 'lucide-react';

const ComponentPalette = ({ onDragStart }) => {
  const componentCategories = [
    {
      name: 'Layout',
      components: [
        { type: 'card', icon: Layers, name: 'Card', color: 'text-purple-400' },
        { type: 'grid', icon: Layout, name: 'Grid', color: 'text-indigo-400' },
        { type: 'sidebar', icon: Menu, name: 'Sidebar', color: 'text-gray-400' },
        { type: 'navbar', icon: Navigation, name: 'Navbar', color: 'text-cyan-400' }
      ]
    },
    {
      name: 'Forms',
      components: [
        { type: 'form', icon: FileText, name: 'Form', color: 'text-blue-400' },
        { type: 'input', icon: Type, name: 'Input', color: 'text-green-400' },
        { type: 'textarea', icon: Edit3, name: 'Textarea', color: 'text-yellow-400' },
        { type: 'select', icon: List, name: 'Select', color: 'text-orange-400' },
        { type: 'checkbox', icon: CheckSquare, name: 'Checkbox', color: 'text-pink-400' },
        { type: 'radio', icon: Circle, name: 'Radio', color: 'text-rose-400' }
      ]
    },
    {
      name: 'UI Elements',
      components: [
        { type: 'button', icon: Square, name: 'Button', color: 'text-emerald-400' },
        { type: 'alert', icon: AlertCircle, name: 'Alert', color: 'text-red-400' },
        { type: 'tabs', icon: MoreHorizontal, name: 'Tabs', color: 'text-teal-400' },
        { type: 'breadcrumb', icon: MoreHorizontal, name: 'Breadcrumb', color: 'text-slate-400' },
        { type: 'badge', icon: Star, name: 'Badge', color: 'text-amber-400' }
      ]
    },
    {
      name: 'Data & Media',
      components: [
        { type: 'table', icon: Table, name: 'Table', color: 'text-blue-400' },
        { type: 'list', icon: List, name: 'List', color: 'text-green-400' },
        { type: 'chart', icon: BarChart, name: 'Chart', color: 'text-purple-400' },
        { type: 'progress', icon: Activity, name: 'Progress', color: 'text-orange-400' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-gray-800 py-2 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Palette className="mr-2" size={20} />
          Component Palette
        </h3>
        <p className="text-xs text-gray-400 mt-1">{componentCategories.reduce((total, cat) => total + cat.components.length, 0)} components available</p>
      </div>
      
      {componentCategories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
              {category.name}
            </h4>
            <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
              {category.components.length}
            </span>
          </div>
          
          <div className="space-y-1">
            {category.components.map((comp) => (
              <div
                key={comp.type}
                draggable
                onDragStart={() => onDragStart(comp.type)}
                className="flex items-center p-3 bg-gray-800 rounded-lg border border-gray-700 cursor-move hover:bg-gray-750 hover:border-gray-600 transition-all duration-200 hover:scale-[1.02] group shadow-sm hover:shadow-md"
              >
                <div className={`mr-3 p-1 rounded ${comp.color.replace('text-', 'bg-').replace('-400', '-900')} bg-opacity-20`}>
                  <comp.icon className={`${comp.color} group-hover:scale-110 transition-transform`} size={16} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {comp.name}
                  </span>
                  <div className="text-xs text-gray-500 capitalize">
                    {comp.type} component
                  </div>
                </div>
                <Move className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Tip:</strong> Drag components to the preview area</p>
          <p>🎨 Customize properties in the JSON editor</p>
          <p>📱 All components are responsive</p>
        </div>
      </div>
    </div>
  );
};

export default ComponentPalette;