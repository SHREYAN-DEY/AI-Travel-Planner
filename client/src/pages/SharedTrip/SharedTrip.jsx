import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Compass,
  MapPin,
  Share2,
  Users,
  Wallet,
} from "lucide-react"
import { Link, useParams } from "react-router-dom"

function SharedTrip() {
  const { shareId } = useParams()

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 pb-12 pt-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              <Share2 size={12} />
              Shared Journey
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              SHARED
              <span className="text-blue-500"> TRIP.</span>
            </h1>

            <p className="mt-2 text-xs leading-5 text-slate-600">
              A shared travel plan from AI Travel Planner.
            </p>
          </div>

          <Link
            to="/planner"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            <Compass size={14} />
            Create Your Trip
          </Link>
        </div>

        {/* SHARED TRIP CARD */}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d]">

          {/* BLUE HEADER */}

          <div className="relative overflow-hidden bg-blue-600 p-6 sm:p-8">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100">
                Shared Itinerary
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                Your Shared Journey
              </h2>

              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-black/15 px-3 py-2">
                <Share2 size={13} />
                <span className="text-[9px] font-bold uppercase tracking-wider">
                  ID: {shareId || "SHARED-TRIP"}
                </span>
              </div>
            </div>
          </div>

          {/* TRIP INFO */}

          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <MapPin size={17} />
              </div>

              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Destination
              </p>

              <p className="mt-1 text-sm font-black text-slate-400">
                Awaiting Trip Data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <CalendarDays size={17} />
              </div>

              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Duration
              </p>

              <p className="mt-1 text-sm font-black text-slate-400">
                Awaiting Trip Data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Users size={17} />
              </div>

              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Travelers
              </p>

              <p className="mt-1 text-sm font-black text-slate-400">
                Awaiting Trip Data
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111113] p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Wallet size={17} />
              </div>

              <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                Budget
              </p>

              <p className="mt-1 text-sm font-black text-slate-400">
                Awaiting Trip Data
              </p>
            </div>

          </div>

          {/* CONTENT */}

          <div className="border-t border-white/10 p-5 sm:p-6">

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">

              {/* ITINERARY */}

              <div className="rounded-2xl border border-white/10 bg-[#080809] p-5">

                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
                      Journey Timeline
                    </p>

                    <h3 className="mt-1 text-lg font-black">
                      Shared Itinerary
                    </h3>
                  </div>

                  <CalendarDays
                    size={18}
                    className="text-blue-400"
                  />
                </div>

                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-600">
                    <Share2 size={22} />
                  </div>

                  <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                    Shared Data Pending
                  </p>

                  <h4 className="mt-2 text-lg font-black">
                    Itinerary not loaded
                  </h4>

                  <p className="mt-2 max-w-sm text-xs leading-5 text-slate-600">
                    The shared itinerary will appear here when shared trip
                    data is available.
                  </p>

                </div>
              </div>

              {/* STATUS */}

              <div className="rounded-2xl border border-blue-500/20 bg-blue-600 p-5">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-100">
                      Share Status
                    </p>

                    <h3 className="mt-2 text-xl font-black">
                      Public Journey
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <CheckCircle2 size={19} />
                  </div>
                </div>

                <div className="mt-6 space-y-2">

                  <div className="flex items-center justify-between rounded-xl bg-black/15 px-4 py-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100/60">
                      Share ID
                    </span>

                    <span className="text-[10px] font-bold">
                      {shareId || "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-black/15 px-4 py-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100/60">
                      Visibility
                    </span>

                    <span className="text-[10px] font-bold">
                      Public
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-black/15 px-4 py-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-100/60">
                      Data Source
                    </span>

                    <span className="text-[10px] font-bold">
                      Trip System
                    </span>
                  </div>

                </div>

                <Link
                  to="/planner"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-[10px] font-black uppercase tracking-wider text-black transition hover:bg-slate-100"
                >
                  <Compass size={14} />
                  Plan Your Own Trip
                </Link>

              </div>

            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-[#080809] px-4 py-3">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-700">
            AI Travel Planner • Shared Journey Interface
          </p>
        </div>

      </div>
    </section>
  )
}

export default SharedTrip