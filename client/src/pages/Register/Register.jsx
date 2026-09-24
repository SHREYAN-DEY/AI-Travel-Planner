
//  REGISTER 

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import {
  UserPlus,
  CheckCircle2,
  Mail,
  Lock,
  User,
  Globe,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  //  FORM STATE 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password.trim();
    const country = formData.country.trim();

    //  VALIDATION 

    if (!name || !email || !password || !country) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    //  EXISTING USER 

    const existingUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (
      existingUser &&
      existingUser.email?.toLowerCase() === email
    ) {
      alert(
        "An account with this email already exists. Please login."
      );

      navigate("/login");
      return;
    }

    //  FRONTEND USER 

    const user = {
      name,
      email,
      password,
      country,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    // New registration should start logged out
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    //  SUCCESS MESSAGE 

    alert(
      "Registration successful! Please login to continue. 🎉"
    );

    navigate("/login");
  };

  //  UI 

  return (
    <Layout>
      <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 px-4 py-10 sm:py-14">

        <main className="mx-auto flex w-full max-w-md items-center justify-center">

          <div className="w-full">

            {/*  HEADER  */}

            <div className="mb-8 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-100">
                <UserPlus size={26} />
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create Account
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-600 sm:text-base">
                Join AI Travel Planner and start exploring.
              </p>

            </div>

            {/*  REGISTER CARD  */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/*  NAME  */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/*  EMAIL  */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Email
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
                      placeholder="Create a password"
                      autoComplete="new-password"
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

                  <p className="mt-2 text-xs text-gray-500">
                    Minimum 6 characters.
                  </p>

                </div>

                {/*  COUNTRY  */}

                <div>

                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Country
                  </label>

                  <div className="relative">

                    <Globe
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="country"
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country"
                      autoComplete="country-name"
                      className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>

                {/*  SUBMIT  */}

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold !text-white shadow-lg shadow-indigo-100 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
                >
                  <CheckCircle2 size={18} />

                  <span className="!text-white">
                    Create Account
                  </span>

                </button>

              </form>

              {/*  LOGIN  */}

              <div className="mt-6 text-center">

                <p className="text-sm text-gray-500">
                  Already have an account?
                </p>

                <Link
                  to="/login"
                  className="mt-2 inline-flex items-center gap-1.5 font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  Login
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

          </div>

        </main>

      </div>
    </Layout>
  );
}

export default Register;