import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import {
  Sparkles,
  Building2,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
  Boxes,
  Truck,
  Leaf
} from 'lucide-react';

export default function LandingPage() {
  const { navigateTo, setUserRole, metrics } = useFoodBridge();

  const handleFoodSourceLogin = () => {
    setUserRole('food-source');
    navigateTo('food-source-dashboard');
  };

  const handleNgoLogin = () => {
    setUserRole('ngo');
    navigateTo('ngo-dashboard');
  };

  const handleExplorePlatform = () => {
    setUserRole('admin');
    navigateTo('admin-dashboard');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem Statement 26234</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Turn Food Surplus Into <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Social Impact
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Connect surplus food from institutional kitchens and food processing units with organizations that can redistribute it.
          </p>

          {/* Three Explicit Buttons Requested */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleFoodSourceLogin}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <Building2 className="w-4 h-4" />
              <span>Food Source Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleNgoLogin}
              className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-600/30 transition-all hover:scale-[1.02]"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>NGO Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleExplorePlatform}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore Platform</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE CORE STEPS: Prevent → Match → Redistribute */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            The Intelligent Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Prevent &rarr; Match &rarr; Redistribute
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A smart closed-loop ecosystem designed for institutional kitchens, messes, and processing units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1: Prevent */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900">Prevent</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Track kitchen inventory in real-time. Compare actual kitchen stock against expected meal requirements to detect surplus before quality degrades.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Smart Surplus Detection Engine</span>
            </div>
          </div>

          {/* Step 2: Match */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-md relative">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              AI Matching Prototype
            </div>
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-lg mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900">Match</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Simulated AI matching algorithm calculates compatibility scores based on food requirements, quantity, distance, recipient capacity, and time urgency.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-teal-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Recommended Recipient Ranking</span>
            </div>
          </div>

          {/* Step 3: Redistribute */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-lg mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900">Redistribute</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Execute location-aware handovers with Leaflet OpenStreetMap navigation, vehicle tracking, secure PIN verification, and 6-stage lifecycle tracking.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-purple-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Verified 6-Stage Handover Chain</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR IMPACT CARDS (As requested) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">Baseline Sustainability Validation</div>
              <h3 className="text-2xl font-black mt-1">Platform Impact Snapshot</h3>
            </div>
            <button
              onClick={() => navigateTo('sustainability-impact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
            >
              <span>Full Sustainability Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Impact Card 1: Food Rescued */}
            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                {metrics.foodRescuedKg} kg
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Food Rescued
              </div>
              <div className="text-[11px] text-slate-400 mt-1">~965 equivalent meals</div>
            </div>

            {/* Impact Card 2: NGOs Connected */}
            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="text-3xl sm:text-4xl font-black text-teal-400">
                {metrics.ngosConnected}
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                NGOs Connected
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Verified local shelters</div>
            </div>

            {/* Impact Card 3: Redistribution Requests */}
            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400">
                {metrics.successfulRedistributions}
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Redistribution Requests
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Completed handovers</div>
            </div>

            {/* Impact Card 4: Waste Diverted */}
            <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">
                {metrics.wasteDivertedKg} kg
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Waste Diverted
              </div>
              <div className="text-[11px] text-slate-400 mt-1">Diverted from landfill</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE ALL 12 PROTOTYPE PAGES DIRECTORY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Prototype Navigation</div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">Explore the 12 Specified Pages</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'landing', label: '1. Landing Page', desc: 'Hero, 3 steps & impact snapshot' },
              { id: 'food-source-dashboard', label: '2. Food Source Dashboard', desc: 'Processed, inventory & risk alerts' },
              { id: 'inventory', label: '3. Inventory Management', desc: 'Item quantities, requirements & status' },
              { id: 'register-surplus', label: '4. Post / Register Surplus', desc: 'Register food items with safety specs' },
              { id: 'smart-surplus-analysis', label: '5. Smart Surplus Analysis', desc: 'Item, expected, surplus & recommendations' },
              { id: 'smart-matching', label: '6. AI Recipient Matching', desc: 'AI-based match scores & recommendation' },
              { id: 'ngo-dashboard', label: '7. NGO Discovery Portal', desc: 'Nearby surplus, accept & claim' },
              { id: 'food-details', label: '8. Food Details Page', desc: '30kg Rice, route & match details' },
              { id: 'redistribution-lifecycle', label: '9. Redistribution Workflow', desc: '6-stage lifecycle stepper with PIN' },
              { id: 'logistics-map', label: '10. Leaflet Logistics Map', desc: 'OpenStreetMap route & live transit' },
              { id: 'sustainability-impact', label: '11. Sustainability Analytics', desc: '386kg rescued & Recharts trends' },
              { id: 'admin-dashboard', label: '12. Admin Ecosystem Map', desc: 'All sources, NGOs & active routes' }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo(p.id)}
                className="text-left p-3.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">{p.label}</div>
                  <div className="text-[11px] text-slate-500">{p.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
