import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, Truck, AlertTriangle, UserCheck } from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function QuickClaimModal({ listing, isOpen, onClose }) {
  const { claimListing } = useFoodBridge();
  const [transportMode, setTransportMode] = useState('Insulated Van with Hot-Boxes');
  const [contactPerson, setContactPerson] = useState('Pooja Deshmukh (Rescue Coordinator)');
  const [contactPhone, setContactPhone] = useState('+91 98101 22334');
  const [estimatedArrival, setEstimatedArrival] = useState('Within 35 minutes');
  const [notes, setNotes] = useState('We will bring our own food-grade transfer canisters.');

  if (!isOpen || !listing) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    claimListing(listing.id, {
      ngoName: 'Robin Hood Food Relief',
      contactPerson,
      contactPhone,
      transportMode,
      estimatedArrival,
      notes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Accept & Claim Surplus Food</h3>
              <p className="text-emerald-100 text-xs">Direct pickup allocation for NGO redistribution</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-emerald-700/60 text-emerald-100 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Food Summary Pill */}
        <div className="bg-emerald-50/70 border-b border-emerald-100 px-6 py-3.5 flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-emerald-800 uppercase">
              {listing.foodType} • {listing.dietType}
            </span>
            <h4 className="font-bold text-slate-800 text-sm mt-0.5">{listing.title}</h4>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
              <span className="font-medium text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                {listing.quantity} {listing.unit} (~{listing.servings} Servings)
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Must pickup before {listing.pickupDeadline}
              </span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Designated Volunteer / Coordinator
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-slate-800"
              />
              <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Pickup ETA</label>
              <select
                value={estimatedArrival}
                onChange={(e) => setEstimatedArrival(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800 bg-white"
              >
                <option value="Within 20 minutes">Within 20 minutes (Urgent)</option>
                <option value="Within 35 minutes">Within 35 minutes</option>
                <option value="Within 1 hour">Within 1 hour</option>
                <option value="Scheduled for 9:00 PM">Scheduled for 9:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Transport & Packaging Method
            </label>
            <div className="relative">
              <select
                value={transportMode}
                onChange={(e) => setTransportMode(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800 bg-white"
              >
                <option value="Insulated Food Van with Hot-Boxes">Insulated Food Van with Hot-Boxes</option>
                <option value="Eco Cargo E-Rickshaw (Covered)">Eco Cargo E-Rickshaw (Covered)</option>
                <option value="Volunteer Car with Thermal Totes">Volunteer Car with Thermal Totes</option>
                <option value="Utility Two-Wheeler with Insulated Box">Utility Two-Wheeler with Insulated Box</option>
              </select>
              <Truck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Note for Food Donor (Kitchen / Banquet Manager)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please keep containers at service gate..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800 resize-none"
            />
          </div>

          {/* Food Safety Guarantee Alert */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 leading-relaxed">
              <strong>Safe Redistribution Pledge:</strong> By accepting, you confirm food will be collected in hygiene-grade vessels and distributed immediately to qualified beneficiaries.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm & Generate Pickup Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
