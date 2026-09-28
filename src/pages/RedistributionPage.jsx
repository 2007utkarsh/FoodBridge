import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  ShieldCheck,
  Building2,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function RedistributionPage() {
  const {
    redistributions,
    selectedRedistributionId,
    setSelectedRedistributionId,
    advanceRedistributionStage,
    navigateTo
  } = useFoodBridge();

  const currentRedistribution = redistributions.find(r => r.id === selectedRedistributionId) || redistributions[0];

  const stages = [
    { num: 1, title: 'Available', key: 'availableAt', desc: 'Surplus registered by source kitchen' },
    { num: 2, title: 'Requested', key: 'requestedAt', desc: 'NGO submitted claim request' },
    { num: 3, title: 'Accepted', key: 'acceptedAt', desc: 'Mutual confirmation & matching' },
    { num: 4, title: 'Pickup Assigned', key: 'pickupAssignedAt', desc: 'Vehicle & driver allocated' },
    { num: 5, title: 'Picked Up', key: 'pickedUpAt', desc: 'Food loaded & temperature verified' },
    { num: 6, title: 'Delivered', key: 'deliveredAt', desc: 'Handover complete at shelter dining' }
  ];

  const currentStageNum = currentRedistribution?.stage || 3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>6-Stage Redistribution Chain</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Redistribution & Handover Lifecycle
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent chain-of-custody tracking from institutional kitchen dispatch to verified recipient handover.
          </p>
        </div>

        {/* Advance Stage Simulation Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => advanceRedistributionStage(currentRedistribution.id)}
            disabled={currentStageNum >= 6}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
              currentStageNum >= 6
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            <span>{currentStageNum >= 6 ? 'Redistribution Completed' : 'Simulate Next Stage →'}</span>
          </button>

          <button
            onClick={() => navigateTo('logistics-map')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>View Live Route</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: 6-Stage Stepper View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Stepper Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
            {/* Request Summary Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Request #{currentRedistribution.id}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-0.5">
                  {currentRedistribution.foodItem} &bull; {currentRedistribution.quantity}
                </h2>
                <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                  <span>From: <b className="text-slate-800">{currentRedistribution.sourceFacility}</b></span>
                  <span>&rarr;</span>
                  <span>To: <b className="text-teal-800">{currentRedistribution.recipientNgo}</b></span>
                </div>
              </div>

              {/* Handover PIN Display */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl text-center shrink-0 border border-slate-800">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase">
                  <KeyRound className="w-3 h-3" />
                  <span>Handover PIN</span>
                </div>
                <div className="text-2xl font-black font-mono tracking-widest text-white mt-0.5">
                  {currentRedistribution.pinCode || '5912'}
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">Show driver at pickup</div>
              </div>
            </div>

            {/* Visual 6-Stage Stepper Horizontal / Vertical */}
            <div className="space-y-6">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Audit Timeline Progress (Stage {currentStageNum} of 6)
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-8">
                {stages.map((stage) => {
                  const isCompleted = stage.num < currentStageNum;
                  const isCurrent = stage.num === currentStageNum;
                  const isFuture = stage.num > currentStageNum;
                  const timestamp = currentRedistribution.timestamps?.[stage.key] || '--';

                  return (
                    <div key={stage.num} className="relative">
                      {/* Step Circle Pin */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-700 ring-4 ring-emerald-500/20 animate-pulse'
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : stage.num}
                      </div>

                      {/* Step Details */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-bold ${
                              isCurrent ? 'text-emerald-800' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                              {stage.num}. {stage.title}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Current Active Stage
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`text-xs font-semibold ${
                            isFuture ? 'text-slate-300' : 'text-slate-600'
                          }`}>
                            {timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Handover Transport & Safety Notes */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
              <div className="font-bold text-slate-700">Special Handling Instructions:</div>
              <p className="text-slate-600 leading-relaxed">
                {currentRedistribution.notes || 'Ensure insulated thermal transport with temperature monitoring above 60°C.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Other Active Handover Requests */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">All Redistribution Requests</h3>
            <p className="text-xs text-slate-500">Select any record to view its complete 6-stage lifecycle:</p>

            <div className="space-y-3">
              {redistributions.map((red) => {
                const isSelected = red.id === currentRedistribution.id;
                return (
                  <div
                    key={red.id}
                    onClick={() => setSelectedRedistributionId(red.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{red.foodItem}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        red.stage === 6 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        Stage {red.stage}/6
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {red.quantity} &bull; {red.recipientNgo}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>Status: {red.status}</span>
                      <span className="font-mono font-bold text-slate-700">PIN: {red.pinCode}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
