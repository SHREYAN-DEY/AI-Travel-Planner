
import React from "react";
import { Fingerprint } from "lucide-react";

function TacticalInput({
  label,
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  error,
  Compass,
}) {
  return (
    <div className="space-y-3 group">
      <div className="flex justify-between items-center px-1">
        <label
          htmlFor=""
          className="text-[10px] font-black text-gray-600 group-focus-within:text-blue-500 transition-all uppercase tracking-widest"
        >
          {label}
        </label>

        {/* Conditional Rendering */}
        {/* {error && (
          <div className="text-red-500 text-[9px] font-black uppercase tracking-tighter animate-pulse">
            {error}
          </div>
        )} */}
      </div>

      <div className="relative">
        {/* Left Icon */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-all group-focus-within:scale-110">
          {Icon && <Icon size={16} />}
        </div>

        {/* Input Field */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-[#030305] border ${
            error ? "border-red-900/50" : "border-white/5"
          } rounded-2xl py-5 pl-14 pr-16 text-white text-xs font-bold focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-800 placeholder:uppercase placeholder:tracking-[0.2em] shadow-inner`}
          placeholder={placeholder}
        />

        {/* Right Red Box */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 flex items-center justify-center bg-red-500 rounded-sm">
          <span className="text-white text-[9px] font-black leading-none">
            •••
          </span>
        </div>

        {/* Focus Shadow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none group-focus-within:shadow-[0_0_20px_rgba(37,99,235,0.03)] transition-all" />
      </div>
    </div>
  );
}

export default TacticalInput;
