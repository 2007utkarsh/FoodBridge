import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  HeartHandshake,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Truck,
  Users,
  Building2,
  Award,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function NGODashboardPage() {
  const {
    matchingPool,
    redistributions,
    acceptSurplusMatch,
    navigateTo,
    setSelectedFoodItem
  } = useFoodBridge();

  // Metrics specified for NGO Dashboard
  const ngoMetrics = {
    nearbyAvailable: 6,
    recommendedDonations: 3,
    acceptedRequests: 2,
    completedPickups: 14,
    foodReceivedKg: 342
  };

  const activeSurplusLots = matchingPool;
  const inProgressRequests = redistributions.filter(r => r.stage >= 2 && r.stage <= 5);

  const currentNgoUser = {
    id: "REC-A",
    name: "NGO A (Hope Food Bank)",
    coordinator: "Anjali Verma",
    address: "Plot 14, Sector 7 Relief Colony",
    beneficiaries: 180,
    dailyCapacityKg: 250
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Verified Recipient: {currentNgoUser.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            NGO Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Discover fresh surplus food from nearby institutional kitchens, review AI match recommendations, and coordinate safe handovers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('logistics-map')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Map & Logistics</span>
          </button>
          <button
            onClick={() => navigateTo('redistribution-lifecycle')}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <span>My Active Requests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5 Required Summary Cards:
          - Nearby available surplus
          - Recommended donations
          - Accepted requests
          - Completed pickups
          - Food received */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Nearby Available Surplus</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{ngoMetrics.nearbyAvailable} Lots</div>
          <div className="text-[11px] text-slate-400 mt-1">Within 6 km radius</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
          <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Recommended Donations</span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{ngoMetrics.recommendedDonations} Lots</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">&gt;85% Match Score</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-xs">
          <div className="text-xs font-semibold text-blue-700">Accepted Requests</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{ngoMetrics.acceptedRequests}</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">Awaiting dispatch</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 bg-purple-50/30 shadow-xs">
          <div className="text-xs font-semibold text-purple-700">Completed Pickups</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{ngoMetrics.completedPickups}</div>
          <div className="text-[11px] text-purple-600 font-medium mt-1">Verified handovers</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-200 bg-teal-50/40 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-teal-700">Food Received</div>
          <div className="text-2xl font-black text-teal-600 mt-1">{ngoMetrics.foodReceivedKg} kg</div>
          <div className="text-[11px] text-teal-700 font-medium mt-1">~855 meals distributed</div>
        </div>
      </div>

      {/* Available Surplus Cards
          Each food card shows:
          - Food type
          - Quantity
          - Source
          - Distance
          - Available until
          - Match score
          Buttons:
          - View
          - Accept */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nearby Surplus Available</h2>
            <p className="text-xs text-slate-500">Fresh surplus from institutional kitchens ready for claim and pickup.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSurplusLots.map((lot) => {
            const topMatch = lot.potentialRecipients?.[0] || { matchScore: 91, distanceText: "2.4 km" };

            return (
              <div
                key={lot.surplusId}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-teal-300 shadow-xs hover:shadow-md transition-all space-y-4 relative"
              >
                {/* Food Type & Match Score */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Food Type
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">
                      {lot.foodTitle || lot.foodItem}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{topMatch.matchScore}% Match Score</span>
                    </span>
                    <div className="text-[10px] text-slate-400 font-semibold mt-0.5">AI Recommended</div>
                  </div>
                </div>

                {/* Exact Required Fields: Quantity, Source, Distance, Available Until */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Quantity</div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{lot.surplusQty} {lot.unit}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Source</div>
                    <div className="font-bold text-slate-900 text-xs mt-0.5 truncate" title={lot.sourceFacility}>
                      {lot.sourceFacility}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Distance</div>
                    <div className="font-bold text-slate-900 text-sm mt-0.5">{topMatch.distanceText}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Available Until</div>
                    <div className="font-bold text-rose-700 text-xs mt-0.5">{lot.availableUntil}</div>
                  </div>
                </div>

                {/* Safety / Compliance indicator */}
                <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FSSAI Good Samaritan safety verified &bull; Hot-holding safe</span>
                </div>

                {/* Explicit Buttons Requested: "View" and "Accept" */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedFoodItem({
                        item: lot.foodTitle || lot.foodItem,
                        surplusQty: lot.surplusQty,
                        unit: lot.unit,
                        source: lot.sourceFacility,
                        availableUntil: lot.availableUntil,
                        matchScore: topMatch.matchScore,
                        distanceKm: 2.4
                      });
                      navigateTo('food-details');
                    }}
                    className="py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => acceptSurplusMatch(lot, currentNgoUser)}
                    className="py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm shadow-teal-600/20"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Accept</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
