import React, { useState } from 'react';
import {
  UtensilsCrossed,
  PlusCircle,
  LayoutDashboard,
  HeartHandshake,
  FileText,
  Truck,
  RotateCcw,
  Menu,
  X,
  Bell,
  Sparkles,
  Building2,
  CheckCircle2,
  Compass,
  Brain,
  Eye,
  Route,
  Activity,
  Calendar,
  Leaf,
  FileCheck,
  ChevronDown,
  Siren,
  Layers,
  Boxes,
  MapPin,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';
import FeasibilityModal from '../common/FeasibilityModal';
import EmergencySOSModal from '../common/EmergencySOSModal';

export default function Navbar() {
  const {
    currentView,
    navigateTo,
    userRole,
    setUserRole,
    resetDemoData,
    inventory,
    mySurplusList,
    redistributions,
    feasibilityModalOpen,
    setFeasibilityModalOpen
  } = useFoodBridge();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const [allPagesMenuOpen, setAllPagesMenuOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const pendingRequestsCount = redistributions.filter(r => r.stage < 6).length;
  const surplusCount = inventory.filter(i => i.status === 'Surplus' || i.status === 'Urgent').length;

  // Role-specific primary navigation items
  const getRoleNavItems = () => {
    switch (userRole) {
      case 'ngo':
        return [
          { id: 'ngo-dashboard', label: 'NGO Discovery', icon: HeartHandshake, badge: surplusCount },
          { id: 'smart-matching', label: 'AI Matching', icon: Sparkles },
          { id: 'redistribution-lifecycle', label: 'Active Requests', icon: FileText, badge: pendingRequestsCount },
          { id: 'logistics-map', label: 'Map & Route', icon: Truck },
          { id: 'sustainability-impact', label: 'Impact Data', icon: Leaf }
        ];
      case 'admin':
        return [
          { id: 'admin-dashboard', label: 'Admin Map & Fleet', icon: Layers },
          { id: 'inventory', label: 'All Inventory', icon: Boxes },
          { id: 'smart-surplus-analysis', label: 'Surplus Analysis', icon: Sparkles },
          { id: 'redistribution-lifecycle', label: 'Handover Audit', icon: FileText, badge: pendingRequestsCount },
          { id: 'sustainability-impact', label: 'Sustainability', icon: Leaf }
        ];
      case 'food-source':
      default:
        return [
          { id: 'food-source-dashboard', label: 'Dashboard', icon: Building2 },
          { id: 'inventory', label: 'Inventory', icon: Boxes },
          { id: 'register-surplus', label: 'Register Surplus', icon: PlusCircle, highlight: true },
          { id: 'my-surplus', label: 'My Surplus', icon: Layers, badge: mySurplusList?.length || 2 },
          { id: 'smart-surplus-analysis', label: 'Surplus Analysis', icon: Sparkles }
        ];
    }
  };

  // Prototype Pages Directory
  const all12Pages = [
    { id: 'landing', label: '1. Landing Page', role: 'Public' },
    { id: 'food-source-dashboard', label: '2. Food Source Dashboard', role: 'Source' },
    { id: 'inventory', label: '3. Inventory Management', role: 'Source' },
    { id: 'register-surplus', label: '4. Register Surplus Food', role: 'Source' },
    { id: 'my-surplus', label: '5. My Registered Surplus', role: 'Source' },
    { id: 'smart-surplus-analysis', label: '6. Smart Surplus Analysis', role: 'Source' },
    { id: 'smart-matching', label: '7. AI Recipient Matching', role: 'AI Core' },
    { id: 'ngo-dashboard', label: '8. NGO Discovery Portal', role: 'NGO' },
    { id: 'food-details', label: '9. Food Details & Passport', role: 'General' },
    { id: 'redistribution-lifecycle', label: '10. 6-Stage Handover Chain', role: 'Logistics' },
    { id: 'logistics-map', label: '11. Leaflet Logistics Map', role: 'Logistics' },
    { id: 'sustainability-impact', label: '12. Sustainability & Impact', role: 'Analytics' },
    { id: 'admin-dashboard', label: '13. Admin & Fleet Map', role: 'Admin' }
  ];

  // Bonus AI Deep Features
  const aiSuiteItems = [
    { id: 'circular-cascade', label: 'Circular 4-Tier Cascade', icon: Layers, desc: 'Charity + Flash discount + Biogas' },
    { id: 'demand-forecast', label: 'AI Demand Prediction', icon: Brain, desc: 'Footfall & consumption forecasting' },
    { id: 'quality-vision', label: 'Computer Vision Spoilage', icon: Eye, desc: 'Multi-gas & RGB freshness check' },
    { id: 'logistics-optimizer', label: 'Cold-Chain Route Optimizer', icon: Route, desc: 'VRPTW multi-drop fleet routing' },
    { id: 'processing-efficiency', label: 'Processing Plant OEE', icon: Activity, desc: 'Equipment loss & prep downtime' },
    { id: 'production-planning', label: 'Smart Production Scaling', icon: Calendar, desc: 'Recipe yield & JIT procurement' },
    { id: 'esg-compliance', label: 'ESG Reporting & BRSR', icon: Leaf, desc: 'Scope-3 carbon emission audit' }
  ];

  const handleNavClick = (viewId) => {
    navigateTo(viewId);
    setMobileMenuOpen(false);
    setAiMenuOpen(false);
    setAllPagesMenuOpen(false);
  };

  const currentNavItems = getRoleNavItems();
  const isAiView = aiSuiteItems.some(item => item.id === currentView);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        {/* Top Header Bar: 3-Role Switcher & Status */}
        <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 hidden sm:inline">PS26234 Ecosystem:</span>
            <span className="text-emerald-400 font-medium">386 kg Rescued &bull; 12 NGOs Active</span>
          </div>

          {/* Quick Actions & 3 Role Switcher */}
          <div className="flex items-center gap-2">
            {/* Midnight SOS Emergency Broadcast */}
            <button
              onClick={() => setSosModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 text-[11px] font-bold transition-all animate-pulse"
            >
              <Siren className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">SOS Dispatch</span>
            </button>

            {/* Feasibility Report Button */}
            <button
              onClick={() => setFeasibilityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-[11px] font-bold transition-all"
            >
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Feasibility</span>
            </button>

            <span className="text-slate-600 text-[11px] hidden md:inline">|</span>

            {/* 3 User Roles: Food Source, NGO, Admin */}
            <div className="inline-flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  setUserRole('food-source');
                  navigateTo('food-source-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  userRole === 'food-source'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Food Source
              </button>
              <button
                onClick={() => {
                  setUserRole('ngo');
                  navigateTo('ngo-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  userRole === 'ngo'
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NGO
              </button>
              <button
                onClick={() => {
                  setUserRole('admin');
                  navigateTo('admin-dashboard');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                  userRole === 'admin'
                    ? 'bg-purple-600 text-white shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Reset Demo button */}
            <button
              onClick={resetDemoData}
              title="Reset baseline prototype data"
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Food<span className="text-emerald-600">Bridge</span>
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded">
                    PS26234
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  AI Food Waste & Redistribution
                </p>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <nav className="hidden xl:flex items-center gap-1">
              {currentNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                if (item.highlight) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`ml-1 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-emerald-700 text-white ring-2 ring-emerald-500'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-2.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* 12 Pages Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setAllPagesMenuOpen(!allPagesMenuOpen);
                    setAiMenuOpen(false);
                  }}
                  className="px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>12 Pages</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${allPagesMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {allPagesMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      PS26234 Specification Pages
                    </div>
                    <div className="space-y-0.5 mt-1 max-h-80 overflow-y-auto">
                      {all12Pages.map((page) => (
                        <button
                          key={page.id}
                          onClick={() => handleNavClick(page.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                            currentView === page.id
                              ? 'bg-emerald-50 text-emerald-900 font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{page.label}</span>
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {page.role}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* AI Suite Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setAiMenuOpen(!aiMenuOpen);
                    setAllPagesMenuOpen(false);
                  }}
                  className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border ${
                    isAiView
                      ? 'bg-purple-50 text-purple-900 border-purple-200'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>AI Suite</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${aiMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {aiMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Predictive & IoT Advanced Systems
                    </div>
                    <div className="space-y-1 mt-1">
                      {aiSuiteItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentView === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 ${
                              isActive
                                ? 'bg-purple-50 text-purple-950 font-bold'
                                : 'hover:bg-slate-50 text-slate-800'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-slate-100 text-purple-600 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold leading-tight">{item.label}</p>
                              <p className="text-[11px] text-slate-500">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu trigger */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
              All 12 Specification Pages
            </div>
            <div className="space-y-1">
              {all12Pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleNavClick(page.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentView === page.id ? 'bg-emerald-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{page.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    currentView === page.id ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {page.role}
                  </span>
                </button>
              ))}
            </div>

            <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider px-2 pt-2 border-t border-slate-100">
              AI Predictive & IoT Systems
            </div>
            <div className="space-y-1">
              {aiSuiteItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive ? 'bg-purple-600 text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <FeasibilityModal
        isOpen={feasibilityModalOpen}
        onClose={() => setFeasibilityModalOpen(false)}
      />
      <EmergencySOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
      />
    </>
  );
}
