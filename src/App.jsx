import React from 'react';
import { FoodBridgeProvider, useFoodBridge } from './context/FoodBridgeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// 12 PS26234 Specification Pages
import LandingPage from './pages/LandingPage';
import FoodSourceDashboardPage from './pages/FoodSourceDashboardPage';
import InventoryPage from './pages/InventoryPage';
import RegisterSurplusPage from './pages/RegisterSurplusPage';
import MySurplusPage from './pages/MySurplusPage';
import SmartSurplusAnalysisPage from './pages/SmartSurplusAnalysisPage';
import SmartMatchingPage from './pages/SmartMatchingPage';
import NGODashboardPage from './pages/NGODashboardPage';
import FoodDetailsPage from './pages/FoodDetailsPage';
import RedistributionPage from './pages/RedistributionPage';
import LogisticsMapPage from './pages/LogisticsMapPage';
import SustainabilityPage from './pages/SustainabilityPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

// AI Intelligence & IoT Suite
import DemandPredictionView from './views/DemandPredictionView';
import QualityInspectionView from './views/QualityInspectionView';
import LogisticsOptimizerView from './views/LogisticsOptimizerView';
import ProcessingEfficiencyView from './views/ProcessingEfficiencyView';
import ProductionPlanningView from './views/ProductionPlanningView';
import ESGComplianceView from './views/ESGComplianceView';
import CircularCascadeView from './views/CircularCascadeView';

// Global Food-Only Chatbot Widget
import FoodBridgeChatbot from './components/common/FoodBridgeChatbot';

import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

function AppContent() {
  const { currentView, toast } = useFoodBridge();

  const renderCurrentView = () => {
    switch (currentView) {
      // 1. Landing Page
      case 'landing':
        return <LandingPage />;

      // 2. Food Source Dashboard
      case 'food-source-dashboard':
      case 'provider-dashboard':
        return <FoodSourceDashboardPage />;

      // 3. Inventory Page
      case 'inventory':
        return <InventoryPage />;

      // 4. Post / Register Surplus Page
      case 'register-surplus':
      case 'post-food':
        return <RegisterSurplusPage />;

      // Step 3: My Registered Surplus Page
      case 'my-surplus':
        return <MySurplusPage />;

      // 5. Smart Surplus Analysis Page
      case 'smart-surplus-analysis':
        return <SmartSurplusAnalysisPage />;

      // 6. Smart Recipient Matching Page (Key Feature)
      case 'smart-matching':
        return <SmartMatchingPage />;

      // 7. NGO Dashboard
      case 'ngo-dashboard':
        return <NGODashboardPage />;

      // 8. Food Details Page
      case 'food-details':
        return <FoodDetailsPage />;

      // 9. Redistribution / Request Page
      case 'redistribution-lifecycle':
      case 'requests':
        return <RedistributionPage />;

      // 10. Map / Logistics Page
      case 'logistics-map':
      case 'tracking':
        return <LogisticsMapPage />;

      // 11. Sustainability / Impact Dashboard
      case 'sustainability-impact':
        return <SustainabilityPage />;

      // 12. Admin Dashboard
      case 'admin-dashboard':
        return <AdminDashboardPage />;

      // Deep AI Predictive & IoT Suite (Bonus Modules)
      case 'circular-cascade':
        return <CircularCascadeView />;
      case 'demand-forecast':
        return <DemandPredictionView />;
      case 'quality-vision':
        return <QualityInspectionView />;
      case 'logistics-optimizer':
        return <LogisticsOptimizerView />;
      case 'processing-efficiency':
        return <ProcessingEfficiencyView />;
      case 'production-planning':
        return <ProductionPlanningView />;
      case 'esg-compliance':
        return <ESGComplianceView />;

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1">
        {renderCurrentView()}
      </main>

      <Footer />

      {/* Global AI Bilingual Food-Guardrailed Chatbot */}
      <FoodBridgeChatbot />

      {/* Global Toast Feedback */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-900/95 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-900/95 text-white border-rose-700'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <FoodBridgeProvider>
      <AppContent />
    </FoodBridgeProvider>
  );
}
