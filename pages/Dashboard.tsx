import React, { useState, useEffect } from 'react';
import { AlertCircle, Camera, CheckCircle, AlertTriangle, Car, Gauge } from 'lucide-react';
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
      {/* Hero Section */}
      <div className="relative h-56 md:h-72 rounded-3xl overflow-hidden mb-10 shadow-2xl animate-fade-in group">
        <img 
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200" 
            alt="Car Dashboard" 
            className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-500/20 backdrop-blur-md p-2 rounded-full border border-red-500/50 text-red-100">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <span className="text-red-200 font-bold uppercase tracking-wider text-sm">AI Diagnostic Tool</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Warning Light Identifier</h1>
            <p className="text-slate-200 text-lg max-w-xl leading-relaxed opacity-90">
              Snap a photo of any unknown dashboard symbol. Our AI identifies it instantly and tells you if it's safe to drive.
            </p>
        </div>
      </div>

      {/* Vehicle Context & Dashboard Reference */}
      {vehicle.make && (
        <div className="mb-10 grid md:grid-cols-2 gap-6 animate-fade-in">
             {/* Exterior Profile */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center gap-5 transition hover:shadow-md">
                <div className="w-28 h-24 flex-shrink-0 bg-slate-100 rounded-xl overflow-hidden relative shadow-inner">
                    {carImage ? (
                        <img src={carImage.url} alt={vehicle.model} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Car className="h-8 w-8" />
                        </div>
                    )}
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Vehicle Profile</p>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{vehicle.year} {vehicle.make}</h3>
                    <p className="text-slate-600 font-medium">{vehicle.model}</p>
                </div>
             </div>

             {/* Dashboard Reference */}
             <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center gap-5 transition hover:shadow-md">
                <div className="w-28 h-24 flex-shrink-0 bg-slate-900 rounded-xl overflow-hidden relative shadow-inner group">
                    <img 
                        src="https://images.unsplash.com/photo-1580273916550-e323be2ed532?auto=format&fit=crop&q=80&w=500" 
                        alt="Dashboard Layout Reference" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition"></div>
                </div>
                <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dashboard Context</p>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight flex items-center gap-2">
                        Interior View
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">Reference layout for {vehicle.make} series</p>
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

      <div className="grid md:grid-cols-5 gap-8">
         <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                <Camera className="h-4 w-4" /> Upload Analysis Photo
              </h2>
              <FileUploader onImageSelected={handleImage} isLoading={loading} />
              
              {!result && !loading && (
                 <div className="mt-4 text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                    <CheckCircle className="h-3 w-3" /> Supports JPG, PNG. Ensure the symbol is clearly visible.
                 </div>
              )}
            </div>
         </div>

         <div className="md:col-span-2">
            {!result ? (
               <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 h-full flex flex-col justify-center relative overflow-hidden">
                  <h3 className="font-bold text-slate-800 mb-4 z-10 relative">How to use</h3>
                  <ul className="space-y-4 text-sm text-slate-600 z-10 relative">
                    <li className="flex items-start gap-3">
                      <div className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm border border-blue-100">1</div>
                      <span>Take a close-up photo of the active warning light.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm border border-blue-100">2</div>
                      <span>Upload the image using the panel on the left.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm border border-blue-100">3</div>
                      <span>Receive an instant definition and severity rating.</span>
                    </li>
                  </ul>
                  {/* Decorative background element */}
                  <Gauge className="absolute -bottom-6 -right-6 h-32 w-32 text-slate-200/50 rotate-12" />
               </div>
            ) : (
               <div className="bg-green-50 rounded-2xl border border-green-200 p-6 h-full flex flex-col items-center justify-center text-center animate-fade-in relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="bg-white p-3 rounded-full shadow-sm mb-3 inline-block">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-green-800 font-bold text-lg">Analysis Complete</p>
                    <p className="text-sm text-green-700 mt-1">Review the AI assessment below</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100/50"></div>
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