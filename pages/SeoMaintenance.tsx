import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Wrench, ChevronRight, Calendar, Check } from 'lucide-react';

const SeoMaintenance: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [vehicle, setVehicle] = useState({ year: '2020', make: 'Toyota', model: 'Camry' });

  useEffect(() => {
    if (slug) {
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

  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} Maintenance Schedule`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-slate-500 mb-6 flex items-center gap-1">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/maintenance" className="hover:text-blue-600">Maintenance</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-slate-800 font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
         <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h1>
              <p className="text-slate-600">Recommended service intervals and parts for your vehicle.</p>
            </div>
            <div className="flex-shrink-0">
               <Link to="/maintenance" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 shadow-lg transition">
                 <Wrench className="h-5 w-5" />
                 Generate Custom Schedule
               </Link>
            </div>
         </div>

         <div className="space-y-8">
            <IntervalSection miles="5,000" items={["Oil & Filter Change", "Tire Rotation", "Safety Inspection"]} />
            <IntervalSection miles="15,000" items={["Cabin Air Filter", "Engine Air Filter", "Wiper Blades", "Brake Inspection"]} />
            <IntervalSection miles="30,000" items={["Brake Fluid Flush", "Transmission Fluid Check", "Coolant Inspection"]} />
            <IntervalSection miles="60,000" items={["Drive Belts", "Spark Plugs", "Differential Fluid"]} />
         </div>
      </div>
    </div>
  );
};

const IntervalSection = ({ miles, items }: { miles: string, items: string[] }) => (
  <div className="relative pl-8 border-l-2 border-slate-200">
     <div className="absolute -left-[9px] top-0 bg-white border-2 border-blue-500 w-4 h-4 rounded-full"></div>
     <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
       Every {miles} Miles
     </h3>
     <div className="grid md:grid-cols-2 gap-4">
       {items.map((item, i) => (
         <div key={i} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border border-slate-100">
           <span className="font-medium text-slate-700">{item}</span>
           <Check className="h-4 w-4 text-green-500" />
         </div>
       ))}
     </div>
  </div>
);

export default SeoMaintenance;