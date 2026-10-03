import { ArrowLeft, Compass, Home, Map } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

function NotFound() {
  const navigate = useNavigate()

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[65vh] max-w-5xl items-center justify-center">

        <div className="w-full rounded-3xl border border-white/10 bg-[#0b0b0d] p-6 text-center shadow-2xl shadow-blue-950/20 sm:p-10 lg:p-14">

          {/* ICON */}

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-500/20 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-950/20">
            <Compass size={34} />
          </div>

          {/* ERROR CODE */}

          <p className="mt-7 text-7xl font-black tracking-tighter text-blue-500 sm:text-8xl">
            404
          </p>

          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
            Route Not Found
          </p>

          <h1 className="mt-3 text-2xl font-black sm:text-3xl">
            This journey doesn't exist.
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-slate-600 sm:text-sm">
            The page you're looking for may have been moved, removed, or
            the address may be incorrect.
          </p>

          {/* ACTIONS */}

          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              <ArrowLeft size={14} />
              Go Back
            </button>

            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              <Home size={14} />
              Back to Overview
            </Link>

            <Link
              to="/planner"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-blue-400 transition hover:bg-blue-500/20"
            >
              <Map size={14} />
              Open Planner
            </Link>

          </div>

          {/* STATUS */}

          <div className="mx-auto mt-9 flex max-w-sm items-center justify-center gap-2 border-t border-white/10 pt-5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" />

            <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-700">
              AI Travel Planner • Navigation System
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}

export default NotFound