import React, { useState } from 'react';
import { Droplets, Disc, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import AffiliateBox from '../components/AffiliateBox';
import { analyzeImage } from '../services/geminiService';
import { AnalysisType, AnalysisResult, Vehicle } from '../types';

interface Props {
  type: 'tire' | 'oil';
  vehicle: Vehicle;
}

const TireOil: React.FC<Props> = ({ type, vehicle }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTire = type === 'tire';
  const analysisType = isTire ? AnalysisType.TIRE : AnalysisType.OIL;
  const title = isTire ? "Tire Wear Analyzer" : "Oil Condition Checker";
  const icon = isTire ? <Disc className="h-8 w-8 text-slate-700" /> : <Droplets className="h-8 w-8 text-amber-600" />;
  const desc = isTire 
    ? "Upload a close-up photo of your tire tread (with a coin for scale if possible) to check for wear and dry rot."
    : "Upload a photo of your oil dipstick or the oil on a white paper towel to analyze its health.";

  const handleImage = async (base64: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    const vehicleCtx = vehicle.make ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Generic Car";
    
    try {
      const data = await analyzeImage(base64, analysisType, vehicleCtx);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <div className={`p-3 rounded-full mb-4 ${isTire ? 'bg-slate-200' : 'bg-amber-100'}`}>
          {icon}
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600 mt-2 max-w-lg">{desc}</p>
      </div>

      {/* Visual Reference Guides - Only for Oil */}
      {!isTire && (
        <div className="mb-10 animate-fade-in">
            {/* OIL REFERENCES */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-2xl mx-auto">
                <div className="bg-white p-3 rounded-xl border border-green-100 shadow-sm flex flex-col group hover:shadow-md transition">
                   <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-3 bg-amber-50">
                      <img 
                        src="https://images.unsplash.com/photo-1596956247960-9d0b61679901?auto=format&fit=crop&q=80&w=600" 
                        alt="Clean Motor Oil Pouring" 
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-green-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> GOOD
                      </div>
                   </div>
                   <div className="mt-auto text-left px-1">
                     <h4 className="font-bold text-slate-800 text-sm">Amber / Honey</h4>
                     <p className="text-xs text-slate-500 mt-1 leading-snug">Clean, translucent oil. Good viscosity.</p>
                   </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm flex flex-col group hover:shadow-md transition">
                   <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-3 bg-slate-900">
                      <img 
                        src="https://images.unsplash.com/photo-1517026575997-239556d70535?auto=format&fit=crop&q=80&w=600" 
                        alt="Dirty Motor Oil Sludge" 
                        className="w-full h-full object-cover hover:scale-105 transition duration-500 opacity-90"
                      />
                       <div className="absolute top-2 left-2 bg-red-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> BAD
                      </div>
                   </div>
                   <div className="mt-auto text-left px-1">
                     <h4 className="font-bold text-slate-800 text-sm">Black / Sludge</h4>
                     <p className="text-xs text-slate-500 mt-1 leading-snug">Dark, opaque, or thick. Needs changing immediately.</p>
                   </div>
                </div>
            </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 animate-fade-in shadow-sm">
           <AlertTriangle className="h-5 w-5 text-red-600" />
           <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
        {/* Helper Label */}
        <div className="absolute top-0 right-0 bg-slate-100 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase text-slate-400">
           {isTire ? 'Tread Analysis' : 'Fluid Analysis'}
        </div>
        
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 flex items-center gap-2">
           Upload Your Photo
        </h3>
        <FileUploader onImageSelected={handleImage} isLoading={loading} />
      </div>

      <ResultPanel result={result} />

      {result && (
        <AffiliateBox productName={isTire ? "New Tires" : "Synthetic Motor Oil 5W-30"} />
      )}
    </div>
  );
};

export default TireOil;