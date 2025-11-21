"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

export const dynamic = "force-dynamic";

const RegisterPage = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);
      const fullName = form.get("fullName")?.toString().trim();
      const email = form.get("email")?.toString().trim();
      const password = form.get("password")?.toString();
      const confirmPassword = form.get("confirmPassword")?.toString();
      const householdSize = form.get("householdSize")?.toString();
      const location = form.get("location")?.toString().trim();

      if (
        !fullName ||
        !email ||
        !password ||
        !confirmPassword ||
        !householdSize
      ) {
        setErr("Please fill in all fields.");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setErr("Passwords do not match.");
        setLoading(false);
        return;
      }

      const payload = {
        email,
        password,
        householdSize: Number(householdSize),
        name: fullName,
        role: "user",
        dietaryPreferences: [],
        budgetLimit: 0,
        location,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("https://eco-plates.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data?.insertedId) {
        toast.success("User registered successfully!");
        e.target.reset();
      } else {
        setErr(data?.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErr("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-[#2F362D] font-plus-jakarta-sans">
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/XfXbZLW6/front-view-mix-vegetables-bowl-fotor-20251120185128.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Glassy Form */}
        <div className="relative mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 flex justify-center py-10">
          <div
            className="
              w-full max-w-md
              bg-white/10 dark:bg-black/20
              backdrop-blur-xl
              border border-white/20 dark:border-white/10
              text-input-text
              rounded-3xl
              shadow-2xl
              px-6 sm:px-8 md:px-10
              py-8 sm:py-10
            "
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-oswald text-2xl sm:text-3xl mb-2">
                Create Your Account
              </h1>
              <p className="text-xs sm:text-sm text-input-text/80">
                Join Eco Plates and start your journey towards a sustainable
                future.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="
                    w-full rounded-full
                    bg-input-text text-primary-accent
                    px-4 py-3 text-sm
                    outline-none
                    border border-transparent
                    focus:border-primary-btn-bg
                  "
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="householdSize"
                >
                  Household Size
                </label>
                <input
                  id="householdSize"
                  name="householdSize"
                  type="number"
                  placeholder="Enter your household size"
                  className="
                    w-full rounded-full
                    bg-input-text text-primary-accent
                    px-4 py-3 text-sm
                    outline-none
                    border border-transparent
                    focus:border-primary-btn-bg
                  "
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="location"
                >
                  Location
                </label>

                <div className="relative">
                  <select
                    name="location"
                    id="location"
                    className="
        w-full rounded-full
       text-white
        px-4 py-3 text-sm
        outline-none
        border border-white
        focus:border-primary-btn-bg
        appearance-none
        cursor-pointer
        bg-transparent
      "
                  >
                    <option value="Dhaka" className="text-black font-medium">
                      Dhaka
                    </option>
                    <option
                      value="Chittagong"
                      className="text-black font-medium"
                    >
                      Chittagong
                    </option>
                    <option value="Khulna" className="text-black font-medium">
                      Khulna
                    </option>
                    <option value="Rajshahi" className="text-black font-medium">
                      Rajshahi
                    </option>
                    <option value="Sylhet" className="text-black font-medium">
                      Sylhet
                    </option>
                    <option value="Barisal" className="text-black font-medium">
                      Barisal
                    </option>
                    <option value="Rangpur" className="text-black font-medium">
                      Rangpur
                    </option>
                    <option
                      value="Mymensingh"
                      className="text-black font-medium"
                    >
                      Mymensingh
                    </option>
                  </select>

                  {/* Dropdown Arrow Icon */}
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xs">
                    ▼
                  </span>
                </div>
              </div>

              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="
                    w-full rounded-full
                    bg-input-text text-primary-accent
                    px-4 py-3 text-sm
                    outline-none
                    border border-transparent
                    focus:border-primary-btn-bg
                  "
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="
                    w-full rounded-full
                    bg-input-text text-primary-accent
                    px-4 py-3 text-sm
                    outline-none
                    border border-transparent
                    focus:border-primary-btn-bg
                  "
                  required
                />
              </div>

              <div>
                <label
                  className="block text-xs sm:text-sm mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="
                    w-full rounded-full
                    bg-input-text text-primary-accent
                    px-4 py-3 text-sm
                    outline-none
                    border border-transparent
                    focus:border-primary-btn-bg
                  "
                  required
                />
              </div>

              {err && (
                <p className="text-xs sm:text-sm text-red-400 mt-2 text-center">
                  {err}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-4 w-full
                  rounded-full
                  bg-primary-btn-bg text-primary-btn-text
                  dark:bg-[#FFFFFF] dark:text-[#1A1A1A]
                  text-sm sm:text-base font-medium
                  py-3
                  disabled:opacity-70 disabled:cursor-not-allowed
                "
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-xs sm:text-sm text-input-text/80">
              <p>
                Already have an account?{" "}
                <a href="#" className="font-medium underline">
                  Log in
                </a>
              </p>
            </div>

            {/* Footer Text */}
            <p className="mt-4 text-[11px] sm:text-xs text-input-text/70 text-center leading-relaxed">
              By clicking Register, you agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
