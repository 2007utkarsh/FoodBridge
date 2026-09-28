import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

/**
 * SurplusBadge Component
 * Shows:
 * - "Surplus Detected" if potential surplus > 0
 * - "No Surplus" if potential surplus <= 0
 * - "Urgent" if available time is short / status is Urgent
 */
export default function SurplusBadge({ surplus = 0, isUrgent = false, status = '' }) {
  if (isUrgent || status === 'Urgent') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200 shadow-xs animate-pulse">
        <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
        <span>Urgent</span>
      </span>
    );
  }

  if (surplus > 0 || status === 'Surplus') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 shadow-xs">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span>Surplus Detected</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
      <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
      <span>No Surplus</span>
    </span>
  );
}
