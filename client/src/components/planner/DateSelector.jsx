//  DATE SELECTOR 

import { CalendarDays, X } from "lucide-react";

function DateSelector({ startDate, endDate, onChange }) {

  //  CLEAR DATE 

  const clearDate = (name) => {
    onChange({
      target: {
        name,
        value: "",
      },
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/*  START DATE  */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays
            size={18}
            className="text-indigo-600"
          />
          Start Date
        </label>

        <div className="flex items-center gap-2">

          {/* DATE INPUT */}

          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onChange}
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* CLEAR BUTTON */}

          {startDate && (
            <button
              type="button"
              onClick={() => clearDate("startDate")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              aria-label="Clear start date"
              title="Clear date"
            >
              <X size={18} />
            </button>
          )}

        </div>

        <p className="mt-2 text-xs text-gray-500">
          Select when your journey begins.
        </p>
      </div>

      {/*  END DATE  */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
          <CalendarDays
            size={18}
            className="text-indigo-600"
          />
          End Date
        </label>

        <div className="flex items-center gap-2">

          {/* DATE INPUT */}

          <input
            type="date"
            name="endDate"
            value={endDate}
            min={startDate || undefined}
            onChange={onChange}
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-800 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {/* CLEAR BUTTON */}

          {endDate && (
            <button
              type="button"
              onClick={() => clearDate("endDate")}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              aria-label="Clear end date"
              title="Clear date"
            >
              <X size={18} />
            </button>
          )}

        </div>

        <p className="mt-2 text-xs text-gray-500">
          Select when your journey ends.
        </p>
      </div>

    </div>
  );
}

export default DateSelector;