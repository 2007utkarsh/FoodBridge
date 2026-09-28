import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, AlertCircle, Sparkles } from 'lucide-react';

export default function StatusBadge({ status, size = 'md', className = '' }) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'Available':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
          dot: 'bg-emerald-500',
          icon: Sparkles,
          label: 'Available'
        };
      case 'Requested':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200/80',
          dot: 'bg-amber-500 animate-ping',
          icon: Clock,
          label: 'Requested'
        };
      case 'Accepted':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200/80',
          dot: 'bg-blue-500',
          icon: CheckCircle2,
          label: 'Accepted'
        };
      case 'Picked Up':
      case 'Out for Pickup':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200/80',
          dot: 'bg-purple-500',
          icon: Truck,
          label: status
        };
      case 'Delivered':
      case 'Completed':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200/80',
          dot: 'bg-teal-500',
          icon: PackageCheck,
          label: 'Delivered'
        };
      case 'Urgent':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
          dot: 'bg-rose-500 animate-pulse',
          icon: AlertCircle,
          label: 'Urgent Pickup'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          icon: Clock,
          label: status || 'Pending'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2.5 py-0.5 gap-1.5' 
    : size === 'lg' 
    ? 'text-sm px-3.5 py-1.5 gap-2' 
    : 'text-xs px-3 py-1 gap-1.5 font-medium';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border shadow-xs tracking-wide transition-all ${config.bg} ${sizeClasses} ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot.replace('animate-ping', '').replace('animate-pulse', '')}`}></span>
      </span>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
}
