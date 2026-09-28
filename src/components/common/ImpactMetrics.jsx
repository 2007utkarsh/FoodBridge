import React from 'react';
import { Utensils, Building2, HeartHandshake, Truck, Leaf, TrendingUp } from 'lucide-react';
import { useFoodBridge } from '../../context/FoodBridgeContext';

export default function ImpactMetrics({ variant = 'grid' }) {
  const { metrics } = useFoodBridge();

  const stats = [
    {
      label: 'Food Rescued',
      value: `${(metrics.foodRescuedKg || 18450).toLocaleString()} kg`,
      subtext: `${(metrics.mealsDistributed || 46120).toLocaleString()} meals distributed`,
      icon: Utensils,
      color: 'emerald',
      bgLight: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-600',
      trend: '+14% this week'
    },
    {
      label: 'NGOs Connected',
      value: `${metrics.ngosConnected || 84}`,
      subtext: 'Verified shelters & kitchens',
      icon: HeartHandshake,
      color: 'blue',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-600',
      trend: '+8 joined'
    },
    {
      label: 'Food Sources',
      value: `${metrics.foodSources || 126}`,
      subtext: 'Caterers, hotels, messes & cafes',
      icon: Building2,
      color: 'amber',
      bgLight: 'bg-amber-50',
      textColor: 'text-amber-700',
      iconBg: 'bg-amber-600',
      trend: '98% hygiene rating'
    },
    {
      label: 'Completed Deliveries',
      value: `${(metrics.deliveriesCompleted || 1390).toLocaleString()}`,
      subtext: 'Safe & tracked handovers',
      icon: Truck,
      color: 'purple',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-700',
      trend: 'Avg 32 min turnaround'
    },
    {
      label: 'CO₂ Emission Saved',
      value: `${((metrics.co2SavedKg || 35050) / 1000).toFixed(1)} tons`,
      subtext: 'Methane & landfill diverted',
      icon: Leaf,
      color: 'teal',
      bgLight: 'bg-teal-50',
      textColor: 'text-teal-700',
      iconBg: 'bg-teal-600',
      trend: 'Eco-certified'
    }
  ];

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.slice(0, 4).map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgLight} ${stat.textColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 leading-tight">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.bgLight} ${stat.textColor} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  {stat.trend}
                </span>
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
                <p className="text-sm font-semibold text-slate-700 mt-0.5">{stat.label}</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{stat.subtext}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent group-hover:via-emerald-400 transition-all duration-500" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
