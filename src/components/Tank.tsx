import React from 'react';
import { Droplets, AlertTriangle } from 'lucide-react';
import { Tank as TankType } from '../types';

interface TankProps {
  tank: TankType;
  isActive: boolean;
}

export const Tank: React.FC<TankProps> = ({ tank, isActive }) => {
  const getStatusColor = () => {
    switch (tank.status) {
      case 'empty': return 'text-gray-400';
      case 'half': return 'text-yellow-500';
      case 'full': return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const getWaterHeight = () => {
    return `${tank.level}%`;
  };

  return (
    <div className={`
      relative bg-white rounded-xl shadow-lg border-2 transition-all duration-300 p-6
      ${isActive ? 'border-blue-500 shadow-blue-200' : 'border-gray-200'}
      ${tank.isAlerting ? 'animate-bounce' : ''}
    `}>
      {/* Alert Light */}
      {tank.isAlerting && (
        <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-white animate-ping" />
        </div>
      )}

      {/* Tank Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{tank.name}</h3>
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          <Droplets className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">{tank.status}</span>
        </div>
      </div>

      {/* Tank Visual */}
      <div className="relative h-48 bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden">
        {/* Water */}
        <div 
          className={`
            absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out
            ${tank.level > 0 ? 'bg-gradient-to-t from-blue-500 to-blue-300' : 'bg-transparent'}
            ${tank.isAlerting ? 'animate-pulse' : ''}
          `}
          style={{ height: getWaterHeight() }}
        >
          {/* Water Surface Animation */}
          {tank.level > 0 && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 opacity-70 animate-pulse" />
          )}
        </div>

        {/* Water Level Markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-2 right-2 h-px bg-gray-300 opacity-50" />
          <div className="absolute top-1/2 left-2 right-2 h-px bg-gray-300 opacity-50" />
          <div className="absolute top-3/4 left-2 right-2 h-px bg-gray-300 opacity-50" />
        </div>

        {/* Level Percentage */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            text-2xl font-bold px-3 py-1 rounded-md backdrop-blur-sm
            ${tank.level > 50 ? 'text-white bg-black bg-opacity-20' : 'text-gray-700 bg-white bg-opacity-80'}
          `}>
            {Math.round(tank.level)}%
          </div>
        </div>
      </div>

      {/* Tank Status Bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Level</span>
          <span className="text-sm font-medium text-gray-800">{Math.round(tank.level)}/{tank.maxCapacity}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`
              h-2 rounded-full transition-all duration-300
              ${tank.level >= 100 ? 'bg-red-500' : tank.level >= 50 ? 'bg-yellow-500' : 'bg-blue-500'}
            `}
            style={{ width: `${tank.level}%` }}
          />
        </div>
      </div>
    </div>
  );
};