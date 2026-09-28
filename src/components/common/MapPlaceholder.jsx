import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Layers, ShieldCheck, Truck, Building2, HeartHandshake } from 'lucide-react';

export default function MapPlaceholder({
  sourceName = "Food Source",
  sourceAddress = "Pickup Location",
  destinationName = "NGO Distribution Center",
  destinationAddress = "Delivery Location",
  showRoute = false,
  showTransitVehicle = false,
  eta = "20 mins",
  distance = "3.4 km",
  pinLabel = "Surplus Location",
  height = "h-72",
  interactive = true
}) {
  const [mapMode, setMapMode] = useState('traffic'); // 'traffic' | 'satellite'

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 select-none group`}>
      {/* Visual Map Surface Background */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${mapMode === 'satellite' ? 'bg-slate-950 opacity-95' : 'bg-slate-900 opacity-90'}`}>
        {/* Vector road grid & terrain styling */}
        <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* Simulated highways / main arterial streets */}
          <path d="M -20,120 Q 150,90 280,180 T 600,140 T 900,260" fill="none" stroke="#64748b" strokeWidth="8" strokeOpacity="0.4" />
          <path d="M 180,-20 Q 220,180 320,290 T 540,420" fill="none" stroke="#64748b" strokeWidth="7" strokeOpacity="0.4" />
          <path d="M -10,310 C 220,240 450,330 850,210" fill="none" stroke="#94a3b8" strokeWidth="4" strokeOpacity="0.3" />

          {/* Green zones / parks */}
          <rect x="80" y="30" width="130" height="70" rx="12" fill="#065f46" fillOpacity="0.25" />
          <rect x="420" y="160" width="160" height="90" rx="16" fill="#065f46" fillOpacity="0.2" />

          {/* Route path if enabled */}
          {showRoute && (
            <>
              {/* Route glow */}
              <path
                d="M 140,90 Q 230,120 330,140 T 520,210"
                fill="none"
                stroke="#10b981"
                strokeWidth="8"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
              {/* Animated dashed line */}
              <path
                d="M 140,90 Q 230,120 330,140 T 520,210"
                fill="none"
                stroke="url(#route-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </>
          )}
        </svg>

        {/* Ambient radial lighting */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Map Interactive Overlay Controls */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/60 text-xs font-medium text-slate-200 shadow-md">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          Live GPS Geofence
        </span>
        {showRoute && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-semibold text-emerald-300 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ETA: {eta} ({distance})
          </span>
        )}
      </div>

      {/* Layer Toggle Switch */}
      <div className="absolute top-3 right-3 z-10 flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/70 p-1 rounded-xl shadow-md text-xs">
        <button
          type="button"
          onClick={() => setMapMode('traffic')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${mapMode === 'traffic' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Street
        </button>
        <button
          type="button"
          onClick={() => setMapMode('satellite')}
          className={`px-2.5 py-1 rounded-lg transition-all font-medium ${mapMode === 'satellite' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Satellite
        </button>
      </div>

      {/* Pin 1: Source / Caterer Location */}
      <div className="absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="relative group/pin cursor-pointer">
          <div className="absolute -inset-2 bg-emerald-400/30 rounded-full animate-ping pointer-events-none" />
          <div className="relative w-10 h-10 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110">
            <Building2 className="w-5 h-5" />
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-md text-white text-xs shadow-xl pointer-events-none text-center">
            <p className="font-semibold text-emerald-400 text-xs truncate">{sourceName}</p>
            <p className="text-[11px] text-slate-300 truncate">{sourceAddress}</p>
            <span className="text-[10px] text-emerald-300 font-medium inline-block mt-0.5">Surplus Ready</span>
          </div>
        </div>
        <span className="mt-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-[11px] font-medium text-slate-200 whitespace-nowrap shadow-sm">
          Food Source
        </span>
      </div>

      {/* Pin 2: Moving Volunteer Transit (if active) */}
      {showTransitVehicle && (
        <div className="absolute top-[44%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center animate-subtle-pulse">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
              <Truck className="w-4 h-4 animate-bounce" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-slate-900"></div>
          </div>
          <span className="mt-1 px-2 py-0.5 rounded-md bg-blue-950/90 border border-blue-500/50 text-[10px] font-semibold text-blue-300 whitespace-nowrap shadow-sm">
            Volunteer Driver En Route
          </span>
        </div>
      )}

      {/* Pin 3: Destination NGO / Community Center */}
      {showRoute && (
        <div className="absolute top-[68%] left-[72%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <div className="relative group/pin cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110">
              <HeartHandshake className="w-5 h-5" />
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-md text-white text-xs shadow-xl pointer-events-none text-center">
              <p className="font-semibold text-blue-400 text-xs truncate">{destinationName}</p>
              <p className="text-[11px] text-slate-300 truncate">{destinationAddress}</p>
              <span className="text-[10px] text-blue-300 font-medium inline-block mt-0.5">Community Drop-off</span>
            </div>
          </div>
          <span className="mt-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 text-[11px] font-medium text-slate-200 whitespace-nowrap shadow-sm">
            NGO Beneficiary Shelter
          </span>
        </div>
      )}

      {/* Bottom Bar Info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-xs text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60">
        <div className="flex items-center gap-2 truncate">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">Geofenced temperature-safe dispatch zone</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Compass className="w-3.5 h-3.5 text-slate-400 animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-slate-300 text-[11px]">Radius: 5.0 km</span>
        </div>
      </div>
    </div>
  );
}
