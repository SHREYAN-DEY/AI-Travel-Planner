
import React from "react";
import {
  Activity,
  Briefcase,
  Compass,
  Cpu,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  Wallet,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  {
    path: "/dashboard",
    label: "OVERVIEW",
    icon: <LayoutDashboard size={14} />,
  },
  { path: "/plan", label: "PLANNER", icon: <Compass size={14} /> },
  { path: "/budget", label: "AUDIT", icon: <Wallet size={14} /> },
  { path: "/trips", label: "JOURNEYS", icon: <Briefcase size={14} /> },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-[100] w-full px-6 py-4 pointer-events-none">
      <div className="w-full max-w-[1600px] mx-auto px-6 h-14 rounded-2xl transition-all duration-500 border border-transparent pointer-events-auto bg-transparent">
        <div className="flex items-center justify-between gap-4 h-full">

          {/* Logo */}
          <a href="/" className="flex items-center gap-4 shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:rotate-90 transition-transform duration-500">
              <Globe className="text-white" size={18} />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight leading-none italic uppercase">
                Wander{" "}
                <span className="text-blue-500">AI</span>
              </span>

              <div className="flex items-center gap-1 mt-1">
                <Cpu size={8} className="text-blue-500/50" />
                <span className="text-[7px] font-black text-blue-500/50 tracking-[0.4em] uppercase">
                  OS_CORE_V0.5
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/5 backdrop-blur-md">
            {navLinks.map(({ path, label, icon }) => (
              <a
                key={path}
                href={path}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-[9px] font-black text-gray-300 transition-all duration-300 tracking-[0.15em] hover:bg-white/5 hover:text-blue-400"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Admin Profile */}
            <div className="hidden lg:flex items-center justify-between gap-4 min-w-[100px] bg-white/[0.02] border border-white/5 py-1.5 px-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer group/user">
              <div className="w-8 h-8 shrink-0 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <User
                  size={14}
                  className="text-gray-400 group-hover/user:text-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center">
                <p className="text-[10px] font-black text-white leading-none uppercase tracking-wide whitespace-nowrap">
                  ADMIN
                </p>
              </div>
            </div>

            {/* Session Logout */}
            <button
              type="button"
              aria-label="Terminate Session"
              title="Terminate Session"
              className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.02] text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 transition-all flex items-center justify-center"
            >
              <LogOut size={16} />
            </button>

            {/* Mobile Toggle */}
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"
            >
              <Menu size={18} />
            </button>

            {/* Login */}
            <a
              href="/login"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-3 shrink-0"
            >
              LOGIN
              <Activity size={12} className="animate-pulse" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-[85px] left-6 right-6 bg-black/90 backdrop-blur-2xl border border-white/10 p-4 shadow-2xl pointer-events-auto"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ path, label, icon }) => (
              <a
                key={path}
                href={path}
                className="flex items-center gap-4 p-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-300 transition-all hover:bg-white/5"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>

          <div className="h-px bg-white/5 my-2 mx-2" />

          <button
            type="button"
            className="flex items-center gap-4 p-4 rounded-xl text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all"
          >
            <LogOut size={16} />
            Terminate Session
          </button>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
