import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Sparkles,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingDown,
  Layers,
  Thermometer,
  ShieldAlert,
  CheckCircle2,
  Filter
} from 'lucide-react';

export default function SmartSurplusAnalysisPage() {
  const { surplusAnalysis, navigateTo } = useFoodBridge();
  const [urgencyFilter, setUrgencyFilter] = useState('All');

  const filteredAnalysis = surplusAnalysis.filter(item => {
    if (urgencyFilter === 'All') return true;
    return item.urgency === urgencyFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Predictive Surplus Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Smart Surplus Analysis Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Automated detection compares current preparation stocks against expected diner requirements, calculating surplus volumes, time urgency, and actionable recovery recommendations.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => navigateTo('smart-matching')}
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Proceed to AI Matching</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Highlighted Analysis Callout (as specified in prompt) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-3xl p-6 border-2 border-amber-300 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[11px] font-bold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>Priority Detection Case Study</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Farm-Fresh Tomatoes &bull; 12 kg Surplus Detected
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 mt-1">
              <span>Current Stock: <b className="text-slate-900">30 kg</b></span>
              <span>&bull;</span>
              <span>Expected Requirement: <b className="text-slate-900">18 kg</b></span>
              <span>&bull;</span>
              <span>Surplus: <b className="text-amber-800">12 kg</b></span>
              <span>&bull;</span>
              <span>Time Remaining: <b className="text-rose-700">4 hours</b></span>
            </div>
            <div className="mt-2 text-xs font-bold text-emerald-900 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 inline-block">
              🎯 AI Recommendation: <span className="text-emerald-700 font-extrabold">Redistribute surplus immediately</span> to community kitchens or divert to sauce production unit.
            </div>
          </div>

          <button
            onClick={() => navigateTo('smart-matching', { surplusId: 'SUR-103' })}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 shadow-md shadow-amber-600/20 flex items-center gap-2"
          >
            <span>Match Tomato Batch</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Active Surplus Evaluations ({filteredAnalysis.length})
        </div>
        <div className="flex items-center gap-2">
          {['All', 'Urgent', 'Medium'].map((tab) => (
            <button
              key={tab}
              onClick={() => setUrgencyFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                urgencyFilter === tab
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAnalysis.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-4 relative"
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{item.item}</h3>
                <div className="text-xs text-slate-500">{item.sourceFacility}</div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                item.urgency === 'Urgent'
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {item.urgency} Urgency
              </span>
            </div>

            {/* Core Comparative Metrics (Item, Current, Expected, Surplus, Time Remaining) */}
            <div className="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Current</div>
                <div className="text-xs font-bold text-slate-800">{item.currentQty} {item.unit}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Expected</div>
                <div className="text-xs font-bold text-slate-800">{item.expectedRequirement} {item.unit}</div>
              </div>
              <div className="bg-amber-100/60 rounded-xl py-1">
                <div className="text-[10px] text-amber-800 font-semibold">Surplus</div>
                <div className="text-xs font-black text-amber-900">+{item.surplusQty} {item.unit}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Remaining</div>
                <div className="text-xs font-bold text-rose-700">{item.timeRemaining}</div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
              <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>AI Recommendation:</span>
              </div>
              <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                "{item.aiRecommendation}"
              </p>
            </div>

            {/* Spoilage Risk & Safe Storage */}
            <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span>Safe Storage Temp:</span>
                <span className="font-bold text-slate-700">{item.storageSafeTemp}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Risk Factor:</span>
                <span className="text-rose-700 font-medium">{item.riskLevel}</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('smart-matching', { surplusId: item.matchedItemRef })}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <span>Trigger AI Recipient Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
