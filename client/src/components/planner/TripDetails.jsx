//  TRIP DETAILS 

import { CalendarDays, Users } from "lucide-react";

function TripDetails({
  duration,
  numTravelers,
  onChange,
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/*  TRIP DURATION  */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays size={18} />
          Trip Duration
        </label>

        <div className="flex w-full items-center rounded-xl border border-gray-300 bg-gray-50 px-4 py-3.5">
          <span className="text-sm font-medium text-gray-700">
            {duration
              ? `${duration} ${Number(duration) === 1 ? "Day" : "Days"}`
              : "Select travel dates first"}
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-500">
          Duration is automatically calculated from your travel dates.
        </p>
      </div>

      {/*  NUMBER OF TRAVELERS  */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <Users size={18} />
          Number of Travelers
        </label>

        <select
          name="numTravelers"
          value={numTravelers}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-200"
        >
          <option value="">Number of travelers</option>
          <option value="1">1 Traveler</option>
          <option value="2">2 Travelers</option>
          <option value="3">3 Travelers</option>
          <option value="4">4 Travelers</option>
          <option value="5">5+ Travelers</option>
        </select>
      </div>

    </div>
  );
}

export default TripDetails;