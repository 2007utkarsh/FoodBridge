import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Scale,
  ShieldCheck,
  Camera,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Info,
  Building2,
  Phone,
  Layers
} from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import MapPlaceholder from '../components/common/MapPlaceholder';
import VoiceSurplusModal from '../components/common/VoiceSurplusModal';

const FOOD_PRESETS = [
  {
    title: "Mughlai Shahi Paneer, Jeera Rice & 100 Butter Rotis",
    foodType: "Cooked Meals",
    dietType: "Vegetarian",
    quantity: 45,
    unit: "kg",
    servings: 135,
    pickupDeadline: "Tonight, 11:00 PM",
    preparationTime: "Today, 6:30 PM",
    packagingType: "Stainless steel warmers & food-grade sealed trays",
    storageRequirements: "Keep hot above 60°C or consume within 3 hours",
    safetyNote: "Surplus banquet batch, prepared in certified kitchen, 100% untouched.",
    allergens: "Dairy, Cashew Gravy",
    address: "Hall B Service Entrance, Royal Mirage Banquets, Sector 18",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Whole Wheat Breads, Croissants & Sweet Brioche",
    foodType: "Bakery & Breads",
    dietType: "Vegetarian",
    quantity: 30,
    unit: "kg",
    servings: 90,
    pickupDeadline: "Tomorrow, 9:00 AM",
    preparationTime: "Today, 2:00 PM",
    packagingType: "Clean bakery crates and sealed brown paper bags",
    storageRequirements: "Ambient room temperature, dry storage",
    safetyNote: "End of day artisan bakery goods, sealed right after oven cooling.",
    allergens: "Gluten, Sesame",
    address: "The Hearth & Crumb, Shop 12 Galleria Arcade",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Organic Farm Fresh Bell Peppers, Carrots & Cabbage",
    foodType: "Raw Ingredients",
    dietType: "Vegan",
    quantity: 95,
    unit: "kg",
    servings: 280,
    pickupDeadline: "Tomorrow, 5:00 PM",
    preparationTime: "Received this morning",
    packagingType: "Heavy duty harvest crates",
    storageRequirements: "Cool shaded storage",
    safetyNote: "Wholesale surplus unchopped raw vegetables, washed and sorted.",
    allergens: "None",
    address: "Commissary Store 4, Mandi Logistics Hub",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PostFoodPage() {
  const { addListing, navigateTo } = useFoodBridge();

  const [formData, setFormData] = useState({
    title: '',
    foodType: 'Cooked Meals',
    dietType: 'Vegetarian',
    quantity: 40,
    unit: 'kg',
    servings: 120,
    preparationTime: 'Today, 6:00 PM',
    pickupDeadline: 'Tonight, 10:30 PM',
    packagingType: 'Thermal insulated transport containers',
    storageRequirements: 'Keep hot (>60°C) until pickup',
    safetyNote: 'Prepared under strict hygiene control in a commercial kitchen.',
    allergens: 'Dairy, Wheat',
    address: 'Gate 3, Royal Mirage Banquets, Sector 18 Commercial Hub',
    contactPerson: 'Rajesh Malhotra (Catering Lead)',
    phone: '+91 98201 44521',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  });

  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const loadPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      ...preset
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto estimate servings if quantity changes
      if (name === 'quantity' && !isNaN(value)) {
        updated.servings = Math.round(Number(value) * 3);
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    addListing({
      title: formData.title,
      foodType: formData.foodType,
      dietType: formData.dietType,
      quantity: Number(formData.quantity) || 30,
      unit: formData.unit,
      servings: Number(formData.servings) || 90,
      provider: {
        name: 'Royal Mirage Banquets & Caterers',
        type: 'Catering Service',
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        address: formData.address,
        area: 'Sector 18 Commercial Hub',
        distance: 'Within 3.0 km',
        rating: 4.9,
        verified: true
      },
      preparationTime: formData.preparationTime,
      pickupDeadline: formData.pickupDeadline,
      packagingType: formData.packagingType,
      storageRequirements: formData.storageRequirements,
      safetyNote: formData.safetyNote,
      allergens: formData.allergens.split(',').map((s) => s.trim()),
      image: formData.image
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Step 1: Food Source Post
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Post Surplus Food For Redistribution
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log edible surplus to immediately notify registered NGOs and rescue meals before expiry.
          </p>
        </div>

        {/* Demo Fast-Fill Helper Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Voice AI Assistant Trigger */}
          <button
            type="button"
            onClick={() => setVoiceModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs flex items-center gap-1.5 animate-pulse"
          >
            <span>🎙️ Voice AI Fill (Hindi/English)</span>
          </button>

          <span className="text-xs text-slate-300">|</span>

          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => loadPreset(FOOD_PRESETS[0])}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            Wedding Buffet
          </button>
          <button
            type="button"
            onClick={() => loadPreset(FOOD_PRESETS[1])}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            Artisan Bakery
          </button>
          <button
            type="button"
            onClick={() => loadPreset(FOOD_PRESETS[2])}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors"
          >
            Bulk Produce
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Food Basic Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Food Identification & Quantities</h2>
              <p className="text-xs text-slate-500">Provide accurate meal information for recipient shelters</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Food Title / Meal Description *
              </label>
              <input
                type="text"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Mughlai Shahi Paneer, Jeera Rice & 100 Rotis"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Food Category *</label>
                <select
                  name="foodType"
                  value={formData.foodType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800 bg-white"
                >
                  <option value="Cooked Meals">Cooked Meals (Ready to eat)</option>
                  <option value="Bakery & Breads">Bakery & Breads</option>
                  <option value="Raw Ingredients">Raw Ingredients / Fresh Produce</option>
                  <option value="Packaged Meals">Packaged Boxed Meals</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Dietary Classification *</label>
                <select
                  name="dietType"
                  value={formData.dietType}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800 bg-white"
                >
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">100% Plant-Based / Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian (Chicken/Meat)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Known Allergens</label>
                <input
                  type="text"
                  name="allergens"
                  value={formData.allergens}
                  onChange={handleChange}
                  placeholder="e.g. Dairy, Gluten, Nuts (or 'None')"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Quantity and Servings Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Total Quantity *</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    required
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-semibold text-slate-900"
                  />
                  <Scale className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Quantity Unit</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800 bg-white"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="Litres">Litres (L)</option>
                  <option value="Packets/Boxes">Boxed Meal Units</option>
                  <option value="Trays">Catering Trays</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Est. Beneficiary Servings</label>
                <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-bold text-emerald-900 flex items-center justify-between">
                  <span>~{formData.servings} People</span>
                  <span className="text-[11px] font-normal text-emerald-700">Calculated</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Timing, Shelf Life & Hygiene Safety */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Safety, Expiry & Pickup Deadlines</h2>
              <p className="text-xs text-slate-500">Crucial for food safety compliance and prompt dispatch</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Time Prepared / Finished</label>
              <div className="relative">
                <input
                  type="text"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  placeholder="e.g. Today, 6:00 PM"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
                />
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Strict Pickup Deadline *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  name="pickupDeadline"
                  value={formData.pickupDeadline}
                  onChange={handleChange}
                  placeholder="e.g. Tonight, 10:30 PM"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs font-bold text-amber-900 bg-amber-50/50"
                />
                <Clock className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Packaging Condition</label>
              <input
                type="text"
                name="packagingType"
                value={formData.packagingType}
                onChange={handleChange}
                placeholder="e.g. Sealed aluminum trays & hot boxes"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">Storage Instruction</label>
              <input
                type="text"
                name="storageRequirements"
                value={formData.storageRequirements}
                onChange={handleChange}
                placeholder="e.g. Keep warm (>60°C) or refrigerate"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Food Safety Declaration</label>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <input
                type="text"
                name="safetyNote"
                value={formData.safetyNote}
                onChange={handleChange}
                className="w-full bg-transparent border-0 text-xs text-slate-700 focus:outline-none font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Pickup Location & Map Pin */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Pickup Location & Logistics Point</h2>
              <p className="text-xs text-slate-500">Guide NGO drivers directly to your loading or service gate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Pickup Address / Bay *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-medium text-slate-800"
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">Direct Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">Food Photo</label>
                <div className="flex items-center gap-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Embedded Map Pin Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Geofence Pin Position:</span>
                <span className="text-emerald-700 font-medium">GPS Accuracy: ± 5m</span>
              </div>
              <MapPlaceholder
                sourceName="Donor Loading Bay"
                sourceAddress={formData.address}
                height="h-52"
                showRoute={false}
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">Ready to broadcast to registered NGOs?</p>
              <p className="text-xs text-slate-300">
                Will be listed as "Available" with immediate pickup notification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigateTo('provider-dashboard')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Broadcast Surplus Now</span>
            </button>
          </div>
        </div>
      </form>

      <VoiceSurplusModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onApplyParsedData={(parsed) => setFormData(prev => ({ ...prev, ...parsed }))}
      />
    </div>
  );
}
