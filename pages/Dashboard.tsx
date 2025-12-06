import React, { useState, useEffect } from 'react';
import { AlertCircle, Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import FileUploader from '../components/FileUploader';
import ResultPanel from '../components/ResultPanel';
import { analyzeImage } from '../services/geminiService';
import { fetchCarImages } from '../services/imageFetcher';
import { AnalysisType, AnalysisResult, Vehicle, VehicleImage } from '../types';

interface Props {
  vehicle: Vehicle;
}

const Dashboard: React.FC<Props> = ({ vehicle }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [carImage, setCarImage] = useState<VehicleImage | null>(null);

  useEffect(() => {
    if (vehicle.make && vehicle.model) {
      fetchCarImages(vehicle.year, vehicle.make, vehicle.model).then(imgs => {
        if (imgs.length > 0) setCarImage(imgs[0]);
      });
    } else {
      setCarImage(null);
    }
  }, [vehicle]);

  const handleImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    const vehicleCtx = vehicle.make ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Generic Car";
    
    try {
      const data = await analyzeImage(base64, AnalysisType.DASHBOARD, vehicleCtx);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze dashboard image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-red-50 rounded-full mb-4 border border-red-100 shadow-sm">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Warning Light Identifier</h1>
        <p className="text-slate-600 mt-3 max-w-lg mx-auto text-lg">
          Unknown symbol on your dash? AI can identify it instantly.
        </p>

        {/* Vehicle Context Card */}
        {vehicle.make && (
          <div className="mt-6 mx-auto max-w-md bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex items-center animate-fade-in">
             <div className="w-1/3 h-24 bg-slate-100 relative">
                {carImage ? (
                  <img src={carImage.url} alt={vehicle.model} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Camera className="h-6 w-6" />
                  </div>
                )}
             </div>
             <div className="p-4 text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Vehicle</p>
                <p className="font-bold text-slate-800 text-lg leading-tight">{vehicle.year} {vehicle.make} {vehicle.model}</p>
             </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 animate-fade-in shadow-sm">
           <AlertTriangle className="h-5 w-5 text-red-600" />
           <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-8">
         <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Camera className="h-4 w-4" /> Upload Photo
              </h2>
              <FileUploader onImageSelected={handleImage} isLoading={loading} />
              
              {!result && !loading && (
                 <div className="mt-4 text-xs text-slate-400 text-center">
                    Supports JPG, PNG. Ensure the symbol is clearly visible.
                 </div>
              )}
            </div>
         </div>

         <div className="md:col-span-2">
            {!result ? (
               <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800 mb-4">How it works</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">1</div>
                      <span>Take a photo of the warning light on your dashboard.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">2</div>
                      <span>Upload it here.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">3</div>
                      <span>Get instant definition and severity assessment.</span>
                    </li>
                  </ul>
               </div>
            ) : (
               <div className="bg-green-50 rounded-2xl border border-green-200 p-6 h-full flex flex-col items-center justify-center text-center animate-fade-in">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-3" />
                  <p className="text-green-800 font-bold">Analysis Complete</p>
                  <p className="text-sm text-green-700 mt-1">See results below</p>
               </div>
            )}
         </div>
      </div>

      <div className="animate-fade-in">
         <ResultPanel result={result} />
      </div>
    </div>
  );
};

export default Dashboard;