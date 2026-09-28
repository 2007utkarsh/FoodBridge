import React from 'react';
import { UtensilsCrossed, Heart, ShieldCheck, ArrowRight, ExternalLink, Leaf } from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function Footer() {
  const { navigateTo } = useFoodBridge();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Food<span className="text-emerald-400">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Bridging the gap between surplus food generators—banquets, hotels, caterers, college messes—and verified NGOs to eradicate food waste and nourish communities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-2 rounded-xl w-fit">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Zero-Waste Redistribution & Methane Abatement Platform</span>
            </div>
          </div>

          {/* Core Workflow Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Workflow</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('post-food')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Post Surplus Food
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ngo-dashboard')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> NGO Discovery Feed
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('requests')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> Claims & Approvals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" /> GPS Pickup Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Portals & Views</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => navigateTo('provider-dashboard')} className="hover:text-emerald-400 transition-colors">
                  Food Provider Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('ngo-dashboard')} className="hover:text-emerald-400 transition-colors">
                  NGO Recipient Hub
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('food-details', { listingId: 'FB-101' })} className="hover:text-emerald-400 transition-colors">
                  Food Details & Safety Spec
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('landing')} className="hover:text-emerald-400 transition-colors">
                  Public Landing Overview
                </button>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Safety & Quality</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>Commercial kitchen hygiene verification protocol.</p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p>Temperature-controlled transport guidelines.</p>
              </div>
              <p className="text-[11px] text-slate-500 italic mt-2">
                Surplus food redistribution prototype for smart city food security.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 FoodBridge Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for zero hunger & sustainable cities</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
