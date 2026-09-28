import React, { useState } from 'react';
import {
  Eye,
  Camera,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Thermometer,
  Wind,
  Layers,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Cpu,
  Radio,
  FileCheck
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

const CV_SAMPLES = [
  {
    id: 'sample_1',
    name: 'Fresh Harvest Bell Peppers & Tomatoes',
    category: 'Raw Produce',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    freshnessScore: 96,
    grade: 'Grade A+ (Premium)',
    shelfLifeRemaining: '48 Hours',
    tier: 'Tier 1: Fit for Human Consumption',
    tierColor: 'emerald',
    cvDetections: [
      { label: 'Surface Firmness', confidence: 0.98, status: 'Normal' },
      { label: 'Color Saturation', confidence: 0.97, status: 'Optimal' },
      { label: 'Skin Blemish Index', confidence: 0.03, status: 'Negligible' }
    ],
    recommendation: 'Immediate distribution to shelters or cold storage hold.'
  },
  {
    id: 'sample_2',
    name: 'Hot-Held Basmati Rice & Dal Banquet Surplus',
    category: 'Cooked Meals',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    freshnessScore: 88,
    grade: 'Grade A (Commercial Ready)',
    shelfLifeRemaining: '3.5 Hours (Hot-Hold SLA)',
    tier: 'Tier 1: Fit for Human Consumption',
    tierColor: 'emerald',
    cvDetections: [
      { label: 'Thermal Steam Plume', confidence: 0.94, status: 'Confirmed >60°C' },
      { label: 'Surface Texture Integrity', confidence: 0.91, status: 'Intact' },
      { label: 'Oil Separation', confidence: 0.05, status: 'Normal' }
    ],
    recommendation: 'Priority express dispatch to nearby community shelter within 2 hours.'
  },
  {
    id: 'sample_3',
    name: 'Over-Ripened Soft Fruits & Bananas',
    category: 'Produce Surplus',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
    freshnessScore: 54,
    grade: 'Grade C (Secondary Processing)',
    shelfLifeRemaining: '8 Hours',
    tier: 'Tier 2: Secondary Food Processing',
    tierColor: 'amber',
    cvDetections: [
      { label: 'Sugar Spotting / Freckling', confidence: 0.88, status: 'High Sugar Content' },
      { label: 'Soft Tissue Compression', confidence: 0.72, status: 'Moderate' },
      { label: 'Pathogenic Mold', confidence: 0.01, status: 'None Detected' }
    ],
    recommendation: 'Route to bakery processing for banana bread/puree or institutional livestock feed.'
  },
  {
    id: 'sample_4',
    name: 'Expired / Fermenting Discolored Cooked Curries',
    category: 'Spoiled Lot',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    freshnessScore: 21,
    grade: 'Grade F (Contaminated/Spoiled)',
    shelfLifeRemaining: '0 Hours (Expired)',
    tier: 'Tier 3: Biogas & Composting (Zero Landfill)',
    tierColor: 'rose',
    cvDetections: [
      { label: 'Surface Microbial Film', confidence: 0.93, status: 'Contamination Detected' },
      { label: 'Abnormal Discoloration', confidence: 0.89, status: 'Oxidized' },
      { label: 'Gas Pocket Bubbling', confidence: 0.78, status: 'Active Fermentation' }
    ],
    recommendation: 'DO NOT REDISTRIBUTE. Transfer lot to anaerobic digester for methane biogas conversion.'
  }
];

export default function QualityInspectionView() {
  const { navigateTo, showToast } = useFoodBridge();

  const [selectedSample, setSelectedSample] = useState(CV_SAMPLES[0]);
  const [analyzing, setAnalyzing] = useState(false);

  // Live IoT sensor state simulation
  const [iotState, setIotState] = useState({
    coldRoomTemp: 3.4,
    hotHoldingTemp: 64.8,
    relativeHumidity: 68,
    ethylenePpm: 0.14,
    tvocPpm: 0.08,
    isAbnormal: false
  });

  const handleSelectSample = (sample) => {
    setAnalyzing(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setAnalyzing(false);
      showToast(`Computer Vision analysis complete for ${sample.name}.`, 'info');
    }, 600);
  };

  const simulateThermalAbuse = () => {
    setIotState({
      coldRoomTemp: 11.8, // Dangerous warm temperature
      hotHoldingTemp: 48.2, // Below safe hot-hold
      relativeHumidity: 84,
      ethylenePpm: 1.45,
      tvocPpm: 0.62,
      isAbnormal: true
    });
    showToast('CRITICAL IOT ALERT: Cold-room temperature breach (>10°C) and elevated TVOC microbial gas!', 'error');
  };

  const resetIotSensors = () => {
    setIotState({
      coldRoomTemp: 3.4,
      hotHoldingTemp: 64.8,
      relativeHumidity: 68,
      ethylenePpm: 0.14,
      tvocPpm: 0.08,
      isAbnormal: false
    });
    showToast('IoT Sensors recalibrated to optimal commercial parameters.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Capability 2: Computer Vision & Multi-Gas IoT Telemetry
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
              Edge Model: YOLOv8-Seg + ResNet-50
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Automated Quality Inspection & Spoilage Detection
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify freshness decay before human perception using image defect segmentation and IoT environmental telemetries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {selectedSample.freshnessScore >= 70 ? (
            <button
              onClick={() => navigateTo('post-food')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified Safe: Post for NGO Claim</span>
            </button>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              Not Safe for Immediate Distribution
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Left Computer Vision Scanner + Right Real-Time IoT Sensors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Computer Vision Inspector (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Computer Vision Quality Inspector</h3>
                  <p className="text-[11px] text-slate-500">Optical defect segmentation & freshness grading</p>
                </div>
              </div>

              {/* Sample switcher pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-400">Test Samples:</span>
                {CV_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedSample.id === sample.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sample.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Screen with Simulated AI Bounding Box Overlays */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 group">
              <img
                src={selectedSample.image}
                alt={selectedSample.name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  analyzing ? 'opacity-40' : 'opacity-85'
                }`}
              />

              {/* AI Neural Scan Line Effect */}
              {analyzing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 text-white">
                  <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                  <p className="text-xs font-bold">Running YOLOv8 Defect Inference...</p>
                  <p className="text-[11px] text-slate-400">Extracting color histograms & surface texture</p>
                </div>
              ) : (
                <>
                  {/* Bounding Box 1 */}
                  <div className="absolute top-[20%] left-[25%] w-48 h-32 border-2 border-emerald-400 bg-emerald-500/10 rounded-lg p-1.5 pointer-events-none animate-pulse">
                    <span className="bg-emerald-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                      Surface Uniformity: 98.4%
                    </span>
                  </div>

                  {/* Bounding Box 2 */}
                  <div className="absolute bottom-[20%] right-[25%] w-44 h-28 border-2 border-blue-400 bg-blue-500/10 rounded-lg p-1.5 pointer-events-none">
                    <span className="bg-blue-600 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                      Microbial Risk: Low (0.02)
                    </span>
                  </div>

                  {/* Top Bar on Image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-white font-mono font-semibold">
                      Live Optical Stream • 1080p
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900/85 backdrop-blur-md text-emerald-400 font-bold">
                      Confidence: 97.2%
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Analysis Diagnostics Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-semibold block">Freshness Index</span>
                <span className={`text-3xl font-black mt-1 block ${
                  selectedSample.freshnessScore >= 80 ? 'text-emerald-700' : selectedSample.freshnessScore >= 50 ? 'text-amber-600' : 'text-rose-600'
                }`}>
                  {selectedSample.freshnessScore}%
                </span>
                <span className="text-[11px] font-bold text-slate-700">{selectedSample.grade}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-semibold block">Estimated Shelf Life</span>
                <span className="text-xl font-black text-slate-900 mt-1 block truncate">
                  {selectedSample.shelfLifeRemaining}
                </span>
                <span className="text-[11px] text-slate-500">Before bacterial hazard</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] text-slate-500 font-semibold block">Redistribution Tier</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block leading-tight">
                  {selectedSample.tier}
                </span>
              </div>
            </div>

            {/* AI Actionable Decision Box */}
            <div className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
              selectedSample.freshnessScore >= 70
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : selectedSample.freshnessScore >= 40
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {selectedSample.freshnessScore >= 70 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-bold text-sm">Automated Safety Protocol Recommendation</p>
                <p className="mt-0.5 leading-relaxed">{selectedSample.recommendation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: IoT Smart Storage Telemetry (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-600 animate-pulse" />
                <h3 className="font-bold text-slate-900 text-sm">Cold Chain & Storage IoT</h3>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                iotState.isAbnormal ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {iotState.isAbnormal ? 'ALERT: ANOMALY' : 'ONLINE • NORMAL'}
              </span>
            </div>

            {/* Sensor gauges */}
            <div className="space-y-3 text-xs">
              {/* Cold Room Temp */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                iotState.coldRoomTemp > 5 ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-blue-600" /> Walk-In Chiller Temp
                  </span>
                  <span className={`text-base font-black ${
                    iotState.coldRoomTemp > 5 ? 'text-rose-700' : 'text-slate-900'
                  }`}>
                    {iotState.coldRoomTemp}°C
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Target: 2°C – 4°C</span>
                  <span>{iotState.coldRoomTemp > 5 ? 'Thermal Breach!' : 'Compliant'}</span>
                </div>
              </div>

              {/* Hot-Holding Temp */}
              <div className={`p-3.5 rounded-2xl border transition-all ${
                iotState.hotHoldingTemp < 60 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-amber-600" /> Hot-Holding Chafing Line
                  </span>
                  <span className={`text-base font-black ${
                    iotState.hotHoldingTemp < 60 ? 'text-amber-700' : 'text-slate-900'
                  }`}>
                    {iotState.hotHoldingTemp}°C
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Target: &gt;60°C</span>
                  <span>{iotState.hotHoldingTemp < 60 ? 'Danger Zone' : 'HACCP Safe'}</span>
                </div>
              </div>

              {/* Ethylene & Spoilage Gas */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-purple-600" /> Ethylene Ripening Gas
                  </span>
                  <span className="text-base font-black text-slate-900">{iotState.ethylenePpm} ppm</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>MQ-135 Sensor</span>
                  <span>Threshold: &lt; 0.50 ppm</span>
                </div>
              </div>

              {/* TVOC Microbial Gas */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-teal-600" /> TVOC Microbial Emission
                  </span>
                  <span className="text-base font-black text-slate-900">{iotState.tvocPpm} ppm</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Bacterial decomposition index</span>
                  <span>Normal</span>
                </div>
              </div>
            </div>

            {/* Test Simulation Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={simulateThermalAbuse}
                className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Simulate: Cold Storage Breach
              </button>

              <button
                type="button"
                onClick={resetIotSensors}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset IoT Telemetry Stream
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
