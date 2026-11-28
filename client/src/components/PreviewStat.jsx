import React from 'react'

export default function PreviewStat({ label, value, sub }) {
    return (
        <div className="space-y-1">
            <p className="text-[8px] font-black text-blue-500/60 uppercase tracking-widest">
                //{label}
            </p>

            <p className="text-xl font-black text-white uppercase tracking-tighter truncate">
                {value}
            </p>
            <p className="text-[9px] font-bold text-gray-600 uppercase">{sub}</p>
        </div>
    )
}
