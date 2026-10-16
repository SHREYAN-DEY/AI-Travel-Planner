import {
  ArrowRight,
  CalendarDays,
  Compass,
  MapPin,
  Plus,
 Navigation,
  Users,
  Wallet,
} from "lucide-react"
import { Link } from "react-router-dom"

function Dashboard() {
  const savedTrips = []

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
              <Navigation size={13} />
              Travel Command Center
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              YOUR TRAVEL
              <span className="text-blue-500"> DASHBOARD.</span>
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500 sm:text-sm">
              Manage your journeys, review saved plans and launch a new
              personalized itinerary.
            </p>
          </div>

          <Link
            to="/planner"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            <Plus size={16} />
            New Journey
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* QUICK STATS */}

        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Compass size={17} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
                01
              </span>
            </div>

            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
              Saved Trips
            </p>

            <p className="mt-1 text-2xl font-black">
              {savedTrips.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CalendarDays size={17} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
                02
              </span>
            </div>

            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
              Active Plans
            </p>

            <p className="mt-1 text-2xl font-black">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Users size={17} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
                03
              </span>
            </div>

            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
              Travel Plans
            </p>

            <p className="mt-1 text-2xl font-black">0</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Wallet size={17} />
              </div>

              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
                04
              </span>
            </div>

            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
              Budget Tracking
            </p>

            <p className="mt-1 text-sm font-black text-blue-400">
              Ready
            </p>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">

          {/* SAVED TRIPS */}

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-5">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  Journey Archive
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Saved Trips
                </h2>
              </div>

              <Compass size={19} className="text-blue-400" />
            </div>

            {savedTrips.length === 0 ? (
              <div className="flex min-h-[270px] flex-col items-center justify-center text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-600">
                  <MapPin size={23} />
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Archive Empty
                </p>

                <h3 className="mt-2 text-lg font-black text-white">
                  No saved journeys yet
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                  Your generated travel plans will appear here when
                  they are saved.
                </p>

                <Link
                  to="/planner"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 transition hover:bg-blue-500/20"
                >
                  <Plus size={14} />
                  Create First Journey
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {savedTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="rounded-xl border border-white/10 bg-[#111113] p-4"
                  >
                    {trip.destination}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LAUNCH CARD */}

          <div className="rounded-2xl border border-blue-500/20 bg-blue-600 p-5 shadow-2xl shadow-blue-950/20">

            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
                  Mission Control
                </p>

                <h2 className="mt-2 text-2xl font-black">
                  New Itinerary
                </h2>

                <p className="mt-2 max-w-sm text-xs leading-5 text-blue-100/70">
                  Configure your destination, dates, travelers,
                  budget and interests to begin.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Navigation size={21} />
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <MapPin size={15} />

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-blue-100/60">
                    Destination
                  </p>

                  <p className="text-xs font-bold">
                    Personal destination
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <CalendarDays size={15} />

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-blue-100/60">
                    Schedule
                  </p>

                  <p className="text-xs font-bold">
                    Flexible dates
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <Wallet size={15} />

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-blue-100/60">
                    Budget
                  </p>

                  <p className="text-xs font-bold">
                    Custom range
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/planner"
              className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs font-black uppercase tracking-wider text-black transition hover:bg-slate-100"
            >
              Launch Planner
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* SYSTEM STATUS */}

        <div className="mt-4 grid gap-3 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Travel Engine
              </p>

              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" />
            </div>

            <p className="mt-3 text-sm font-black">
  Frontend Ready
</p>

<p className="mt-1 text-[9px] text-slate-700">
  Planning interface is ready for trip configuration
</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Weather System
              </p>

              <span className="h-2 w-2 rounded-full bg-slate-700" />
            </div>

            <p className="mt-3 text-sm font-black">
              Awaiting API
            </p>

            <p className="mt-1 text-[9px] text-slate-700">
              Live weather integration comes later
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d] p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Data Storage
              </p>

              <span className="h-2 w-2 rounded-full bg-slate-700" />
            </div>

            <p className="mt-3 text-sm font-black">
              Local Interface
            </p>

            <p className="mt-1 text-[9px] text-slate-700">
              Backend persistence will be connected later
            </p>
          </div>
        </div>

        {/* STATUS BAR */}

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-[#080809] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600">
              AI Travel Planning System
            </span>
          </div>

          <span className="text-[9px] uppercase tracking-wider text-slate-700">
            Dashboard Interface
          </span>
        </div>

      </div>
    </section>
  )
}

export default Dashboard