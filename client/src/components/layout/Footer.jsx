import { Link } from "react-router-dom"
import {
  ArrowUpRight,
  Compass,
  Mail,
} from "lucide-react"

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid gap-8 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <Compass size={18} />
              </div>

              <div>
                <p className="text-sm font-black tracking-tight">
                  AI TRAVEL<span className="text-blue-500">.</span>
                </p>

                <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                  Planner
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-xs leading-5 text-slate-600">
              Plan personalized journeys with a modern AI-powered travel
              planning interface.
            </p>

            {/* Social Icons */}
           <div className="mt-5 flex items-center gap-2">
  <a
    href="mailto:contact@example.com"
    aria-label="Email"
    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-500 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
  >
    <Mail size={14} />
  </a>
</div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Explore
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                to="/"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                Overview
              </Link>

              <Link
                to="/planner"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                Planner
              </Link>

              <Link
                to="/dashboard"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Account
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <Link
                to="/login"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/register"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                Register
              </Link>

              <Link
                to="/dashboard"
                className="text-xs text-slate-600 transition hover:text-white"
              >
                My Trips
              </Link>
            </div>
          </div>

          {/* System Status */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">
              System Status
            </p>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#0b0b0d] p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/60" />

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Frontend Online
                </span>
              </div>

              <p className="mt-3 text-[9px] leading-4 text-slate-700">
                Travel planning interface is ready for use.
              </p>

              <Link
                to="/planner"
                className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-blue-400 transition hover:text-blue-300"
              >
                Start Planning
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-700">
            © {new Date().getFullYear()} AI Travel Planner
          </p>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

            <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-700">
              Personalized Travel Planning System
            </span>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer