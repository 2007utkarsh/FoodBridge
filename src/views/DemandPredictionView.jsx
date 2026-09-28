import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Calendar,
  CloudSun,
  Users,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BarChart2,
  DollarSign,
  Scale,
  Zap,
  Info
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export default function DemandPredictionView() {
  const { navigateTo, showToast } = useFoodBridge();

  const [facility, setFacility] = useState('hostel_mess');
  const [dayType, setDayType] = useState('friday');
  const [eventFactor, setEventFactor] = useState('exam_week');
  const [weather, setWeather] = useState('rainy');
  const [registeredHeadcount, setRegisteredHeadcount] = useState(1200);

  // Dynamic ML Prediction logic simulation
  const calculatePrediction = () => {
    let turnoutRatio = 0.85;

    // Day impact
    if (dayType === 'friday') turnoutRatio -= 0.12;
    if (dayType === 'saturday' || dayType === 'sunday') turnoutRatio -= 0.28;
    if (dayType === 'midweek') turnoutRatio += 0.05;

    // Event impact
    if (eventFactor === 'exam_week') turnoutRatio -= 0.14; // Many skip mess for library/snacks
    if (eventFactor === 'festive_special') turnoutRatio += 0.18;
    if (eventFactor === 'long_weekend') turnoutRatio -= 0.35; // Mass travel home

    // Weather impact
    if (weather === 'rainy') turnoutRatio += 0.08; // More people eat inside
    if (weather === 'extreme_heat') turnoutRatio -= 0.06;

    // Clamp
    turnoutRatio = Math.max(0.4, Math.min(1.0, turnoutRatio));

    const predictedTurnout = Math.round(registeredHeadcount * turnoutRatio);
    const standardPrepKg = Math.round(registeredHeadcount * 0.45); // 450g per person baseline
    const aiRecommendedPrepKg = Math.round(predictedTurnout * 0.46); // AI target with safe 3% buffer
    const projectedSurplusWithoutAI = Math.max(0, standardPrepKg - Math.round(predictedTurnout * 0.42));
    const projectedSurplusWithAI = Math.round(aiRecommendedPrepKg * 0.04);
    const wasteCostSaved = Math.round((projectedSurplusWithoutAI - projectedSurplusWithAI) * 140); // 140 INR/kg est

    return {
      turnoutRatio: Math.round(turnoutRatio * 100),
      predictedTurnout,
      standardPrepKg,
      aiRecommendedPrepKg,
      projectedSurplusWithoutAI,
      projectedSurplusWithAI,
      wasteCostSaved,
      confidenceScore: 92.4
    };
  };

  const pred = calculatePrediction();

  // Historical 7-day trend simulation
  const historicalData = [
    { day: 'Mon', actual: 980, predicted: 970, surplusKg: 14 },
    { day: 'Tue', actual: 1040, predicted: 1025, surplusKg: 18 },
    { day: 'Wed', actual: 1010, predicted: 1015, surplusKg: 12 },
    { day: 'Thu', actual: 950, predicted: 960, surplusKg: 15 },
    { day: 'Fri (Today)', actual: pred.predictedTurnout, predicted: pred.predictedTurnout, surplusKg: pred.projectedSurplusWithAI, current: true },
    { day: 'Sat (Forecast)', actual: Math.round(pred.predictedTurnout * 0.72), predicted: Math.round(pred.predictedTurnout * 0.72), surplusKg: 8 },
    { day: 'Sun (Forecast)', actual: Math.round(pred.predictedTurnout * 0.68), predicted: Math.round(pred.predictedTurnout * 0.68), surplusKg: 9 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capability 1: Predictive AI & Machine Learning
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              Model: Temporal Fusion Transformer v2.4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real-Time Food Demand & Surplus Prediction
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Forecast actual consumer footfall, eliminate overproduction, and pre-alert redistribution networks before food is even cooked.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              showToast('AI batch size recommendation linked to Kitchen Production Planner.', 'success');
              navigateTo('production-planning');
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply to Production Planner</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Parameters + AI Prediction Engine Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive Scenario Variables (1 Col) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Feature Inputs & Context</h3>
              <p className="text-[11px] text-slate-500">Live variables feeding the inference model</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Institutional Facility</label>
              <select
                value={facility}
                onChange={(e) => setFacility(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="hostel_mess">TechnoWorld Central Hostel Mess (1,200 Capacity)</option>
                <option value="corporate_dining">CyberTech Corporate Cafeteria (2,500 Employees)</option>
                <option value="hotel_banquet">Grand Pavilion Hotel Banquet Services</option>
                <option value="hospital_canteen">Metro Care Hospital Patient & Staff Kitchen</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Registered Headcount: <strong className="text-emerald-700">{registeredHeadcount}</strong>
              </label>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={registeredHeadcount}
                onChange={(e) => setRegisteredHeadcount(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>300 (Small)</span>
                <span>1,500 (Medium)</span>
                <span>3,000 (Mega Kitchen)</span>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Day of Week Cycle</label>
              <select
                value={dayType}
                onChange={(e) => setDayType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
              >
                <option value="midweek">Midweek (Tuesday - Thursday) [High Attendance]</option>
                <option value="friday">Friday [Out-of-Mess Dining Surge]</option>
                <option value="saturday">Saturday / Weekend [Low In-House Footfall]</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Institutional Calendar Factor</label>
              <select
                value={eventFactor}
                onChange={(e) => setEventFactor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
              >
                <option value="exam_week">Exam Week / Library Study Crunch (-14% turnout)</option>
                <option value="regular">Regular Working / Class Schedule (Baseline)</option>
                <option value="festive_special">Festive / Special Menu Day (+18% turnout)</option>
                <option value="long_weekend">Long Weekend Vacation (-35% turnout)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Live Weather Telemetry</label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
              >
                <option value="rainy">Monsoon / Heavy Rain (Drives +8% indoor dining)</option>
                <option value="sunny">Mild Sunny (Standard dining pattern)</option>
                <option value="extreme_heat">Heatwave Warning (-6% lunch attendance)</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
            <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Model correlates POS swipe card logs with academic calendars and OpenWeatherMap APIs to predict demand up to 48 hours in advance.
            </p>
          </div>
        </div>

        {/* Right Columns: AI Prediction Dashboard (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Output Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Predicted Actual Turnout</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">{pred.predictedTurnout}</span>
                <span className="text-xs text-slate-500">/ {registeredHeadcount}</span>
              </div>
              <p className="text-xs text-emerald-700 font-bold mt-1">
                {pred.turnoutRatio}% Expected Footfall
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Recommended Batch Prep</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-emerald-700">{pred.aiRecommendedPrepKg}</span>
                <span className="text-xs text-slate-500 font-bold">kg</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-through">
                Standard: {pred.standardPrepKg} kg
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">Daily Overprep Cost Prevented</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-blue-700">₹{pred.wasteCostSaved.toLocaleString()}</span>
              </div>
              <p className="text-xs text-blue-600 font-bold mt-1">
                {pred.projectedSurplusWithoutAI - pred.projectedSurplusWithAI} kg surplus prevented
              </p>
            </div>
          </div>

          {/* Detailed Surplus Comparison Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Surplus Generation Risk Analysis</h3>
                <p className="text-xs text-slate-500">Traditional fixed recipe prep vs AI dynamic batching</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Model Confidence: {pred.confidenceScore}%
              </span>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Traditional Rule-of-Thumb Prep (High Risk of Dumped Surplus)
                  </span>
                  <span className="font-bold text-rose-800">{pred.projectedSurplusWithoutAI} kg surplus</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${Math.min(100, (pred.projectedSurplusWithoutAI / pred.standardPrepKg) * 100 * 2.5)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> AI Recommended Batch (Buffer optimized for zero plate stockout)
                  </span>
                  <span className="font-bold text-emerald-800">{pred.projectedSurplusWithAI} kg minimal safe buffer</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, (pred.projectedSurplusWithAI / pred.aiRecommendedPrepKg) * 100 * 2.5)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Consumption & Surplus Forecast Chart Simulation */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">7-Day Actual vs AI Forecast Curve</h3>

            <div className="grid grid-cols-7 gap-2 items-end pt-6 h-48 border-b border-slate-100 pb-2 text-center">
              {historicalData.map((d, i) => {
                const heightPercent = Math.round((d.predicted / 1300) * 100);
                return (
                  <div key={i} className="flex flex-col items-center h-full justify-end group">
                    <div className="text-[10px] text-slate-500 mb-1 font-semibold group-hover:text-emerald-700">
                      {d.predicted}
                    </div>
                    <div
                      className={`w-full max-w-[32px] rounded-t-lg transition-all ${
                        d.current
                          ? 'bg-emerald-600 shadow-md ring-2 ring-emerald-400'
                          : 'bg-slate-200 group-hover:bg-emerald-400'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className={`text-[10px] mt-2 font-medium truncate w-full ${d.current ? 'font-bold text-emerald-800' : 'text-slate-500'}`}>
                      {d.day.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600"></span>
                Active Shift Target
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-200"></span>
                Past Actuals / Horizon
              </span>
              <button
                onClick={() => navigateTo('post-food')}
                className="text-emerald-700 font-bold hover:underline"
              >
                Pre-book surplus lot for NGO &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
