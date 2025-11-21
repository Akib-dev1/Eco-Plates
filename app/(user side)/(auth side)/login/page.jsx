"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const router = useRouter();
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();

    if (!email || !password) {
      setErr("Please enter email and password.");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      toast.success("Logged in successfully!");
      router.push("/");
      e.target.reset();
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-main-bg dark:bg-[#2F362D] font-plus-jakarta-sans">
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/fY1w6Pmm/wooden-board-full-fresh-red-juicy-tomatoes-with-lettuce-salad-high-quality-photo.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Glassy Card */}
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
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-input-text/80">
                Log in to Eco Plates and continue your sustainable journey.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs sm:text-sm mb-2">
                  Email Address
                </label>
                <input
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
                <label className="block text-xs sm:text-sm mb-2">
                  Password
                </label>
                <input
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

              {err && <p className="text-xs text-red-400 text-center">{err}</p>}

              <div className="flex items-center justify-between text-xs sm:text-sm text-input-text/80">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs rounded border-input-text/60"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="
                  mt-4 w-full
                  rounded-full
                  bg-primary-btn-bg text-primary-btn-text
                  dark:bg-[#FFFFFF] dark:text-[#1A1A1A]
                  text-sm sm:text-base font-medium
                  py-3
                "
              >
                Log In
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-6 text-center text-xs sm:text-sm text-input-text/80">
              <p>
                Don&apos;t have an account?{" "}
                <a href="#" className="font-medium underline">
                  Register
                </a>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-4 text-[11px] sm:text-xs text-input-text/70 text-center leading-relaxed">
              By logging in, you agree to our{" "}
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
}
