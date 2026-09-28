import React from 'react';
import { CheckCircle2, ArrowRight, PlusCircle, Sparkles, Clock, MapPin, Layers } from 'lucide-react';

/**
 * Reusable SuccessMessage Component
 * Confirmation after registering surplus:
 * - "Surplus Food Registered Successfully"
 * - Details: Food, Quantity, Status ("Available for Matching"), Available Until
 * - Message: "Your surplus food has been added to the redistribution network."
 * - Buttons: "View My Surplus", "Register Another"
 */
export default function SuccessMessage({
  data = {},
  onViewMySurplus = null,
  onRegisterAnother = null
}) {
  const food = data.foodName || 'Cooked Rice';
  const quantity = `${data.quantity || 30} ${data.unit || 'kg'}`;
  const status = data.status || 'Available for Matching';
  const availableUntil = data.availableUntil || '10:00 PM';
  const location = data.location || 'ABC Institutional Kitchen';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-xl max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      {/* Top Icon & Heading */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surplus Intake Confirmed</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Surplus Food Registered Successfully
        </h2>

        <p className="text-sm font-semibold text-emerald-800 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
          Your surplus food has been added to the redistribution network.
        </p>
      </div>

      {/* Structured Details Card:
          Food: Cooked Rice
          Quantity: 30 kg
          Status: Available for Matching
          Available Until: 10:00 PM */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200 pb-2">
          Registered Food Batch Details
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Food:</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{food}</span>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Quantity:</span>
            <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">{quantity}</span>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Status:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{status}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 font-semibold block text-[10px] uppercase">Available Until:</span>
            <span className="font-bold text-rose-700 text-sm mt-0.5 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-600" />
              <span>{availableUntil}</span>
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>Location: <b>{location}</b></span>
        </div>
      </div>

      {/* Buttons: "View My Surplus" & "Register Another" */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={onViewMySurplus}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
        >
          <span>View My Surplus</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onRegisterAnother}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
        >
          <PlusCircle className="w-4 h-4 text-emerald-600" />
          <span>Register Another</span>
        </button>
      </div>
    </div>
  );
}
