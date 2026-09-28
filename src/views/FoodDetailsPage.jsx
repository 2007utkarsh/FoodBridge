import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Scale,
  Users,
  ShieldCheck,
  Building2,
  Phone,
  CheckCircle2,
  AlertTriangle,
  Thermometer,
  Package,
  Share2,
  Truck,
  Sparkles
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import StatusBadge from '../components/common/StatusBadge';
import QuickClaimModal from '../components/common/QuickClaimModal';
import MapPlaceholder from '../components/common/MapPlaceholder';
import FoodPassportModal from '../components/common/FoodPassportModal';

export default function FoodDetailsPage() {
  const { listings, selectedListingId, navigateTo, userRole } = useFoodBridge();
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [passportModalOpen, setPassportModalOpen] = useState(false);

  // Find the selected listing or fallback to the first one
  const listing = listings.find((l) => l.id === selectedListingId) || listings[0];

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <p className="text-slate-600 font-bold">Listing not found</p>
        <button
          onClick={() => navigateTo('ngo-dashboard')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          Return to NGO Feed
        </button>
      </div>
    );
  }

  const isAvailable = listing.status === 'Available';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back navigation & header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigateTo(userRole === 'provider' ? 'provider-dashboard' : 'ngo-dashboard')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs hover:bg-slate-50 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {userRole === 'provider' ? 'Provider Dashboard' : 'NGO Discovery'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-500 font-semibold">Lot ID: {listing.id}</span>
          <StatusBadge status={listing.status} size="lg" />
        </div>
      </div>

      {/* Main Grid: Left Detailed Info + Right Action Card & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Visual Banner */}
          <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-slate-900 shadow-md">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-900 shadow-md">
                {listing.foodType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                {listing.dietType}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                <Building2 className="w-4 h-4" />
                <span>{listing.provider.name} • {listing.provider.type}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {listing.title}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="p-3 bg-emerald-50/70 rounded-xl">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase block">Total Net Weight</span>
              <span className="text-xl font-black text-emerald-950 block mt-0.5">
                {listing.quantity} {listing.unit}
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 rounded-xl">
              <span className="text-[11px] font-semibold text-blue-800 uppercase block">Servings Capacity</span>
              <span className="text-xl font-black text-blue-950 block mt-0.5">
                ~{listing.servings} People
              </span>
            </div>

            <div className="p-3 bg-amber-50/70 rounded-xl">
              <span className="text-[11px] font-semibold text-amber-800 uppercase block">Pickup Deadline</span>
              <span className="text-sm font-black text-amber-950 block mt-1 truncate">
                {listing.pickupDeadline}
              </span>
            </div>

            <div className="p-3 bg-purple-50/70 rounded-xl">
              <span className="text-[11px] font-semibold text-purple-800 uppercase block">Distance Radius</span>
              <span className="text-xl font-black text-purple-950 block mt-0.5">
                {listing.provider.distance}
              </span>
            </div>
          </div>

          {/* Food Specifications & Quality Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-600" />
              Food Handling & Preparation Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 font-semibold block">Preparation Timestamp:</span>
                <span className="font-bold text-slate-800 text-sm">{listing.preparationTime}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 font-semibold block">Packaging Provided:</span>
                <span className="font-bold text-slate-800 text-sm">{listing.packagingType}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 font-semibold block">Storage Requirements:</span>
                <span className="font-bold text-slate-800 text-sm">{listing.storageRequirements}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-slate-500 font-semibold block">Declared Allergens:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Array.isArray(listing.allergens) && listing.allergens.length > 0 ? (
                    listing.allergens.map((alg, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                        {alg}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-700 font-medium">None Declared</span>
                  )}
                </div>
              </div>
            </div>

            {/* Food Safety Note */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-950 text-xs">Donor Food Safety Declaration</p>
                <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                  {listing.safetyNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Claim Action Card, Donor Profile & Pickup Map */}
        <div className="space-y-6">
          {/* Claim / Action Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lot Status</span>
              <StatusBadge status={listing.status} size="sm" />
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Pickup Deadline:</span>
                <span className="font-bold text-amber-700">{listing.pickupDeadline}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Redistribution Value:</span>
                <span className="font-bold text-emerald-700">~{listing.servings} Warm Meals</span>
              </div>
            </div>

            {isAvailable ? (
              <button
                type="button"
                onClick={() => setClaimModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Claim & Accept for Pickup</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (listing.pickupId) {
                    navigateTo('tracking', { pickupId: listing.pickupId });
                  } else {
                    navigateTo('requests');
                  }
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-5 h-5 text-emerald-400" />
                <span>Track Active Pickup Journey</span>
              </button>
            )}

            {/* Digital Food Passport Button */}
            <button
              type="button"
              onClick={() => setPassportModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Digital Food Safety Passport & QR</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              No financial transaction. Verified non-profit food redistribution under FoodBridge Safety Charter.
            </p>
          </div>

          {/* Donor Facility Profile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Food Source Facility
            </h3>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">{listing.provider.name}</h4>
                  {listing.provider.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Commercial Kitchen" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{listing.provider.type}</p>
                <p className="text-xs text-slate-700 mt-2 font-medium flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {listing.provider.phone} ({listing.provider.contactPerson})
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Service Bay Address:</span>
                  <span>{listing.provider.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Geofence Pickup Pin Map */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Dispatch GPS Coordinates</span>
              <span className="text-emerald-700 font-semibold">{listing.provider.distance}</span>
            </div>
            <MapPlaceholder
              sourceName={listing.provider.name}
              sourceAddress={listing.provider.address}
              height="h-56"
              showRoute={false}
            />
          </div>
        </div>
      </div>

      <QuickClaimModal
        listing={listing}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
      />

      <FoodPassportModal
        listing={listing}
        isOpen={passportModalOpen}
        onClose={() => setPassportModalOpen(false)}
      />
    </div>
  );
}
