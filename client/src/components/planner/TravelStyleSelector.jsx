//  TRAVEL STYLE SELECTOR 

import { Compass } from "lucide-react";

function TravelStyleSelector({ value, onChange }) {
  const travelStyles = [
    {
      value: "relaxed",
      title: "Relaxed",
      description: "Slow-paced & peaceful",
    },
    {
      value: "balanced",
      title: "Balanced",
      description: "A mix of activities & rest",
    },
    {
      value: "adventurous",
      title: "Adventurous",
      description: "Active & exciting",
    },
    {
      value: "cultural",
      title: "Cultural",
      description: "History, culture & local life",
    },
  ];

  return (
    <div>
      {/*  LABEL  */}

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Compass
          size={18}
          className="text-indigo-600"
        />
        Travel Style
      </label>

      {/*  STYLE OPTIONS  */}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {travelStyles.map((style) => (
          <label
            key={style.value}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="travelStyle"
              value={style.value}
              checked={value === style.value}
              onChange={onChange}
              className="peer sr-only"
            />

            <div
              className="
                h-full rounded-xl border border-gray-200 bg-white p-4
                shadow-sm transition-all duration-200
                hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md
                peer-checked:border-indigo-600
                peer-checked:bg-indigo-50
                peer-checked:shadow-sm
              "
            >
              <p className="font-semibold text-gray-900">
                {style.title}
              </p>

              <p className="mt-1 text-sm leading-5 text-gray-500">
                {style.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default TravelStyleSelector;