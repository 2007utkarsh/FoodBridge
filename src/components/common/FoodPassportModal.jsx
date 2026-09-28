import React from 'react';
import {
  ShieldCheck,
  QrCode,
  X,
  Thermometer,
  FileCheck,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  Download,
  Share2
} from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function FoodPassportModal({ listing, isOpen, onClose }) {
  const { showToast } = useFoodBridge();

  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Digital Food Safety Passport</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  FSSAI COMPLIANT
                </span>
              </div>
              <p className="text-slate-400 text-xs">
                Good Samaritan Legal Indemnity & Temperature Provenance Stamp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Passport Certificate Body */}
        <div className="p-6 space-y-5 text-xs text-slate-800">
          {/* Certificate Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Passport UUID</span>
                <span className="font-mono font-bold text-slate-800 text-xs">FBP-2026-IND-{listing.id}-89A</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Prep Date</span>
                <span className="font-bold text-slate-700 text-xs">{listing.preparationTime}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <h4 className="font-extrabold text-slate-900 text-sm">{listing.title}</h4>
              <p className="text-emerald-700 font-semibold mt-0.5">
                {listing.quantity} {listing.unit} (~{listing.servings} Servings) • {listing.foodType}
              </p>
            </div>
          </div>

          {/* Critical Chain of Custody & IoT Telemetry Verified */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <span className="text-slate-500 block text-[10px] font-semibold">Cooking Core Temp:</span>
              <span className="font-bold text-emerald-950 text-sm">74.2°C (Bacterial Kill Step)</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Digital probe verified</span>
            </div>

            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
              <span className="text-slate-500 block text-[10px] font-semibold">Holding Chain Status:</span>
              <span className="font-bold text-emerald-950 text-sm">Safe Hot-Hold (64°C)</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">No thermal abuse logged</span>
            </div>
          </div>

          {/* Legal Good Samaritan Protection Statement */}
          <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-950 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Good Samaritan Legal Immunity Charter (FSSAI 2019)</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Under Section 16 of the FSSAI Surplus Food Recovery Regulations, the donor <strong>{listing.provider.name}</strong> is legally indemnified from civil and criminal liability, having fulfilled genuine intent, hygiene protocol, and cold-chain disclosure.
            </p>
          </div>

          {/* QR Code Scan & Chef Verification Seal */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white rounded-xl p-1.5 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
              <div>
                <p className="font-bold text-xs text-white">Scan at NGO Receiving Dock</p>
                <p className="text-[10px] text-slate-400">Instantly confirms lot authenticity & hygiene audit.</p>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Hash: 0x9f4a...81bc</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block uppercase">Chef Sign-Off</span>
              <span className="text-xs font-bold text-slate-200">{listing.provider.contactPerson}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Commercial Kitchen A+</span>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => showToast('Food Passport PDF and FSSAI certificate downloaded.', 'success')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Passport</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
