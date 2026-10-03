import { useState } from "react" 
import { useLocation, useNavigate } from "react-router-dom" 
import { 
  ArrowRight, 
  CalendarDays, 
  Minus, 
  Plus, 
 Route, 
  Users, 
} from "lucide-react" 
 
import DestinationInput from "../../components/planner/DestinationInput" 
import BudgetSlider from "../../components/planner/BudgetSlider" 
import InterestSelector from "../../components/planner/InterestSelector" 
 
const MIN_BUDGET = 1000 
const MAX_BUDGET = 100000 
const BUDGET_STEP = 500 
 
const interests = [ 
  "Food", 
  "Culture", 
  "Beaches", 
  "Nature", 
  "Shopping", 
  "Entertainment", 
  "Photography", 
  "Adventure", 
] 
 
function Planner() { 
  const location = useLocation() 
  const navigate = useNavigate() 
 
  /* ---------------- INITIAL FORM DATA ---------------- */ 
 
  const [formData, setFormData] = useState(() => { 
    const previousTrip = location.state 
 
    if (previousTrip) { 
      return { 
        destination: previousTrip.destination || "", 
        startDate: previousTrip.startDate || "", 
        endDate: previousTrip.endDate || "", 
        duration: previousTrip.duration || "", 
        numTravelers: previousTrip.numTravelers || 1, 
        interests: Array.isArray(previousTrip.interests) 
          ? previousTrip.interests 
          : [], 
        budgetMin: previousTrip.budgetMin ?? "", 
        budgetMax: previousTrip.budgetMax ?? "", 
      } 
    } 
 
    return { 
      destination: "", 
      startDate: "", 
      endDate: "", 
      duration: "", 
      numTravelers: 1, 
      interests: [], 
      budgetMin: "", 
      budgetMax: "", 
    } 
  }) 
 
  const [errors, setErrors] = useState({}) 
 
  /* ---------------- DATE / DURATION ---------------- */ 
 
  const calculateDuration = (startDate, endDate) => { 
    if (!startDate || !endDate) return "" 
 
    const start = new Date(`${startDate}T00:00:00`) 
    const end = new Date(`${endDate}T00:00:00`) 
 
    const difference = 
      Math.ceil( 
        (end.getTime() - start.getTime()) / 
          (1000 * 60 * 60 * 24) 
      ) + 1 
 
    return difference > 0 ? difference : "" 
  } 
 
  const handleDateChange = (field, value) => { 
    const updated = { 
      ...formData, 
      [field]: value, 
    } 
 
    const duration = calculateDuration( 
      updated.startDate, 
      updated.endDate 
    ) 
 
    setFormData({ 
      ...updated, 
      duration, 
    }) 
 
    setErrors((prev) => ({ 
      ...prev, 
      startDate: "", 
      endDate: "", 
    })) 
  } 
 
  /* ---------------- TRAVELERS ---------------- */ 
 
  const increaseTravelers = () => { 
    setFormData((prev) => ({ 
      ...prev, 
      numTravelers: Math.min( 
        Number(prev.numTravelers) + 1, 
        20 
      ), 
    })) 
 
    setErrors((prev) => ({ 
      ...prev, 
      travelers: "", 
    })) 
  } 
 
  const decreaseTravelers = () => { 
    setFormData((prev) => ({ 
      ...prev, 
      numTravelers: Math.max( 
        Number(prev.numTravelers) - 1, 
        1 
      ), 
    })) 
 
    setErrors((prev) => ({ 
      ...prev, 
      travelers: "", 
    })) 
  } 
 
  /* ---------------- BUDGET SLIDER ---------------- */ 
 
  const handleBudgetSliderChange = (type, value) => { 
    const numberValue = Number(value) 
 
    if (Number.isNaN(numberValue)) return 
 
    if (type === "min") { 
      const currentMax = 
        formData.budgetMax === "" 
          ? MAX_BUDGET 
          : Number(formData.budgetMax) 
 
      const safeValue = Math.min( 
        Math.max(numberValue, MIN_BUDGET), 
        currentMax - BUDGET_STEP 
      ) 
 
      setFormData((prev) => ({ 
        ...prev, 
        budgetMin: safeValue, 
      })) 
    } 
 
    if (type === "max") { 
      const currentMin = 
        formData.budgetMin === "" 
          ? MIN_BUDGET 
          : Number(formData.budgetMin) 
 
      const safeValue = Math.max( 
        Math.min(numberValue, MAX_BUDGET), 
        currentMin + BUDGET_STEP 
      ) 
 
      setFormData((prev) => ({ 
        ...prev, 
        budgetMax: safeValue, 
      })) 
    } 
 
    setErrors((prev) => ({ 
      ...prev, 
      budget: "", 
    })) 
  } 
 
  /* ---------------- BUDGET MANUAL INPUT ---------------- */ 
 
  const handleBudgetInputChange = (type, value) => { 
    const field = 
      type === "min" ? "budgetMin" : "budgetMax" 
 
    if (value === "") { 
      setFormData((prev) => ({ 
        ...prev, 
        [field]: "", 
      })) 
 
      setErrors((prev) => ({ 
        ...prev, 
        budget: "", 
      })) 
 
      return 
    } 
 
    const numberValue = Number(value) 
 
    if (Number.isNaN(numberValue)) return 
 
    if (type === "min") { 
      const currentMax = 
        formData.budgetMax === "" 
          ? MAX_BUDGET 
          : Number(formData.budgetMax) 
 
      const safeValue = Math.min( 
        Math.max(numberValue, MIN_BUDGET), 
        currentMax - BUDGET_STEP 
      ) 
 
      setFormData((prev) => ({ 
        ...prev, 
        budgetMin: safeValue, 
      })) 
    } 
 
    if (type === "max") { 
      const currentMin = 
        formData.budgetMin === "" 
          ? MIN_BUDGET 
          : Number(formData.budgetMin) 
 
      const safeValue = Math.max( 
        Math.min(numberValue, MAX_BUDGET), 
        currentMin + BUDGET_STEP 
      ) 
 
      setFormData((prev) => ({ 
        ...prev, 
        budgetMax: safeValue, 
      })) 
    } 
 
    setErrors((prev) => ({ 
      ...prev, 
      budget: "", 
    })) 
  } 
 
  /* ---------------- INTERESTS ---------------- */ 
 
  const toggleInterest = (interest) => { 
    setFormData((prev) => { 
      const exists = prev.interests.includes(interest) 
 
      return { 
        ...prev, 
        interests: exists 
          ? prev.interests.filter( 
              (item) => item !== interest 
            ) 
          : [...prev.interests, interest], 
      } 
    }) 
  } 
 
  /* ---------------- VALIDATION ---------------- */ 
 
  const validateForm = () => { 
    const newErrors = {} 
 
    // Destination 
    if (!formData.destination.trim()) { 
      newErrors.destination = 
        "Enter your destination" 
    } 
 
    // Start Date 
    if (!formData.startDate) { 
      newErrors.startDate = 
        "Select start date" 
    } 
 
    // End Date 
    if (!formData.endDate) { 
      newErrors.endDate = 
        "Select end date" 
    } 
 
    // Date relationship 
    if ( 
      formData.startDate && 
      formData.endDate 
    ) { 
      const start = new Date( 
        `${formData.startDate}T00:00:00` 
      ) 
 
      const end = new Date( 
        `${formData.endDate}T00:00:00` 
      ) 
 
      if (end < start) { 
        newErrors.endDate = 
          "End date must be after start date" 
      } 
    } 
 
    // Duration 
    if ( 
      formData.startDate && 
      formData.endDate && 
      !formData.duration 
    ) { 
      newErrors.endDate = 
        "Select a valid travel date range" 
    } 
 
    // Travelers 
    if ( 
      !formData.numTravelers || 
      Number(formData.numTravelers) < 1 
    ) { 
      newErrors.travelers = 
        "At least 1 traveler is required" 
    } 
 
    if ( 
      Number(formData.numTravelers) > 20 
    ) { 
      newErrors.travelers = 
        "Maximum 20 travelers allowed" 
    } 
 
    // Budget 
    if ( 
      formData.budgetMin === "" || 
      formData.budgetMax === "" 
    ) { 
      newErrors.budget = 
        "Set your budget range" 
    } 
 
    if ( 
      formData.budgetMin !== "" && 
      formData.budgetMax !== "" && 
      Number(formData.budgetMin) >= 
        Number(formData.budgetMax) 
    ) { 
      newErrors.budget = 
        "Maximum budget must be higher than minimum" 
    } 
 
    // Minimum budget boundary 
    if ( 
      formData.budgetMin !== "" && 
      Number(formData.budgetMin) < 
        MIN_BUDGET 
    ) { 
      newErrors.budget = 
        `Minimum budget is ₹${MIN_BUDGET.toLocaleString( 
          "en-IN" 
        )}` 
    } 
 
    // Maximum budget boundary 
    if ( 
      formData.budgetMax !== "" && 
      Number(formData.budgetMax) > 
        MAX_BUDGET 
    ) { 
      newErrors.budget = 
        `Maximum budget cannot exceed ₹${MAX_BUDGET.toLocaleString( 
          "en-IN" 
        )}` 
    } 
 
    setErrors(newErrors) 
 
    return Object.keys(newErrors).length === 0 
  } 
 
  /* ---------------- SUBMIT ---------------- */ 
 
  const handleSubmit = (event) => { 
    event.preventDefault() 
 
    const isValid = validateForm() 
 
    if (!isValid) { 
      return 
    } 
 
    const tripData = { 
      destination: formData.destination.trim(), 
      startDate: formData.startDate, 
      endDate: formData.endDate, 
      duration: Number(formData.duration), 
      numTravelers: Number( 
        formData.numTravelers 
      ), 
      interests: [...formData.interests], 
      budgetMin: Number(formData.budgetMin), 
      budgetMax: Number(formData.budgetMax), 
    } 
 
    navigate("/itinerary", { 
      state: tripData, 
    }) 
  } 
 
  /* ---------------- TODAY ---------------- */ 
 
  const today = new Date() 
  const todayString = 
    `${today.getFullYear()}-${String( 
      today.getMonth() + 1 
    ).padStart(2, "0")}-${String( 
      today.getDate() 
    ).padStart(2, "0")}` 
 
  /* ---------------- UI ---------------- */ 
 
  return ( 
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8"> 
      <div className="mx-auto max-w-7xl"> 
 
        {/* HEADER */} 
 
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"> 
          <div> 
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400"> 
              <Route size={13} /> 
              Travel Configuration 
            </div> 
 
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl"> 
              BUILD YOUR 
              <span className="text-blue-500"> 
                {" "}JOURNEY. 
              </span> 
            </h1> 
 
            <p className="mt-2 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm"> 
              Configure your destination, dates, 
              travelers, budget and interests to 
              prepare your personalized travel plan. 
            </p> 
          </div> 
 
          <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 lg:flex"> 
            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" /> 
 
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500"> 
              Planner Ready 
            </span> 
          </div> 
        </div> 
 
        {/* MAIN FORM */} 
 
        <form onSubmit={handleSubmit}> 
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"> 
 
            {/* LEFT SIDE */} 
 
            <div className="space-y-4"> 
 
              {/* DESTINATION */} 
 
              <DestinationInput 
                value={formData.destination} 
                onChange={(e) => { 
                  setFormData((prev) => ({ 
                    ...prev, 
                    destination: 
                      e.target.value, 
                  })) 
 
                  setErrors((prev) => ({ 
                    ...prev, 
                    destination: "", 
                  })) 
                }} 
                error={errors.destination} 
              /> 
 
              {/* DATES */} 
 
              <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5"> 
                <div className="mb-4 flex items-center justify-between"> 
                  <div> 
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400"> 
                      02 / Schedule 
                    </p> 
 
                    <h2 className="mt-1 text-lg font-black"> 
                      When are you travelling? 
                    </h2> 
                  </div> 
 
                  {formData.duration && ( 
                    <div className="rounded-xl bg-blue-600/10 px-3 py-2 text-right"> 
                      <p className="text-[9px] uppercase tracking-wider text-blue-400"> 
                        Duration 
                      </p> 
 
                      <p className="text-sm font-black text-white"> 
                        {formData.duration}{" "} 
                        {formData.duration === 1 
                          ? "Day" 
                          : "Days"} 
                      </p> 
                    </div> 
                  )} 
                </div> 
 
                <div className="grid gap-3 sm:grid-cols-2"> 
 
                  {/* START DATE */} 
 
                  <div> 
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"> 
                      Start Date 
                    </label> 
 
                    <div className="relative"> 
                      <CalendarDays 
                        size={16} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" 
                      /> 
 
                      <input 
                        type="date" 
                        min={todayString} 
                        value={formData.startDate} 
                        onChange={(e) => 
                          handleDateChange( 
                            "startDate", 
                            e.target.value 
                          ) 
                        } 
                        className={`w-full rounded-xl border bg-[#111113] px-4 py-3 pl-11 text-sm font-semibold text-white outline-none transition [color-scheme:dark] focus:border-blue-500/50 ${ 
                          errors.startDate 
                            ? "border-red-500/50" 
                            : "border-white/10" 
                        }`} 
                      /> 
                    </div> 
 
                    {errors.startDate && ( 
                      <p className="mt-2 text-[10px] text-red-400"> 
                        {errors.startDate} 
                      </p> 
                    )} 
                  </div> 
 
                  {/* END DATE */} 
 
                  <div> 
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"> 
                      End Date 
                    </label> 
 
                    <div className="relative"> 
                      <CalendarDays 
                        size={16} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" 
                      /> 
 
                      <input 
                        type="date" 
                        min={ 
                          formData.startDate || 
                          todayString 
                        } 
                        value={formData.endDate} 
                        onChange={(e) => 
                          handleDateChange( 
                            "endDate", 
                            e.target.value 
                          ) 
                        } 
                        className={`w-full rounded-xl border bg-[#111113] px-4 py-3 pl-11 text-sm font-semibold text-white outline-none transition [color-scheme:dark] focus:border-blue-500/50 ${ 
                          errors.endDate 
                            ? "border-red-500/50" 
                            : "border-white/10" 
                        }`} 
                      /> 
                    </div> 
 
                    {errors.endDate && ( 
                      <p className="mt-2 text-[10px] text-red-400"> 
                        {errors.endDate} 
                      </p> 
                    )} 
                  </div> 
                </div> 
 
                <div className="mt-3 rounded-xl border border-blue-500/10 bg-blue-500/[0.04] px-4 py-3"> 
                  <div className="flex items-center justify-between"> 
                    <span className="text-[10px] uppercase tracking-wider text-slate-600"> 
                      Automatic Duration 
                    </span> 
 
                    <span className="text-xs font-bold text-blue-400"> 
                      {formData.duration 
                        ? `${formData.duration} days` 
                        : "Select dates"} 
                    </span> 
                  </div> 
                </div> 
              </div> 
 
              {/* BUDGET */} 
 
              <BudgetSlider 
                budgetMin={formData.budgetMin} 
                budgetMax={formData.budgetMax} 
                onMinChange={(value) => { 
                  if (typeof value === "string") { 
                    handleBudgetInputChange( 
                      "min", 
                      value 
                    ) 
                  } else { 
                    handleBudgetSliderChange( 
                      "min", 
                      value 
                    ) 
                  } 
                }} 
                onMaxChange={(value) => { 
                  if (typeof value === "string") { 
                    handleBudgetInputChange( 
                      "max", 
                      value 
                    ) 
                  } else { 
                    handleBudgetSliderChange( 
                      "max", 
                      value 
                    ) 
                  } 
                }} 
              /> 
 
              {errors.budget && ( 
                <p className="mt-2 text-[10px] font-semibold text-red-400"> 
                  {errors.budget} 
                </p> 
              )} 
            </div> 
 
            {/* RIGHT SIDE */} 
 
            <div className="space-y-4"> 
 
              {/* TRAVELERS */} 
 
              <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5"> 
                <div className="mb-4 flex items-center justify-between"> 
                  <div> 
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400"> 
                      04 / Travelers 
                    </p> 
 
                    <h2 className="mt-1 text-lg font-black"> 
                      Who is travelling? 
                    </h2> 
                  </div> 
 
                  <Users 
                    size={19} 
                    className="text-blue-400" 
                  /> 
                </div> 
 
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#111113] px-4 py-3"> 
                  <div> 
                    <p className="text-sm font-bold text-white"> 
                      Travelers 
                    </p> 
 
                    <p className="mt-1 text-[10px] text-slate-600"> 
                      Number of people 
                    </p> 
                  </div> 
 
                  <div className="flex items-center gap-2"> 
                    <button 
                      type="button" 
                      onClick={decreaseTravelers} 
                      disabled={ 
                        formData.numTravelers <= 1 
                      } 
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-30" 
                    > 
                      <Minus size={14} /> 
                    </button> 
 
                    <span className="w-8 text-center text-sm font-black text-white"> 
                      {formData.numTravelers} 
                    </span> 
 
                    <button 
                      type="button" 
                      onClick={increaseTravelers} 
                      disabled={ 
                        formData.numTravelers >= 20 
                      } 
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30" 
                    > 
                      <Plus size={14} /> 
                    </button> 
                  </div> 
                </div> 
 
                {errors.travelers && ( 
                  <p className="mt-2 text-[10px] font-semibold text-red-400"> 
                    {errors.travelers} 
                  </p> 
                )} 
              </div> 
 
              {/* INTERESTS */} 
 
              <InterestSelector 
                interests={interests} 
                selectedInterests={formData.interests} 
                onToggle={toggleInterest} 
              /> 
 
              {/* SUMMARY */} 
 
              <div className="rounded-2xl border border-blue-500/20 bg-blue-600 p-5 shadow-xl shadow-blue-950/20"> 
                <div className="flex items-start justify-between"> 
                  <div> 
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100"> 
                      Mission Summary 
                    </p> 
 
                    <h2 className="mt-2 text-xl font-black"> 
                      Ready to plan? 
                    </h2> 
                  </div> 
 
                  <Route 
                    size={22} 
                    className="text-white/80" 
                  /> 
                </div> 
 
                <div className="mt-5 grid grid-cols-2 gap-2"> 
 
                  <div className="rounded-xl bg-black/15 p-3"> 
                    <p className="text-[9px] uppercase tracking-wider text-blue-100/70"> 
                      Destination 
                    </p> 
 
                    <p className="mt-1 truncate text-xs font-bold text-white"> 
                      {formData.destination || 
                        "Not set"} 
                    </p> 
                  </div> 
 
                  <div className="rounded-xl bg-black/15 p-3"> 
                    <p className="text-[9px] uppercase tracking-wider text-blue-100/70"> 
                      Duration 
                    </p> 
 
                    <p className="mt-1 text-xs font-bold text-white"> 
                      {formData.duration 
                        ? `${formData.duration} days` 
                        : "Not set"} 
                    </p> 
                  </div> 
 
                  <div className="rounded-xl bg-black/15 p-3"> 
                    <p className="text-[9px] uppercase tracking-wider text-blue-100/70"> 
                      Travelers 
                    </p> 
 
                    <p className="mt-1 text-xs font-bold text-white"> 
                      {formData.numTravelers} 
                    </p> 
                  </div> 
 
                  <div className="rounded-xl bg-black/15 p-3"> 
                    <p className="text-[9px] uppercase tracking-wider text-blue-100/70"> 
                      Interests 
                    </p> 
 
                    <p className="mt-1 text-xs font-bold text-white"> 
                      {formData.interests.length} 
                    </p> 
                  </div> 
                </div> 
 
                <button 
                  type="submit" 
                  className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-slate-100" 
                > 
                  Generate Itinerary 
 
                  <ArrowRight 
                    size={16} 
                    className="transition-transform group-hover:translate-x-1" 
                  /> 
                </button> 
              </div> 
            </div> 
          </div> 
        </form> 
 
        {/* FOOTER STATUS */} 
 
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#080809] px-4 py-3"> 
          <div className="flex items-center gap-2"> 
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> 
 
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600"> 
              AI Travel Planning System 
            </span> 
          </div> 
 
          <span className="hidden text-[9px] uppercase tracking-wider text-slate-700 sm:block"> 
            Ready for itinerary 
          </span> 
        </div> 
      </div> 
    </section> 
  ) 
} 
 
export default Planner