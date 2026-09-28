import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import InventoryTable from '../components/common/InventoryTable';
import { Boxes, PlusCircle, Sparkles, ArrowRight, Layers, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * Step 3: Food Source Inventory Page
 * Columns: Food Item | Category | Available Quantity | Expected Requirement | Potential Surplus | Available Until | Status
 * Potential Surplus = Available Quantity - Expected Requirement
 * Filters: Search, Category Filter, Status Filter
 */
export default function InventoryPage() {
  const { foodSourceInventory, navigateTo, setPrefillSurplusItem } = useFoodBridge();

  const handleRegisterSurplus = (item, potentialSurplus) => {
    // Pre-fill surplus registration form with the selected inventory item
    setPrefillSurplusItem({
      foodName: `Cooked ${item.item}`,
      foodCategory: item.category,
      quantity: potentialSurplus || 30,
      unit: item.unit || 'kg',
      prepTime: item.prepTime || 'Today, 1:30 PM',
      availableUntil: item.availableUntil || '4 hours',
      location: item.location || 'ABC Institutional Kitchen',
      pickupRequired: true,
      additionalNotes: `Auto-identified surplus from inventory: ${potentialSurplus} ${item.unit} excess above dining headcount requirement.`
    });

    navigateTo('register-surplus');
  };

  // Quick summary counts
  const totalItems = foodSourceInventory.length;
  const surplusCount = foodSourceInventory.filter(i => (Number(i.availableQty) - Number(i.requiredQty)) > 0).length;
  const urgentCount = foodSourceInventory.filter(i => i.status === 'Urgent').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
            <Boxes className="w-3.5 h-3.5" />
            <span>Food Source Operations &bull; Step 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Kitchen Food Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Identify potential surplus before food degrades. Potential Surplus = Available Quantity &minus; Expected Requirement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('my-surplus')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
          >
            View My Surplus
          </button>

          <button
            onClick={() => {
              setPrefillSurplusItem(null);
              navigateTo('register-surplus');
            }}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm shadow-emerald-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Surplus Food</span>
          </button>
        </div>
      </div>

      {/* Surplus Identification Logic Callout */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Automated Surplus Identification Rule:</span>
          </div>
          <div className="text-slate-600">
            <b>Potential Surplus</b> = Available Quantity &minus; Expected Requirement. Items with surplus &gt; 0 show <span className="text-amber-800 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">Surplus Detected</span>. Short shelf-life flags <span className="text-rose-800 font-bold bg-rose-100/80 px-1.5 py-0.5 rounded">Urgent</span>.
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-center px-3 py-1.5 rounded-xl bg-white border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Surplus Lots</span>
            <span className="text-base font-black text-amber-700">{surplusCount}</span>
          </div>
          <div className="text-center px-3 py-1.5 rounded-xl bg-white border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Urgent Lots</span>
            <span className="text-base font-black text-rose-700">{urgentCount}</span>
          </div>
        </div>
      </div>

      {/* Reusable InventoryTable */}
      <InventoryTable
        items={foodSourceInventory}
        onRegisterSurplus={handleRegisterSurplus}
      />
    </div>
  );
}
