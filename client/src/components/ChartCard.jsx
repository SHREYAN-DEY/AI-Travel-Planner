// Core React & Icon Imports
import React from "react";
import { Activity, AlertTriangle, BarChart3, Wallet } from "lucide-react";

// Tactical Color Palette: Deep Blues and High-Contrast Greys for Chart Slices/Bars
const COLORS = [
  "#2563EB", // Primary Blue
  "#3B82F6", // Lighter Blue
  "#1E40AF", // Deep Blue
  "#64748B", // Slate
  "#94A3B8", // Light Slate
  "#CBD5E1", // Softest Grey
  "#0F172A", // Midnight
  "#334155", // Cool Grey
];

// Mapping of Raw Breakdown Keys to Tactical Display Labels
const LABELS = {
  accommodation: "LODGING",
  food: "DINING",
  localTransport: "TRANSIT",
  activities: "LEISURE",
  flights: "AIRFARE",
  insurance: "INSURANCE",
  miscellaneous: "EXTRAS",
  emergencyBuffer: "BUFFER (12%)",
};

// Custom Hover Tooltip for Recharts Visualizations
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-black border-2 border-white/10 p-5 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        {/* Category Name */}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-2">
          {data.name}
        </p>

        {/* Formatted Dollar Value */}
        <p className="text-3xl font-black text-white tracking-tighter">
          ${data.value?.toLocaleString()}
        </p>

        {/* Percentage Share of Total Budget */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
            {((data.value / data.payload.total) * 100).toFixed(1)} % of Total
          </p>
        </div>
      </div>
    );
  }
  return null;
}

// Primary Donut/Pie Chart Card Component (Expense Matrix)
function ChartCard() {
  return (
    <div className="bg-[#141417] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl group hover:border-blue-500/30 transition-all duration-500">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-3">
          <Activity size={16} className="text-blue-500" />
          Expense Matrix
        </h3>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-blue-500 uppercase tracking-widest">
          Live Analysis
        </div>
      </div>

      {/* Chart Canvas & Center Overlay Readout */}
      <div className="h-87.5 w-full relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <span className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
            Total Asset Debt
          </span>
          <span className="text-5xl font-black text-white tracking-tighter italic">
            Dummy Data
          </span>
        </div>

        {/* Chart */}
      </div>

      {/* Bottom Category Legend Grid */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 pt-10 border-t border-white/5">
        {/* Map Method */}
        <div className="flex items-center justify-between group/item">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 border border-white/10" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover/item:text-white transition-all">
              Item Name
            </span>
          </div>
          <span className="text-sm font-black text-white font-mono tracking-tighter">
            Dummy Data
          </span>
        </div>
      </div>
    </div>
  );
}

// Secondary Bar Chart Card Component (Resource Depth)
export function BudgetBarChart({ breakdown }) {
  return (
    <div className="bg-[#141417] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl group hover:border-blue-500/30 transition-all duration-500">
      {/* Card Header */}
      <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
        <BarChart3 size={16} className="text-blue-500" /> Resource Depth
      </h3>

      {/* Bar Chart Container */}
      <div className="h-80 w-full">
        {/* Chart */}
      </div>
    </div>
  );
}

// Budget Variance & Utilization Progress Card Component
export function BudgetOverUnder({ total, userBudget }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border p-12 transition-all duration-500 bg-[#141417]">
      {/* Decorative Background Watermark Icon */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Wallet size={160} strokeWidth={1} className="text-white" />
      </div>

      {/* Variance Status Header & Difference Readout */}
      <div className="flex justify-between items-start mb-12 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] mb-6">
            {/* Conditional Rendering */}
            <AlertTriangle size={16} />
          </div>
          <h2 className="text-7xl font-black text-white tracking-tighter leading-none uppercase italic">
            Diff
          </h2>
          <p className="text-[10px] font-black text-gray-600 mt-4 uppercase tracking-[0.4em]">
            {/* Conditional Rendering */}
            Critical Difference
          </p>
        </div>
      </div>

      {/* Asset Utilization Progress Bar */}
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
            Asset Utilization Rate
          </span>
          <span className="text-3xl font-black italic">Percentage</span>
        </div>
        <div className="h-6 bg-white/5 rounded-none border border-white/10 p-0.5">
          <div className="h-full transition-all duration-1000 ease-out" />
        </div>
      </div>
    </div>
  );
}

export default ChartCard;