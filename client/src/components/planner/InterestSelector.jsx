//  INTEREST SELECTOR 

import {
  Utensils,
  Landmark,
  Waves,
  Mountain,
  ShoppingBag,
  Theater,
  Camera,
  MountainSnow,
  Heart,
} from "lucide-react";

import { interests } from "../../data/interests";

//  ICON MAPPING 

const interestIcons = {
  "🍜 Food": Utensils,
  "🏛️ Culture": Landmark,
  "🏖️ Beaches": Waves,
  "🏔️ Nature": Mountain,
  "🛍️ Shopping": ShoppingBag,
  "🎭 Entertainment": Theater,
  "📸 Photography": Camera,
  "🧗 Adventure": MountainSnow,
};

//  INTEREST SELECTOR 

function InterestSelector({ selectedInterests, onChange }) {
  return (
    <div>

      {/*  LABEL  */}

      <div className="mb-4">

        <label className="block text-sm font-semibold text-gray-800">
          What are you interested in?
        </label>

        <p className="mt-1 text-xs leading-5 text-gray-500">
          Choose the experiences you would like to include in your trip.
        </p>

      </div>

      {/*  INTEREST GRID  */}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        {interests.map((interest) => {
          const Icon =
            interestIcons[interest] || Heart;

          const isSelected =
            selectedInterests.includes(interest);

          return (
            <label
              key={interest}
              className="cursor-pointer"
            >

              <input
                type="checkbox"
                value={interest}
                checked={isSelected}
                onChange={() => onChange(interest)}
                className="peer sr-only"
              />

              {/*  INTEREST CARD  */}

              <div
                className={`
                  group
                  flex
                  min-h-[120px]
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  px-3
                  py-4
                  text-center
                  transition-all
                  duration-200
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 shadow-sm"
                      : "border-gray-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/40 hover:shadow-sm"
                  }
                `}
              >

                {/*  ICON  */}

                <div
                  className={`
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-200
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    }
                  `}
                >
                  <Icon
                    size={21}
                    strokeWidth={2}
                  />
                </div>

                {/*  TEXT  */}

                <span
                  className={`
                    text-sm
                    font-semibold
                    ${
                      isSelected
                        ? "text-indigo-700"
                        : "text-gray-700"
                    }
                  `}
                >
                  {interest.replace(
                    /^[^\p{L}\p{N}\s]+/u,
                    ""
                  )}
                </span>

                {/*  SELECTED STATUS  */}

                {isSelected && (
                  <span className="mt-1 text-[10px] font-medium text-indigo-500">
                    Selected
                  </span>
                )}

              </div>

            </label>
          );
        })}

      </div>

      {/*  SELECTED COUNT  */}

      {selectedInterests.length > 0 && (
        <div className="mt-4 flex items-center justify-center">

          <div className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600">
            {selectedInterests.length}{" "}
            {selectedInterests.length === 1
              ? "interest"
              : "interests"}{" "}
            selected
          </div>

        </div>
      )}

    </div>
  );
}

export default InterestSelector;