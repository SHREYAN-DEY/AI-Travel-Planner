import React from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { 
    Calendar, 
    Zap, 
    Layers } from 'lucide-react';

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
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>
            </main>
        </div>
    );
}

