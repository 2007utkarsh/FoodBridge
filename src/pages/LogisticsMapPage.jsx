import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import LeafletMapView from '../components/common/LeafletMapView';
import {
  MapPin,
  Truck,
  Clock,
  Thermometer,
  ShieldCheck,
  Building2,
  HeartHandshake,
  ArrowRight,
  Phone,
  Navigation,
  CheckCircle2,
  Layers
} from 'lucide-react';

export default function LogisticsMapPage() {
  const { facilities, activeRoutes, navigateTo } = useFoodBridge();
  const [selectedRouteId, setSelectedRouteId] = useState(activeRoutes[0]?.id || 'ROUTE-501');

  const currentRoute = activeRoutes.find(r => r.id === selectedRouteId) || activeRoutes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <Navigation className="w-3.5 h-3.5" />
            <span>OpenStreetMap Geospatial Logistics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Map & Logistics Optimization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time route navigation, temperature-controlled cold chain tracking, and verified destination handovers.
          </p>
        </div>

        {/* Route Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-500 pl-2">Active Route:</span>
          <select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-white px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {activeRoutes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.distanceKm} km)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 Metric Cards for Active Route: Distance, Travel Time, Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Transit Distance</div>
            <div className="text-2xl font-black text-slate-900 mt-0.5">{currentRoute.distanceKm} km</div>
            <div className="text-[11px] text-slate-500">Shortest arterial route</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Estimated Travel Time</div>
            <div className="text-2xl font-black text-teal-700 mt-0.5">{currentRoute.travelTimeMins} mins</div>
            <div className="text-[11px] text-teal-600 font-medium">Real-time traffic adjusted</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Preservation Deadline</div>
            <div className="text-2xl font-black text-rose-700 mt-0.5">{currentRoute.pickupDeadline}</div>
            <div className="text-[11px] text-rose-600 font-medium">Within safe HACCP limits</div>
          </div>
        </div>
      </div>

      {/* Main Map Container with Leaflet & In-Transit Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaflet Map Column (Span 2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
            <LeafletMapView
              center={currentRoute.sourceCoords}
              zoom={13}
              height="480px"
              sources={facilities.sources}
              ngos={facilities.ngos}
              activeRoutes={activeRoutes}
              selectedRouteId={selectedRouteId}
            />
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between px-2">
            <span>Powered by OpenStreetMap data &bull; Tile layer updated</span>
            <span className="font-semibold text-emerald-700">✓ Waypoints polyline active</span>
          </div>
        </div>

        {/* Dispatch & Driver Details Column */}
        <div className="space-y-6">
          {/* Driver & Cold-Chain Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900">Assigned Transit Unit</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {currentRoute.status}
              </span>
            </div>

            {/* Driver Profile */}
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Driver / Carrier</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{currentRoute.driver.name}</div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentRoute.driver.phone}</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400 font-semibold">Vehicle Specification</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{currentRoute.driver.vehicle}</div>
                <div className="text-[11px] text-slate-500">{currentRoute.driver.vehicleType}</div>
              </div>

              {/* Temperature Telemetry */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time Compartment Temp:</span>
                  </span>
                  <span className="text-xs font-black text-emerald-700 font-mono">
                    {currentRoute.driver.currentTemp}
                  </span>
                </div>
              </div>
            </div>

            {/* Origin & Destination Waypoints */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Route Endpoints
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-emerald-700 font-bold uppercase">Pickup Origin</div>
                  <div className="font-bold text-slate-900 mt-0.5">{currentRoute.sourceName}</div>
                  <div className="text-[11px] text-slate-500">North Campus Institutional Corridor</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-teal-700 font-bold uppercase">Destination NGO</div>
                  <div className="font-bold text-slate-900 mt-0.5">{currentRoute.destinationName}</div>
                  <div className="text-[11px] text-slate-500">Sector 7 Community Kitchen & Shelter</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('redistribution-lifecycle', { redistributionId: currentRoute.redistributionId })}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>View Handover Stepper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
