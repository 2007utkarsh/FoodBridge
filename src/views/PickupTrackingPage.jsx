import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building2,
  HeartHandshake,
  QrCode,
  Thermometer,
  RotateCw,
  Sparkles,
  ChevronRight,
  PackageCheck
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import StatusBadge from '../components/common/StatusBadge';
import MapPlaceholder from '../components/common/MapPlaceholder';

export default function PickupTrackingPage() {
  const { pickups, selectedPickupId, advancePickupStatus, navigateTo } = useFoodBridge();

  // Find the selected pickup or pick the first available pickup
  const pickupKey = pickups[selectedPickupId] ? selectedPickupId : Object.keys(pickups)[0];
  const pickup = pickups[pickupKey];

  const [pinRevealed, setPinRevealed] = useState(false);

  if (!pickup) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <Truck className="w-12 h-12 text-slate-300 mx-auto" />
        <h2 className="text-slate-800 font-bold text-lg">No Active Pickup Selected</h2>
        <p className="text-xs text-slate-500">Pick a claimed order from the Requests page to view live GPS tracking.</p>
        <button
          onClick={() => navigateTo('requests')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
        >
          View Active Orders
        </button>
      </div>
    );
  }

  const isDelivered = pickup.status === 'Delivered';
  const isPickedUp = pickup.status === 'Picked Up';
  const isOutForPickup = pickup.status === 'Out for Pickup';
  const isAccepted = pickup.status === 'Accepted';

  const steps = [
    { label: 'Claim Accepted', completed: true, active: isAccepted },
    { label: 'Out for Pickup', completed: isPickedUp || isDelivered || isOutForPickup, active: isOutForPickup },
    { label: 'Food Picked Up', completed: isPickedUp || isDelivered, active: isPickedUp },
    { label: 'Delivered to Shelter', completed: isDelivered, active: isDelivered }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Fast Simulation Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Step 4 & 5: Live Logistics & Handover
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono font-bold text-slate-600">ID: {pickup.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real-Time Pickup & Delivery Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Geofenced GPS route between food source kitchen and destination community shelter.
          </p>
        </div>

        {/* Prototype Interactive Simulator Buttons */}
        <div className="bg-slate-900 text-white p-2 rounded-2xl flex items-center gap-2 shadow-lg">
          <span className="text-[11px] font-bold text-emerald-400 pl-2 hidden sm:inline">
            Prototype Demo Actions:
          </span>
          {!isPickedUp && !isDelivered && (
            <button
              onClick={() => advancePickupStatus(pickup.id, 'Picked Up')}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              Simulate: Picked Up
            </button>
          )}
          {!isDelivered && (
            <button
              onClick={() => advancePickupStatus(pickup.id, 'Delivered')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs"
            >
              Simulate: Mark Delivered
            </button>
          )}
          {isDelivered && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Delivery Completed & Recorded
            </span>
          )}
        </div>
      </div>

      {/* Modern Stepper Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500">Target Surplus Lot:</span>
            <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl">{pickup.title}</h2>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
              {pickup.quantity} • Handover Verification: Required
            </p>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={pickup.status} size="lg" />
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Est. Transit Time</span>
              <span className="text-sm font-bold text-slate-800">{pickup.eta}</span>
            </div>
          </div>
        </div>

        {/* Stepper progress track */}
        <div className="relative pt-4 pb-2">
          {/* Background Bar */}
          <div className="absolute top-7 left-6 right-6 h-1.5 bg-slate-100 rounded-full" />
          {/* Active Colored Bar */}
          <div
            className="absolute top-7 left-6 h-1.5 bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${pickup.progressPercent}%` }}
          />

          <div className="relative grid grid-cols-4 gap-2 text-center">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    step.completed
                      ? 'bg-emerald-600 border-white text-white shadow-md ring-2 ring-emerald-500'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-xs mt-2 font-medium leading-tight max-w-[100px] ${
                    step.active
                      ? 'text-emerald-700 font-bold'
                      : step.completed
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: GPS Live Map + Driver / Handover Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Map & Live Milestones (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live GPS Map */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-slate-900 text-sm">Live GPS Geofence & Routing</h3>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Distance: {pickup.distanceKm}
              </span>
            </div>

            <MapPlaceholder
              sourceName={pickup.source.name}
              sourceAddress={pickup.source.address}
              destinationName={pickup.destination.name}
              destinationAddress={pickup.destination.address}
              showRoute={true}
              showTransitVehicle={!isDelivered}
              eta={pickup.eta}
              distance={pickup.distanceKm}
              height="h-80"
            />

            {/* Live Temperature & Sensor Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Thermal Sensor</span>
                  <span className="font-bold text-emerald-900">64.2°C (Hot-Holding OK)</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Hygiene Integrity</span>
                  <span className="font-bold text-blue-900">Sealed Inserts Verified</span>
                </div>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <span className="text-slate-500 block text-[11px]">Dispatch SLA</span>
                  <span className="font-bold text-purple-900">22 mins remaining</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Timeline Events */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Redistribution Journey Milestones</h3>

            <div className="space-y-6 pt-2">
              {pickup.timeline.map((event, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  {idx < pickup.timeline.length - 1 && (
                    <div className="absolute top-7 left-3.5 bottom-0 w-0.5 bg-slate-200" />
                  )}

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10 ${
                      event.completed
                        ? 'bg-emerald-600 text-white'
                        : event.current
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100 animate-pulse'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          event.current ? 'text-blue-600' : 'text-slate-800'
                        }`}
                      >
                        {event.status}
                      </h4>
                      <span className="text-xs text-slate-400 font-medium">{event.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Handover Verification PIN, Driver Card, Facility Endpoints */}
        <div className="space-y-6">
          {/* Handover Verification PIN & QR */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Pickup Handover Pass
            </span>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
              <p className="text-xs text-emerald-800 font-semibold">
                Show this 4-digit PIN to Food Source / Donor upon arrival:
              </p>
              <div className="py-2">
                <span className="font-mono text-3xl font-black text-emerald-950 tracking-widest bg-white px-4 py-1.5 rounded-xl border border-emerald-300 shadow-xs inline-block">
                  {pickup.pickupPin}
                </span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Driver matches PIN to release food container lock.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <QrCode className="w-4 h-4 text-slate-600" />
              <span>Digital QR Pass Authenticated</span>
            </div>
          </div>

          {/* Assigned Volunteer / Vehicle Details */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Assigned Rescue Transporter
            </span>

            <div className="flex items-start gap-3.5">
              <img
                src={pickup.volunteer.avatar}
                alt={pickup.volunteer.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{pickup.volunteer.name}</h4>
                <p className="text-xs text-emerald-700 font-medium">{pickup.volunteer.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <span>★ {pickup.volunteer.rating} Rating</span>
                  <span>•</span>
                  <span>48 Rescues</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transport:</span>
                <span className="font-semibold">{pickup.volunteer.vehicle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-emerald-700">{pickup.volunteer.phone}</span>
              </div>
            </div>
          </div>

          {/* Facility Route Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 text-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Trip Details
            </span>

            {/* Source */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{pickup.source.name}</span>
                <span className="text-slate-500 block">{pickup.source.address}</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="pl-3">
              <div className="w-0.5 h-4 bg-slate-200" />
            </div>

            {/* Destination */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{pickup.destination.name}</span>
                <span className="text-slate-500 block">{pickup.destination.address}</span>
                <span className="text-[11px] text-blue-700 font-semibold block mt-0.5">
                  Beneficiaries: {pickup.destination.beneficiaries}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
