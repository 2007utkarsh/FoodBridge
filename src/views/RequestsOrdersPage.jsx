import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Search,
  Filter,
  Building2,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import StatusBadge from '../components/common/StatusBadge';

export default function RequestsOrdersPage() {
  const { orders, acceptOrder, navigateTo, userRole } = useFoodBridge();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.ngoName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'All'
        ? true
        : filterStatus === 'Pending'
        ? order.status === 'Requested'
        : filterStatus === 'Active'
        ? order.status === 'Accepted' || order.status === 'Picked Up'
        : order.status === 'Delivered';

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Step 3: Food Claim Handshake
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Redistribution Requests & Handover Orders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit trail of NGO food claims, donor confirmations, and delivery handovers.
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('tracking')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Open GPS Pickup Tracking</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Food, NGO, Donor..."
            className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Filter Tabs */}
        <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-medium w-full sm:w-auto justify-center">
          {[
            { id: 'All', label: `All (${orders.length})` },
            { id: 'Pending', label: `Pending (${orders.filter(o => o.status === 'Requested').length})` },
            { id: 'Active', label: `In Transit (${orders.filter(o => o.status === 'Accepted' || o.status === 'Picked Up').length})` },
            { id: 'Completed', label: `Delivered (${orders.filter(o => o.status === 'Delivered').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterStatus === tab.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No requests found</h3>
            <p className="text-xs text-slate-500 mt-1">There are no orders matching your current filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isRequested = order.status === 'Requested';
            const isAccepted = order.status === 'Accepted';
            const isPickedUp = order.status === 'Picked Up';
            const isDelivered = order.status === 'Delivered';

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-4"
              >
                {/* Top Row: ID, Badges, Time */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-black text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <StatusBadge status={order.status} size="sm" />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Requested: {order.requestedAt}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      Must Pickup By: {order.pickupDeadline}
                    </span>
                  </div>
                </div>

                {/* Middle Grid: Food Info + Donor + NGO */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Food Spec */}
                  <div className="space-y-1">
                    <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider">
                      Surplus Meal Lot
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">
                      {order.listingTitle}
                    </h3>
                    <p className="text-emerald-700 font-semibold mt-1">
                      Quantity: {order.requestedQuantity}
                    </p>
                  </div>

                  {/* Donor Source */}
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl">
                    <span className="text-slate-400 font-semibold block uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      Food Source Facility
                    </span>
                    <p className="font-bold text-slate-800 text-xs">{order.providerName}</p>
                    <p className="text-slate-500 text-[11px] truncate">
                      Pickup Pass ready at dispatch desk
                    </p>
                  </div>

                  {/* NGO Beneficiary */}
                  <div className="space-y-1 bg-blue-50/60 p-3 rounded-xl border border-blue-100/60">
                    <span className="text-blue-600 font-semibold block uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <HeartHandshake className="w-3 h-3" />
                      Claiming NGO & Transport
                    </span>
                    <p className="font-bold text-slate-900 text-xs">{order.ngoName}</p>
                    <p className="text-slate-600 text-[11px]">
                      {order.contactPerson} • {order.transportMode}
                    </p>
                  </div>
                </div>

                {/* Notes if any */}
                {order.notes && (
                  <div className="text-xs text-slate-600 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 italic">
                    "{order.notes}"
                  </div>
                )}

                {/* Bottom Row: Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-slate-100 gap-3">
                  <div className="text-xs text-slate-500">
                    {isDelivered && (
                      <span className="text-teal-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        Distribution successfully verified by shelter manager.
                      </span>
                    )}
                    {isRequested && (
                      <span className="text-amber-700 font-medium">
                        Awaiting Donor acceptance to issue volunteer pickup code.
                      </span>
                    )}
                    {(isAccepted || isPickedUp) && (
                      <span className="text-purple-700 font-medium flex items-center gap-1">
                        <Truck className="w-4 h-4 text-purple-600" />
                        Surplus in pickup pipeline. Live GPS geofence enabled.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* If Requested and viewed by Donor, allow Accept */}
                    {isRequested && (
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Accept NGO Request
                      </button>
                    )}

                    {/* View Food Details */}
                    <button
                      onClick={() => navigateTo('food-details', { listingId: order.listingId })}
                      className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs"
                    >
                      Food Specs
                    </button>

                    {/* Track Live */}
                    {order.pickupId && (
                      <button
                        onClick={() => navigateTo('tracking', { pickupId: order.pickupId })}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5 text-emerald-400" />
                        Track Pickup
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
