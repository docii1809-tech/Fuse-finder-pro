import React, { useState } from 'react';
import { Search, Zap, Cpu, Settings, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Vehicle, FuseLocation } from '../types';
import { findFuse } from '../services/geminiService';
import AffiliateBox from '../components/AffiliateBox';
import FuseDiagram from '../components/FuseDiagram';

interface Props {
  vehicle: Vehicle;
}

const Fuse: React.FC<Props> = ({ vehicle }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<FuseLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vehicleString = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !vehicle.make) return;

    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await findFuse(vehicleString, query);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  if (!vehicle.make) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <Settings className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-700">No Vehicle Selected</h2>
        <p className="text-slate-500 mt-2 max-w-sm">Please return to the Home page and select your vehicle year, make, and model to use the Fuse Finder.</p>
      </div>
    );
  }

  // Safe helper to check amperage color
  const getAmperageColor = (amp: string | number) => {
    const s = String(amp || '');
    if (s.includes('10')) return 'bg-red-100 text-red-700 border-red-200';
    if (s.includes('15')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (s.includes('20')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (s.includes('25')) return 'bg-slate-200 text-slate-700 border-slate-300';
    if (s.includes('30')) return 'bg-green-100 text-green-700 border-green-200';
    return 'bg-slate-200 text-slate-700 border-slate-300';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Zap className="text-yellow-500 fill-yellow-500" />
          Fuse Finder
        </h1>
        <p className="text-slate-600 mt-2">
          Searching for <strong>{vehicleString}</strong>. Type a component name (e.g., "Radio", "Cigarette Lighter", "Headlights").
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-10 relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setError(null);
          }}
          placeholder="What stopped working? (e.g. 'Horn')"
          className={`w-full p-4 pl-12 rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg transition-shadow group-hover:shadow-md ${error ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
        <button
          type="submit"
          disabled={loading || !query}
          className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition"
        >
          Find
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r flex items-start gap-3 animate-fade-in">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
          <div>
            <h3 className="text-red-800 font-bold text-sm">Search Failed</h3>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <div className="h-4 w-24 skeleton"></div>
            <div className="h-6 w-12 skeleton rounded"></div>
          </div>
          <div className="p-6">
            <div className="h-8 w-16 skeleton mb-2"></div>
            <div className="h-4 w-32 skeleton mb-6"></div>
            <div className="h-20 w-full skeleton mb-6 rounded-lg"></div>
            <div className="grid grid-cols-2 gap-4">
               <div className="h-10 w-full skeleton rounded"></div>
               <div className="h-10 w-full skeleton rounded"></div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && result && (
        <div className="animate-fade-in grid lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Data */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Cpu className="h-32 w-32 text-slate-900" />
            </div>
            
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-700 uppercase tracking-wide text-xs">AI Diagnosis Result</span>
              <span className={`text-xs font-bold px-3 py-1 rounded border ${getAmperageColor(result.amperage)}`}>
                {result.amperage} Fuse
              </span>
            </div>
            
            <div className="p-6 relative z-10">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-4xl font-extrabold text-slate-900">{result.fuseNumber}</h2>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Location ID</span>
              </div>
              
              <p className="text-blue-600 font-semibold mb-6 flex items-center gap-1">
                 {result.boxLocation}
              </p>
              
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-100 mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">Description</h3>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {result.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                  <span className="block text-slate-400 text-xs uppercase mb-1">Protecting Circuit</span>
                  <span className="font-bold text-slate-800">{result.circuit}</span>
                </div>
                <div className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                  <span className="block text-slate-400 text-xs uppercase mb-1">Fuse Type</span>
                  <span className="font-bold text-slate-800">Standard / Mini Blade</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Diagram & Safety */}
          <div className="space-y-6">
            
            {/* Safety Warnings (Restrictions) */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
               <div className="flex items-center gap-2 mb-3 text-amber-800">
                  <ShieldAlert className="h-5 w-5" />
                  <h3 className="font-bold uppercase text-sm tracking-wide">Safety Restrictions</h3>
               </div>
               <ul className="text-sm space-y-2 text-amber-900 opacity-90 list-disc pl-5">
                  <li><strong>Ignition OFF:</strong> Ensure vehicle is completely turned off before opening fuse box.</li>
                  <li><strong>Amperage Limit:</strong> NEVER replace a fuse with a higher amperage rating than specified.</li>
                  <li><strong>Tools:</strong> Use a proper fuse puller tool, not metal pliers.</li>
               </ul>
            </div>

            {/* Visual Location Diagram */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg flex flex-col items-center">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 w-full text-left">Location Diagram</h3>
               <FuseDiagram category={result.locationCategory} />
            </div>
            
            <AffiliateBox productName={`${result.amperage} Automotive Fuse`} />
          </div>

        </div>
      )}
    </div>
  );
};

export default Fuse;