import React, { useRef, useState, useEffect } from 'react';
import { Upload, X, Loader2, Camera } from 'lucide-react';

interface Props {
  onImageSelected: (base64: string) => void;
  isLoading?: boolean;
}

const FileUploader: React.FC<Props> = ({ onImageSelected, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Cleanup stream on unmount
    return () => {
      stopCamera();
    };
  }, []);

  // Watch for camera open state to attach stream to video element
  useEffect(() => {
    if (isCameraOpen && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Clear any previous errors
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      setPreview(base64String);
      onImageSelected(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    if (isLoading) return;
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: 'environment' } } 
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error("Camera Error:", err);
      setError("Camera access denied or unavailable. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        
        stopCamera();
        setPreview(dataUrl);
        const base64Data = dataUrl.split(',')[1];
        onImageSelected(base64Data);
      }
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    setError(null);
  };

  return (
    <div className="w-full">
      {isCameraOpen ? (
         <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] sm:aspect-video flex items-center justify-center animate-fade-in">
             <video 
               ref={videoRef} 
               autoPlay 
               playsInline 
               muted 
               className="w-full h-full object-cover" 
             />
             <canvas ref={canvasRef} className="hidden" />
             
             {/* Overlay Controls */}
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex justify-center items-center gap-8">
                 <button 
                   onClick={stopCamera} 
                   className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur transition"
                   title="Cancel"
                 >
                    <X className="h-6 w-6" />
                 </button>
                 
                 <button 
                   onClick={capturePhoto} 
                   className="p-1 rounded-full border-4 border-white/50 hover:border-white transition transform hover:scale-105"
                   title="Take Photo"
                 >
                    <div className="w-14 h-14 bg-red-600 rounded-full border-2 border-white shadow-inner"></div>
                 </button>
                 
                 {/* Placeholder for balance */}
                 <div className="w-12"></div>
             </div>
         </div>
      ) : !preview ? (
        <div 
          onClick={() => !isLoading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition group relative overflow-hidden ${
             isLoading ? 'bg-slate-50 border-slate-200 cursor-not-allowed opacity-70' : 'border-slate-300 cursor-pointer hover:bg-slate-50 hover:border-blue-400'
          }`}
        >
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 mb-3 transition" />
          <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
          <p className="text-slate-400 text-sm mt-1 mb-4">JPG, PNG (Max 5MB)</p>
          
          <div className="flex items-center gap-3 w-full max-w-[200px] mb-4">
              <div className="h-px bg-slate-200 flex-1"></div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OR</span>
              <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <button 
             onClick={(e) => {
               e.stopPropagation();
               startCamera();
             }}
             type="button"
             disabled={isLoading}
             className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition transform hover:scale-105 disabled:bg-slate-400 disabled:transform-none"
           >
             <Camera className="h-4 w-4" />
             Use Camera
           </button>
           
           {error && (
             <p className="text-red-500 text-xs mt-4 font-medium bg-red-50 px-3 py-1 rounded-full animate-fade-in">
               {error}
             </p>
           )}

          <input 
            type="file" 
            ref={inputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
            disabled={isLoading}
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
          <img src={preview} alt="Upload preview" className="w-full h-64 object-contain" />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
             <button 
              onClick={clearImage}
              className="bg-black/50 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur transition shadow-sm"
              disabled={isLoading}
              title="Remove Image"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {isLoading && (
             <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-sm z-10">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-2" />
                    <span className="font-semibold text-slate-800">Analyzing...</span>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;