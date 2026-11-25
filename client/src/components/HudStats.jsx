import React from "react";

// Compact Telemetry Metric Card with Icon Badge
function HudStats({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/3 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
      {/* Left Icon Container */}
      <div className={`p-3 rounded-xl bg-black/40 ${color}`}>
        <Icon size={22} />
      </div>

      {/* Right Label & Value Stack */}
      <div>
        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-base font-bold text-white uppercase truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export default HudStats;