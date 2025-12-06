import React from 'react';

interface Props {
  category: 'engine_bay' | 'driver_dash' | 'passenger_dash' | 'trunk' | 'unknown';
}

const FuseDiagram: React.FC<Props> = ({ category }) => {
  // Styles for the active zone
  const activeClass = "fill-blue-500 stroke-blue-600 animate-pulse opacity-80";
  const inactiveClass = "fill-slate-200 stroke-slate-300 opacity-40";

  const isEngine = category === 'engine_bay';
  const isDriver = category === 'driver_dash';
  const isPass = category === 'passenger_dash';
  const isTrunk = category === 'trunk';

  return (
    <div className="w-full flex flex-col items-center">
       <div className="relative w-full max-w-xs aspect-[2/3] md:aspect-square">
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
             {/* Car Outline (Top Down View) */}
             <path 
                d="M40,60 C40,20 160,20 160,60 L170,100 L170,240 L160,280 C160,300 40,300 40,280 L30,240 L30,100 Z" 
                className="fill-white stroke-slate-800 stroke-2"
             />
             
             {/* Windshield */}
             <path d="M45,80 L155,80 L150,110 L50,110 Z" className="fill-slate-100 stroke-slate-400" />
             
             {/* Rear Window */}
             <path d="M50,230 L150,230 L155,250 L45,250 Z" className="fill-slate-100 stroke-slate-400" />

             {/* ZONES */}
             
             {/* Engine Bay */}
             <rect 
                x="50" y="30" width="100" height="45" rx="5"
                className={isEngine ? activeClass : inactiveClass}
             />
             
             {/* Driver Dash (Left side for LHD) */}
             <rect 
                x="40" y="115" width="50" height="30" rx="5"
                className={isDriver ? activeClass : inactiveClass}
             />

             {/* Passenger Dash (Right side for LHD) */}
             <rect 
                x="110" y="115" width="50" height="30" rx="5"
                className={isPass ? activeClass : inactiveClass}
             />

             {/* Trunk/Rear */}
             <rect 
                x="50" y="255" width="100" height="30" rx="5"
                className={isTrunk ? activeClass : inactiveClass}
             />
             
             {/* Labels */}
             <text x="100" y="55" fontSize="10" textAnchor="middle" fill="#334155" fontWeight="bold">ENGINE</text>
             <text x="65" y="133" fontSize="8" textAnchor="middle" fill="#334155" fontWeight="bold">DRIVER</text>
             <text x="135" y="133" fontSize="8" textAnchor="middle" fill="#334155" fontWeight="bold">PASS.</text>
             <text x="100" y="273" fontSize="10" textAnchor="middle" fill="#334155" fontWeight="bold">TRUNK</text>

          </svg>
          
          {/* Legend/Status */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded border border-slate-200 text-[10px] font-bold shadow-sm text-slate-600 uppercase">
             Diagram: {category.replace('_', ' ')}
          </div>
       </div>
    </div>
  );
};

export default FuseDiagram;