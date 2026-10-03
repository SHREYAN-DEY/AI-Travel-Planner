import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Globe2,
} from "lucide-react"
import { loginUser } from "../../services/auth"

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }))

    setMessage("")
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Enter your email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Enter your password"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    try {
      const result = await loginUser(formData)

      setMessage(result.message || "Login successful")
      setShowSuccessPopup(true)

      /*
        Frontend-only for now.
        Real authentication/API integration will be added later.
      */

      setTimeout(() => {
        navigate("/dashboard")
      }, 1800)
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong. Please try again.")
    }
  }

  // Shared input styling.
  // These autofill utilities keep Chrome's saved
  // email/password fields dark instead of showing white.
  const inputClass =
    "w-full bg-transparent px-3 py-3.5 text-sm font-medium text-white outline-none placeholder:text-slate-700 autofill:bg-transparent autofill:text-white [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#111113_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"

  return (
    <section className="relative min-h-[calc(100vh-6rem)] bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d] shadow-2xl shadow-blue-950/20 lg:grid-cols-2">

          {/* LEFT PANEL */}
          <div className="relative hidden overflow-hidden bg-blue-600 p-8 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Globe2 size={21} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
                AI Travel Planning
              </p>

              <h1 className="mt-3 max-w-sm text-4xl font-black leading-tight">
                YOUR NEXT
                <span className="block text-blue-100">
                  JOURNEY STARTS HERE.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100/70">
                Access your travel workspace and continue planning
                personalized journeys.
              </p>
            </div>

            <div className="relative rounded-2xl bg-black/15 p-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-100/60">
                System
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white shadow-lg shadow-white/50" />

                <span className="text-xs font-bold">
                  Travel Planner Ready
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 lg:hidden">
               <Globe2 size={21} />
                AI Travel Planner
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Sign in to continue.
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Enter your account details to access your travel
                dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Email Address
                </label>

                <div
                  className={`flex items-center rounded-xl border bg-[#111113] px-4 transition focus-within:border-blue-500/50 ${
                    errors.email
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                >
                  <Mail size={16} className="text-blue-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-[10px] font-semibold text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Password
                </label>

                <div
                  className={`flex items-center rounded-xl border bg-[#111113] px-4 transition focus-within:border-blue-500/50 ${
                    errors.password
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                >
                  <LockKeyhole size={16} className="text-blue-400" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="text-slate-600 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-[10px] font-semibold text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              {message && !showSuccessPopup && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[10px] font-semibold text-red-400">
                  {message}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Sign In

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* REGISTER */}
            <div className="mt-6 border-t border-white/10 pt-5 text-center">
              <p className="text-[10px] text-slate-600">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-1 inline-block text-xs font-bold text-blue-400 transition hover:text-blue-300"
              >
                Create a new account
              </Link>
            </div>

            {/* FRONTEND STATUS */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-700">
                Frontend Authentication Interface
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-blue-500/20 bg-[#0d0d10] p-8 text-center shadow-2xl shadow-blue-950/40">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
              <CheckCircle2
                size={46}
                className="text-blue-400"
                strokeWidth={1.8}
              />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-400">
              Authentication
            </p>

            <h3 className="mt-2 text-2xl font-black text-white">
              Login Successful!
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Welcome back. Redirecting you to your travel dashboard...
            </p>

            <div className="mx-auto mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full origin-left animate-pulse rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Login