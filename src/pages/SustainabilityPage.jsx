import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Leaf,
  TrendingUp,
  Sparkles,
  Award,
  Droplet,
  Users,
  CheckCircle2,
  Calendar,
  Building2,
  AlertCircle,
  Clock,
  PieChart,
  BarChart3,
  Percent,
  Timer
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  FOOD_RESCUED_OVER_TIME,
  CATEGORY_BREAKDOWN,
  SOURCE_WISE_SURPLUS,
  NGO_WISE_RECEIVED,
  SUSTAINABILITY_IMPACT_SECTION
} from '../data/sustainabilityData';

export default function SustainabilityPage() {
  const { metrics, navigateTo } = useFoodBridge();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>ESG & Carbon Savings Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Sustainability & Impact Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time validation of edible food rescued, landfill methane diverted, and resource preservation across institutional kitchens and community dining networks.
          </p>
        </div>

        {/* Future Enhancement Carbon Tag */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/40 shrink-0 text-left max-w-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-400 uppercase">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Carbon Emission Savings</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1">
            <span className="font-bold text-amber-300">Future Enhancement:</span> Standardized Scope-3 / IPCC emission calculation model under review.
          </p>
        </div>
      </div>

      {/* 5 Required Top Metrics:
          - Food Rescued: 386 kg
          - Food Redistributed: 342 kg
          - Waste Diverted: 386 kg
          - NGOs Connected: 12
          - Successful Redistributions: 47 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Food Rescued</div>
          <div className="text-3xl font-black text-emerald-600 mt-1">{metrics.foodRescuedKg} kg</div>
          <div className="text-[11px] text-slate-400 mt-1">Intercepted from disposal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-teal-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Food Redistributed</div>
          <div className="text-3xl font-black text-teal-600 mt-1">{metrics.redistributedKg} kg</div>
          <div className="text-[11px] text-slate-400 mt-1">Consumed by beneficiaries</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cyan-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Waste Diverted</div>
          <div className="text-3xl font-black text-cyan-600 mt-1">{metrics.wasteDivertedKg} kg</div>
          <div className="text-[11px] text-slate-400 mt-1">Zero landfill dumping</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">NGOs Connected</div>
          <div className="text-3xl font-black text-amber-600 mt-1">{metrics.ngosConnected}</div>
          <div className="text-[11px] text-slate-400 mt-1">Verified partner network</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-slate-500 uppercase">Successful Redistributions</div>
          <div className="text-3xl font-black text-purple-600 mt-1">{metrics.successfulRedistributions}</div>
          <div className="text-[11px] text-slate-400 mt-1">Verified handovers</div>
        </div>
      </div>

      {/* DEDICATED SECTION: "Sustainability Impact"
          Include:
          - Food waste prevented
          - Redistribution rate
          - Unclaimed surplus
          - Average time to redistribution */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-black">Sustainability Impact</h2>
          </div>
          <span className="text-xs font-bold text-emerald-300 bg-emerald-800/60 px-3 py-1 rounded-full border border-emerald-700">
            Validated Kitchen Benchmarks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Food Waste Prevented</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {SUSTAINABILITY_IMPACT_SECTION.foodWastePrevented}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">From mess overproduction</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="text-[11px] font-bold text-teal-400 uppercase flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-teal-400" />
              <span>Redistribution Rate</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {SUSTAINABILITY_IMPACT_SECTION.redistributionRate}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Matched & claimed by NGOs</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="text-[11px] font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-amber-400" />
              <span>Unclaimed Surplus</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {SUSTAINABILITY_IMPACT_SECTION.unclaimedSurplus}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Diverted to organic composting</div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-2xl border border-emerald-800/50">
            <div className="text-[11px] font-bold text-cyan-400 uppercase flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Avg Time to Redistribution</span>
            </div>
            <div className="text-xl font-black text-white mt-1">
              {SUSTAINABILITY_IMPACT_SECTION.averageTimeToRedistribution}
            </div>
            <div className="text-[11px] text-slate-300 mt-1">From detection to driver pickup</div>
          </div>
        </div>
      </div>

      {/* 4 REQUIRED CHARTS:
          1. Food rescued over time
          2. Redistribution by food category
          3. Source-wise surplus
          4. NGO-wise received food */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Food rescued over time */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Food Rescued Over Time</h3>
            <p className="text-xs text-slate-500">Daily trajectory of edible surplus intercepted over the week.</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FOOD_RESCUED_OVER_TIME} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rescuedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Area type="monotone" dataKey="rescued" name="Rescued (kg)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#rescuedGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Redistribution by food category */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Redistribution by Food Category</h3>
            <p className="text-xs text-slate-500">Distribution of rescued food lots across preparation categories.</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_BREAKDOWN} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="quantityKg" name="Redistributed (kg)" fill="#0d9488" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Source-wise surplus */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Source-Wise Surplus</h3>
            <p className="text-xs text-slate-500">Surplus volume identified across institutional kitchen and catering units.</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SOURCE_WISE_SURPLUS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="source" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="surplusKg" name="Surplus (kg)" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: NGO-wise received food */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">NGO-Wise Received Food</h3>
            <p className="text-xs text-slate-500">Total volume absorbed by verified community shelters and kitchens.</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={NGO_WISE_RECEIVED} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="ngo" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="receivedKg" name="Received (kg)" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
