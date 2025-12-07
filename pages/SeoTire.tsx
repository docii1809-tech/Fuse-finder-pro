import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Disc, Camera, AlertCircle, ArrowRight, ChevronRight } from 'lucide-react';

const SeoTire: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Convert slug to readable title: "inner-edge-wear-causes" -> "Inner Edge Wear Causes"
  const title = slug 
    ? slug.replace('.html', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : "Tire Wear Guide";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/tire" className="hover:text-blue-600">Tire Analysis</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 font-medium truncate max-w-[200px]">{title}</span>
      </div>

      <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Disc className="h-3 w-3" /> Automotive Safety Guide
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Understanding irregular tire wear patterns can save you money and keep you safe. Learn what causes this issue and how to fix it.
            </p>
          </div>
          <Disc className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-800 opacity-50" />
        </div>

        {/* Content Body */}
        <div className="p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What Causes This Wear Pattern?</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Irregular wear often indicates alignment issues, suspension problems, or improper inflation. 
              If you're seeing wear on just one edge (inner or outer), it's strongly indicative of camber misalignment or worn ball joints.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
               <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Safety Risk: High
                  </h3>
                  <p className="text-sm text-red-800">
                    Ignoring this can lead to sudden tire failure (blowout), especially at highway speeds.
                  </p>
               </div>
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Camera className="h-4 w-4" /> Instant Check
                  </h3>
                  <p className="text-sm text-blue-800">
                    Not sure what you're looking at? Use our AI tool to diagnose the exact problem from a photo.
                  </p>
               </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Symptoms</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>Vibration in the steering wheel at speed.</li>
              <li>Vehicle pulling to one side.</li>
              <li>Visible smooth strips on one side of the tire tread.</li>
              <li>"Cupping" or dipping patterns in the rubber.</li>
            </ul>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-8 rounded-2xl border border-slate-300 text-center">
             <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyze Your Tire for Free</h3>
             <p className="text-slate-600 mb-6 max-w-lg mx-auto">
               Upload a close-up photo of your tire tread. Our Gemini-powered AI will identify the wear pattern and tell you exactly what's wrong.
             </p>
             <Link 
               to="/tire" 
               className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
             >
               <Camera className="h-5 w-5" />
               Start Analysis
               <ArrowRight className="h-5 w-5" />
             </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default SeoTire;