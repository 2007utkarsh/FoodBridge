import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Boxes,
  PlusCircle,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  List,
  MapPin,
  Building2
} from 'lucide-react';
import SurplusCard from '../components/common/SurplusCard';

/**
 * My Surplus Page
 * Shows all surplus food registered by the Food Source.
 * Displays:
 * - Food
 * - Quantity
 * - Posted At
 * - Available Until
 * - Status (Available)
 * - Matching Status (Waiting for Match)
 *
 * Example:
 * Cooked Rice | 30 kg | Today 6:10 PM | 10:00 PM | Available | Waiting for Match
 * Vegetables | 15 kg | Today 5:20 PM | 11:00 PM | Available | Waiting for Match
 */
export default function MySurplusPage() {
  const { mySurplusList, navigateTo } = useFoodBridge();
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Boxes className="w-3.5 h-3.5" />
            <span>Food Source Surplus Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            My Registered Surplus
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            All surplus food lots posted from your kitchen, currently available for matching in the redistribution network.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'cards' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-emerald-700' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => navigateTo('register-surplus')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Surplus Food</span>
          </button>
        </div>
      </div>

      {/* Status Flow Indicator Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400">Current Status Flow:</span>
          <span className="text-slate-300">
            Inventory &rarr; Surplus Detected &rarr; Registered &rarr; <b className="text-white">Available for Matching</b> &rarr; Waiting for NGO Match
          </span>
        </div>
        <span className="text-xs font-bold text-emerald-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
          {mySurplusList.length} Active Surplus Lots
        </span>
      </div>

      {/* Render View: Cards or Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mySurplusList.map((item) => (
            <SurplusCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Food</th>
                  <th className="py-4 px-4">Quantity</th>
                  <th className="py-4 px-4">Posted At</th>
                  <th className="py-4 px-4">Available Until</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Matching Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mySurplusList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* 1. Food */}
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>{item.foodName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.foodCategory} &bull; {item.location}</div>
                    </td>

                    {/* 2. Quantity */}
                    <td className="py-4 px-4 font-extrabold text-slate-800">
                      {item.quantity} {item.unit || 'kg'}
                    </td>

                    {/* 3. Posted At */}
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {item.postedAt}
                    </td>

                    {/* 4. Available Until */}
                    <td className="py-4 px-4 font-bold text-rose-700">
                      {item.availableUntil}
                    </td>

                    {/* 5. Status */}
                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{item.status || 'Available'}</span>
                      </span>
                    </td>

                    {/* 6. Matching Status */}
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span>{item.matchingStatus || 'Waiting for Match'}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
