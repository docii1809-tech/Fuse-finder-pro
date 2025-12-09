import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

interface Props {
  category: 'engine_bay' | 'driver_dash' | 'passenger_dash' | 'trunk' | 'unknown';
}

const FuseDiagram: React.FC<Props> = ({ category }) => {
  const [selectedFuseId, setSelectedFuseId] = useState<string | null>(null);

  // Configuration for zones
  const getZoneCoords = () => {
    switch (category) {
      case 'engine_bay': return { cx: 100, cy: 52.5 };
      case 'driver_dash': return { cx: 65, cy: 130 };
      case 'passenger_dash': return { cx: 135, cy: 130 };
      case 'trunk': return { cx: 100, cy: 270 };
      default: return { cx: 100, cy: 150 };
    }
  };

  const { cx: zoneX, cy: zoneY } = getZoneCoords();

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
      color: '#ef4444', // Red
      amp: '10',
      w: 10, 
      h: 12, 
      desc: 'Compact blade style found in most cars.',
      era: '1990s – Present' 
    },
    { 
      id: 'standard', 
      label: 'Standard (ATO)', 
      color: '#eab308', // Yellow
      amp: '20',
      w: 12, 
      h: 14, 
      desc: 'The universal standard blade fuse.',
      era: '1976 – 2010s' 
    },
    { 
      id: 'micro', 
      label: 'Micro (2/3)', 
      color: '#3b82f6', // Blue
      amp: '15',
      w: 8, 
      h: 10, 
      desc: 'Ultra-compact for high-density boxes.',
      era: '2010s – Present' 
    },
  ];

  const selectedFuse = fuseTypes.find(f => f.id === selectedFuseId);
  const selectedIndex = fuseTypes.findIndex(f => f.id === selectedFuseId);
  
  // Calculate popup position based on selected fuse
  // SVG viewBox is 200x300
  // Offset logic matches renderFuses mapping: (i - 1) * 20
  const popupOffset = (selectedIndex - 1) * 20;
  const popupLeftPct = selectedFuse ? ((zoneX + popupOffset) / 200) * 100 : 50;
  const popupTopPct = selectedFuse ? ((zoneY) / 300) * 100 : 50;

  // Dynamic direction for popup (if at bottom, show above, else below)
  const isBottom = zoneY > 200;

  const renderFuses = (cx: number, cy: number) => (
    <g className="animate-fade-in">
       {/* Background Zone Circle */}
       <circle cx={cx} cy={cy} r="35" className="fill-blue-500/5 animate-pulse origin-center" />
       
       {fuseTypes.map((fuse, i) => {
         const offset = (i - 1) * 20;
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
                <>
                  <circle r="15" fill="white" fillOpacity="0.5" className="animate-ping" />
                  <rect 
                      x={-fuse.w/2 - 4} y={-fuse.h/2 - 4} 
                      width={fuse.w + 8} height={fuse.h + 8} 
                      fill="white" 
                      fillOpacity="0.95"
                      stroke="#2563eb" 
                      strokeWidth="1.5"
                      rx="4"
                      className="drop-shadow-md"
                  />
                </>
             )}

             {/* Metal Prongs */}
             <line x1={-fuse.w/3} y1={-fuse.h/2} x2={-fuse.w/3} y2={-fuse.h/2 - 4} stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
             <line x1={fuse.w/3} y1={-fuse.h/2} x2={fuse.w/3} y2={-fuse.h/2 - 4} stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

             {/* Fuse Body */}
             <rect 
               x={-fuse.w/2} y={-fuse.h/2} 
               width={fuse.w} height={fuse.h} 
               fill={fuse.color} 
               rx="2" 
               stroke={isSelected ? "#1e293b" : "rgba(255,255,255,0.5)"}
               strokeWidth="0.5" 
             />

             {/* Amperage Text */}
             <text 
                x="0" 
                y="1" 
                fontSize="4.5" 
                fontWeight="bold" 
                fill="white" 
                textAnchor="middle" 
                dominantBaseline="middle"
                style={{ textShadow: '0px 1px 1px rgba(0,0,0,0.3)' }}
             >
                {fuse.amp}
             </text>
           </g>
         );
       })}
       
       {!selectedFuseId && (
           <text x={cx} y={cy + 35} fontSize="6" textAnchor="middle" fill="#3b82f6" fontWeight="bold" className="pointer-events-none uppercase tracking-tighter opacity-80 animate-bounce">
             Tap Fuse to ID
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
          <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-xl bg-slate-50 rounded-xl border border-slate-100" xmlns="http://www.w3.org/2000/svg">
             {/* Car Body Outline - Abstract */}
             <path 
                d="M40,60 C40,20 160,20 160,60 L170,100 L170,240 L160,280 C160,300 40,300 40,280 L30,240 L30,100 Z" 
                className="fill-white stroke-slate-300 stroke-2"
             />
             {/* Windshield */}
             <path d="M45,80 L155,80 L150,110 L50,110 Z" className="fill-slate-100 stroke-slate-200" />
             {/* Rear Window */}
             <path d="M50,230 L150,230 L155,250 L45,250 Z" className="fill-slate-100 stroke-slate-200" />

             {/* ZONES */}
             <rect x="50" y="30" width="100" height="45" rx="5" className={`${isEngine ? activeClass : inactiveClass} transition-colors duration-500`} />
             <rect x="40" y="115" width="50" height="30" rx="5" className={`${isDriver ? activeClass : inactiveClass} transition-colors duration-500`} />
             <rect x="110" y="115" width="50" height="30" rx="5" className={`${isPass ? activeClass : inactiveClass} transition-colors duration-500`} />
             <rect x="50" y="255" width="100" height="30" rx="5" className={`${isTrunk ? activeClass : inactiveClass} transition-colors duration-500`} />
             
             {/* LABELS */}
             <text x="100" y="25" fontSize="8" textAnchor="middle" fill="#94a3b8" fontWeight="bold">FRONT</text>
             
             {/* INTERACTIVE FUSE ICONS - Rendered only in the active zone */}
             {category !== 'unknown' && renderFuses(zoneX, zoneY)}
          </svg>

          {/* Details Popup Overlay - Positioned near the fuse */}
          {selectedFuse && (
            <div 
              className="absolute z-20 w-48"
              style={{ 
                left: `${popupLeftPct}%`, 
                top: `${popupTopPct}%`,
                transform: `translate(-50%, ${isBottom ? '-110%' : '20px'})` // Flip if near bottom
              }}
            >
              <div className="bg-white/95 backdrop-blur shadow-xl border-2 border-blue-500 rounded-xl p-3 text-center animate-fade-in relative">
                 {/* Little Triangle Pointer */}
                 <div 
                   className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-blue-500 rotate-45 ${isBottom ? '-bottom-1.5 border-b-2 border-r-2 border-t-0 border-l-0' : '-top-1.5 border-t-2 border-l-2 border-b-0 border-r-0'}`}
                 ></div>

                 <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedFuseId(null); }}
                  className="absolute top-1 right-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 p-0.5 transition"
                >
                  <X className="h-3 w-3" />
                </button>

                <h4 className="text-slate-900 font-bold text-sm mb-0.5 flex items-center justify-center gap-1">
                  {selectedFuse.label}
                </h4>
                <div className="text-[10px] bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 inline-block mb-2 font-mono">
                  {selectedFuse.era}
                </div>
                <p className="text-xs text-slate-600 leading-snug mb-0">
                  {selectedFuse.desc}
                </p>
              </div>
            </div>
          )}
       </div>
    </div>
  );
};

export default FuseDiagram;