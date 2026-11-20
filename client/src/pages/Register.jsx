import { Activity, 
    Compass, 
    Globe, 
    Target, 
    ShieldCheck, 
    User, 
    Mail, 
    Lock, 
    Zap, 
    MapPin, 
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import TacticalInput from "../components/TacticalInput";

function Register() {
  return (
    <div className="min-h-screen bg-[#020203] flex font-sans selection:bg-blue-600 section:text-white text-gray-400 overflow-hidden">
        {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[50%] bg-[#050507] relative flex-col justify-between p-16 overflow-hidden border-r border-white/5">
            {/* Background Overlay With */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070')] bg-cover bg-center grayscale opacity-10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020203] via-transparent to-[#020203]" />
            {/* Brand Header */}
            <a href="#" className="required z-10 flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500 transition-all duration-500">
                    <Globe size={24}className="text-blue-" />
                </div>
                <span className="text-2xl font-black italic uppercase tracking-tighter text-white">
                    Wander <span className="text-blue-600 not-italic">AI.</span>
                </span>
            </a>

        {/* Hero Content */}
        <div className="relative z-10 max-w-xl">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-7xl font-black leading-[0.85] tracking-tighter mb-8 text-white uppercase italic">
                    The World, <br />{" "}
                    <span className="text-blue-600 not-italic">Tailored</span>
                </h2>
                <p className="text-lg text-gray-500 mb-12 leading-relaxed font-medium">
                    Join the next generation of explorers using neural logistics to
                    reach coordinates beyond the map.
                </p>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-white/[0.2] backdrop-blur-lg rounded-[32px] border border-white/5 group-hover:border-blue-500/30 transition-all">
                    <Target
                        size={28}
                        className="text-blue-500 mb-4 group-hover:rotate-45 transition-all"
                    />
                    <h4 className="font-black text-white uppercase italic text-xs tracking-widest mb-1">
                        Precision
                    </h4>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
                        Neural Node Routing
                    </p>
                </div>

               <div className="p-8 bg-white/[0.02] backdrop-blur-lg rounded-[32px] border border-white/5 group-hover:border-blue-500/30 transition-all">
                    <Activity
                        size={28}
                        className="text-blue-500 mb-4 group-hover:rotate-45 transition-all"
                    />
                    <h4 className="font-black text-white uppercase italic text-xs tracking-widest mb-1">
                        Real Time
                    </h4>
                    <p className="text-[10px] text-gray-600 uppercase font-bold tracking-[0.2em]">
                    Active Field Telemetry
                    </p>
                </div>
            </div>
        </div>

            {/* Footer Link */}
            <div className="relative z-10 text-[9px] font-black text-gray-700 uppercase tracking-[0.05em]">
                &copy; WanderAi // Global Deployment Active
            </div>
        </div>

        {/* Right Pannel */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative bg-[#020203]">
            <div className="w-full max-w-[460px] relative">
            {/* Header */}
            <div className="mb-12 text-center lg:text-left px-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow[0_0_20px_rgba(37,99,235,0.1)]">
                    <Compass size={14} className="animate-spin-slow" /> New Mission 
                    Deployment
                </div>
                <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                   Create a Profile
                </h1>
                <p className="text-gray-600 font-black text-white italic uppercase tracking-tighter mb-4">
                    Existing Account?{" "}
                    <a
                        href="#"
                        className="text-blue-500 hover:text-blue-400 transition-all underline-offset-4 underline"
                    >
                        Login Now
                    </a>
                </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-[#08080a] rounded-[40px] border border-white/5 p-2 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent" />
                {/* Conditional Rendering */}
                {/*<motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-6 mt-6 p-6 bg-red-950/20 rounded-2xl border border-red-900/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-4"
                >
                    <ShieldAlert size={18} className="animate-pulse" />
                </motion.div>*/}

                <form className="p-8 space-y-5">
                    <TacticalInput
                        label="Identity Label"
                        icon={User}
                        type="text"
                        placeholder="Marco Polo"
                    />
                    <TacticalInput
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        placeholder="admin@onlineittuts.com"
                    />
                    <TacticalInput
                    label="Security Passkey"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••••"
                    />
                    <button
                        type="submit"
                        className="w-full group relative bg-blue-600 hover:bg-blue-500
                        text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em]
                        text-xs transition-all flex items-center justify-center gap-3
                        shadow-2xl shadow-blue-950/20 mt-8 active:scale-95
                        disabled:opacity-50"
                    >
                        Register Now
                    </button>
                </form>
            </div>

            {/* Trusted Bades */}
            <div className="mt-12 flex items-center justify-center gap-10 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.02em] text-white">
                    <ShieldCheck size={14} className="text-blue-500" /> AES-256
                </div>
            <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.02em] text-white">
                <Zap size={14} className="text-blue-500" /> INSTANT SYNC
            </div>
            <div className="flex items-center gap-2 font-black text-[9px] uppercase tracking-[0.02em] text-white">
                <MapPin size={14} className="text-blue-500" /> GLOBAL NODE
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Register;