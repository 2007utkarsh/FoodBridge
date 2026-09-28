import React, { useState } from 'react';
import {
  Layers,
  HeartHandshake,
  Tag,
  Factory,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Scale,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export default function CircularCascadeView() {
  const { showToast, navigateTo } = useFoodBridge();

  const [activeTier, setActiveTier] = useState('all');

  const cascadeTiers = [
    {
      tierNumber: 'Tier 1',
      title: 'Human Direct Charity (100% Free)',
      subtitle: 'Primary Rescue Window: 0 – 3 Hours',
      desc: 'Top-priority redistribution to verified shelter kitchens, children orphanages, and night relief feedings.',
      badge: 'Zero Hunger / Free',
      badgeColor: 'emerald',
      icon: HeartHandshake,
      activeLots: 6,
      volumeRescued: '12,450 kg this month',
      costStructure: 'Free Donation + 80G Tax Benefit'
    },
    {
      tierNumber: 'Tier 2',
      title: 'Flash Rescue Secondary Marketplace (70% Off)',
      subtitle: 'Secondary Window: 3 – 6 Hours',
      desc: 'High-grade surplus boxed meals sold at deep discount (₹35–₹60) to budget students, daily wagers, and gig workers.',
      badge: 'Cost Recovery / ₹30–₹50 Meals',
      badgeColor: 'blue',
      icon: Tag,
      activeLots: 4,
      volumeRescued: '3,800 kg this month',
      costStructure: '₹1,45,000 Donor Revenue Recovered'
    },
    {
      tierNumber: 'Tier 3',
      title: 'Commercial Food Upcycling & Animal Feed',
      subtitle: 'Blemish / Day-End Processing',
      desc: 'Day-old bakery bread diverted to breadcrumb mills; bruised fruit converted to jams/purees; spent grains to cattle feed.',
      badge: 'Upcycled Ingredients',
      badgeColor: 'amber',
      icon: Factory,
      activeLots: 3,
      volumeRescued: '1,850 kg this month',
      costStructure: 'B2B Raw Material Supply'
    },
    {
      tierNumber: 'Tier 4',
      title: 'Anaerobic Biogas & Bio-Fertilizer (Bio-Economy)',
      subtitle: 'Expired / Inedible Organic Fractions',
      desc: 'Zero-landfill diversion. Spoiled curries and kitchen grease converted to clean methane cooking gas and compost.',
      badge: 'Zero Landfill / Clean Energy',
      badgeColor: 'purple',
      icon: Zap,
      activeLots: 2,
      volumeRescued: '350 kg this month',
      costStructure: '1,200 kWh Clean Energy Generated'
    }
  ];

  const secondaryMarketDeals = [
    {
      id: 'SEC-101',
      title: 'Executive 3-Course Dinner Box (Paneer Lababdar + Pulao + Gulab Jamun)',
      originalPrice: 280,
      flashPrice: 49,
      discount: '82% OFF',
      donor: 'Grand Pavilion Hotel Banquets',
      portionsLeft: 28,
      pickupWindow: 'Tonight, 9:30 PM – 10:45 PM',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SEC-102',
      title: 'Artisan Sourdough & Croissant Bag (6 Assorted Pastries)',
      originalPrice: 350,
      flashPrice: 59,
      discount: '83% OFF',
      donor: 'The Hearth & Crumb Artisan Bakery',
      portionsLeft: 14,
      pickupWindow: 'Tonight, 8:45 PM – 9:45 PM',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'SEC-103',
      title: 'Campus Hot Meal Thali Box (Chapati, Dal, Sabzi & Rice)',
      originalPrice: 120,
      flashPrice: 30,
      discount: '75% OFF',
      donor: 'TechnoWorld Central Hostel Mess',
      portionsLeft: 45,
      pickupWindow: 'Tonight, 10:00 PM – 11:00 PM',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Innovative Architecture: 4-Tier Food Salvage Cascade
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
              Zero Landfill Guarantee
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Circular Food Cascade & Secondary Marketplace
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Beyond binary charity: A dynamic 4-tier funnel routing food to charity, budget flash buyers, upcyclers, and biogas digesters.
          </p>
        </div>

        <button
          onClick={() => showToast('Donor revenue recovery dashboard synchronized.', 'success')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Donor Cost Recovery: ₹1.45L</span>
        </button>
      </div>

      {/* The 4-Tier Hierarchy Flow Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cascadeTiers.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-black text-slate-400">{tier.tierNumber}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tier.badgeColor === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                    tier.badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                    tier.badgeColor === 'amber' ? 'bg-amber-100 text-amber-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{tier.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">{tier.subtitle}</p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tier.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
                <span className="text-slate-500 font-semibold block text-[11px]">Impact / Economics:</span>
                <span className="font-bold text-slate-900 block">{tier.costStructure}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tier 2 Showcase: Flash Rescue Secondary Marketplace */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-blue-100 text-blue-700">
                <ShoppingBag className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-slate-900 text-lg">Tier 2: "Flash Rescue" Budget Meal Box Deals</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              5-Star & banquet surplus made affordable for gig workers, students & night-shift laborers before closing.
            </p>
          </div>

          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 w-fit">
            3 Live Flash Deals Open
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryMarketDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between group hover:border-blue-400 transition-all"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded shadow">
                  {deal.discount}
                </span>
                <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded">
                  {deal.portionsLeft} Boxes Left
                </span>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">{deal.donor}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-2">{deal.title}</h4>
                  <p className="text-[11px] text-amber-700 font-medium mt-1">Pickup: {deal.pickupWindow}</p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-slate-900">₹{deal.flashPrice}</span>
                    <span className="text-xs text-slate-400 line-through">₹{deal.originalPrice}</span>
                  </div>

                  <button
                    onClick={() => showToast(`Claimed Flash Rescue Box #${deal.id} for ₹${deal.flashPrice}. Collection code sent!`, 'success')}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    Flash Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
