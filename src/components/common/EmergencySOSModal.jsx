import React, { useState } from 'react';
import {
  Siren,
  X,
  AlertTriangle,
  Radio,
  Clock,
  MapPin,
  Truck,
  CheckCircle2,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function EmergencySOSModal({ isOpen, onClose }) {
  const { showToast, navigateTo } = useFoodBridge();
  const [broadcasted, setBroadcasted] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = () => {
    setBroadcasted(true);
    showToast('EMERGENCY SOS: High-priority dispatch signal broadcasted to 6 night shelters within 8 km!', 'error');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-rose-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-red-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Siren className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Midnight SOS Surplus Broadcast</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-rose-800">
                  RAPID PROTOCOL
                </span>
              </div>
              <p className="text-rose-100 text-xs">
                For late-night wedding receptions & banquets needing urgent rescue before 3:00 AM.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/20 text-rose-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-800">
          {!broadcasted ? (
            <>
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Late-Night High-Volume Rescue Protocol</span>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Triggering this will alert <strong>all verified on-call night drivers, thermal relief vans, and 24/7 homeless shelters</strong> within 8 km with priority SMS, WhatsApp, and app push pings.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block font-bold text-slate-700">Estimated Midnight Surplus Lot</label>
                <input
                  type="text"
                  readOnly
                  value="85 kg Mixed Wedding Banquet Curries & Breads (~250 Servings)"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold text-slate-800 bg-slate-50 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-semibold">Available Shelters:</span>
                  <span className="font-bold text-slate-800 text-xs">6 Night Facilities</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block font-semibold">Avg Volunteer Response:</span>
                  <span className="font-bold text-emerald-700 text-xs">Under 18 Mins</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBroadcast}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Siren className="w-4 h-4" />
                  <span>Broadcast Midnight SOS Now</span>
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 py-3 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-lg">Emergency SOS Active & Acknowledged!</h4>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Asha Kiran Relief Van #3</strong> (Driver: Mohan Lal) has accepted dispatch.
                </p>
                <p className="text-emerald-700 font-bold text-sm mt-1">ETA: 14 Minutes to Banquet Loading Bay</p>
              </div>

              <div className="p-3 bg-slate-900 text-white rounded-2xl text-xs space-y-1">
                <p className="text-slate-300">Emergency Contact: <strong>+91 98330 11200</strong></p>
                <p className="text-[11px] text-emerald-400">Handover PIN: <strong>9904</strong></p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateTo('tracking');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Track Emergency Van on GPS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
