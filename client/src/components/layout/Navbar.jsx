import { Link, useLocation } from "react-router-dom"
import {
  Compass,
  Grid2X2,
  LogIn,
  Menu,
  X,
  UserRound,
  Map,
} from "lucide-react"
import { useState } from "react"

function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    {
      label: "Overview",
      path: "/",
      icon: Grid2X2,
    },
    {
      label: "Planner",
      path: "/planner",
      icon: Compass,
    },
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: Map,
    },
  ]

  return (
    <nav className="fixed left-1/2 top-3 z-[2000] w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2">
      <div className="rounded-2xl border border-white/10 bg-[#080809]/95 px-3 py-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-4">

        <div className="flex items-center justify-between">

          {/* ==================================================
              BRAND
          ================================================== */}

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Compass size={18} strokeWidth={2} />
            </div>

            <div className="block">
              <p className="text-sm font-black tracking-tight text-white">
                AI TRAVEL
                <span className="text-blue-500">.</span>
              </p>

              <p className="text-[8px] font-semibold uppercase tracking-[0.25em] text-slate-600">
                Planner
              </p>
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden items-center gap-1 md:flex">

            {navItems.map((item) => {
              const Icon = item.icon

              const isActive =
                location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-500 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              )
            })}

          </div>

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div className="hidden items-center gap-2 md:flex">

            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
            >
              <LogIn size={14} />
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-blue-500 hover:text-white"
            >
              <UserRound size={14} />
              Register
            </Link>

          </div>

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:bg-white/[0.07] hover:text-white md:hidden"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
          >
            {isMenuOpen ? (
              <X size={19} />
            ) : (
              <Menu size={19} />
            )}
          </button>

        </div>

        {/* ==================================================
            MOBILE NAVIGATION
        ================================================== */}

        {isMenuOpen && (
          <div className="border-t border-white/10 pb-2 pt-3 md:hidden">

            <div className="flex flex-col gap-1">

              {navItems.map((item) => {
                const Icon = item.icon

                const isActive =
                  location.pathname === item.path

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                )
              })}

              <div className="mt-2 grid grid-cols-2 gap-2">

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  <LogIn size={15} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <UserRound size={15} />
                  Register
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar