import React, { useState } from 'react';
import { Clock, MapPin, Scale, Users, Building2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import StatusBadge from './StatusBadge';
import QuickClaimModal from './QuickClaimModal';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function FoodCard({ listing, showClaimButton = true }) {
  const { navigateTo, userRole } = useFoodBridge();
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  const isAvailable = listing.status === 'Available';

  const getDietBadgeColor = (diet) => {
    switch (diet) {
      case 'Vegetarian':
        return 'text-emerald-700 bg-emerald-50 border-emerald-300';
      case 'Vegan':
        return 'text-teal-700 bg-teal-50 border-teal-300';
      case 'Non-Vegetarian':
        return 'text-rose-700 bg-rose-50 border-rose-300';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-300';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
        {/* Card Header & Image */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
            <StatusBadge status={listing.status} size="sm" />
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border shadow-xs backdrop-blur-md bg-white/90 ${getDietBadgeColor(listing.dietType)}`}>
              {listing.dietType}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-900/80 text-white backdrop-blur-md border border-slate-700/50">
              {listing.foodType}
            </span>
          </div>

          {/* Bottom title & donor snippet over image */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs text-slate-200">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium truncate">{listing.provider.name}</span>
              {listing.provider.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Verified Food Source" />
              )}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 
              onClick={() => navigateTo('food-details', { listingId: listing.id })}
              className="font-bold text-slate-800 text-base line-clamp-1 hover:text-emerald-700 cursor-pointer transition-colors"
              title={listing.title}
            >
              {listing.title}
            </h3>

            {/* Key Specs Row */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl">
                <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900">{listing.quantity} {listing.unit}</span>
                  <span className="block text-[10px] text-slate-500">~{listing.servings} Servings</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block truncate">{listing.pickupDeadline.replace('Today, ', '').replace('Tonight, ', '')}</span>
                  <span className="block text-[10px] text-amber-700 font-medium">Pickup Deadline</span>
                </div>
              </div>
            </div>

            {/* Location & Distance */}
            <div className="flex items-center justify-between text-xs text-slate-600 mt-3 px-0.5">
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{listing.provider.area}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                {listing.provider.distance}
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigateTo('food-details', { listingId: listing.id })}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-1"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isAvailable && showClaimButton && (
              <button
                type="button"
                onClick={() => setClaimModalOpen(true)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Claim / Accept
              </button>
            )}

            {!isAvailable && (
              <button
                type="button"
                onClick={() => {
                  if (listing.pickupId) {
                    navigateTo('tracking', { pickupId: listing.pickupId });
                  } else {
                    navigateTo('requests');
                  }
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-xs font-bold text-white shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
              >
                Track Journey
              </button>
            )}
          </div>
        </div>
      </div>

      <QuickClaimModal
        listing={listing}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
      />
    </>
  );
}
