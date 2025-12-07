import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  category: 'engine_bay' | 'driver_dash' | 'passenger_dash' | 'trunk' | 'unknown';
}

const FuseDiagram: React.FC<Props> = ({ category }) => {
  const [selectedFuseId, setSelectedFuseId] = useState<string | null>(null);

  // Styles
  const activeClass = "fill-blue-500/10 stroke-blue-500 stroke-2";
  const inactiveClass = "fill-slate-50 stroke-slate-200";

  const isEngine = category === 'engine_bay';
  const isDriver = category === 'driver_dash';
  const isPass = category === 'passenger_dash';
  const isTrunk = category === 'trunk';

  const fuseTypes = [
    { 
      id: 'mini', 
      label: 'Mini (ATM)', 
      color: '#ef4444', 
      w: 8, 
      h: 10, 
      desc: 'Compact blade style found in most cars.',
      era: '1990s – Present' 
    },
    { 
      id: 'standard', 
      label: 'Standard (ATO)', 
      color: '#eab308', 
      w: 10, 
      h: 12, 
      desc: 'The universal standard blade fuse.',
      era: '1976 – 2010s' 
    },
    { 
      id: 'micro', 
      label: 'Micro (2/3)', 
      color: '#3b82f6', 
      w: 6, 
      h: 8, 
      desc: 'Ultra-compact for high-density boxes.',
      era: '2010s – Present' 
    },
  ];

  const selectedFuse = fuseTypes.find(f => f.id === selectedFuseId);

  const renderFuses = (cx: number, cy: number) => (
    <g className="animate-fade-in">
       {/* Background Zone Circle */}
       <circle cx={cx} cy={cy} r="32" className="fill-blue-500/5 animate-pulse origin-center" />
       
       {fuseTypes.map((fuse, i) => {
         const offset = (i - 1) * 18;
         const isSelected = selectedFuseId === fuse.id;

         return (
           <g 
             key={fuse.id} 
             transform={`translate(${cx + offset}, ${cy})`}
             onClick={(e) => {
               e.stopPropagation();
               setSelectedFuseId(isSelected ? null : fuse.id); // Toggle
             }}
             className={`cursor-pointer transition-all duration-300 ${isSelected ? 'opacity-100' : 'hover:opacity-80'}`}
             style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
           >
             {/* Selection Highlight Ring */}
             {isSelected && (
                <rect 
                    x={-fuse.w/2 - 4} y={-fuse.h/2 - 4} 
                    width={fuse.w + 8} height={fuse.h + 8} 
                    fill="white" 
                    fillOpacity="0.9"
                    stroke="#2563eb" 
                    strokeWidth="1.5"
                    rx="3"
                />
             )}

             {/* Fuse Body */}
             <rect 
               x={-fuse.w/2} y={-fuse.h/2} 
               width={fuse.w} height={fuse.h} 
               fill={fuse.color} 
               rx="1.5" 
               stroke={isSelected ? "#1e293b" : "white"}
               strokeWidth={isSelected ? "1" : "0.5"} 
             />
             {/* Metal Prongs */}
             <line x1={-fuse.w/3} y1={-fuse.h/2} x2={-fuse.w/3} y2={-fuse.h/2 - 3} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
             <line x1={fuse.w/3} y1={-fuse.h/2} x2={fuse.w/3} y2={-fuse.h/2 - 3} stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
           </g>
         );
       })}
       
       {!selectedFuseId && (
           <text x={cx} y={cy + 25} fontSize="6" textAnchor="middle" fill="#3b82f6" fontWeight="bold" className="pointer-events-none uppercase tracking-tighter opacity-80">
             Inspect Types
           </text>
       )}
    </g>
  );

  return (
    <div className="w-full flex flex-col items-center relative select-none">
       <div 
         className="relative w-full max-w-xs aspect-[2/3] md:aspect-square"
         onClick={() => setSelectedFuseId(null)}
        >
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
             {/* Car Body */}
             <path 
                d="M40,60 C40,20 160,20 160,60 L170,100 L170,240 L160,280 C160,300 40,300 40,280 L30,240 L30,100 Z" 
                className="fill-white stroke-slate-800 stroke-2"
             />
             <path d="M45,80 L155,80 L150,110 L50,110 Z" className="fill-slate-100 stroke-slate-300" />
             <path d="M50,230 L150,230 L155,250 L45,250 Z" className="fill-slate-100 stroke-slate-300" />

             {/* ZONES */}
             <rect x="50" y="30" width="100" height="45" rx="5" className={isEngine ? activeClass : inactiveClass} />
             <rect x="40" y="115" width="50" height="30" rx="5" className={isDriver ? activeClass : inactiveClass} />
             <rect x="110" y="115" width="50" height="30" rx="5" className={isPass ? activeClass : inactiveClass} />
             <rect x="50" y="255" width="100" height="30" rx="5" className={isTrunk ? activeClass : inactiveClass} />
             
             {/* LABELS */}
             <text x="100" y="25" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="bold">FRONT</text>
             
             {/* INTERACTIVE FUSE ICONS */}
             {isEngine && renderFuses(100, 52.5)}
             {isDriver && renderFuses(65, 130)}
             {isPass && renderFuses(135, 130)}
             {isTrunk && renderFuses(100, 270)}
          </svg>

          {/* Details Popup Overlay */}
          {selectedFuse && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur shadow-2xl border-2 border-blue-100 rounded-xl p-5 w-60 text-center animate-fade-in z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedFuseId(null); }}
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 p-1 transition"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex justify-center mb-3">
                   <div className="w-12 h-12 rounded-full flex items-center justify-center border border-slate-100 shadow-sm bg-slate-50">
                      <div className="w-4 h-5 rounded-[1px] relative shadow-sm" style={{ backgroundColor: selectedFuse.color }}>
                         <div className="absolute -top-1 left-0.5 w-1 h-1.5 bg-slate-400 rounded-sm"></div>
                         <div className="absolute -top-1 right-0.5 w-1 h-1.5 bg-slate-400 rounded-sm"></div>
                      </div>
                   </div>
                </div>
                <h4 className="text-slate-900 font-bold mb-1 text-base">{selectedFuse.label}</h4>
                <p className="text-sm text-slate-600 mb-3 leading-snug">{selectedFuse.desc}</p>
                
                <div className="bg-slate-100 rounded-lg px-3 py-2 inline-flex flex-col items-center border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Typical Era</span>
                    <span className="text-xs font-bold text-slate-800">{selectedFuse.era}</span>
                </div>
                
                <div className="mt-4 text-[10px] text-blue-500 font-bold uppercase tracking-wider cursor-pointer hover:text-blue-700 transition-colors" onClick={() => setSelectedFuseId(null)}>
                    Tap to Close
                </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded border border-slate-200 text-[10px] font-bold shadow-sm text-slate-600 uppercase flex items-center gap-2">
             <span className={`w-2 h-2 rounded-full ${category === 'unknown' ? 'bg-slate-300' : 'bg-blue-500 animate-pulse'}`}></span>
             {category === 'unknown' ? 'Locating...' : category.replace('_', ' ')}
          </div>
       </div>
    </div>
  );
};

export default FuseDiagram;