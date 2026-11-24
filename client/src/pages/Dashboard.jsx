import React from 'react'
import Navbar from "../components/Navbar";
import HUDMetric from "../components/HUDMetric";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Activity, 
  Plane,
  Cpu, 
  Clock, 
  CloudSun,
  Compass,
  Globe,
  History,
  LogIn, 
  Map, 
  Shield,
  Sparkles,
  TrendingUp, 
  User,
  Wallet, 
  Zap,  
  } from "lucide-react";
import { Link } from "react-router-dom";
import StatsBox from '../components/StatsBox';
import ActivityItem from '../components/Activityitem';

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12">
        {/* Identity */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#4285f4]" />
                <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                <div className="w-3 h-3 rounded-full bg-[#fbbc05]" />
                <div className="w-3 h-3 rounded-full bg-[#34a853]" />
              </div>

              <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.18em]">
              Session Active: <span>admin@onlineittuts.com</span>
              </span>
            </div>

          </motion.div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <HUDMetric icon={Clock} label="System Time" value="12.35" />
            <HUDMetric icon={CloudSun} label="Weather" value="Syncing....." />
            <HUDMetric icon={Map} label="Region" value="Global/Edge" />
            <HUDMetric 
              icon={Shield} 
              label="Auth Tier" 
              value="Standard"
              color="text-blue-400"
            />
          </div>
        </header>

        {/* Grid */}  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="bg-[#111113] border border-white/5 rounded-4xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_18px_45px_rgba(66,133,244,0.08)]"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <User size={24} className="text-blue-500" />
              </div>
              <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-blue-400 mb-2">
                Identity Profile
              </h3>
              <p className="text-2xl font-bold text-white truncate tracking-tight">
                "Unknown User"
              </p>
              <div className="flex items-center gap-2 mt-2">
                <History size={12} className="text-gray-600" />
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  In: Login Time Stamp
                </p>
              </div>
              <p className="text-[11px] font-mono text-gray-500 mt-4 bg-white/4 p-3 rounded-xl border border-white/5">
                ID Session Expired
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 relative z-10 flex justify-between items-center">
              <span className="text-[11px] font-bold text-green-400 flex items-center gap-2 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Secure Node
              </span>
              <LogIn
                size={14}
                className="text-gray-600 group-hover:text-blue-500 transition-colors"
              />
            </div>
          </motion.div>
          <StatsBox 
            icon={Zap}
            label="System Credits"
            value="1,250"
            sub="Compute units"
            color="text-yellow-400"
          />

          {/* Main Journey Action */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-2 bg-linear-to-br from-[#4285f4] to-[#1a73e8] rounded-4xl sm:rounded-[2.5rem] p-7 sm:p-10 flex flex-col justify-between group relative overflow-hidden shadow-[0_20px_50px_rgba(66,133,243,0.22)] cursor-pointer"
          >
            {/* I will update it. */}
            <Link className="absolute inset-0 z-20" />
            <div className="relative z-10">
              <Compass
                size={40}
                className="text-white mb-7 group-hover:rotate-45 group-hover:scale-110 transition-all duration-500"
              />
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-3">
                New Itinerary
              </h2>
              <div className="flex items-center gap-2 text-sm sm:text-base text-white/80 font-medium">
                <Sparkles size={16} />
                <span>Initialize AI Synthesis</span>
              </div>
            </div>
            <div className="flex justify-end relative z-10">
              <div className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-[0.16em] shadow-lg shadow-blue-950/15 group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
                Launch
              </div>
            </div>
            <Globe 
              size={280} 
              className="absolute -right-20 -bottom-20 opacity-10 text-white rotate-12" 
            />
          </motion.div>
        </div>

        {/* Record & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Trips Logs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="lg:col-span-8 bg-[#111113] border border-white/5 rounded-4xl sm:rounded-[2.5rem] p-6 sm:p-10"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Plane size={16} className="text-blue-500" />
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.2em] text-gray-400">
                  Flight Archives
                </h3>
              </div>
              <a href="#" className="text-xs font-extrabold text-blue-400 hover:text-blue-300 transition-colors">
                {" "}
                View All Logs
              </a>
            </div>

            <div className="space-y-3">
              {/* Conditional Rendering */}
              {/* <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-white/20" />
                </div> */}

                {/* Else */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0 * 0.1 }}
                >
                  <a
                    href="#"
                    className="flex items-center justify-between gap-4 p-5 sm:p-6 bg-white/2.5 border border-white/5 rounded-2xl sm:rounded-3xl hover:bg-white/5 hover:border-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                  <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-[#4285f4]">
                        Trip Destination
                      </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-[#4285f4] transition-all">
                        Trip Destination 
                      </h4>

                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.14em]">
                        Day Mission
                      </span>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-700 group-hover:text-white transition-all"
                  />
                  </a>
                </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-[#111113] border border-white/5 rounded-4xl sm:rounded-[2.5rem] p-7 sm:p-8 hover:border-white/10 transition-colors">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#34a853] flex items-center gap-2">
                  <TrendingUp size={14} /> Fiscal Feed
                </h3>
                <Wallet size={14} className="text-gray-600" />
              </div>
              <div className="space-y-6">
                {/* Map Method */}
                <ActivityItem
                  time="Active"
                  action="Dynamic"
                  desc="Budget"
                  dot="bg-green-500"
                />

                {/* Conditional Rendering */}
                <ActivityItem
                  time="Now"
                  action="Syncing Budgets"
                  desc="No financial data found"
                  dot="bg-yellow-500"
                />
              </div>
            </div>
            <div className="bg-linear-to-br from-zinc-900 to-black border border-white/5 rounded-4xl sm:rounded-[2.5rem] p-7 sm:p-8 group hover:border-blue-500/20 hover:shadow-[0_16px_40px_rgba(66,133,244,0.06)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-xl text-blue-400">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold uppercase tracking-[0.14em] text-white">
                    Core Health
                  </h4>
                  <p className="text-xs text-gray-400 italic mt-1">
                    Node Cluster 09 Active
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1.1, delay: 0.35, ease: "easeOut" }}
              className="bg-blue-500 h-full shadow-[0_0_12px_#4285f4]"
            />
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-1">
                <Activity size={10} className="text-green-500" />
                <span className="text-[8px] text-gray-500 uppercase font-bold">
                  Stable
                </span>
              </div>
              <span className="text-[8px] text-gray-700 font-mono">
                User ID
              </span>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
