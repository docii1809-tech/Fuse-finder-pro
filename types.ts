
export interface Vehicle {
  year: string;
  make: string;
  model: string;
}

export interface VehicleImage {
  url: string;
  source: string;
  license?: string;
  attribution?: string;
}

export interface FuseLocation {
  boxLocation: string;
  locationCategory: 'engine_bay' | 'driver_dash' | 'passenger_dash' | 'trunk' | 'unknown';
  fuseNumber: string;
  amperage: string;
  circuit: string;
  description: string;
}

export interface MaintenanceTask {
  item: string;
  interval: string;
  status: 'pending' | 'completed' | 'urgent';
  costEstimate: string;
}

export interface AnalysisResult {
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  confidence: number;
}

export enum AnalysisType {
  TIRE = 'TIRE',
  OIL = 'OIL',
  DASHBOARD = 'DASHBOARD'
}
