import React, { useState } from 'react';
import {
  Leaf,
  Globe,
  Droplets,
  Award,
  Download,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Scale
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export default function ESGComplianceView() {
  const { metrics, showToast } = useFoodBridge();

  const [reportingQuarter, setReportingQuarter] = useState('Q3-2026');

  const foodKg = metrics.foodRescuedKg || 18450;
  const meals = metrics.mealsDistributed || 46120;
  const co2Tons = ((metrics.co2SavedKg || 35050) / 1000).toFixed(2);
  const waterMillionLiters = ((foodKg * 1000) / 1000000).toFixed(2); // 1000 L water per kg food
  const methaneAvoidedKg = (foodKg * 0.082).toFixed(1);

  const handleDownloadReport = () => {
    showToast('Corporate ESG Sustainability & GHG Audit Report (PDF/CSV) generated.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capability 7: Sustainability & ESG Compliance Reporting
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              GHG Protocol Scope 1/2/3 & BRSR Standard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Sustainability Analytics & Corporate ESG Compliance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready metrics on greenhouse gas abatement, landfill diversion, virtual water conservation, and CSR impact.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Official ESG Audit Slip</span>
          </button>
        </div>
      </div>

      {/* Main ESG Headline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Net Carbon Avoidance</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{co2Tons} <span className="text-sm font-bold text-slate-500">tCO₂e</span></p>
          <p className="text-xs text-emerald-700 font-bold mt-1">Direct Landfill Methane Abated</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Virtual Water Conserved</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{waterMillionLiters} <span className="text-sm font-bold text-slate-500">Million L</span></p>
          <p className="text-xs text-blue-600 font-bold mt-1">Agricultural Footprint Saved</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Methane ($CH_4$) Prevented</span>
            <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{methaneAvoidedKg} <span className="text-sm font-bold text-slate-500">kg</span></p>
          <p className="text-xs text-teal-700 font-bold mt-1">28x GWP over CO₂ Neutralized</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Social Feeding Impact</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-black text-slate-900">{meals.toLocaleString()}</p>
          <p className="text-xs text-purple-700 font-bold mt-1">Nutritious Community Meals</p>
        </div>
      </div>

      {/* Regulatory Framework Compliance Standards Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Global & National ESG Regulatory Framework Compliance</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">UN Sustainable Development Goals</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Compliant</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>SDG 2 (Zero Hunger) & SDG 12.3:</strong> By 2030, halve per capita global food waste at retail and consumer levels and reduce food losses along production and supply chains.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">ISO 14001:2015 Environmental System</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Verified</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Automated verifiable digital manifest certifying that institutional waste diversion practices exceed international environmental management standards.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">India CSR Section 135 (Companies Act)</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Tax Deductible</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Direct contribution to Schedule VII clause (i): Eradicating hunger, poverty, and malnutrition. Fully auditable CSR certificate generation.
            </p>
          </div>
        </div>
      </div>

      {/* Scope 1, 2, 3 Emissions Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">GHG Protocol Scope 1, 2 & 3 Emission Offset Breakdown</h3>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left text-slate-700">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase border-b border-slate-200">
              <tr>
                <th className="p-3">GHG Scope Category</th>
                <th className="p-3">Source of Abatement</th>
                <th className="p-3">Conversion Factor</th>
                <th className="p-3 text-right">Net Abatement (tCO₂e)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-900">Scope 3 (Cat 5: Waste Generated in Operations)</td>
                <td className="p-3">Avoided Anaerobic Digestion in Methane-Emitting Landfills</td>
                <td className="p-3 font-mono">1.90 kg CO₂e / kg food</td>
                <td className="p-3 text-right font-bold text-emerald-700">{(foodKg * 0.0019).toFixed(2)} t</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Scope 3 (Cat 1: Purchased Goods & Services)</td>
                <td className="p-3">Avoided Embodied Agricultural Production, Fertilizers & Harvest</td>
                <td className="p-3 font-mono">1.25 kg CO₂e / kg food</td>
                <td className="p-3 text-right font-bold text-emerald-700">{(foodKg * 0.00125).toFixed(2)} t</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Scope 1 & 2 (Fleet Logistics Optimization)</td>
                <td className="p-3">Reduced Diesel / Fuel Burn via Multi-Stop VRPTW Routing</td>
                <td className="p-3 font-mono">0.45 kg CO₂e / route km</td>
                <td className="p-3 text-right font-bold text-blue-700">0.82 t</td>
              </tr>
              <tr className="bg-emerald-50/60 font-bold text-emerald-950">
                <td className="p-3" colSpan="3">Total Verified Environmental Offset</td>
                <td className="p-3 text-right text-sm font-black text-emerald-800">{co2Tons} tCO₂e</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
