import {
  ArrowRight,
  CalendarDays,
  Compass,
  MapPin,
  Wallet,
  Users,
  CloudSun,
} from "lucide-react"
import { Link } from "react-router-dom"

function Home() {
  return (
    <section className="min-h-screen bg-[#050505] px-4 pb-16 pt-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HERO
        ================================================== */}

        <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">

          {/* LEFT */}

          <div>

            {/* Travel Intelligence Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
              <Compass size={15} />
              AI Travel Intelligence
            </div>

            {/* Main Heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              PLAN YOUR

              <span className="block text-blue-500">
                PERFECT JOURNEY.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Create personalized day-by-day travel plans based on
              your destination, dates, budget, travelers and interests.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/planner"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/30"
              >
                Start Planning

                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Explore Trips
              </Link>

            </div>

          </div>

          {/* ==================================================
              RIGHT — TRIP PREVIEW
          ================================================== */}

          <div className="relative">

            {/* Blue Glow */}
            <div className="absolute -inset-10 -z-10 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="rounded-[28px] border border-white/10 bg-[#0b0b0d] p-5 shadow-2xl shadow-blue-950/20 sm:p-6">

              {/* Preview Header */}

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
                    Travel Mission
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
                    New Journey
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <MapPin size={20} />
                </div>

              </div>

              {/* Destination */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#111113] p-5">

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Destination
                </p>

                <div className="mt-2 flex items-center justify-between">

                  <p className="text-2xl font-black text-white">
                    Your Destination
                  </p>

                  <MapPin
                    size={20}
                    className="text-blue-500"
                  />

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Personalized route synthesis
                </p>

              </div>

              {/* Stats */}

              <div className="mt-3 grid grid-cols-3 gap-2">

                {/* Duration */}

                <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">

                  <CalendarDays
                    size={17}
                    className="text-blue-400"
                  />

                  <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Auto
                  </p>

                </div>

                {/* Group */}

                <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">

                  <Users
                    size={17}
                    className="text-blue-400"
                  />

                  <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">
                    Group
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Flexible
                  </p>

                </div>

                {/* Budget */}

                <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">

                  <Wallet
                    size={17}
                    className="text-blue-400"
                  />

                  <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-500">
                    Budget
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Custom
                  </p>

                </div>

              </div>

              {/* AI Engine */}

              <div className="mt-3 rounded-2xl bg-blue-600 p-5 shadow-lg shadow-blue-600/10">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
                      AI Engine
                    </p>

                    <p className="mt-1 text-lg font-black text-white">
                      Ready to Plan
                    </p>

                  </div>

                  <Compass
                    size={25}
                    className="text-white/80"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            FEATURE GRID
        ================================================== */}

        <div className="grid gap-3 md:grid-cols-3">

          {/* Card 1 — Personalized Planning */}

          <div className="group rounded-2xl border border-white/10 bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-950/20">

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Compass size={19} />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                01
              </span>

            </div>

            <h2 className="mt-5 text-lg font-bold text-white">
              Personalized Planning
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Build a travel plan around your own interests,
              dates, travelers and budget.
            </p>

          </div>

          {/* Card 2 — Itinerary */}

          <div className="group rounded-2xl border border-white/10 bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-950/20">

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CalendarDays size={19} />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                02
              </span>

            </div>

            <h2 className="mt-5 text-lg font-bold text-white">
              Day-by-Day Itinerary
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Organize your journey into structured daily
              activities and travel information.
            </p>

          </div>

          {/* Card 3 — Weather */}

          <div className="group rounded-2xl border border-white/10 bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-950/20">

            <div className="flex items-start justify-between">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CloudSun size={19} />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                03
              </span>

            </div>

            <h2 className="mt-5 text-lg font-bold text-white">
              Weather-Aware Travel
            </h2>

            <p className="mt-2 text-xs leading-6 text-slate-500">
              Keep weather information alongside your daily
              itinerary for a more informed travel experience.
            </p>

          </div>

        </div>

        {/* ==================================================
            BOTTOM STATUS
        ================================================== */}

        <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#080809] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              AI Travel Planning System
            </p>

          </div>

          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Ready for your next journey
          </p>

        </div>

      </div>
    </section>
  )
}

export default Home