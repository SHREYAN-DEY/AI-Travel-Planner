import React from 'react'
import Navbar from "../components/Navbar";
import HUDMetric from "../components/HUDMetric";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Wallet, 
  Clock, 
  CloudSun,
  Compass,
  Globe,
  History, 
  Map, 
  Shield,
  Sparkles, 
  User, 
  LogIn, 
  Zap,  
  } from "lucide-react";
import { Link } from "react-router-dom";
import StatsBox from '../components/StatBox';

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="max-w-[1700px] mx-auto px-6 pt-28 pb-10">
        {/* Identity */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex -space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#4285f4]" />
                <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
                <div className="w-3 h-3 rounded-full bg-[#fbbc05]" />
                <div className="w-3 h-3 rounded-full bg-[#34a853]" />
              </div>

              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              Session Active: <span>admin@onlineittuts.com</span>
              </span>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 items-stretch">
          <div className="bg-[#111113] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/30 transition-all">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <User size={24} className="text-blue-500" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">
                Identity Profile
              </h3>
              <p className="text-xl font-bold text-white truncate">
                "Unknown User"
              </p>
              <div className="flex items-center gap-2 mt-2">
                <History size={12} className="text-gray-600" />
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                  In: Login Time Stamp
                </p>
              </div>
              <p className="text-[9px] font-mono text-gray-600 mt-4 bg-white/5 p-3 rounded-lg border border-white/5">
                ID Session Expired
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 relative z-10 flex justify-between items-center">
              <span className="text-[9px] font-bold text-green-500 flex items-center gap-1.5 uppercase">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Secure Node
              </span>
              <LogIn
                size={14}
                className="text-gray-600 group-hover:text-blue-500 transition-colors"
              />
            </div>
          </div>
          <StatsBox 
            icon={Zap}
            label="System Credits"
            value="1,250"
            sub="Compute units"
            color="text-yellow-400"
          />

          {/* Main Journey Action */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#4285f4] to-[#1a73e8] rounded-[2.5rem] p-10 flex flex-col justify-between group relative overflow-hidden transition-all shadow-[0_20px_50px_rgba(66,133,243,0.3)] cursor-pointer">
            {/* Visual update */}
            <Link className="absolute inset-0 z-20" to="/plan" />
            <div className="relative z-10">
              <Compass
                size={40}
                className="text-white mb-8 group-hover:rotate-45 transition-all duration-500"
              />
              <h2 className="text-4xl font-black tracking-tighter text-white mb-2">
                New Itinerary
              </h2>
              <div className="flex items-center gap-2 text-white/70 font-medium">
                <Sparkles size={16} />
                <span>Initialize AI Synthesis</span>
              </div>
            </div>
            <div className="flex justify-end relative z-10">
              <div className="bg-white text-blue-600 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                Launch
              </div>
            </div>
            <Globe 
              size={280} 
              className="absolute -right-20 -bottom-20 opacity-10 text-white rotate-12" 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;