import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, Camera, CheckCircle, ChevronRight, Car } from 'lucide-react';

const SeoLights: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vehicle, setVehicle] = useState("Your Vehicle");

  useEffect(() => {
     if (slug && slug.includes('honda-civic')) setVehicle("Honda Civic");
     else if (slug && slug.includes('f150')) setVehicle("Ford F-150");
     else if (slug && slug.includes('camry')) setVehicle("Toyota Camry");
  }, [slug]);
  
  const title = slug 
    ? slug.replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Dashboard Light Decoder";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{title}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
         {/* Hero */}
         <div className="bg-slate-900 p-10 text-center">
            <div className="bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500 text-red-100">
               <AlertCircle className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{title}</h1>
            <p className="text-slate-300 text-lg">
              Is it safe to drive? Meaning, causes, and fixes for the {vehicle}.
            </p>
         </div>

         <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
               <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">What it means</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    This warning light indicates a potential malfunction in the system. While some lights are routine reminders (like maintenance required), others like flashing check engine lights or red oil cans require immediate attention.
                  </p>
                  <ul className="space-y-3">
                     <li className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Confirm severity with our AI scanner</span>
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Check for associated OBD2 codes</span>
                     </li>
                  </ul>
               </div>
               
               <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-center items-center text-center">
                  <Camera className="h-10 w-10 text-slate-400 mb-3" />
                  <h3 className="font-bold text-slate-800 mb-2">Have a photo?</h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Upload a picture of your dashboard. Our AI will identify every active light instantly.
                  </p>
                  <Link to="/dashboard" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                    Identify Now
                  </Link>
               </div>
            </div>

            <div className="border-t border-slate-100 pt-8">
               <h2 className="text-xl font-bold text-slate-900 mb-4">Common Triggers for {vehicle}</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                       <div className="h-2 w-10 bg-slate-200 rounded mb-3"></div>
                       <p className="font-bold text-slate-700 text-sm">Sensor Malfunction {i}</p>
                       <p className="text-xs text-slate-400 mt-1">Faulty reading triggering system alert.</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SeoLights;