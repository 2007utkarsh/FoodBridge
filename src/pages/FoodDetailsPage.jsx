import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  Building2,
  Thermometer,
  QrCode,
  CheckCircle2,
  Award
} from 'lucide-react';
import FoodPassportModal from '../components/common/FoodPassportModal';

export default function FoodDetailsPage() {
  const {
    selectedFoodItem,
    acceptSurplusMatch,
    navigateTo
  } = useFoodBridge();

  const [passportOpen, setPassportOpen] = useState(false);

  // Food item specifications
  const foodData = {
    food: selectedFoodItem?.item || 'Cooked Rice',
    quantity: `${selectedFoodItem?.surplusQty || 30} ${selectedFoodItem?.unit || 'kg'}`,
    source: selectedFoodItem?.source || 'ABC Institutional Kitchen',
    location: `${selectedFoodItem?.distanceKm || 2.4} km away`,
    availableUntil: selectedFoodItem?.availableUntil || '10:00 PM',
    recommendedRecipient: 'NGO A',
    matchScore: selectedFoodItem?.matchScore || 91
  };

  const recipientObject = {
    id: 'REC-A',
    name: 'NGO A (Hope Food Bank)',
    coordinator: 'Anjali Verma',
    matchScore: foodData.matchScore,
    beneficiaries: 180,
    transportReady: 'Insulated Thermal Van'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('ngo-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to NGO Discovery</span>
        </button>
      </div>

      {/* Main Food Details Card with Exact Format:
          Food: Cooked Rice
          Quantity: 30 kg
          Source: ABC Institutional Kitchen
          Location: 2.4 km away
          Available until: 10:00 PM
          Recommended recipient: NGO A
          Match score: 91%
          Buttons: Accept Food, View Route */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Surplus Food Inspection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Food Details
            </h1>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shrink-0">
            <div className="text-2xl font-black text-emerald-700">{foodData.matchScore}%</div>
            <div className="text-[10px] font-bold uppercase text-emerald-900">Match score</div>
          </div>
        </div>

        {/* The 7 Exact Display Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Food</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">{foodData.food}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Quantity</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">{foodData.quantity}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Source</div>
            <div className="text-base font-bold text-slate-900 mt-0.5">{foodData.source}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Location</div>
            <div className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{foodData.location}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 font-bold uppercase text-[10px]">Available Until</div>
            <div className="text-base font-bold text-rose-700 mt-0.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-rose-600" />
              <span>{foodData.availableUntil}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="text-emerald-800 font-bold uppercase text-[10px]">Recommended Recipient</div>
            <div className="text-base font-black text-emerald-950 mt-0.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>{foodData.recommendedRecipient}</span>
            </div>
          </div>
        </div>

        {/* Safety & Compliance Card */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800">FSSAI Good Samaritan Safety Passport: </span>
              <span className="text-slate-600">Core temperature 64.2°C &bull; Stainless steel containers</span>
            </div>
          </div>

          <button
            onClick={() => setPassportOpen(true)}
            className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 shrink-0 underline"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital QR</span>
          </button>
        </div>

        {/* Exact Buttons Requested: "Accept Food" & "View Route" */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => navigateTo('logistics-map')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>View Route</span>
          </button>

          <button
            onClick={() => acceptSurplusMatch({ surplusQty: 30, unit: 'kg', foodItem: foodData.food }, recipientObject)}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Accept Food</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Digital Food Safety Passport Modal */}
      <FoodPassportModal
        isOpen={passportOpen}
        onClose={() => setPassportOpen(false)}
        item={{
          title: foodData.food,
          id: 'PASSPORT-FB-01',
          provider: { name: foodData.source },
          storageType: 'Hot-holding >60°C',
          preparedTime: 'Today, 1:30 PM',
          pickupDeadline: foodData.availableUntil
        }}
      />
    </div>
  );
}
