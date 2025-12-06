import React, { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

interface Props {
  onImageSelected: (base64: string) => void;
  isLoading?: boolean;
}

const FileUploader: React.FC<Props> = ({ onImageSelected, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data URL prefix for API if needed, usually Gemini accepts generic base64 or inlineData handles it
      // The API expects just the base64 data often, but @google/genai inlineData handles full string if configured or we strip it
      const base64Data = base64String.split(',')[1];
      setPreview(base64String);
      onImageSelected(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition hover:border-blue-400 group"
        >
          <Upload className="h-10 w-10 text-slate-400 group-hover:text-blue-500 mb-3" />
          <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
          <p className="text-slate-400 text-sm mt-1">JPG, PNG (Max 5MB)</p>
          <input 
            type="file" 
            ref={inputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-slate-200">
          <img src={preview} alt="Upload preview" className="w-full h-64 object-cover" />
          <div className="absolute top-2 right-2 flex gap-2">
             <button 
              onClick={clearImage}
              className="bg-white/90 p-2 rounded-full text-slate-700 hover:text-red-500 transition shadow-sm"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {isLoading && (
             <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-sm">
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
