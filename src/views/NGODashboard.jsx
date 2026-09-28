import React, { useState } from 'react';
import {
  Search,
  Filter,
  MapPin,
  HeartHandshake,
  Clock,
  Sparkles,
  Map as MapIcon,
  LayoutGrid,
  ShieldCheck,
  Building2,
  AlertCircle,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import FoodCard from '../components/common/FoodCard';
import MapPlaceholder from '../components/common/MapPlaceholder';
import StatusBadge from '../components/common/StatusBadge';

export default function NGODashboard() {
  const { listings, orders, navigateTo } = useFoodBridge();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDiet, setSelectedDiet] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Available'); // 'Available' | 'All' | 'Active'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'

  // Filter listings
  const filteredListings = listings.filter((item) => {
    // Search match
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.area.toLowerCase().includes(searchTerm.toLowerCase());

    // Category match
    const matchesCategory =
      selectedCategory === 'All' || item.foodType === selectedCategory;

    // Diet match
    const matchesDiet =
      selectedDiet === 'All' || item.dietType === selectedDiet;

    // Status filter
    const matchesStatus =
      selectedStatus === 'All'
        ? true
        : selectedStatus === 'Available'
        ? item.status === 'Available'
        : item.status !== 'Available' && item.status !== 'Delivered';

    return matchesSearch && matchesCategory && matchesDiet && matchesStatus;
  });

  const availableCount = listings.filter((l) => l.status === 'Available').length;
  const inTransitCount = orders.filter((o) => o.status === 'Accepted' || o.status === 'Picked Up').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* NGO Header & Community Profile */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-600/20">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Robin Hood Food Relief & Kitchens
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Verified NGO Partner
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span>Shelter Capacity: 450 Beneficiaries</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-slate-400" />
                2 Mobile Food Rescue Vans Active
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Max Dispatch Radius: 12 km</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => navigateTo('requests')}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>My Claimed Requests ({orders.length})</span>
          </button>
          <button
            onClick={() => navigateTo('tracking')}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Track Volunteer</span>
          </button>
        </div>
      </div>

      {/* Quick Discovery KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Available Surplus in City</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{availableCount} Lots</p>
          <p className="text-xs text-slate-400 mt-0.5">Ready for instant claim</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Active Pickups En Route</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{inTransitCount}</p>
          <p className="text-xs text-slate-400 mt-0.5">Volunteers dispatched</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Meals Rescued Today</p>
          <p className="text-2xl font-black text-slate-900 mt-1">420 Servings</p>
          <p className="text-xs text-slate-400 mt-0.5">Distributed to 3 shelters</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Avg Collection Speed</p>
          <p className="text-2xl font-black text-purple-700 mt-1">28 Mins</p>
          <p className="text-xs text-slate-400 mt-0.5">From post to pickup</p>
        </div>
      </div>

      {/* Search, Category and View Filter Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search surplus by food name, donor (e.g. Biryani, Banquet, Mess)..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter Pill */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Status:</span>
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setSelectedStatus('Available')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === 'Available'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Available ({availableCount})
              </button>
              <button
                onClick={() => setSelectedStatus('Active')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === 'Active'
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setSelectedStatus('All')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedStatus === 'All'
                    ? 'bg-slate-800 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Lots ({listings.length})
              </button>
            </div>
          </div>

          {/* Grid vs Map Toggle */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-medium shrink-0 self-end lg:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>City Map View</span>
            </button>
          </div>
        </div>

        {/* Categories & Dietary Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Categories */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-500 mr-1">Food Category:</span>
            {['All', 'Cooked Meals', 'Bakery & Breads', 'Raw Ingredients', 'Packaged Meals'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Diet Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-500 mr-1">Diet:</span>
            {['All', 'Vegetarian', 'Vegan', 'Non-Vegetarian'].map((diet) => (
              <button
                key={diet}
                onClick={() => setSelectedDiet(diet)}
                className={`px-2.5 py-1 rounded-lg border transition-all ${
                  selectedDiet === diet
                    ? 'bg-slate-900 border-slate-900 text-white font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View Switch: Map Discovery Mode vs Cards Grid */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">City Surplus Geolocation Feed</h3>
                <p className="text-xs text-slate-500">
                  Interactive radar showing active pickup points and volunteer routes within 10 km.
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {filteredListings.length} Pins Active
              </span>
            </div>

            <MapPlaceholder
              sourceName="Royal Mirage Banquets (55 kg)"
              sourceAddress="Ring Road, Sector 18"
              destinationName="Robin Hood Central Shelter"
              destinationAddress="Kidwai Nagar"
              height="h-96"
              showRoute={true}
              showTransitVehicle={true}
              eta="18 mins"
              distance="3.2 km"
            />
          </div>

          {/* Quick horizontal strip below map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredListings.slice(0, 3).map((listing) => (
              <FoodCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      ) : (
        /* Cards Grid */
        <div>
          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-bold text-slate-800 text-base">No surplus food listings match your filters</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try resetting your search query, selecting 'All' categories, or check back in a few minutes.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDiet('All');
                  setSelectedStatus('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <FoodCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
