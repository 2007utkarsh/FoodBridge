import React, { useState } from 'react';
import {
  Route,
  Truck,
  MapPin,
  Clock,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  HeartHandshake,
  TrendingDown,
  Navigation,
  Compass
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import MapPlaceholder from '../components/common/MapPlaceholder';

export default function LogisticsOptimizerView() {
  const { navigateTo, showToast } = useFoodBridge();

  const [algorithm, setAlgorithm] = useState('genetic_vrptw');
  const [avoidTraffic, setAvoidTraffic] = useState(true);
  const [coldChainPriority, setColdChainPriority] = useState(true);

  // Simulated optimization results
  const routeStops = [
    {
      seq: 1,
      type: 'pickup',
      name: 'Royal Mirage Banquets (Donor)',
      address: 'Gate 3, Sector 18',
      payload: '+55 kg (Hot-held Meals)',
      eta: '18:15',
      timeWindow: 'Before 19:30',
      slaStatus: 'Comfortable'
    },
    {
      seq: 2,
      type: 'pickup',
      name: 'The Grand Pavilion Hotel (Donor)',
      address: 'Diplomatic Enclave Drive',
      payload: '+42 kg (Boxed Salads)',
      eta: '18:35',
      timeWindow: 'Before 20:00',
      slaStatus: 'Comfortable'
    },
    {
      seq: 3,
      type: 'drop',
      name: 'Feed The Hope Community Kitchen (NGO)',
      address: 'Kidwai Nagar Shelter',
      payload: '-55 kg Handover (160 Meals)',
      eta: '18:55',
      timeWindow: 'Before 19:45',
      slaStatus: 'Target Met'
    },
    {
      seq: 4,
      type: 'drop',
      name: 'Robin Hood Relief Hub (NGO)',
      address: 'Sector 4 Shelter Center',
      payload: '-42 kg Handover (120 Meals)',
      eta: '19:15',
      timeWindow: 'Before 20:30',
      slaStatus: 'Target Met'
    }
  ];

  const handleRunOptimizer = () => {
    showToast('AI Genetic VRPTW solver executed in 64ms. Multi-stop route bundle synchronized!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capability 4: Smart Logistics & Multi-Stop AI Routing
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
              Algorithm: VRPTW + Genetic Multi-Constraint Heuristic
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            AI Transportation & Delivery Route Optimization
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Bundle fragmented surplus pickups into high-efficiency clusters while honoring strict hot/cold chain shelf-life constraints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunOptimizer}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Re-Run AI Route Solver</span>
          </button>
        </div>
      </div>

      {/* Comparison KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Total Route Distance</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">14.8</span>
            <span className="text-xs font-bold text-slate-500">km</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-45% vs unbundled trips (27.2 km)</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Cumulative Turnaround Time</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-700">60</span>
            <span className="text-xs font-bold text-slate-500">mins</span>
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-1">
            Saved 32 minutes of food thermal exposure
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Transit Carbon Emissions</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-blue-700">3.4</span>
            <span className="text-xs font-bold text-slate-500">kg CO₂</span>
          </div>
          <p className="text-xs text-blue-600 font-bold mt-1">
            -42% Fleet Fuel Consumption
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">SLA Compliance Probability</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-purple-700">99.4%</span>
          </div>
          <p className="text-xs text-purple-700 font-bold mt-1">
            Zero temperature drop violations
          </p>
        </div>
      </div>

      {/* Main Grid: Left Solver Parameters & Waypoints + Right Multi-Node Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Constraints & Waypoints (1 Col) */}
        <div className="space-y-6">
          {/* Solver Controls */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Zap className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-900 text-sm">Optimization Heuristics</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Routing Algorithm</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                >
                  <option value="genetic_vrptw">Genetic Multi-Stop VRPTW (Recommended)</option>
                  <option value="clarke_wright">Clarke-Wright Savings Heuristic</option>
                  <option value="greedy_time">Dynamic Real-Time Greedy Dijkstra</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Cold Chain Shelf-Life Priority</span>
                <input
                  type="checkbox"
                  checked={coldChainPriority}
                  onChange={(e) => setColdChainPriority(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Dynamic Live Congestion Avoidance</span>
                <input
                  type="checkbox"
                  checked={avoidTraffic}
                  onChange={(e) => setAvoidTraffic(e.target.checked)}
                  className="w-4 h-4 accent-purple-600"
                />
              </div>
            </div>
          </div>

          {/* Sequence Waypoints */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Automated Dispatch Sequence</h3>

            <div className="space-y-4">
              {routeStops.map((stop) => (
                <div key={stop.seq} className="flex items-start gap-3 text-xs">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-white shrink-0 mt-0.5 ${
                    stop.type === 'pickup' ? 'bg-emerald-600' : 'bg-blue-600'
                  }`}>
                    {stop.seq}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900">{stop.name}</h4>
                      <span className="font-mono font-bold text-slate-700">{stop.eta}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{stop.address}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className={`font-semibold ${stop.type === 'pickup' ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {stop.payload}
                      </span>
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded font-medium">
                        {stop.slaStatus}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Stop Route Map & Vehicle Fleet (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Bundled Multi-Stop Route Map</h3>
                <p className="text-xs text-slate-500">Live coordinates connecting 2 pickup hubs with 2 community drop-offs</p>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Van #DL-08-C-4521 Dispatched
              </span>
            </div>

            <MapPlaceholder
              sourceName="Royal Mirage & Grand Pavilion (Pickups)"
              sourceAddress="Sector 18 & Diplomatic Enclave"
              destinationName="Kidwai Nagar & Sec-4 Shelters (Drops)"
              destinationAddress="Distribution Hubs"
              height="h-96"
              showRoute={true}
              showTransitVehicle={true}
              eta="60 mins total"
              distance="14.8 km"
            />

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200/80 flex items-start gap-3 text-xs text-purple-900">
              <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Thermal SLA Enforced</p>
                <p className="mt-0.5 leading-relaxed">
                  Both cooked hot food lots will reach beneficiary kitchens 35 minutes before the critical 4-hour microbial threshold, ensuring 100% consumption safety.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
