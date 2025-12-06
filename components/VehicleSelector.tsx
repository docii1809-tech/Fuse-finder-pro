import React, { useState } from 'react';
import { YEARS, MAKES, POPULAR_MODELS } from '../constants';
import { Vehicle } from '../types';
import { Check, Trash2, Loader2, Search, AlertCircle } from 'lucide-react';

interface Props {
  vehicle: Vehicle;
  setVehicle: (v: Vehicle) => void;
  className?: string;
}

const VehicleSelector: React.FC<Props> = ({ vehicle, setVehicle, className }) => {
  const [vin, setVin] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (field: keyof Vehicle, value: string) => {
    const newVehicle = { ...vehicle, [field]: value };
    
    // Reset model if make changes to ensure consistency
    if (field === 'make') {
      newVehicle.model = '';
    }
    
    setVehicle(newVehicle);
    setError(null);
  };

  const handleReset = () => {
    setVehicle({ year: '', make: '', model: '' });
    setVin('');
    setError(null);
  };

  const scrollToTools = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const decodeVin = async () => {
    if (vin.length !== 17) {
      setError("VIN must be exactly 17 characters.");
      return;
    }
    
    setIsDecoding(true);
    setError(null);

    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const results = data.Results;
      
      if (!results) {
        throw new Error('Invalid response data');
      }

      const getValue = (name: string) => results.find((r: any) => r.Variable === name)?.Value;
      
      const year = getValue("Model Year");
      const make = getValue("Make");
      const model = getValue("Model");
      
      // Check if the decoder actually found a vehicle
      if (!year && !make) {
        setError("Could not identify vehicle. Please verify the VIN and try again.");
        setIsDecoding(false);
        return;
      }
      
      if (year && make && model) {
        // Normalize Make: Find matching make in our list to keep casing consistent (e.g. "TOYOTA" -> "Toyota")
        // If not in our list, convert to Title Case
        const normalizedMake = MAKES.find(m => m.toLowerCase() === make.toLowerCase()) || 
                              (make.charAt(0).toUpperCase() + make.slice(1).toLowerCase());

        setVehicle({
          year,
          make: normalizedMake,
          model
        });
      } else {
        setError("Incomplete vehicle data received from VIN decoder. Please select manually.");
      }
    } catch (error) {
      console.error("VIN Decode Error", error);
      setError("Unable to connect to vehicle database. Please ensure you are online.");
    } finally {
      setIsDecoding(false);
    }
  };

  const models = vehicle.make ? (POPULAR_MODELS[vehicle.make] || []) : [];
  const isComplete = Boolean(vehicle.year && vehicle.make && vehicle.model);

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border border-slate-200 transition-all ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>Select Your Vehicle</span>
        </h2>
        {isComplete && (
          <button 
            onClick={handleReset}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium px-2 py-1 rounded hover:bg-red-50 transition"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
        )}
      </div>

      {/* VIN Input Section */}
      <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
            <span>Quick Fill by VIN</span>
            <span className="text-[10px] text-slate-400 font-normal">US/North America</span>
        </label>
        <div className="flex gap-2">
            <div className="relative flex-grow">
                <input 
                    type="text" 
                    value={vin}
                    onChange={(e) => {
                      setVin(e.target.value.toUpperCase());
                      setError(null);
                    }}
                    placeholder="Enter 17-character VIN"
                    maxLength={17}
                    className={`w-full rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 pl-3 border font-mono uppercase text-sm tracking-wide ${error ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                />
            </div>
            <button 
                onClick={decodeVin}
                disabled={isDecoding || vin.length < 17}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-sm"
            >
                {isDecoding ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                <span className="hidden sm:inline">Decode</span>
            </button>
        </div>
        
        {error && (
          <div className="mt-3 flex items-start gap-2 text-red-600 text-xs animate-fade-in">
            <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="relative flex py-2 items-center mb-6">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase font-semibold">Or Select Manually</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Year */}
        <div className="relative">
          <label htmlFor="year-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Year</label>
          <div className="relative">
            <input
              id="year-input"
              type="text"
              list="years-list"
              value={vehicle.year}
              onChange={(e) => handleChange('year', e.target.value)}
              placeholder="e.g. 2020"
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white text-slate-900"
              autoComplete="off"
            />
            <datalist id="years-list">
              {YEARS.map(y => <option key={y} value={y} />)}
            </datalist>
          </div>
        </div>

        {/* Make */}
        <div>
          <label htmlFor="make-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Make</label>
          <div className="relative">
            <input
              id="make-input"
              type="text"
              list="makes-list"
              value={vehicle.make}
              onChange={(e) => handleChange('make', e.target.value)}
              placeholder="e.g. Toyota"
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              autoComplete="off"
            />
            <datalist id="makes-list">
              {MAKES.map(m => <option key={m} value={m} />)}
            </datalist>
          </div>
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model-input" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Model</label>
          <div className="relative">
            <input
              id="model-input"
              type="text"
              list="models-list"
              value={vehicle.model}
              onChange={(e) => handleChange('model', e.target.value)}
              disabled={!vehicle.make}
              placeholder={vehicle.make ? `e.g. Camry` : "Select Make first"}
              className="w-full border-slate-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border disabled:bg-slate-50 disabled:text-slate-400"
              autoComplete="off"
            />
            <datalist id="models-list">
              {models.map(m => <option key={m} value={m} />)}
            </datalist>
          </div>
        </div>
      </div>
      
      {isComplete && (
        <div className="mt-6 animate-fade-in">
           <button 
             onClick={scrollToTools}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition shadow-md hover:shadow-lg transform active:scale-95"
           >
             <Check className="h-5 w-5" />
             Confirm Vehicle & Start
           </button>
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;