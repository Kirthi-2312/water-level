export interface Tank {
  id: string;
  name: string;
  level: number;
  maxCapacity: number;
  status: 'empty' | 'half' | 'full';
  isAlerting: boolean;
}

export interface WaterSystem {
  tanks: Tank[];
  tapIsOn: boolean;
  mode: 'manual' | 'auto';
  currentTankIndex: number;
  isSystemActive: boolean;
}

export type TankStatus = 'empty' | 'half' | 'full';