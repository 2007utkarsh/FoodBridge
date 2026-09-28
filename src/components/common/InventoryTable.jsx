import React, { useState } from 'react';
import { Search, Filter, PlusCircle, Clock, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import SurplusBadge from './SurplusBadge';
import { FOOD_CATEGORIES } from '../../data/foodSourceInventoryData';

/**
 * Reusable InventoryTable Component
 * Columns: Food Item | Category | Available Quantity | Expected Requirement | Potential Surplus | Available Until | Status
 * Potential Surplus = Available Quantity - Expected Requirement
 */
export default function InventoryTable({
  items = [],
  onRegisterSurplus = null
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    
    // Status filter
    const potentialSurplus = Math.max(0, Number(item.availableQty || 0) - Number(item.requiredQty || 0));
    let calculatedStatus = item.status;
    if (!calculatedStatus) {
      calculatedStatus = item.availableUntil?.includes('hour') && parseInt(item.availableUntil) <= 5 
        ? 'Urgent' 
        : potentialSurplus > 0 
        ? 'Surplus' 
        : 'Normal';
    }

    const matchesStatus = statusFilter === 'All' || calculatedStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search food item or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
          />
        </div>

        {/* Category & Status Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="font-semibold text-slate-600">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {FOOD_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['All', 'Surplus', 'Urgent', 'Normal'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-6">Food Item</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Available Quantity</th>
                <th className="py-4 px-4">Expected Requirement</th>
                <th className="py-4 px-4">Potential Surplus</th>
                <th className="py-4 px-4">Available Until</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No inventory items match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  // Potential Surplus = Available Quantity - Expected Requirement
                  const potentialSurplus = Math.max(0, Number(item.availableQty || 0) - Number(item.requiredQty || 0));
                  const isUrgent = item.status === 'Urgent' || (item.availableUntil?.includes('hour') && parseInt(item.availableUntil) <= 5);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* 1. Food Item */}
                      <td className="py-4 px-6 font-bold text-slate-900">
                        <div>{item.item}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{item.location}</div>
                      </td>

                      {/* 2. Category */}
                      <td className="py-4 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                          {item.category}
                        </span>
                      </td>

                      {/* 3. Available Quantity */}
                      <td className="py-4 px-4 font-bold text-slate-800">
                        {item.availableQty} {item.unit}
                      </td>

                      {/* 4. Expected Requirement */}
                      <td className="py-4 px-4 text-slate-600">
                        {item.requiredQty} {item.unit}
                      </td>

                      {/* 5. Potential Surplus = Available - Expected */}
                      <td className="py-4 px-4">
                        {potentialSurplus > 0 ? (
                          <span className="font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            +{potentialSurplus} {item.unit}
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium">0 {item.unit}</span>
                        )}
                      </td>

                      {/* 6. Available Until */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.availableUntil}</span>
                        </div>
                      </td>

                      {/* 7. Status */}
                      <td className="py-4 px-4 text-center">
                        <SurplusBadge
                          surplus={potentialSurplus}
                          isUrgent={isUrgent}
                          status={item.status}
                        />
                      </td>

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        {potentialSurplus > 0 ? (
                          <button
                            onClick={() => onRegisterSurplus && onRegisterSurplus(item, potentialSurplus)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-[1.02]"
                          >
                            <span>Register Surplus</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Optimal stock</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
