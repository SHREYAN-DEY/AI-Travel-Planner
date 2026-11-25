import React from "react";

// Reusable Form Field Wrapper with Tactical Uppercase Label
function ControlField({ label, children }) {
  return (
    <div className="space-y-2">
      {/* Field Label */}
      <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">
        {label}
      </label>

      {/* Input / Select Control Slot */}
      {children}
    </div>
  );
}

export default ControlField;