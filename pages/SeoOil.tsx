import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Droplets, Camera, AlertTriangle, ArrowRight, ChevronRight } from 'lucide-react';

const SeoOil: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const title = slug 
    ? slug.replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Oil Health Guide";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/oil" className="hover:text-blue-600">Oil Check</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{title}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
           <article className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
             <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{title}</h1>
             <p className="text-lg text-slate-600 mb-6">
               Your engine oil is the lifeblood of your vehicle. The color and consistency of the oil on your dipstick can reveal serious engine problems before they become catastrophic failures.
             </p>

             <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-slate-800 mb-2">What does this condition mean?</h3>
                <p className="mb-4">
                  Healthy oil should be amber or honey-colored and translucent. If your oil is turning black, milky, or contains particles, it indicates specific mechanical issues ranging from simple age to head gasket failure.
                </p>

                <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 my-6">
                   <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
                     <AlertTriangle className="h-5 w-5" /> Critical Check
                   </h4>
                   <p className="text-sm text-amber-800 mb-3">
                     Not sure if your oil needs changing? Visual inspection is the first step.
                   </p>
                   <Link to="/oil" className="text-sm font-bold text-amber-900 underline hover:text-amber-700">
                     Click here to analyze your oil photo now →
                   </Link>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2">Common Oil Conditions</h3>
                <ul className="space-y-2 list-none pl-0">
                  <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
                    <span className="h-3 w-3 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <strong>Amber / Honey:</strong> Fresh, healthy oil.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
                    <span className="h-3 w-3 rounded-full bg-slate-900 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <strong>Dark Brown / Black:</strong> Old oil, oxidized. Needs changing soon.
                    </div>
                  </li>
                  <li className="flex gap-3 items-start p-3 bg-slate-50 rounded-lg">
                    <span className="h-3 w-3 rounded-full bg-orange-200 mt-1.5 flex-shrink-0 border border-slate-300"></span>
                    <div>
                      <strong>Milky / Chocolate Milk:</strong> Coolant contamination. Serious head gasket issue.
                    </div>
                  </li>
                </ul>
             </div>
           </article>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
              <Droplets className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Free AI Oil Analysis</h3>
              <p className="text-slate-300 text-sm mb-6">
                Upload a photo of your dipstick or oil cap. Our AI detects sludge, coolant, and metal particles instantly.
              </p>
              <Link to="/oil" className="block w-full bg-blue-600 hover:bg-blue-500 text-center py-3 rounded-lg font-bold transition">
                Check My Oil
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SeoOil;