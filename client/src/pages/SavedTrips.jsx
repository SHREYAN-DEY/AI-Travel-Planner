import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import {
    Calendar,
    Zap,
    Trash2,
    Monitor,
    Plus,
    ArrowRight,
    Layers
} from 'lucide-react';

import Navbar from '../components/Navbar';
import { SmartImage } from '../components/SmartImage';
import Matric from '../components/Matric';

export default function SavedTrips() {
    return (
        <div className="min-h-screen bg-[#070708] text-[#fafafa] font-sans selection:bg-blue-500/30 overflow-hidden">

            {/* Navigation Bar */}
            <Navbar />

            <main className="flex h-screen pt-20">
                {/* Left Sidebar */}
                <section className="hidden lg:flex flex-[1.4] relative border-r border-white/5 overflow-hidden bg-[#0a0a0b]">
                    <AnimatePresence mode="wait">
                        {/* Conditional rendering */}
                        <motion.div
                            key="left-sidebar"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-fullflex flex-col relative">

                            <div className="absolute inset-0 z-0">
                                <SmartImage className="w-full h-full opacity-30 grayscale-[0.2]" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#070708] via-transparent to-transparent"></div>
                            </div>

                            <div className="relative z-10 p-16 flex flex-col h-full">
                                <header>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-px bg-blue-500" />
                                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">
                                            Data Cluster // {" "}
                                        </span>
                                    </div>
                                    <h2 className="text-8xl font-black tracking-tighter uppercase italic leading-[0.85] mt-6">
                                        Destination
                                    </h2>
                                </header>

                                <div className="mt-auto grid grid-cols-3 gap-8 border-t border-white/10 pt-12 pb-8">
                                    <Matric label="Duration" value="" icon={Calendar} />
                                    <Matric label="Budget" value="" icon={Zap} />
                                    <Matric label="Style" value="" icon={Layers} />
                                </div>

                                <div className="flex gap-4">
                                    <a href="#" className="flex-1 flex items-center justify-center gap-4 py-6 bg-blue-600 rounded-3xl font-black text-[11px] uppercase tracking-[#0.2em] hover:bg-blue-500 transition-all">
                                        Initialize Mission
                                    </a>
                                    <button className="w-20 flex items-center justify-center eounded-3xl bg-white/5 border border-white/10 text-gray-500 hover:text-red-500 transition-all">
                                        {/* Conditional Rendering */}
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                        {/* else */}
                        <div className="m-auto opacity-20 text-center uppercase tracking-widest text-xs font-black">
                            <Monitor size={48} className="mx-auto mb-4" /> No Signal
                        </div>
                    </AnimatePresence>
                </section>

                {/* Right Sidebar */}
                <section className="flex-1 overflow-y-hidden bg-[#070708] p-8 lg:p-10 custom-scrollbar">
                    <div className="flex justify-between items-end mb-12">
                        <h1 className="text-3xl font-black tracking-tighter uppercase italic text-white">
                            Archives
                        </h1>
                        <a href="#" className="w-12 h-12 bg-white/5 border-white/10 rounded-2xl flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
                            <Plus size={24} />
                        </a>
                    </div>

                    <div className="grid gap-4">
                        {/* Conditional Rendering */}
                        <div className="h-24 bg-white/5 rounded-[2rem] animate-pulse" />

                        {/* else */}
                        <motion.div className={`group relative p-4 rounded-[2.5rem] border transition-all duration-500 cursor-pointer`}>

                            <div className="flex items-center gap-5 relative z-10">
                                <SmartImage className="w-16 h-16 rounded-2xl shrink-0" />
                                <div className="flex-1 overflow-hidden">
                                    <h4 className={`font-black text-lg tracking-tighter uppercase italic truncate`}>
                                        Trip Destination
                                    </h4>
                                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                        D Trip
                                    </p>
                                </div>
                                <ArrowRight size={18} />
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>
        </div>
    );
}

