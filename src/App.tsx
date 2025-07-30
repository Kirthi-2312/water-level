import React from 'react';
import { Waves, Zap } from 'lucide-react';
import { Tank } from './components/Tank';
import { Tap } from './components/Tap';
import { StatusBoard } from './components/StatusBoard';
import { useWaterSystem } from './hooks/useWaterSystem';

function App() {
  const {
    system,
    startSystem,
    stopSystem,
    resetSystem,
    toggleMode,
    toggleTap,
  } = useWaterSystem();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Water Level Alert System</h1>
                <p className="text-sm text-gray-600">Real-time IoT Tank Monitoring Simulation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className={`w-6 h-6 ${system.isSystemActive ? 'text-green-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${system.isSystemActive ? 'text-green-600' : 'text-gray-500'}`}>
                {system.isSystemActive ? 'System Online' : 'System Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Board */}
        <div className="mb-8">
          <StatusBoard
            system={system}
            onStart={startSystem}
            onStop={stopSystem}
            onReset={resetSystem}
            onToggleMode={toggleMode}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tap Control */}
          <div className="lg:col-span-1">
            <Tap
              isOn={system.tapIsOn}
              isSystemActive={system.isSystemActive}
              mode={system.mode}
              onToggle={toggleTap}
            />
          </div>

          {/* Tank Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {system.tanks.map((tank, index) => (
                <Tank
                  key={tank.id}
                  tank={tank}
                  isActive={index === system.currentTankIndex && system.isSystemActive}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Getting Started:</h4>
              <ul className="space-y-1">
                <li>• Click "Start System" to begin simulation</li>
                <li>• Choose between Manual or Auto mode</li>
                <li>• In Manual mode, control the tap manually</li>
                <li>• In Auto mode, system manages tanks automatically</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Alert System:</h4>
              <ul className="space-y-1">
                <li>• Red blinking light when tank is full</li>
                <li>• Alarm sound plays for full tanks</li>
                <li>• Tank shakes when alerting</li>
                <li>• System auto-progresses in Auto mode</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;