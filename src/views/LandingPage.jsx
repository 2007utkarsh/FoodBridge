import React from 'react';
import {
  ArrowRight,
  UtensilsCrossed,
  HeartHandshake,
  Clock,
  ShieldCheck,
  Building2,
  Truck,
  Sparkles,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import ImpactMetrics from '../components/common/ImpactMetrics';
import FoodCard from '../components/common/FoodCard';

export default function LandingPage() {
  const { navigateTo, listings, setUserRole } = useFoodBridge();

  const availableListings = listings.filter(l => l.status === 'Available').slice(0, 3);

  const workflowSteps = [
    {
      step: '01',
      title: 'Food Source Posts Surplus',
      desc: 'Caterers, banquets, hotel kitchens and college messes log surplus meals, weights, allergens and pickup deadlines in under 2 minutes.',
      icon: UtensilsCrossed,
      color: 'bg-emerald-500'
    },
    {
      step: '02',
      title: 'Real-Time NGO Discovery',
      desc: 'Nearby registered NGOs, shelters and community kitchens receive instant alerts matching their beneficiary capacity and transport radius.',
      icon: HeartHandshake,
      color: 'bg-blue-500'
    },
    {
      step: '03',
      title: 'Instant Claim & Dispatch',
      desc: 'The NGO accepts the surplus lot, assigns a volunteer or refrigerated transport, and generates a secure pickup verification PIN.',
      icon: Clock,
      color: 'bg-amber-500'
    },
    {
      step: '04',
      title: 'GPS Tracking & Safe Feeding',
      desc: 'Live route tracking verifies temperature guidelines, prompt arrival at the kitchen, and distribution to individuals in need.',
      icon: Truck,
      color: 'bg-teal-500'
    }
  ];

  const sourceTypes = [
    { name: 'Caterers & Banquets', desc: 'Wedding receptions, corporate galas & party surplus', count: '48 active' },
    { name: 'Hotels & Resorts', desc: 'Breakfast & dinner buffets, high-grade prepared cuisine', count: '32 active' },
    { name: 'College Messes & Hostels', desc: 'Batch prepared dal, rice, breads & regional staples', count: '24 active' },
    { name: 'Artisan Bakeries & Cafes', desc: 'Day-end baked goods, sandwich wraps & fresh produce', count: '22 active' }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white">
        {/* Ambient background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-200/30 to-teal-200/30 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Surplus Food Redistribution Network</span>
              <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.2 rounded-full">Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Connecting Surplus Food to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Empty Plates</span> in Minutes.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              FoodBridge bridges the critical gap between restaurants, caterers, hotels, messes, and verified NGOs. We turn high-quality edible surplus into timely, dignified community meals.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-wrap">
              <button
                onClick={() => {
                  setUserRole('provider');
                  navigateTo('post-food');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>Post Surplus Food</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  setUserRole('ngo');
                  navigateTo('ngo-dashboard');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300/90 text-slate-800 font-bold text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>NGO Food Discovery Hub</span>
              </button>

              <button
                onClick={() => setFeasibilityModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Feasibility Audit (All 8 Capabilities)</span>
              </button>
            </div>

            {/* Assurance badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% Commercial Hygiene Check
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                Under 45 Min Pickup Turnaround
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                Real-Time GPS Route Handover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Live Network Impact</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Measurable Change Across Our Communities
          </p>
          <p className="text-xs text-slate-500 mt-1">Real-time statistics updated directly from successful redistributions</p>
        </div>

        <ImpactMetrics variant="grid" />
      </section>

      {/* AI & IoT Smart Systems Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Integrated Intelligence Suite
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                AI, Predictive Analytics, Computer Vision & Smart IoT
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Preventing food waste before cooking, verifying freshness with optical AI, and automating multi-stop cold-chain distribution.
              </p>
            </div>

            <button
              onClick={() => setFeasibilityModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-all shrink-0"
            >
              View Engineering Feasibility Matrix &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: '1. AI Demand & Surplus Forecasting',
                desc: 'Predict actual student/staff headcount based on weather, exam cycles, and historical POS telemetry.',
                route: 'demand-forecast',
                tag: '95% Feasible'
              },
              {
                title: '2. Computer Vision & IoT Freshness',
                desc: 'Defect segmentation for produce and cooked dishes with multi-gas TVOC & ethylene sensors.',
                route: 'quality-vision',
                tag: '90% Feasible'
              },
              {
                title: '3. Multi-Stop AI Route Optimizer',
                desc: 'Genetic VRPTW solver bundling multiple donor pickups into consolidated cold-chain delivery routes.',
                route: 'logistics-optimizer',
                tag: '95% Feasible'
              },
              {
                title: '4. Processing Efficiency & Downtime',
                desc: 'Detect prep loss anomalies, peeler blade wear, walk-in chiller compressor power surges.',
                route: 'processing-efficiency',
                tag: '92% Feasible'
              },
              {
                title: '5. Production & JIT Procurement',
                desc: 'Dynamic recipe scaling and just-in-time ingredient purchase orders to eliminate shelf spoilage.',
                route: 'production-planning',
                tag: '94% Feasible'
              },
              {
                title: '6. Corporate ESG & Carbon Compliance',
                desc: 'Automated Scope 1/2/3 greenhouse gas abatement audit slips complying with ISO 14001 & India CSR.',
                route: 'esg-compliance',
                tag: '98% Feasible'
              }
            ].map((card, i) => (
              <div
                key={i}
                onClick={() => navigateTo(card.route)}
                className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-emerald-500/60 hover:bg-slate-800 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                      {card.tag}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <span>Launch Live System</span>
                  <span>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Workflow Walkthrough */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Seamless 5-Step Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              How FoodBridge Coordinates Surplus Food in Real-Time
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              From the kitchen's surplus to the beneficiary's plate, our structured workflow eliminates friction and spoilage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-emerald-400 transition-colors">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Automated Protocol</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Workflow quick navigation banner */}
          <div className="mt-10 p-4 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-white">Experience the Flow Live in this Prototype</p>
                <p className="text-[11px] text-slate-400">Post a dummy listing and see it instantaneously appear for NGO claim.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('post-food')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors"
              >
                Try Posting Food
              </button>
              <button
                onClick={() => navigateTo('ngo-dashboard')}
                className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-slate-200 transition-colors"
              >
                Browse Available Lots
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Available Food Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Live City Listings</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Surplus Ready for Immediate Pickup
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified fresh meals looking for NGO claims within their shelf-life window.
            </p>
          </div>

          <button
            onClick={() => navigateTo('ngo-dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <span>View All Surplus Lots ({listings.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableListings.map((listing) => (
            <FoodCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Food Sources Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 rounded-3xl p-8 border border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Who Donates With FoodBridge</h3>
            <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Built for Diverse High-Volume Food Sources
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sourceTypes.map((type, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{type.name}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{type.desc}</p>
                <div className="mt-3 text-[11px] font-semibold text-emerald-700">
                  {type.count}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Are you a Food Source with Surplus Tonight?
            </h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Don't throw away edible meals. Register a lot in 60 seconds and our network will dispatch verified logistics to rescue it immediately.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setUserRole('provider');
                navigateTo('post-food');
              }}
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-800 font-bold text-xs shadow-md hover:bg-slate-50 transition-all text-center"
            >
              Post Surplus Food Now
            </button>
            <button
              onClick={() => {
                setUserRole('ngo');
                navigateTo('ngo-dashboard');
              }}
              className="px-6 py-3.5 rounded-xl bg-emerald-900/50 hover:bg-emerald-900/70 border border-emerald-400/40 text-white font-semibold text-xs transition-all text-center"
            >
              Explore Available Claims
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
