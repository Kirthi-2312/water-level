import React from 'react';
import { Activity, Settings, RotateCcw, Play, Square } from 'lucide-react';
import { WaterSystem } from '../types';

interface StatusBoardProps {
  system: WaterSystem;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onToggleMode: () => void;
}

export const StatusBoard: React.FC<StatusBoardProps> = ({
  system,
  onStart,
  onStop,
  onReset,
  onToggleMode,
}) => {
  const getTotalCapacity = () => {
    return system.tanks.reduce((total, tank) => total + tank.level, 0);
  };

  const getAverageFill = () => {
    const total = getTotalCapacity();
    return Math.round(total / system.tanks.length);
  };

  const getActiveTanks = () => {
    return system.tanks.filter(tank => tank.level > 0).length;
  };

  const getFullTanks = () => {
    return system.tanks.filter(tank => tank.status === 'full').length;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Activity className="w-6 h-6 mr-2 text-blue-500" />
          System Status
        </h2>
        <div className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${system.isSystemActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
        `}>
          {system.isSystemActive ? 'ACTIVE' : 'INACTIVE'}
        </div>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{getTotalCapacity()}</div>
          <div className="text-sm text-blue-800">Total Volume</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{getAverageFill()}%</div>
          <div className="text-sm text-green-800">Avg Fill</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{getActiveTanks()}</div>
          <div className="text-sm text-yellow-800">Active Tanks</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{getFullTanks()}</div>
          <div className="text-sm text-red-800">Full Tanks</div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onStart}
            disabled={system.isSystemActive}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform active:scale-95
              ${system.isSystemActive 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            <Play className="w-4 h-4" />
            <span>Start System</span>
          </button>

          <button
            onClick={onStop}
            disabled={!system.isSystemActive}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform active:scale-95
              ${!system.isSystemActive 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
              }
            `}
          >
            <Square className="w-4 h-4" />
            <span>Stop System</span>
          </button>

          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={onToggleMode}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-all duration-200 transform active:scale-95 shadow-md hover:shadow-lg"
          >
            <Settings className="w-4 h-4" />
            <span>{system.mode === 'manual' ? 'Switch to Auto' : 'Switch to Manual'}</span>
          </button>
        </div>

        {/* Current Tank Indicator */}
        {system.isSystemActive && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Current Target:</span> {system.tanks[system.currentTankIndex]?.name || 'None'}
            </div>
            <div className="text-sm text-blue-600 mt-1">
              <span className="font-medium">Mode:</span> {system.mode.toUpperCase()} | 
              <span className="font-medium"> Tap:</span> {system.tapIsOn ? 'ON' : 'OFF'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};