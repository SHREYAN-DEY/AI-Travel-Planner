// BUDGET SELECTOR 

import { Wallet } from "lucide-react";

function BudgetSelector({ budgetMin, budgetMax, onChange }) {
  
  // BUDGET RANGE 

  const MIN_BUDGET = 5000;
  const MAX_BUDGET = 500000;
  const STEP = 5000;

  const budgets = [
    {
      id: "budget",
      title: "Budget",
      price: "₹5k – ₹10k",
      min: "5000",
      max: "10000",
    },
    {
      id: "moderate",
      title: "Moderate",
      price: "₹10k – ₹25k",
      min: "10000",
      max: "25000",
    },
    {
      id: "premium",
      title: "Premium",
      price: "₹25k+",
      min: "25000",
      max: "500000",
    },
  ];

  // SELECTED BUDGET 

  const selectedBudget = budgets.find(
    (item) =>
      budgetMin === item.min &&
      budgetMax === item.max
  );

  // BUDGET CHANGE 

  const handleBudgetChange = (item) => {
    onChange({
      target: {
        name: "budgetMin",
        value: item.min,
      },
    });

    onChange({
      target: {
        name: "budgetMax",
        value: item.max,
      },
    });
  };

  //  CURRENT VALUES 

  const minValue = Number(budgetMin) || MIN_BUDGET;
  const maxValue = Number(budgetMax) || MAX_BUDGET;

  // MINIMUM SLIDER 


  const handleMinSlider = (e) => {
    const value = Number(e.target.value);

    onChange({
      target: {
        name: "budgetMin",
        value: String(Math.min(value, maxValue)),
      },
    });
  };

  // MAXIMUM SLIDER 

  const handleMaxSlider = (e) => {
    const value = Number(e.target.value);

    onChange({
      target: {
        name: "budgetMax",
        value: String(Math.max(value, minValue)),
      },
    });
  };

  
  //  FORMAT BUDGET 

  const formatBudget = (value) => {
    const number = Number(value);

    if (number >= 100000) {
      const lakh = number / 100000;

      return Number.isInteger(lakh)
        ? `₹${lakh}L`
        : `₹${lakh.toFixed(1)}L`;
    }

    return `₹${number / 1000}k`;
  };

  //  UI 

  return (
    <div>

      {/*  LABEL  */}

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Wallet
          size={18}
          className="text-indigo-600"
        />

        Budget
      </label>

      {/*  PRESET OPTIONS  */}

      <div className="grid gap-3 sm:grid-cols-3">

        {budgets.map((item) => (
          <label
            key={item.id}
            className="cursor-pointer"
          >
            <input
              type="radio"
              name="budget"
              value={item.id}
              checked={selectedBudget?.id === item.id}
              onChange={() => handleBudgetChange(item)}
              className="peer sr-only"
            />

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-4
                text-center
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-indigo-200
                hover:shadow-md
                peer-checked:border-indigo-600
                peer-checked:bg-indigo-50
                peer-checked:shadow-sm
              "
            >
              <p className="font-semibold text-gray-900">
                {item.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {item.price}
              </p>
            </div>
          </label>
        ))}

      </div>

      {/*  MANUAL BUDGET  */}

      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">

        {/*  CUSTOM BUDGET HEADER  */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold text-gray-800">
              Customize Your Budget
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Adjust the sliders to choose your preferred budget range.
            </p>
          </div>

          <div className="w-fit rounded-lg bg-white px-3 py-2 text-sm font-bold text-indigo-600 shadow-sm">
            {formatBudget(minValue)} – {formatBudget(maxValue)}
          </div>

        </div>

        {/*  MINIMUM BUDGET  */}

        <div className="mt-6">

          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>
              Minimum Budget
            </span>

            <span className="font-semibold text-gray-800">
              {formatBudget(minValue)}
            </span>
          </div>

          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={STEP}
            value={minValue}
            onChange={handleMinSlider}
            className="h-2 w-full cursor-pointer accent-indigo-600"
          />

        </div>

        {/*  MAXIMUM BUDGET  */}

        <div className="mt-5">

          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>
              Maximum Budget
            </span>

            <span className="font-semibold text-gray-800">
              {formatBudget(maxValue)}
            </span>
          </div>

          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={STEP}
            value={maxValue}
            onChange={handleMaxSlider}
            className="h-2 w-full cursor-pointer accent-indigo-600"
          />

        </div>

        {/*  RANGE LABELS  */}

        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>
            ₹5k
          </span>

          <span>
            ₹5L
          </span>
        </div>

      </div>

    </div>
  );
}

export default BudgetSelector;