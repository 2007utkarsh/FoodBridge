import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Sparkles,
  Award,
  MapPin,
  Clock,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Info,
  ShieldCheck,
  Truck,
  Users,
  Building2,
  BarChart3,
  Layers
} from 'lucide-react';

export default function SmartMatchingPage() {
  const {
    matchingPool,
    selectedMatchingSurplus,
    setSelectedMatchingSurplus,
    acceptSurplusMatch,
    navigateTo
  } = useFoodBridge();

  const currentSurplus = selectedMatchingSurplus || matchingPool[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header with Mandatory Label */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Explicit Label requested: "AI-based matching prototype" */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-based matching prototype</span>
          </div>

          <span className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
            Multi-Criteria Compatibility Ranker
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Smart Matching Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Calculates a simulated AI Match Score using: Food requirement compatibility, Quantity compatibility, Distance, Recipient capacity, and Time urgency.
            </p>
          </div>

          {/* Quick Surplus Lot Selector */}
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 shrink-0">
            <div className="text-[11px] font-bold text-slate-400 mb-1.5">Select Surplus Batch:</div>
            <select
              value={currentSurplus.surplusId}
              onChange={(e) => {
                const found = matchingPool.find(m => m.surplusId === e.target.value);
                if (found) setSelectedMatchingSurplus(found);
              }}
              className="bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {matchingPool.map((pool) => (
                <option key={pool.surplusId} value={pool.surplusId}>
                  SURPLUS: {pool.foodItem} ({pool.surplusQty} {pool.unit})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 5 Factors Evaluated Banner */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>1. Requirement Fit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>2. Quantity Match</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>3. Proximity / Distance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>4. Recipient Capacity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>5. Time Urgency</span>
          </div>
        </div>
      </div>

      {/* Selected Active Surplus Banner: SURPLUS: 30 kg Rice */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Batch Under Evaluation</div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>SURPLUS: {currentSurplus.foodItem}</span>
            <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              {currentSurplus.surplusQty} {currentSurplus.unit}
            </span>
          </h2>
          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
            <span>Source: <b className="text-slate-700">{currentSurplus.sourceFacility}</b></span>
            <span>&bull;</span>
            <span>Available Until: <b className="text-slate-700">{currentSurplus.availableUntil}</b></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('food-details', { foodItem: currentSurplus })}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
          >
            Inspect Batch Quality
          </button>
        </div>
      </div>

      {/* Potential Recipients Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Potential Recipients</h3>
            <p className="text-xs text-slate-500">Evaluated by multi-criteria simulated matching engine:</p>
          </div>
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Top Rank: Recommended Recipient
          </div>
        </div>

        <div className="space-y-4">
          {currentSurplus.potentialRecipients.map((rec) => {
            const isTop = rec.isRecommended || rec.matchScore >= 90;

            return (
              <div
                key={rec.id}
                className={`bg-white rounded-3xl p-6 border transition-all ${
                  isTop
                    ? 'border-2 border-emerald-500 shadow-md ring-4 ring-emerald-500/10'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* NGO Details with Exact Requested Fields */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isTop && (
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-xs">
                          <Award className="w-3.5 h-3.5" />
                          <span>Recommended Recipient</span>
                        </span>
                      )}
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {rec.type}
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-slate-900">{rec.name}</h4>

                    {/* Exact Display Requested:
                        Distance: 2.4 km
                        Required: 25 kg
                        Capacity: 40 kg
                        Match Score: 91% */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-700 pt-1">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Distance</span>
                        <span className="text-sm font-bold text-slate-900">{rec.distanceText}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Required</span>
                        <span className="text-sm font-bold text-slate-900">{rec.requiredQty} {rec.unit}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Capacity</span>
                        <span className="text-sm font-bold text-slate-900">{rec.capacityQty} {rec.unit}</span>
                      </div>

                      <div className={`p-2.5 rounded-xl border ${
                        isTop ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Match Score</span>
                        <span className={`text-base font-black ${
                          isTop ? 'text-emerald-700' : 'text-slate-800'
                        }`}>
                          {rec.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="shrink-0 flex items-center gap-3 pt-2 lg:pt-0">
                    <button
                      onClick={() => acceptSurplusMatch(currentSurplus, rec)}
                      className={`px-6 py-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                        isTop
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-[1.02]'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>Accept & Handover</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Score Breakdown Bars */}
                {rec.scoreBreakdown && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Heuristic Factor Weights (Prototype Simulation):
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                          <span>Requirement Compatibility</span>
                          <b>{rec.scoreBreakdown.requirementFit}%</b>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${rec.scoreBreakdown.requirementFit}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                          <span>Quantity Fit</span>
                          <b>{rec.scoreBreakdown.quantityFit}%</b>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: `${rec.scoreBreakdown.quantityFit}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                          <span>Distance</span>
                          <b>{rec.scoreBreakdown.proximityFit}%</b>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${rec.scoreBreakdown.proximityFit}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                          <span>Recipient Capacity</span>
                          <b>{rec.scoreBreakdown.capacitySafety}%</b>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${rec.scoreBreakdown.capacitySafety}%` }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600 font-medium mb-1">
                          <span>Time Urgency</span>
                          <b>{rec.scoreBreakdown.urgencyFit}%</b>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${rec.scoreBreakdown.urgencyFit}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
