import { useState, useEffect, useCallback } from 'react';
import { Tank, WaterSystem } from '../types';
import { audioManager } from '../utils/audio';

const INITIAL_TANKS: Tank[] = [
  { id: 'tank1', name: 'Tank 1', level: 0, maxCapacity: 100, status: 'empty', isAlerting: false },
  { id: 'tank2', name: 'Tank 2', level: 0, maxCapacity: 100, status: 'empty', isAlerting: false },
  { id: 'tank3', name: 'Tank 3', level: 0, maxCapacity: 100, status: 'empty', isAlerting: false },
];

export const useWaterSystem = () => {
  const [system, setSystem] = useState<WaterSystem>({
    tanks: INITIAL_TANKS,
    tapIsOn: false,
    mode: 'manual',
    currentTankIndex: 0,
    isSystemActive: false,
  });

  const updateTankStatus = (level: number): Tank['status'] => {
    if (level === 0) return 'empty';
    if (level >= 100) return 'full';
    return 'half';
  };

  const startSystem = useCallback(() => {
    audioManager.playClickSound();
    setSystem(prev => ({
      ...prev,
      isSystemActive: true,
      tapIsOn: true,
    }));
  }, []);

  const stopSystem = useCallback(() => {
    audioManager.playClickSound();
    audioManager.stopAlarm();
    setSystem(prev => ({
      ...prev,
      isSystemActive: false,
      tapIsOn: false,
      tanks: prev.tanks.map(tank => ({ ...tank, isAlerting: false })),
    }));
  }, []);

  const resetSystem = useCallback(() => {
    audioManager.playClickSound();
    audioManager.stopAlarm();
    setSystem({
      tanks: INITIAL_TANKS,
      tapIsOn: false,
      mode: 'manual',
      currentTankIndex: 0,
      isSystemActive: false,
    });
  }, []);

  const toggleMode = useCallback(() => {
    audioManager.playClickSound();
    setSystem(prev => ({
      ...prev,
      mode: prev.mode === 'manual' ? 'auto' : 'manual',
    }));
  }, []);

  const toggleTap = useCallback(() => {
    if (!system.isSystemActive) return;
    
    audioManager.playClickSound();
    setSystem(prev => ({
      ...prev,
      tapIsOn: !prev.tapIsOn,
    }));
  }, [system.isSystemActive]);

  // Water filling simulation
  useEffect(() => {
    if (!system.isSystemActive || !system.tapIsOn) return;

    const interval = setInterval(() => {
      setSystem(prev => {
        const newTanks = [...prev.tanks];
        const currentTank = newTanks[prev.currentTankIndex];

        if (currentTank && currentTank.level < currentTank.maxCapacity) {
          // Fill current tank
          currentTank.level = Math.min(currentTank.level + 2, currentTank.maxCapacity);
          currentTank.status = updateTankStatus(currentTank.level);

          // Check if tank is full
          if (currentTank.level >= currentTank.maxCapacity) {
            currentTank.isAlerting = true;
            audioManager.playAlarm();

            // Auto mode: move to next tank or stop
            if (prev.mode === 'auto') {
              const nextIndex = prev.currentTankIndex + 1;
              if (nextIndex < newTanks.length) {
                setTimeout(() => {
                  setSystem(current => ({
                    ...current,
                    currentTankIndex: nextIndex,
                    tanks: current.tanks.map(tank => ({ ...tank, isAlerting: false })),
                  }));
                  audioManager.stopAlarm();
                }, 2000); // Alert for 2 seconds before moving to next tank
              } else {
                // All tanks full, stop system
                setTimeout(() => {
                  setSystem(current => ({
                    ...current,
                    tapIsOn: false,
                    tanks: current.tanks.map(tank => ({ ...tank, isAlerting: false })),
                  }));
                  audioManager.stopAlarm();
                }, 2000);
              }
            }
          }
        }

        return {
          ...prev,
          tanks: newTanks,
        };
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, [system.isSystemActive, system.tapIsOn, system.mode]);

  return {
    system,
    startSystem,
    stopSystem,
    resetSystem,
    toggleMode,
    toggleTap,
  };
};