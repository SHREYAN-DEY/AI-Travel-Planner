// Core React & Navigation Imports
import React from "react";
import Navbar from "../components/Navbar";

// UI Icons from Lucide React
import {
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  PenLine,
  ShieldCheck,
  Target,
  User,
  Zap,
  TrendingUp,
} from "lucide-react";

// Animation Utilities
import { AnimatePresence, motion } from "framer-motion";

// Custom Dashboard & Chart Components
import ControlField from "../components/ControlField";
import SummaryRow from "../components/SummaryRow";
import HudStats from "../components/HudStats";
import BudgetPieChart, { BudgetBarChart } from "../components/ChartCard";

function BudgetEstimator() {
  return (
    // Main Viewport Wrapper
    <div className="min-h-screen lg:h-screen bg-[#020203] text-gray-300 font-sans overflow-hidden flex flex-col">

      {/* Global Top Navigation Bar */}
      <Navbar />

      {/* Split-Screen Content Container (Sidebar + Main Telemetry View) */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden pt-20">

        {/* Left Panel: Parameter Input & Audit Controls */}
        <aside className="w-full lg:w-[30%] lg:min-h-0 border-r border-white/5 bg-[#050507] p-6 lg:p-8 flex flex-col overflow-y-auto custom-scrollbar">

          {/* Control Panel Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2 text-blue-500">
              <Cpu size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Control V-5.0
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white italic uppercase leading-none">
              Financial <span className="text-blue-600">Audit</span>
            </h1>
          </div>

          {/* Estimation Parameters Form */}
          <form className="space-y-5">
            {/* Destination / Target Sector Input */}
            <ControlField label="Target Sector">
              <div className="relative group">
                <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500" />
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-bold text-white outline-none focus:border-blue-500/50 uppercase text-sm" placeholder="E.G TOKYO, JP" />
              </div>
            </ControlField>

            {/* Trip Duration & Traveler Count Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Number of Days */}
              <ControlField label="Cycle Duration">
                <div className="relative">
                  <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-bold text-white outline-none focus:border-blue-500/50 uppercase text-sm scheme-dark" />
                </div>
              </ControlField>

              {/* Number of Travelers */}
              <ControlField label="Unit Count">
                <div className="relative">
                  <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 font-bold text-white outline-none focus:border-blue-500/50 uppercase text-sm scheme-dark" />
                </div>
              </ControlField>
            </div>

            {/* Budget Tier Selector */}
            <ControlField label="Operation Tier">
              <div className="relative">
                <select className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-10 font-bold text-blue-500 outline-none text-sm cursor-pointer">
                  <option value="Budget" className="bg-[#0a0a0c] text-white ">BUDGET</option>
                  <option value="Mid-range" className="bg-[#0a0a0c] text-white">STANDARD</option>
                  <option value="Luxury" className="bg-[#0a0a0c] text-white">PREMIUM</option>
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"/>
              </div>
            </ControlField>

            {/* Form Submit / Calculation Trigger */}
            <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3">
              Execute Analysis
            </button>
          </form>

          {/* Bottom Summary & System Status Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto pt-8 border-t border-white/5 space-y-4" >
            <SummaryRow label="Gross Requirement" value="--" highlight />
            <SummaryRow label="Operation Status" value="SYSTEM NOMINAL" color="text-emerald-500" />
          </motion.div>
        </aside>

        {/* Main Content: Telemetry Output & Financial Visualizations */}
        <main className="flex-1 min-h-0 min-w-0 overflow-y-auto p-6 lg:p-8 custom-scrollbar bg-black space-y-6">
          <AnimatePresence mode="wait">

            {/* Empty / Idle State Placeholder (Shown before analysis runs) */}
            <motion.div
              key="awaiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-56 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 bg-white/1" >
              <Activity size={64} className="text-blue-500/10 animate-pulse" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-700">
                  Awaiting Parameters
                </p>
              </div>
            </motion.div>

            {/* Active Analysis Results View */}
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8" >

              {/* Top Telemetry HUD Metrics Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <HudStats icon={Globe} label="Region" color="text-blue-500" value="Dummy" />
                <HudStats icon={Zap} label="Daily Burn" color="text-amber-500" value="Dummy" />
                <HudStats icon={ShieldCheck} label="Safety Margin" color="text-emerald-500" value="15% Buffer" />
              </div>

              {/* Analytics Charts Grid (Pie Chart & Bar Chart) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Resource Allocation Breakdown (Pie Chart Card) */}
                <div className="bg-white/1 border border-white/5 rounded-[2.5rem] p-10 flex flex-col items-center">
                  <div className="w-full flex items-center gap-3 mb-8">
                    <PenLine size={18} className="text-blue-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Resource Allocation
                    </h3>
                  </div>
                  <div className="w-full py-4">
                    <BudgetPieChart />
                  </div>
                </div>

                {/* Expenditure Velocity Breakdown (Bar Chart Card) */}
                <div className="bg-white/2 border border-white/5 rounded-[2.5rem] p-10">
                  <div className="flex items-center gap-2 mb-8">
                    <TrendingUp size={18} className="text-blue-500" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Expenditure Velocity
                    </h3>
                  </div>
                  <BudgetBarChart />
                </div>
              </div>

              {/* AI Optimization Recommendations Section (Placeholder) */}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default BudgetEstimator;