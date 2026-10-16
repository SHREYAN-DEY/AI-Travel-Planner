import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Globe2,
  LockKeyhole,
  Mail,
  Luggage,
  UserRound,
} from "lucide-react"
import { registerUser } from "../../services/auth"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

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

    if (!formData.name.trim()) {
      newErrors.name = "Enter your name"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Enter your email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Create a password"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Re-enter your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.country.trim()) {
      newErrors.country = "Enter your country"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

    try {
      const result = await registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        country: formData.country.trim(),
      })

      setMessage(result.message || "Registration successful")

      /*
        Frontend-only for now.
        Real backend registration will be connected later.
      */

      setTimeout(() => {
        navigate("/dashboard")
      }, 500)
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong. Please try again.")
    }
  }

  const inputClass =
    "w-full bg-transparent px-2.5 py-3 text-sm text-white outline-none placeholder:text-slate-700 autofill:bg-transparent autofill:text-white [&:-webkit-autofill]:bg-transparent [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0px_1000px_#111113_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"

  return (
    <section className="min-h-[calc(100vh-6rem)] bg-[#050505] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[72vh] max-w-6xl items-center justify-center">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0d] shadow-2xl shadow-blue-950/20 lg:grid-cols-2">

          {/* LEFT PANEL */}

          <div className="relative hidden overflow-hidden bg-blue-600 p-8 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Globe2 size={21} />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100">
                Start Your Journey
              </p>

              <h1 className="mt-3 max-w-sm text-4xl font-black leading-tight">
                BUILD YOUR
                <span className="block text-blue-100">
                  TRAVEL PROFILE.
                </span>
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-6 text-blue-100/70">
                Create your account and prepare your personalized travel
                planning workspace.
              </p>
            </div>

            <div className="relative space-y-2">
              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <Check size={15} />
                <span className="text-xs font-semibold">
                  Personalized planning
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <Check size={15} />
                <span className="text-xs font-semibold">
                  Save your journeys
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-black/15 px-4 py-3">
                <Check size={15} />
                <span className="text-xs font-semibold">
                  Manage travel preferences
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 lg:hidden">
               <Luggage size={21} />
                AI Travel Planner
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                Create account
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Join the journey.
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                Set up your profile to start creating personalized trips.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">

              {/* NAME + COUNTRY */}

              <div className="grid gap-3 sm:grid-cols-2">

                {/* NAME */}

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Full Name
                  </label>

                  <div
                    className={`flex items-center rounded-xl border bg-[#111113] px-3.5 ${
                      errors.name
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                  >
                    <UserRound size={15} className="text-blue-400" />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-1 text-[9px] font-semibold text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* COUNTRY */}

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Country
                  </label>

                  <div
                    className={`flex items-center rounded-xl border bg-[#111113] px-3.5 ${
                      errors.country
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                  >
                    <Globe2 size={15} className="text-blue-400" />

                    <input
                      id="country"
                      name="country"
                      type="text"
                      autoComplete="country-name"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="India"
                      className={inputClass}
                    />
                  </div>

                  {errors.country && (
                    <p className="mt-1 text-[9px] font-semibold text-red-400">
                      {errors.country}
                    </p>
                  )}
                </div>

              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  Email Address
                </label>

                <div
                  className={`flex items-center rounded-xl border bg-[#111113] px-3.5 ${
                    errors.email
                      ? "border-red-500/50"
                      : "border-white/10"
                  }`}
                >
                  <Mail size={15} className="text-blue-400" />

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
                  <p className="mt-1 text-[9px] font-semibold text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORDS */}

              <div className="grid gap-3 sm:grid-cols-2">

                {/* PASSWORD */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Password
                  </label>

                  <div
                    className={`flex items-center rounded-xl border bg-[#111113] px-3.5 ${
                      errors.password
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                  >
                    <LockKeyhole size={15} className="text-blue-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="text-slate-600 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1 text-[9px] font-semibold text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Confirm Password
                  </label>

                  <div
                    className={`flex items-center rounded-xl border bg-[#111113] px-3.5 ${
                      errors.confirmPassword
                        ? "border-red-500/50"
                        : "border-white/10"
                    }`}
                  >
                    <LockKeyhole size={15} className="text-blue-400" />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter password"
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="text-slate-600 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-1 text-[9px] font-semibold text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

              </div>

              {/* MESSAGE */}

              {message && (
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-[10px] font-semibold text-blue-400">
                  {message}
                </div>
              )}

              {/* BUTTON */}

              <button
                type="submit"
                className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Create Account

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* LOGIN */}

            <div className="mt-5 border-t border-white/10 pt-4 text-center">
              <p className="text-[10px] text-slate-600">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-1 inline-block text-xs font-bold text-blue-400 transition hover:text-blue-300"
              >
                Sign in
              </Link>
            </div>

            {/* FRONTEND STATUS */}

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-slate-700">
                Frontend Authentication Interface
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Register