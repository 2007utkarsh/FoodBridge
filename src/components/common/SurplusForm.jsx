import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, ArrowRight, MapPin, Clock, Calendar, Building2, Truck } from 'lucide-react';

/**
 * Reusable SurplusForm Component
 * Form fields:
 * - Food Name (Required)
 * - Food Category
 * - Quantity (Required > 0)
 * - Unit
 * - Preparation/Processing Time
 * - Available Until (Required)
 * - Pickup Required
 * - Pickup Location (Required)
 * - Additional Notes
 *
 * Button: "Register Surplus"
 */
export default function SurplusForm({
  initialData = {},
  onSubmit = null
}) {
  const [formData, setFormData] = useState({
    foodName: initialData.foodName || initialData.item || 'Cooked Rice',
    foodCategory: initialData.foodCategory || initialData.category || 'Grain',
    quantity: initialData.quantity || initialData.surplusQty || 30,
    unit: initialData.unit || 'kg',
    prepTime: initialData.prepTime || '6:00 PM',
    availableUntil: initialData.availableUntil || '10:00 PM',
    pickupRequired: initialData.pickupRequired !== undefined ? initialData.pickupRequired : true,
    location: initialData.location || 'ABC Institutional Kitchen',
    additionalNotes: initialData.additionalNotes || 'Freshly prepared lunch batch. Insulated thermal container required.'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(prev => ({
        ...prev,
        foodName: initialData.foodName || initialData.item || prev.foodName,
        foodCategory: initialData.foodCategory || initialData.category || prev.foodCategory,
        quantity: initialData.quantity !== undefined ? initialData.quantity : (initialData.surplusQty || prev.quantity),
        unit: initialData.unit || prev.unit,
        prepTime: initialData.prepTime || prev.prepTime,
        availableUntil: initialData.availableUntil || prev.availableUntil,
        location: initialData.location || prev.location
      }));
    }
  }, [initialData]);

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.foodName || !formData.foodName.trim()) {
      newErrors.foodName = 'Food name is required.';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0.';
    }

    if (!formData.availableUntil || !formData.availableUntil.trim()) {
      newErrors.availableUntil = 'Available-until time is required.';
    }

    if (!formData.location || !formData.location.trim()) {
      newErrors.location = 'Pickup location is required.';
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      foodName: true,
      quantity: true,
      availableUntil: true,
      location: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (onSubmit) {
        onSubmit({
          ...formData,
          quantity: Number(formData.quantity),
          pickupRequired: formData.pickupRequired ? 'Required' : 'Not Required'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
      {/* Validation Alert if any errors exist after submit attempt */}
      {Object.keys(errors).length > 0 && Object.values(touched).some(Boolean) && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">Please resolve the following before registering:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 1. Food Name */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Food Name *</span>
            {touched.foodName && errors.foodName && (
              <span className="text-rose-600 font-semibold text-[11px]">{errors.foodName}</span>
            )}
          </label>
          <input
            type="text"
            value={formData.foodName}
            onBlur={() => handleBlur('foodName')}
            onChange={(e) => setFormData({ ...formData, foodName: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-xs font-medium border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
              touched.foodName && errors.foodName ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
            }`}
            placeholder="e.g. Cooked Rice, Mixed Vegetables"
          />
        </div>

        {/* 2. Food Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Food Category</label>
          <select
            value={formData.foodCategory}
            onChange={(e) => setFormData({ ...formData, foodCategory: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
          >
            <option value="Grain">Grain (Rice, Pulao, Biryani)</option>
            <option value="Vegetable">Vegetable (Curry, Subzi, Salad)</option>
            <option value="Pulse">Pulse (Dal, Sambhar, Chana)</option>
            <option value="Bakery">Bakery (Bread, Roti, Buns)</option>
            <option value="Dairy">Dairy (Paneer, Curd, Milk)</option>
            <option value="Fruit">Fruit (Fresh Seasonal Produce)</option>
          </select>
        </div>

        {/* 3. Quantity & Unit */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Quantity & Unit *</span>
            {touched.quantity && errors.quantity && (
              <span className="text-rose-600 font-semibold text-[11px]">{errors.quantity}</span>
            )}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0.1"
              step="any"
              value={formData.quantity}
              onBlur={() => handleBlur('quantity')}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className={`flex-1 px-3.5 py-2.5 text-xs font-medium border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                touched.quantity && errors.quantity ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
              }`}
              placeholder="e.g. 30"
            />
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-24 px-2 py-2.5 text-xs font-bold border border-slate-200 rounded-xl bg-slate-50"
            >
              <option value="kg">kg</option>
              <option value="portions">portions</option>
              <option value="units">units</option>
              <option value="litres">litres</option>
            </select>
          </div>
        </div>

        {/* 4. Preparation/Processing Time */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Preparation / Processing Time</label>
          <input
            type="text"
            value={formData.prepTime}
            onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
            className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            placeholder="e.g. 6:00 PM"
          />
        </div>

        {/* 5. Available Until */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Available Until *</span>
            {touched.availableUntil && errors.availableUntil && (
              <span className="text-rose-600 font-semibold text-[11px]">{errors.availableUntil}</span>
            )}
          </label>
          <input
            type="text"
            value={formData.availableUntil}
            onBlur={() => handleBlur('availableUntil')}
            onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
            className={`w-full px-3.5 py-2.5 text-xs font-medium border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
              touched.availableUntil && errors.availableUntil ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
            }`}
            placeholder="e.g. 10:00 PM"
          />
        </div>

        {/* 6. Pickup Location */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>Pickup Location *</span>
            {touched.location && errors.location && (
              <span className="text-rose-600 font-semibold text-[11px]">{errors.location}</span>
            )}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={formData.location}
              onBlur={() => handleBlur('location')}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full pl-9 pr-3.5 py-2.5 text-xs font-medium border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                touched.location && errors.location ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200'
              }`}
              placeholder="e.g. ABC Institutional Kitchen - Dispatch Gate 2"
            />
          </div>
        </div>

        {/* 7. Pickup Required */}
        <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Pickup Required</div>
              <div className="text-[11px] text-slate-500">
                Designates that recipient or volunteer needs to pick up from your location.
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.pickupRequired}
              onChange={(e) => setFormData({ ...formData, pickupRequired: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* 8. Additional Notes */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-slate-700">Additional Notes</label>
          <textarea
            rows={2}
            value={formData.additionalNotes}
            onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
            className="w-full px-3.5 py-2 text-xs font-medium border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            placeholder="Add container details, allergen info, handover contact..."
          />
        </div>
      </div>

      {/* Button: "Register Surplus" */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Status will be set to: <b className="text-emerald-700">Available for Matching</b>
        </span>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.01]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register Surplus</span>
        </button>
      </div>
    </form>
  );
}
