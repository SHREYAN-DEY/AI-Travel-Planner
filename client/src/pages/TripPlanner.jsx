import React from 'react';
import { Cpu } from 'lucide-react';
import Navbar from '../components/Navbar';


export default function TripPlanner() {
    return (
        <div className="h-screen bg-[#020203] text-gray-300 font-sans overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden pt-20">
                <aside className="w-full lg:w-[35%] border-r border-white/5 bg-white/1 p-8 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-2 text-blue-500">
                            <Cpu size={14}/>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Planner Engine v4.0</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
