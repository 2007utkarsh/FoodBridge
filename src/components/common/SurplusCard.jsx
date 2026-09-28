import React from 'react';
import { Clock, MapPin, Sparkles, CheckCircle2, AlertCircle, Truck } from 'lucide-react';

/**
 * Reusable SurplusCard Component
 * Displays registered surplus item with:
 * - Food
 * - Quantity
 * - Posted At
 * - Available Until
 * - Status (Available)
 * - Matching Status (Waiting for Match)
 */
export default function SurplusCard({
  item = {},
  onCardClick = null
}) {
  return (
    <div
      onClick={() => onCardClick && onCardClick(item)}
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all space-y-4 cursor-pointer"
    >
      {/* Food Title & Status Badges */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            {item.foodCategory || 'Prepared Food'}
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">
            {item.foodName}
          </h3>
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Posted: <b>{item.postedAt}</b></span>
          </div>
        </div>

        {/* Status Badge: Available */}
        <div className="text-right shrink-0">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{item.status || 'Available'}</span>
          </span>
        </div>
      </div>

      {/* Structured Fields: Quantity, Available Until, Matching Status */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Quantity</span>
          <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
            {item.quantity} {item.unit || 'kg'}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Until</span>
          <span className="font-bold text-rose-700 text-xs mt-0.5 block">
            {item.availableUntil}
          </span>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Matching Status</span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span>{item.matchingStatus || 'Waiting for Match'}</span>
          </span>
        </div>
      </div>

      {/* Location & Transport Footer */}
      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="flex items-center gap-1 truncate" title={item.location}>
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{item.location}</span>
        </span>
        <span className="text-slate-400 shrink-0 font-medium">
          Pickup: {item.pickupRequired || 'Required'}
        </span>
      </div>
    </div>
  );
}
