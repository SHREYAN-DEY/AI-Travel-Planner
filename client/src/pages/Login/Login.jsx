
//  LOGIN 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import {
  LogIn,
  Mail,
  Lock,
  Plane,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  //  FORM STATE 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //  FORM CHANGE 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //  SUBMIT 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();

    //  VALIDATION 

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Small delay for a smoother frontend experience
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      //  STORED USER 

      const storedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      // No registered account
      if (!storedUser) {
        alert(
          "No account found. Please create an account first."
        );
        return;
      }

      // Email check
      if (
        storedUser.email?.toLowerCase() !== email
      ) {
        alert("No account found with this email.");
        return;
      }

      // Password check
      if (storedUser.password !== password) {
        alert("Incorrect password. Please try again.");
        return;
      }

      //  LOGIN STATE 

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          email: storedUser.email,
          name:
            storedUser.name ||
            email.split("@")[0],
        })
      );

      alert("Login successful! 🎉");

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  //  UI 

  return (
    <Layout>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-4 py-10 sm:py-16">

        <main className="mx-auto flex w-full max-w-md items-center justify-center">

          <div className="w-full">

            {/*  HEADER  */}

            <div className="mb-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                <LogIn size={26} />
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Welcome Back
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
                Login to continue planning your personalized trips.
              </p>

            </div>

            {/*  LOGIN CARD  */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/*  EMAIL  */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/*  PASSWORD  */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/*  LOGIN BUTTON  */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold !text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />

                      <span className="!text-white">
                        Logging In...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn size={19} />

                      <span className="!text-white">
                        Login
                      </span>
                    </>
                  )}

                </button>

              </form>

              {/*  DIVIDER  */}

              <div className="my-6 flex items-center gap-3">

                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs font-medium text-gray-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-gray-200" />

              </div>

              {/*  REGISTER  */}

              <div className="text-center">

                <p className="text-sm text-gray-500">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  Create an Account
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

            {/*  FRONTEND INDICATOR  */}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Plane size={14} />
              <span>
                AI Travel Planner
              </span>
            </div>

          </div>

        </main>
      </div>
    </Layout>
  );
}

export default Login;