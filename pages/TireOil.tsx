import React, { useState } from 'react';
import { Droplets, Disc, AlertTriangle } from 'lucide-react';
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-10">
        <div className={`p-3 rounded-full mb-4 ${isTire ? 'bg-slate-200' : 'bg-amber-100'}`}>
          {icon}
        </div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-600 mt-2 max-w-lg">{desc}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 animate-fade-in shadow-sm">
           <AlertTriangle className="h-5 w-5 text-red-600" />
           <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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