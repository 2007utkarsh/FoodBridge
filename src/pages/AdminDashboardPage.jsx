import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import LeafletMapView from '../components/common/LeafletMapView';
import {
  ShieldCheck,
  Building2,
  HeartHandshake,
  Truck,
  RotateCcw,
  Sparkles,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileCheck,
  TrendingUp,
  Activity,
  Boxes
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    metrics,
    facilities,
    activeRoutes,
    redistributions,
    resetDemoData,
    navigateTo
  } = useFoodBridge();

  // The 7 Required Metrics for Admin Dashboard:
  // - Total Sources
  // - Total NGOs
  // - Active Surplus
  // - Active Requests
  // - Completed Redistributions
  // - Food Rescued
  // - Food Waste Diverted
  const adminStats = {
    totalSources: facilities.sources.length, // 4
    totalNgos: metrics.ngosConnected, // 12
    activeSurplus: 6,
    activeRequests: redistributions.filter(r => r.stage < 6).length, // 3
    completedRedistributions: metrics.successfulRedistributions, // 47
    foodRescued: metrics.foodRescuedKg, // 386 kg
    foodWasteDiverted: metrics.wasteDivertedKg // 386 kg
  };

  const auditLogs = [
    { time: '14:45 Today', event: 'Driver Rameshwar Yadav assigned to RED-501 (30kg Rice)', type: 'dispatch' },
    { time: '14:28 Today', event: 'Hope Food Bank confirmed pickup SLA for RED-501', type: 'match' },
    { time: '14:15 Today', event: 'Smart Surplus detected at Apex Campus: 30kg excess Basmati', type: 'ai' },
    { time: '13:15 Today', event: 'Handover PIN 1923 verified for RED-504 by Sanjeevani Care', type: 'handover' },
    { time: '12:10 Today', event: 'RED-503 (85kg Rotis/Dal) marked DELIVERED to Asha Kiran Shelter', type: 'success' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Central Platform Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Ecosystem monitoring, redistribution network oversight, and sustainability audits.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetDemoData}
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo State</span>
          </button>

          <button
            onClick={() => navigateTo('sustainability-impact')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-purple-600/20"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Sustainability Impact</span>
          </button>
        </div>
      </div>

      {/* The 7 Exact Requested Metric Cards:
          - Total Sources
          - Total NGOs
          - Active Surplus
          - Active Requests
          - Completed Redistributions
          - Food Rescued
          - Food Waste Diverted */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {/* Metric 1: Total Sources */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Sources</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{adminStats.totalSources}</div>
          <div className="text-[10px] text-slate-500">Messes & Kitchens</div>
        </div>

        {/* Metric 2: Total NGOs */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total NGOs</div>
          <div className="text-2xl font-black text-teal-700 mt-1">{adminStats.totalNgos}</div>
          <div className="text-[10px] text-teal-600">Shelters & Banks</div>
        </div>

        {/* Metric 3: Active Surplus */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Active Surplus</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{adminStats.activeSurplus} Lots</div>
          <div className="text-[10px] text-amber-700">Available to claim</div>
        </div>

        {/* Metric 4: Active Requests */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Active Requests</div>
          <div className="text-2xl font-black text-blue-700 mt-1">{adminStats.activeRequests}</div>
          <div className="text-[10px] text-blue-600">In pickup / delivery</div>
        </div>

        {/* Metric 5: Completed Redistributions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Completed Redistributions</div>
          <div className="text-2xl font-black text-purple-700 mt-1">{adminStats.completedRedistributions}</div>
          <div className="text-[10px] text-purple-600">Successful Handovers</div>
        </div>

        {/* Metric 6: Food Rescued */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="text-[10px] font-bold text-emerald-800 uppercase">Food Rescued</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{adminStats.foodRescued} kg</div>
          <div className="text-[10px] text-emerald-700">Prevented waste</div>
        </div>

        {/* Metric 7: Food Waste Diverted */}
        <div className="bg-white p-4 rounded-2xl border border-cyan-200 bg-cyan-50/20 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-cyan-800 uppercase">Food Waste Diverted</div>
          <div className="text-2xl font-black text-cyan-600 mt-1">{adminStats.foodWasteDiverted} kg</div>
          <div className="text-[10px] text-cyan-700">Zero municipal dump</div>
        </div>
      </div>

      {/* Geospatial Map: Sources + NGOs + Active Redistribution Routes */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Leaflet / OpenStreetMap Grid</span>
            </div>
            <h2 className="text-lg font-black text-slate-900 mt-0.5">
              Sources + NGOs + Active Redistribution Routes
            </h2>
            <p className="text-xs text-slate-500">Live operational overview displaying all food sources, verified recipient NGOs, and active route polylines.</p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <span>Sources ({facilities.sources.length})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <span>NGOs ({facilities.ngos.length})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Active Routes ({activeRoutes.length})</span>
            </span>
          </div>
        </div>

        <LeafletMapView
          center={[28.6139, 77.2090]}
          zoom={12}
          height="520px"
          sources={facilities.sources}
          ngos={facilities.ngos}
          activeRoutes={activeRoutes}
        />
      </div>

      {/* Grid: Sources & NGOs Directory + Real-Time Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sources & NGOs Directory */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Registered Institutional Sources</h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
              FSSAI Verified
            </span>
          </div>

          <div className="space-y-3">
            {facilities.sources.map((src) => (
              <div
                key={src.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{src.name}</div>
                  <div className="text-[11px] text-slate-500">{src.type} &bull; {src.manager}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {src.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{src.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time System Audit Event Log */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">System Audit Log</h3>
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Chain of Custody</span>
            </span>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 text-xs flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{log.event}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{log.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
