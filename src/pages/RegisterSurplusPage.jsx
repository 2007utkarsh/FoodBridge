import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import SurplusForm from '../components/common/SurplusForm';
import SuccessMessage from '../components/common/SuccessMessage';
import VoiceSurplusModal from '../components/common/VoiceSurplusModal';
import { PlusCircle, Sparkles, Mic, ArrowLeft, Building2 } from 'lucide-react';

/**
 * Dedicated Page: "Register Surplus Food"
 * Form fields:
 * - Food Name, Food Category, Quantity, Unit, Preparation/Processing Time, Available Until, Pickup Required, Pickup Location, Additional Notes
 * - Validation: Food name, Quantity > 0, Available-until time, Location
 * - Success State: Professional confirmation with "View My Surplus" and "Register Another"
 */
export default function RegisterSurplusPage() {
  const {
    prefillSurplusItem,
    setPrefillSurplusItem,
    registerSurplusFood,
    lastRegisteredSurplus,
    navigateTo
  } = useFoodBridge();

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Form submission handler
  const handleFormSubmit = (formData) => {
    registerSurplusFood(formData);
    setSuccessData({
      foodName: formData.foodName,
      quantity: formData.quantity,
      unit: formData.unit,
      status: 'Available for Matching',
      availableUntil: formData.availableUntil,
      location: formData.location
    });
    setIsSuccess(true);
    setPrefillSurplusItem(null);
  };

  const handleRegisterAnother = () => {
    setIsSuccess(false);
    setSuccessData(null);
    setPrefillSurplusItem(null);
  };

  const handleViewMySurplus = () => {
    navigateTo('my-surplus');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('inventory')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inventory</span>
        </button>
      </div>

      {/* Main Content: Show Success Message OR Registration Form */}
      {isSuccess && successData ? (
        <SuccessMessage
          data={successData}
          onViewMySurplus={handleViewMySurplus}
          onRegisterAnother={handleRegisterAnother}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Food Source Intake Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Register Surplus Food
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Register edible excess food batches to make them available for matching across the redistribution network.
              </p>
            </div>

            {/* Voice Dictation Button */}
            <button
              type="button"
              onClick={() => setVoiceModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all shrink-0"
            >
              <Mic className="w-4 h-4" />
              <span>Voice Dictate</span>
            </button>
          </div>

          {/* Reusable SurplusForm with Validation */}
          <SurplusForm
            initialData={prefillSurplusItem || {
              foodName: 'Cooked Rice',
              foodCategory: 'Grain',
              quantity: 30,
              unit: 'kg',
              prepTime: '6:00 PM',
              availableUntil: '10:00 PM',
              pickupRequired: true,
              location: 'ABC Institutional Kitchen',
              additionalNotes: 'Freshly prepared basmati rice. Stored hot >60°C.'
            }}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {/* Voice Surplus Modal Component */}
      <VoiceSurplusModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onDataExtracted={(voiceExtracted) => {
          setPrefillSurplusItem({
            foodName: voiceExtracted.title || 'Cooked Prepared Meal',
            quantity: voiceExtracted.quantity || 30,
            foodCategory: voiceExtracted.category || 'Grain',
            availableUntil: voiceExtracted.pickupDeadline || '10:00 PM',
            location: 'ABC Institutional Kitchen'
          });
          setVoiceModalOpen(false);
        }}
      />
    </div>
  );
}
