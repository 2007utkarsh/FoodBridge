import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Zap,
  TrendingDown,
  TrendingUp,
  Cpu,
  Gauge,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Flame,
  ArrowRight,
  ShieldAlert,
  Wrench
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export default function ProcessingEfficiencyView() {
  const { showToast } = useFoodBridge();

  const [activeFacility, setActiveFacility] = useState('commissary_kitchen');

  const inefficiencies = [
    {
      id: 'INEFF-01',
      title: 'Walk-In Chiller #2 Compressor Energy Surge & Door Gasket Leak',
      category: 'Excessive Energy & Storage Hazard',
      severity: 'Critical',
      severityColor: 'rose',
      metric: '+28% kWh Power Draw',
      costImpact: '₹4,800 / week excess electricity',
      rootCause: 'Door magnetic seal worn out; ambient warm air ingress causing compressor continuous run-time.',
      recommendedAction: 'Replace silicone door gasket (Work order #WO-402 auto-dispatched).'
    },
    {
      id: 'INEFF-02',
      title: 'Vegetable Prep Line #1 Excessive Trimming & Peeling Waste',
      category: 'Raw Material Loss',
      severity: 'Medium',
      severityColor: 'amber',
      metric: '6.4% Waste (Target: <3.5%)',
      costImpact: '₹3,200 / day raw vegetable loss',
      rootCause: 'Peeler blade calibration drift peeling 2.8mm skin thickness instead of standard 1.1mm.',
      recommendedAction: 'Recalibrate automated peeling roller gauge.'
    },
    {
      id: 'INEFF-03',
      title: 'Lunch Shift Overproduction Discrepancy',
      category: 'Overproduction Inefficiency',
      severity: 'High',
      severityColor: 'amber',
      metric: '+18.5% Cooked Meal Surplus',
      costImpact: '₹14,500 unconsumed prep cost',
      rootCause: 'Kitchen prep supervisor utilized legacy student registry rather than AI demand forecast.',
      recommendedAction: 'Sync batch sheet to automated AI Demand Forecast schedule.'
    },
    {
      id: 'INEFF-04',
      title: 'Commercial Steam Kettle #4 Pressure Valve Downtime',
      category: 'Machine Downtime',
      severity: 'Low',
      severityColor: 'blue',
      metric: '42 mins delayed prep batch',
      costImpact: 'Shift schedule bottleneck',
      rootCause: 'Limescale buildup on pressure release sensor.',
      recommendedAction: 'Descaling cycle scheduled for post-shift sanitization.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capabilities 5 & 6: Processing Monitoring & Inefficiency Detection
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
              Real-Time Statistical Process Control (SPC)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Kitchen Processing Efficiency & Inefficiency Detector
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pinpoint root causes of food loss: overproduction, trimming waste, machine breakdown, and high energy draw.
          </p>
        </div>

        <button
          onClick={() => showToast('Predictive maintenance audit triggered across all cold rooms and kitchen machinery.', 'info')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
        >
          <Wrench className="w-4 h-4 text-emerald-400" />
          <span>Trigger Plant Diagnostic</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Overall Processing Yield (OEE)</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900">92.4%</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-700 font-bold mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% since AI calibration</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Raw Material Trimming Loss</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-amber-600">4.1%</span>
          </div>
          <p className="text-xs text-amber-700 font-medium mt-1">
            Target threshold: &lt; 3.5%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Overproduction Waste Factor</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-emerald-700">2.8%</span>
          </div>
          <p className="text-xs text-emerald-700 font-bold mt-1">
            Down from 14.5% baseline
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block">Compressor Energy Efficiency</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-blue-700">0.42</span>
            <span className="text-xs font-bold text-slate-500">kWh / kg</span>
          </div>
          <p className="text-xs text-blue-600 font-bold mt-1">
            1 chiller alert detected
          </p>
        </div>
      </div>

      {/* Detected Inefficiencies List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Active Operational Inefficiency Anomaly Feed</h3>
            <p className="text-xs text-slate-500">Real-time alerts generated by weigh-scale and IoT power meters</p>
          </div>
          <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
            {inefficiencies.length} Anomalies Logged
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {inefficiencies.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">{item.category}</span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    item.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-800'
                      : item.severity === 'High'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Telemetry Deviation</span>
                  <span className="font-bold text-rose-700 text-sm mt-0.5 block">{item.metric}</span>
                  <span className="text-slate-500 text-[11px]">{item.costImpact}</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl sm:col-span-2">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Root Cause Analysis</span>
                  <p className="text-slate-700 text-xs mt-0.5">{item.rootCause}</p>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/70 flex items-center justify-between text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>AI Action:</strong> {item.recommendedAction}</span>
                </div>
                <button
                  onClick={() => showToast(`Work order executed for ${item.id}`, 'success')}
                  className="px-3 py-1 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 text-[11px] shrink-0 ml-2"
                >
                  Resolve Inefficiency
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
