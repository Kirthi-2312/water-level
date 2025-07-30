import React from 'react';
import { Droplets, Power, Zap } from 'lucide-react';

interface TapProps {
  isOn: boolean;
  isSystemActive: boolean;
  mode: 'manual' | 'auto';
  onToggle: () => void;
}

export const Tap: React.FC<TapProps> = ({ isOn, isSystemActive, mode, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
      <div className="text-center">
        {/* Tap Icon */}
        <div className={`
          relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 transition-all duration-300
          ${isOn ? 'bg-blue-500 shadow-lg shadow-blue-200' : 'bg-gray-300'}
        `}>
          <Droplets className={`w-10 h-10 ${isOn ? 'text-white' : 'text-gray-600'}`} />
          
          {/* Water Flow Animation */}
          {isOn && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-1 bg-blue-400 animate-pulse" style={{ height: '40px' }}>
                <div className="w-full h-full bg-gradient-to-b from-blue-400 to-transparent animate-bounce" />
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">Water Tap</h3>
        <div className={`
          inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4
          ${isOn ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}
        `}>
          <Power className="w-4 h-4" />
          <span>{isOn ? 'ON' : 'OFF'}</span>
        </div>

        {/* Mode Indicator */}
        <div className={`
          inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ml-2
          ${mode === 'auto' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
        `}>
          <Zap className="w-4 h-4" />
          <span>{mode.toUpperCase()}</span>
        </div>

        {/* Manual Control Button */}
        {mode === 'manual' && (
          <button
            onClick={onToggle}
            disabled={!isSystemActive}
            className={`
              w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform active:scale-95
              ${isSystemActive 
                ? isOn 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isOn ? 'Turn OFF' : 'Turn ON'}
          </button>
        )}

        {mode === 'auto' && (
          <div className="text-sm text-gray-600 italic">
            Auto mode: Tap controlled by system
          </div>
        )}
      </div>
    </div>
  );
};