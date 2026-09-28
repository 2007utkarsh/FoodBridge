import React, { useState } from 'react';
import {
  PlusCircle,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  FileText,
  Filter
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import StatusBadge from '../components/common/StatusBadge';
import MapPlaceholder from '../components/common/MapPlaceholder';

export default function ProviderDashboard() {
  const { listings, orders, navigateTo, acceptOrder } = useFoodBridge();
  const [activeTab, setActiveTab] = useState('all');

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (activeTab === 'available') return item.status === 'Available';
    if (activeTab === 'active') return item.status === 'Requested' || item.status === 'Accepted';
    if (activeTab === 'completed') return item.status === 'Delivered' || item.status === 'Picked Up';
    return true;
  });

  const pendingRequests = orders.filter((o) => o.status === 'Requested');
  const activeOrders = orders.filter((o) => o.status === 'Accepted' || o.status === 'Picked Up');

  const totalDonatedKg = listings
    .filter((l) => l.status === 'Delivered' || l.status === 'Picked Up')
    .reduce((acc, curr) => acc + (Number(curr.quantity) || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Profile Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-700/20">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Royal Mirage Banquets & Caterers
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Donor
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Sector 18 Commercial Hub
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                +91 98201 44521
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Kitchen Safety Grade A+</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => navigateTo('post-food')}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Surplus Food</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Total Surplus Rescued</span>
            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
              +18% MoM
            </span>
          </div>
          <p className="text-2xl font-black text-slate-900">{totalDonatedKg + 320} kg</p>
          <p className="text-xs text-slate-500 mt-1">Approx. ~1,040 meals saved</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Active Listings</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-2xl font-black text-emerald-700">
            {listings.filter((l) => l.status === 'Available').length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Ready for pickup right now</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Pending Requests</span>
            {pendingRequests.length > 0 && (
              <span className="animate-pulse bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                Action
              </span>
            )}
          </div>
          <p className="text-2xl font-black text-amber-600">{pendingRequests.length}</p>
          <p className="text-xs text-slate-500 mt-1">NGOs waiting for your sign-off</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>In-Transit & Pickups</span>
            <Truck className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-purple-700">{activeOrders.length}</p>
          <p className="text-xs text-slate-500 mt-1">Active volunteer pickups</p>
        </div>
      </div>

      {/* Pending NGO Claim Approval Alert (If any) */}
      {pendingRequests.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {pendingRequests.length} NGO Claim Request{pendingRequests.length > 1 ? 's' : ''} Awaiting Approval
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  An NGO has requested your surplus lot. Confirm to release the pickup pass and start the delivery timer.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => acceptOrder(pendingRequests[0].id)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
              >
                Accept Claim #{pendingRequests[0].id}
              </button>
              <button
                onClick={() => navigateTo('requests')}
                className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Review All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Section: Listings Management Table & Geofence Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listings List (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Your Surplus Food Listings</h2>
              <p className="text-xs text-slate-500">Manage posted lots, shelf-life deadlines, and handovers</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
              {[
                { id: 'all', label: 'All' },
                { id: 'available', label: 'Available' },
                { id: 'active', label: 'In Progress' },
                { id: 'completed', label: 'Completed' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Listings Cards/Rows */}
          <div className="space-y-3">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="font-bold text-slate-700 text-sm">No listings found in this category</p>
                <p className="text-xs text-slate-400 mt-1">Post a new surplus lot to see it here.</p>
                <button
                  onClick={() => navigateTo('post-food')}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Post Food Now
                </button>
              </div>
            ) : (
              filteredListings.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono text-slate-500 font-semibold">#{item.id}</span>
                        <StatusBadge status={item.status} size="sm" />
                        <span className="text-[10px] font-medium px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                          {item.foodType}
                        </span>
                      </div>
                      <h4
                        onClick={() => navigateTo('food-details', { listingId: item.id })}
                        className="font-bold text-slate-900 text-sm mt-1 hover:text-emerald-700 cursor-pointer"
                      >
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="font-semibold text-slate-700">
                          {item.quantity} {item.unit} (~{item.servings} Servings)
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-700">
                          <Clock className="w-3.5 h-3.5" />
                          Deadline: {item.pickupDeadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    {item.claimedBy ? (
                      <span className="text-xs text-slate-600">
                        Claimed by: <strong className="text-slate-800">{item.claimedBy.name}</strong>
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-700 font-medium">Awaiting NGO discovery</span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateTo('food-details', { listingId: item.id })}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Details
                      </button>
                      {item.pickupId && (
                        <button
                          onClick={() => navigateTo('tracking', { pickupId: item.pickupId })}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 flex items-center gap-1"
                        >
                          <Truck className="w-3 h-3" />
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar: Geofenced Pickup Hub Map & Donor Tips */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Active Donor Dispatch Map</h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Live Geofence
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Verified local NGO vehicles located within 5 km of Royal Mirage Banquets.
            </p>

            <MapPlaceholder
              sourceName="Royal Mirage Banquets"
              sourceAddress="Sector 18 Commercial Hub"
              height="h-56"
              showRoute={false}
              showTransitVehicle={true}
            />

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <p className="font-semibold text-slate-800">Dispatch Guidelines:</p>
              <p>• Keep cooked surplus at hot-holding temperature ({'>'}60°C) until NGO volunteer arrives.</p>
              <p>• Verify driver badge and match the 4-digit pickup verification PIN upon handover.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
