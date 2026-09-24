//  DESTINATION INPUT 

import { MapPin } from "lucide-react";

function DestinationInput({ value, onChange }) {
  return (
    <div>
      {/*  LABEL  */}

      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <MapPin
          size={18}
          className="text-indigo-600"
        />
        Where do you want to go?
      </label>

      {/*  INPUT  */}

      <input
        type="text"
        name="destination"
        value={value}
        onChange={onChange}
        placeholder="Enter destination (e.g. Puri, Goa, Darjeeling)"
        autoComplete="off"
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {/*  HELPER TEXT  */}

      <p className="mt-2 text-xs text-gray-500">
        Enter a city, destination, or place you want to explore.
      </p>
    </div>
  );
}

export default DestinationInput;