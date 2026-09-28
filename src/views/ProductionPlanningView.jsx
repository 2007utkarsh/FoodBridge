import React, { useState } from 'react';
import {
  Calendar,
  Layers,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  ArrowRight,
  ShoppingCart,
  ChefHat,
  Package,
  FileSpreadsheet
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export default function ProductionPlanningView() {
  const { showToast, navigateTo } = useFoodBridge();

  const [shift, setShift] = useState('dinner');

  const recipeBatches = [
    {
      id: 'REC-01',
      dish: 'Mughlai Shahi Paneer',
      category: 'Main Course (Curry)',
      targetPortions: 840,
      scaledWeightKg: 168,
      prepWindow: '16:00 – 17:30',
      ingredients: [
        { name: 'Fresh Paneer', qty: '42 kg', status: 'In Cold Room' },
        { name: 'Tomato Puree', qty: '35 kg', status: 'In Pantry' },
        { name: 'Cashew & Cream Gravy', qty: '20 kg', status: 'Prepped' }
      ],
      safetyBuffer: '4% (Safe margin)'
    },
    {
      id: 'REC-02',
      dish: 'Aromatic Dum Jeera Rice',
      category: 'Staple (Grains)',
      targetPortions: 840,
      scaledWeightKg: 210,
      prepWindow: '17:00 – 18:15',
      ingredients: [
        { name: 'Aged Basmati Rice', qty: '78 kg', status: 'In Silo' },
        { name: 'Cumin & Ghee Blend', qty: '8 kg', status: 'Pantry' }
      ],
      safetyBuffer: '3% (Low risk)'
    },
    {
      id: 'REC-03',
      dish: 'Homestyle Yellow Dal Tadka',
      category: 'Lentils',
      targetPortions: 840,
      scaledWeightKg: 140,
      prepWindow: '16:30 – 17:45',
      ingredients: [
        { name: 'Toor & Moong Dal', qty: '38 kg', status: 'In Pantry' },
        { name: 'Tempering Aromatics', qty: '12 kg', status: 'Pre-chopped' }
      ],
      safetyBuffer: '3% (Low risk)'
    },
    {
      id: 'REC-04',
      dish: 'Whole Wheat Tandoori Rotis',
      category: 'Breads',
      targetPortions: 1680,
      scaledWeightKg: 110,
      prepWindow: '18:00 – 20:30 (Live Batches)',
      ingredients: [
        { name: 'Whole Wheat Atta', qty: '65 kg', status: 'In Silo' },
        { name: 'Yeast & Water Prep', qty: '45 L', status: 'Ready' }
      ],
      safetyBuffer: 'Dynamic batch baking based on queue'
    }
  ];

  const procurementOrders = [
    { item: 'Organic Fresh Tomatoes', needed: '45 kg', stock: '20 kg', toOrder: '25 kg', shelfLife: '4 Days', urgency: 'Immediate' },
    { item: 'Dairy Fresh Paneer', needed: '42 kg', stock: '45 kg', toOrder: '0 kg (Surplus In Chiller)', shelfLife: '2 Days', urgency: 'Sufficient' },
    { item: 'Green Bell Peppers', needed: '30 kg', stock: '8 kg', toOrder: '22 kg', shelfLife: '5 Days', urgency: 'Immediate' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capability 8: Smart Production & Procurement Planning
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Dynamic MRP Recipe Scaler
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Data-Driven Kitchen Production & Batch Planning
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronize raw material procurement and recipe batch yields directly to AI-predicted footfall.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Production schedule and kitchen recipe sheets exported to KDS display.', 'success')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export to Kitchen Display (KDS)</span>
          </button>
        </div>
      </div>

      {/* Target Shift Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Active Shift Target: Friday Evening Dinner</h3>
            <p className="text-xs text-slate-500">
              Target Headcount: <strong className="text-emerald-700">840 Servings</strong> (AI Demand Forecast Optimized)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Overprep Waste Diverted: 120 kg
          </span>
          <button
            onClick={() => navigateTo('demand-forecast')}
            className="text-xs text-slate-600 font-semibold hover:text-emerald-700 underline"
          >
            Change Forecast Parameters &rarr;
          </button>
        </div>
      </div>

      {/* Scaled Recipes Batches Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Dynamic Recipe Scaling & Batch Schedules</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recipeBatches.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{recipe.dish}</h4>
                  <span className="text-xs text-slate-500">{recipe.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-slate-700 block">{recipe.prepWindow}</span>
                  <span className="text-[11px] font-bold text-emerald-700">{recipe.safetyBuffer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Target Portions</span>
                  <span className="font-bold text-slate-800 text-sm">{recipe.targetPortions} plates</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Net Batch Mass</span>
                  <span className="font-bold text-emerald-700 text-sm">{recipe.scaledWeightKg} kg</span>
                </div>
              </div>

              {/* Ingredient breakdown */}
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-semibold text-[10px] uppercase block">Required Ingredients:</span>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex justify-between items-center text-slate-700 py-0.5 border-b border-slate-50">
                    <span>{ing.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{ing.qty}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600">{ing.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Consumer Shelf-Life Procurement Optimizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Just-In-Time Raw Ingredient Procurement Orders</h3>
            <p className="text-xs text-slate-500">Prevent raw produce rotting in storage by ordering only exact forecasted deficits</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
            Zero Overstocking Protocol
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">Ingredient</th>
                <th className="p-3">Batch Requirement</th>
                <th className="p-3">Current Storage Stock</th>
                <th className="p-3">AI Purchase Order</th>
                <th className="p-3">Storage Shelf-Life</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {procurementOrders.map((ord, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{ord.item}</td>
                  <td className="p-3">{ord.needed}</td>
                  <td className="p-3">{ord.stock}</td>
                  <td className="p-3 font-bold text-emerald-700">{ord.toOrder}</td>
                  <td className="p-3">{ord.shelfLife}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      ord.toOrder === '0 kg (Surplus In Chiller)'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ord.urgency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
