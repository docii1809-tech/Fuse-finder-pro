import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Zap, MapPin, Download, AlertTriangle, Search, ChevronRight } from 'lucide-react';
import FuseDiagram from '../components/FuseDiagram';
import AffiliateBox from '../components/AffiliateBox';

const SeoFuse: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vehicle, setVehicle] = useState({ year: '2024', make: 'Generic', model: 'Car' });

  useEffect(() => {
    if (slug) {
      // Simple heuristic parser for slugs like: 2018-honda-civic-fuse-diagram
      const parts = slug.replace('.html', '').split('-');
      if (parts.length >= 3 && !isNaN(Number(parts[0]))) {
        setVehicle({
          year: parts[0],
          make: parts[1].charAt(0).toUpperCase() + parts[1].slice(1),
          model: parts[2].charAt(0).toUpperCase() + parts[2].slice(1)
        });
      }
    }
  }, [slug]);

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} Fuse Box Diagram & Locations`;
  const description = `Free online fuse box diagram for the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Find fuse locations, amperage ratings, and circuit information.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Where is the fuse box located on a ${vehicle.year} ${vehicle.make} ${vehicle.model}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The ${vehicle.year} ${vehicle.make} ${vehicle.model} typically has two fuse boxes: one located in the engine bay near the battery, and another in the interior dashboard (often driver's side kick panel).`
        }
      },
      {
        "@type": "Question",
        "name": "How do I replace a blown fuse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Locate the fuse box, find the fuse map (often on the cover), use a fuse puller to remove the bad fuse, and verify the metal filament inside is broken. Replace with a fuse of the EXACT same amperage."
        }
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* JSON-LD Schema */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/fuse" className="hover:text-blue-600">Fuse Finder</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{title}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Welcome to the ultimate fuse guide for the <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong>. 
              Whether you're troubleshooting a broken radio, non-working lighter, or headlight failure, this diagram will help you locate the exact fuse you need.
            </p>
            
            <div className="flex items-center gap-2 p-4 bg-blue-50 text-blue-800 rounded-lg border border-blue-100">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">Always ensure the vehicle ignition is OFF before checking fuses.</p>
            </div>
          </div>

          {/* Fuse Locations */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="text-blue-600" /> Fuse Box Locations
            </h2>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <span className="bg-slate-100 p-2 rounded text-slate-700 font-bold text-xs uppercase">Engine Bay</span>
                   <div>
                     <p className="font-bold text-slate-900">Power Distribution Center</p>
                     <p className="text-sm text-slate-600">Located under the hood, usually on the passenger side or near the battery. Contains high-amperage fuses and relays.</p>
                   </div>
                 </li>
                 <li className="flex items-start gap-3">
                   <span className="bg-slate-100 p-2 rounded text-slate-700 font-bold text-xs uppercase">Interior</span>
                   <div>
                     <p className="font-bold text-slate-900">Cabin Fuse Box</p>
                     <p className="text-sm text-slate-600">Located under the dashboard on the driver's side (kick panel) or sometimes behind the glove box.</p>
                   </div>
                 </li>
               </ul>
            </div>
          </section>

          {/* Diagram Placeholder */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Zap className="text-yellow-500" /> Fuse Diagram Visual
            </h2>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center">
              <FuseDiagram category="driver_dash" />
              <p className="text-center text-sm text-slate-500 mt-4 italic">
                *Generic representation of a standard {vehicle.make} fuse block layout.
              </p>
            </div>
          </section>

          {/* Search CTA */}
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-3">Find Specific Fuses Instantly</h3>
            <p className="text-slate-300 mb-6">Don't scroll through manual tables. Use our AI search to find exactly what you need.</p>
            
            <div className="bg-white/10 p-2 rounded-lg inline-block w-full max-w-md">
               <Link to="/fuse" className="flex items-center justify-between bg-white text-slate-900 px-4 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
                 <span>Search "Radio" or "Horn"...</span>
                 <Search className="h-5 w-5 text-blue-600" />
               </Link>
            </div>
          </div>
          
          <AffiliateBox productName={`Fuses for ${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
             <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-sm">Downloads</h3>
             <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition mb-3">
               <Download className="h-4 w-4" />
               Download PDF Diagram
             </button>
             <p className="text-xs text-center text-slate-400">High-resolution printable version</p>

             <hr className="my-6 border-slate-100" />

             <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wide text-sm">Related Tools</h3>
             <ul className="space-y-3">
               <li>
                 <Link to="/dashboard" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
                   <AlertTriangle className="h-4 w-4" /> Dashboard Light Decoder
                 </Link>
               </li>
               <li>
                 <Link to="/maintenance" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium">
                   <AlertTriangle className="h-4 w-4" /> Maintenance Schedule
                 </Link>
               </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoFuse;