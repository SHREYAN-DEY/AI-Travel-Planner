import { useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CloudSun,
  Compass,
  Map,
  MapPin,
  Users,
  Wallet,
  Wind,
  Umbrella,
} from "lucide-react"
import TravelMap from "../../components/itinerary/TravelMap"

const dayActivities = {
  1: [
    "Arrive at destination",
    "Check-in at hotel",
    "Freshen up and relax",
    "Lunch at a local restaurant",
    "Explore nearby attractions",
    "Evening sightseeing",
    "Dinner and return to hotel",
  ],

  2: [
    "Breakfast at hotel",
    "Start the day's exploration",
    "Visit nearby attractions",
    "Lunch at a local restaurant",
    "Leisure and free time",
    "Evening sightseeing",
    "Return to hotel",
  ],

  3: [
    "Breakfast at hotel",
    "Continue planned exploration",
    "Explore local experiences",
    "Lunch break",
    "Free time and relaxation",
    "Evening activity",
    "Return to hotel",
  ],

  4: [
    "Breakfast at hotel",
    "Begin the day's activities",
    "Explore nearby attractions",
    "Lunch at a local restaurant",
    "Leisure and free time",
    "Evening sightseeing",
    "Return to hotel",
  ],

  5: [
    "Breakfast at hotel",
    "Continue planned exploration",
    "Explore local experiences",
    "Lunch break",
    "Free time and relaxation",
    "Prepare for departure",
    "Return to hotel",
  ],
}

const fallbackActivities = [
  "Breakfast at hotel",
  "Start the day's exploration",
  "Explore nearby attractions",
  "Lunch at a local restaurant",
  "Free time and relaxation",
  "Evening activity",
  "Return to hotel",
]
function formatLocalDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
function formatDate(dateString) {
  if (!dateString) return "Date not set"

  const date = new Date(`${dateString}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return "Date not set"
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatBudget(min, max) {
  if (
    min === undefined ||
    min === null ||
    min === "" ||
    max === undefined ||
    max === null ||
    max === ""
  ) {
    return "Budget not set"
  }

  const minimum = Number(min)
  const maximum = Number(max)

  if (
    !Number.isFinite(minimum) ||
    !Number.isFinite(maximum) ||
    minimum <= 0 ||
    maximum <= 0 ||
    minimum >= maximum
  ) {
    return "Budget not set"
  }

  if (maximum >= 100000) {
    return `₹${minimum.toLocaleString("en-IN")}+`
  }

  return `₹${minimum.toLocaleString(
    "en-IN"
  )} – ₹${maximum.toLocaleString("en-IN")}`
}

function Itinerary() {
  const location = useLocation()
  const navigate = useNavigate()

  const trip = location.state

  /*
   * ----------------------------------------------------
   * TRIP VALIDATION
   * ----------------------------------------------------
   * The itinerary page should only render when the
   * planner has passed valid basic trip information.
   */

  const hasTripData = Boolean(
    trip &&
      typeof trip === "object" &&
      typeof trip.destination === "string" &&
      trip.destination.trim() &&
      Number.isFinite(Number(trip.duration)) &&
      Number(trip.duration) > 0
  )

  const daysCount = hasTripData ? Number(trip.duration) : 0

  const [selectedDay, setSelectedDay] = useState(1)

  /*
   * ----------------------------------------------------
   * DAY DATA
   * ----------------------------------------------------
   * Creates Day 1, Day 2, Day 3... automatically based
   * on the calculated duration from Planner.
   */

  const days = useMemo(() => {
    if (!daysCount) return []

    return Array.from({ length: daysCount }, (_, index) => {
      const dayNumber = index + 1

      let date = null

      if (trip?.startDate) {
        const start = new Date(`${trip.startDate}T00:00:00`)

        if (!Number.isNaN(start.getTime())) {
          start.setDate(start.getDate() + index)
date = formatLocalDate(start)
        }
      }

      return {
        day: dayNumber,
        date,
      }
    })
  }, [daysCount, trip?.startDate])

  /*
   * ----------------------------------------------------
   * SAFE SELECTED DAY
   * ----------------------------------------------------
   * If selectedDay somehow becomes invalid, automatically
   * fall back to Day 1.
   */

  const safeSelectedDay =
    days.length > 0 && days.some((item) => item.day === selectedDay)
      ? selectedDay
      : 1

  const selectedDayData =
    days.find((item) => item.day === safeSelectedDay) || null

  const selectedDayActivities =
    dayActivities[safeSelectedDay] || fallbackActivities

  const activeDate = selectedDayData?.date || null

  /*
   * ----------------------------------------------------
   * INVALID / MISSING TRIP SCREEN
   * ----------------------------------------------------
   */

  if (!hasTripData) {
    return (
      <section className="min-h-[calc(100vh-6rem)] overflow-x-hidden bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-white/10 bg-[#0b0b0d] p-8 text-center shadow-2xl shadow-black/30 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <Compass size={28} />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
              No active journey
            </p>

            <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              No Trip Found
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your itinerary data is missing or incomplete.
              Start by creating a travel plan from the Planner.
            </p>

            <button
              type="button"
              onClick={() => navigate("/planner")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-blue-500"
            >
              <ArrowLeft size={15} />
              Back to Planner
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
           <button
  type="button"
  onClick={() =>
    navigate("/planner", {
      state: {
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        duration: trip.duration,
        numTravelers: trip.numTravelers,
        interests: Array.isArray(trip.interests)
          ? trip.interests
          : [],
        budgetMin: trip.budgetMin,
        budgetMax: trip.budgetMax,
      },
    })
  }
  className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 transition hover:text-blue-400"
>
  <ArrowLeft size={14} />
  Edit Journey
</button>

            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Generated Journey
                </p>

                <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                  {trip.destination.trim()}
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  Your personalized travel itinerary
                </p>

                {/* TRIP DATES */}

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                    <CalendarDays
                      size={13}
                      className="text-blue-400"
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                        Start Date
                      </p>

                      <p className="text-[10px] font-bold text-slate-300">
                        {formatDate(trip.startDate)}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-slate-700">
                    →
                  </span>

                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                    <CalendarDays
                      size={13}
                      className="text-blue-400"
                    />

                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                        End Date
                      </p>

                      <p className="text-[10px] font-bold text-slate-300">
                        {formatDate(trip.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRIP SUMMARY */}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-[#0b0b0d] px-3 py-2.5">
              <CalendarDays
                size={14}
                className="text-blue-400"
              />

              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                Duration
              </p>

              <p className="text-xs font-bold">
                {daysCount}{" "}
                {daysCount === 1 ? "Day" : "Days"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b0b0d] px-3 py-2.5">
              <Users
                size={14}
                className="text-blue-400"
              />

              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                Travelers
              </p>

              <p className="text-xs font-bold">
                {trip.numTravelers || "—"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b0b0d] px-3 py-2.5">
              <Wallet
                size={14}
                className="text-blue-400"
              />

              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                Budget
              </p>

              <p className="break-words text-xs font-bold">
  {formatBudget(
    trip.budgetMin,
    trip.budgetMax
  )}
</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b0b0d] px-3 py-2.5">
              <Map
                size={14}
                className="text-blue-400"
              />

              <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600">
                Interests
              </p>

              <p className="text-xs font-bold">
                {Array.isArray(trip.interests)
                  ? trip.interests.length
                  : 0}{" "}
                Selected
              </p>
            </div>
          </div>
        </div>

        {/* DAY TABS */}

        <div className="mb-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b0b0d] p-2">
          <div className="flex min-w-max gap-1">
            {days.map((day) => {
              const active = safeSelectedDay === day.day

              return (
                <button
                  key={day.day}
                  type="button"
                  onClick={() => setSelectedDay(day.day)}
                  className={`min-w-[92px] rounded-xl px-4 py-3 text-left transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-500 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em]">
                    Day {day.day}
                  </p>

                  <p
                    className={`mt-1 text-[10px] ${
                      active
                        ? "text-blue-100"
                        : "text-slate-700"
                    }`}
                  >
                    {formatDate(day.date)}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

          {/* SELECTED DAY */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Day {safeSelectedDay}
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Daily Itinerary
                </h2>
              </div>

              <div className="rounded-xl bg-blue-500/10 px-3 py-2 text-right">
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Date
                </p>

                <p className="text-xs font-bold text-white">
                  {formatDate(activeDate)}
                </p>
              </div>
            </div>

            {/* ACTIVITIES */}

            <div className="mt-4 space-y-2">
              {selectedDayActivities.map(
                (activity, index) => (
                  <div
                    key={`${activity}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111113] px-4 py-3 transition hover:border-blue-500/20"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <CheckCircle2 size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-200">
                        {activity}
                      </p>

                      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-slate-700">
                        Activity {index + 1}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* WEATHER */}

            <div className="mt-4 rounded-2xl border border-blue-500/15 bg-blue-500/[0.04] p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <CloudSun size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                      Weather Forecast
                    </p>

                    <p className="mt-0.5 truncate text-[9px] text-slate-600">
                      {formatDate(activeDate)}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg border border-amber-500/15 bg-amber-500/[0.04] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-amber-400">
                  API Pending
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">

                {/* TEMPERATURE */}

                <div className="rounded-xl border border-white/10 bg-[#0b0b0d] p-3">
                  <div className="flex items-center justify-between">
                    <CloudSun
                      size={14}
                      className="text-blue-400"
                    />

                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                      Temp
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-black text-white">
                    —
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-700">
                    Temperature
                  </p>
                </div>

                {/* RAIN */}

                <div className="rounded-xl border border-white/10 bg-[#0b0b0d] p-3">
                  <div className="flex items-center justify-between">
                    <Umbrella
                      size={14}
                      className="text-blue-400"
                    />

                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                      Rain
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-black text-white">
                    —
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-700">
                    Rain Chance
                  </p>
                </div>

                {/* WIND */}

                <div className="rounded-xl border border-white/10 bg-[#0b0b0d] p-3">
                  <div className="flex items-center justify-between">
                    <Wind
                      size={14}
                      className="text-blue-400"
                    />

                    <span className="text-[8px] font-bold uppercase tracking-wider text-slate-700">
                      Wind
                    </span>
                  </div>

                  <p className="mt-3 text-lg font-black text-white">
                    —
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-wider text-slate-700">
                    Wind Speed
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                <Map
                  size={12}
                  className="shrink-0 text-blue-400"
                />

                <p className="text-[9px] leading-4 text-slate-600">
                  Weather data will appear here when the weather
                  service is connected.
                </p>
              </div>
            </div>
          </div>

          {/* MAP */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">

            <div className="mb-3 flex items-center justify-between px-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Navigation
                </p>

                <h2 className="mt-1 text-lg font-black">
                  Trip Map
                </h2>
              </div>

              <Map
                size={18}
                className="text-blue-400"
              />
            </div>

            <div className="overflow-hidden rounded-xl">
              <TravelMap
                destination={trip.destination}
                places={[]}
                activePlace={null}
              />
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
              <MapPin
                size={13}
                className="text-blue-400"
              />

              <p className="truncate text-[10px] text-slate-500">
                {trip.destination}
              </p>

              <span className="ml-auto text-[8px] uppercase tracking-wider text-slate-700">
                Destination
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM INFO */}

        <div className="mt-4 grid gap-4 md:grid-cols-2">

          {/* BUDGET INSIGHT */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Wallet size={17} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                  Budget Insight
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Your selected trip budget
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-xl font-black text-white">
                  {formatBudget(
                    trip.budgetMin,
                    trip.budgetMax
                  )}
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  Total planned budget range
                </p>
              </div>

              <span className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-wider text-slate-600">
                Preview
              </span>
            </div>
          </div>

          {/* TRAVEL INSIGHTS */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Map size={17} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400">
                  Travel Insights
                </p>

                <p className="mt-1 text-[9px] text-slate-600">
                  AI-generated recommendations
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <div className="flex items-start gap-2">
                <CheckCircle2
                  size={14}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <p className="text-[9px] leading-4 text-slate-600">
                  Personalized travel insights, packing suggestions
                  and weather-aware recommendations will appear here
                  after itinerary generation is connected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* STATUS */}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#080809] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
              Itinerary Interface
            </span>
          </div>

          <span className="text-[9px] uppercase tracking-wider text-slate-700">
            Frontend Preview
          </span>
        </div>

      </div>
    </section>
  )
}

export default Itinerary