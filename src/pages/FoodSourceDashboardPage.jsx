import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Building2,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  PlusCircle,
  Clock,
  Sparkles,
  Layers,
  Thermometer,
  Truck,
  RotateCw,
  Eye,
  Boxes,
  BellRing,
  Award
} from 'lucide-react';
import SurplusCard from '../components/common/SurplusCard';

/**
 * Step 3: Food Source Dashboard
 * Explicitly connected buttons:
 * - "View Inventory" → Inventory page
 * - "Register Surplus Food" → Register Surplus page
 * - "View Surplus" → My Surplus page
 */
export default function FoodSourceDashboardPage() {
  const {
    foodSourceInventory,
    mySurplusList,
    surplusAnalysis,
    redistributions,
    navigateTo,
    setSelectedFoodItem
  } = useFoodBridge();

  // Key Food Source Metrics
  const metrics = {
    processed: 1420,
    inventory: 780,
    surplusDetected: 110,
    redistributed: 342,
    atRisk: 45
  };

  const activeDispatches = redistributions.filter(r => r.stage >= 2 && r.stage <= 5);
  const completedDonations = redistributions.filter(r => r.stage === 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner with Exact Required Action Buttons:
          - "View Inventory"
          - "Register Surplus Food"
          - "View Surplus" */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Facility: ABC Institutional Kitchen</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Food Source Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor preparation inventory, automated surplus identification, and registered donation lots.
          </p>
        </div>

        {/* The 3 Explicitly Requested Dashboard Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigateTo('inventory')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Boxes className="w-4 h-4 text-emerald-600" />
            <span>View Inventory</span>
          </button>

          <button
            onClick={() => navigateTo('my-surplus')}
            className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>View Surplus</span>
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-black">
              {mySurplusList.length}
            </span>
          </button>

          <button
            onClick={() => navigateTo('register-surplus')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Surplus Food</span>
          </button>
        </div>
      </div>

      {/* 5 Core Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Total Food Processed</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{metrics.processed} kg</div>
          <div className="text-[11px] text-slate-400 mt-1">Today's Kitchen Throughput</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Current Inventory</div>
          <div className="text-2xl font-black text-blue-700 mt-1">{metrics.inventory} kg</div>
          <div className="text-[11px] text-slate-400 mt-1">Active kitchen stock</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-xs">
          <div className="text-xs font-semibold text-amber-700 flex items-center gap-1">
            <span>Surplus Detected</span>
          </div>
          <div className="text-2xl font-black text-amber-600 mt-1">{metrics.surplusDetected} kg</div>
          <div className="text-[11px] text-amber-700 font-medium mt-1">Ready for redistribution</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
          <div className="text-xs font-semibold text-emerald-700">Food Redistributed</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{metrics.redistributed} kg</div>
          <div className="text-[11px] text-emerald-700 font-medium mt-1">Diverted from Landfill</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/40 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-rose-700 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>Food At Risk of Waste</span>
          </div>
          <div className="text-2xl font-black text-rose-600 mt-1">{metrics.atRisk} kg</div>
          <div className="text-[11px] text-rose-600 font-medium mt-1">&lt;4 hrs shelf-life window</div>
        </div>
      </div>

      {/* 4 Operations Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section 1: Inventory */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">Inventory</h2>
            </div>
            <button
              onClick={() => navigateTo('inventory')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>View Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">Live storage stock vs expected dining requirements:</p>

          <div className="space-y-2.5">
            {foodSourceInventory.slice(0, 4).map((item) => {
              const surplus = Math.max(0, Number(item.availableQty) - Number(item.requiredQty));
              return (
                <div
                  key={item.id}
                  onClick={() => navigateTo('inventory')}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.item}</div>
                    <div className="text-[11px] text-slate-400">
                      Avail: <b>{item.availableQty} {item.unit}</b> &bull; Req: {item.requiredQty} {item.unit} &bull; Potential Surplus: <b className="text-amber-700">+{surplus} {item.unit}</b>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'Urgent'
                      ? 'bg-rose-100 text-rose-800'
                      : surplus > 0
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {surplus > 0 ? 'Surplus' : 'Normal'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Surplus alerts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">Surplus Alerts</h2>
            </div>
            <button
              onClick={() => navigateTo('register-surplus')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>Register Surplus Food</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">Automated detection of excess batches needing redistribution:</p>

          <div className="space-y-3">
            {foodSourceInventory.filter(i => (Number(i.availableQty) - Number(i.requiredQty)) > 0).slice(0, 3).map((item) => {
              const surplus = Number(item.availableQty) - Number(item.requiredQty);
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{item.item}</span>
                      <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {item.availableUntil} remaining
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      Surplus: <b className="text-amber-900">+{surplus} {item.unit}</b> &bull; Available for matching
                    </div>
                  </div>

                  <button
                    onClick={() => navigateTo('register-surplus', {
                      prefillItem: {
                        foodName: `Cooked ${item.item}`,
                        foodCategory: item.category,
                        quantity: surplus,
                        unit: item.unit,
                        prepTime: item.prepTime,
                        availableUntil: item.availableUntil,
                        location: item.location
                      }
                    })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 shadow-xs"
                  >
                    Register Surplus
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Registered Surplus (My Surplus Overview) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Boxes className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-slate-900">My Registered Surplus</h2>
            </div>
            <button
              onClick={() => navigateTo('my-surplus')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              <span>View Surplus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">Food posted and available for matching:</p>

          <div className="space-y-3">
            {mySurplusList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{item.foodName}</span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Quantity: <b>{item.quantity} {item.unit}</b> &bull; Posted: <b>{item.postedAt}</b>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {item.matchingStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Recent completed donations */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-slate-900">Recent Completed Donations</h2>
            </div>
            <button
              onClick={() => navigateTo('sustainability-impact')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
            >
              <span>Impact Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-500">Verified handovers delivered to beneficiary organizations:</p>

          <div className="space-y-3">
            {completedDonations.map((don) => (
              <div
                key={don.id}
                className="p-3.5 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{don.foodItem}</span>
                    <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Delivered</span>
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Delivered to <b>{don.recipientNgo}</b> &bull; Quantity: <b>{don.quantity}</b>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                  Handover Signed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
