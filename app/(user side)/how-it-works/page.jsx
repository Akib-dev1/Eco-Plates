// app/how-it-works/page.jsx

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ResourceCard from "@/app/components/ui/ResourceCard";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/resources");
  return res.json();
};

export default async function HowItWorksPage() {
  const { user } = await getServerSession(authOptions);
  const Resources = await getData();
  return (
    <div className="min-h-screen bg-main-bg text-primary-accent font-plus-jakarta-sans">
      <main className="max-w-11/12 sm:max-w-10/12 lg:max-w-9/12 mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10 lg:space-y-14">
        {/* Hero */}
        <section className="bg-nav-panel rounded-3xl shadow-md px-6 sm:px-10 py-10 text-center space-y-4">
          <h1 className="font-oswald text-3xl sm:text-4xl">How It Works</h1>
          <p className="text-sm sm:text-base text-primary-accent/70 max-w-xl mx-auto">
            See how our app helps you reduce food waste and save money.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary-accent text-input-text px-8 py-2.5 text-sm font-semibold hover:bg-primary-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent/40"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Illustration banner */}
        <section className="bg-nav-panel rounded-3xl shadow-md overflow-hidden">
          <div className="h-44 sm:h-56 lg:h-64 w-full flex items-center justify-center bg-[#f5d2af]">
            {/* Container for Image */}
            <div
              className="
        relative
        w-40 sm:w-56 
        h-28 sm:h-36
        rounded-2xl 
        shadow-md 
        overflow-hidden
      "
            >
              <Image
                src="https://i.ibb.co.com/JFmvbcL6/image.png"
                alt="How it works illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Steps section */}
        <section className="bg-nav-panel rounded-3xl shadow-md px-6 sm:px-10 py-8 sm:py-10 space-y-6">
          <header className="space-y-2">
            <h2 className="font-oswald text-2xl sm:text-3xl">
              A Simple Path to a Greener Kitchen
            </h2>
            <p className="text-sm sm:text-base text-primary-accent/70 max-w-2xl">
              Follow these easy steps to transform how you manage food, reduce
              waste, and make a positive impact on the environment.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Step 1 */}
            <article className="bg-input-text rounded-2xl px-4 py-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-primary-accent/60 mb-1">
                1. Create Your Profile
              </p>
              <p className="text-sm font-semibold mb-1">
                Personalize your experience.
              </p>
              <p className="text-xs text-primary-accent/70">
                Add your preferences & goals so we can tailor suggestions.
              </p>
            </article>

            {/* Step 2 */}
            <article className="bg-input-text rounded-2xl px-4 py-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-primary-accent/60 mb-1">
                2. Log Your Food
              </p>
              <p className="text-sm font-semibold mb-1">
                Capture what you buy & use.
              </p>
              <p className="text-xs text-primary-accent/70">
                Scan receipts, add grocery items, or log meals manually.
              </p>
            </article>

            {/* Step 3 */}
            <article className="bg-input-text rounded-2xl px-4 py-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-primary-accent/60 mb-1">
                3. Manage Your Inventory
              </p>
              <p className="text-sm font-semibold mb-1">
                See everything in one place.
              </p>
              <p className="text-xs text-primary-accent/70">
                Track what you have, when it was added, and when it expires.
              </p>
            </article>

            {/* Step 4 */}
            <article className="bg-input-text rounded-2xl px-4 py-5 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-primary-accent/60 mb-1">
                4. Get Smart Recommendations
              </p>
              <p className="text-sm font-semibold mb-1">
                Use it before you lose it.
              </p>
              <p className="text-xs text-primary-accent/70">
                Receive meal ideas and alerts before food goes to waste.
              </p>
            </article>
          </div>
        </section>

        {/* Upload Receipts */}
        <section className="bg-nav-panel rounded-3xl shadow-md px-6 sm:px-10 py-8 sm:py-10 space-y-6">
          <div className="w-full max-w-xl mx-auto">
            <div className="bg-primary-accent/90 rounded-3xl h-44 sm:h-52 flex items-center justify-center mb-5">
              {/* Placeholder for receipt image */}
              <div className="w-36 sm:w-44 h-32 bg-input-text rounded-xl shadow-lg flex items-center justify-center">
                <span className="text-xs text-primary-accent/60">
                  Receipt preview
                </span>
              </div>
            </div>
            <div className="text-center space-y-3">
              <h3 className="font-oswald text-lg sm:text-xl">
                Upload Receipts &amp; Labels Instantly
              </h3>
              <p className="text-sm text-primary-accent/70">
                Drag and drop an image of your receipt or food label to
                automatically add items to your inventory.
              </p>
              <Link
                href="/food-scan"
                className="inline-flex items-center justify-center rounded-full bg-primary-accent text-input-text px-6 py-2 text-sm font-semibold hover:bg-primary-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent/40"
              >
                Upload Image
              </Link>
            </div>
          </div>
        </section>

        {/* Sustainability Hub */}
        <section className="bg-nav-panel rounded-3xl shadow-md px-6 sm:px-10 py-8 sm:py-10 space-y-5">
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <div>
              <h3 className="font-oswald text-xl sm:text-2xl">
                Explore Our Sustainability Hub
              </h3>
              <p className="text-sm text-primary-accent/70">
                Discover tips, guides, and stories to inspire a low-waste life.
              </p>
            </div>
            <Link
              href="/sustainable-practices"
              className="text-xs font-semibold text-primary-accent/70 hover:text-primary-accent underline-offset-2 hover:underline"
            >
              View all resources
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Card 1 */}

            {Resources.slice(0, 3).map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}

            {Resources.length === 0 && (
              <div className="col-span-full rounded-2xl bg-primary-accent text-input-text p-6 text-center text-sm">
                No resources found. Try a different search term.
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        {!user && (
          <>
            <section className="bg-primary-accent rounded-3xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md">
              <div>
                <h3 className="font-oswald text-xl sm:text-2xl text-input-text">
                  Ready to Start Your Sustainable Journey?
                </h3>
                <p className="text-sm text-input-text/70 mt-1">
                  Join our community and take the first step toward reducing
                  food waste today.
                </p>
              </div>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-input-text text-primary-accent px-6 py-2.5 text-sm font-semibold hover:bg-input-text/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-input-text/40"
              >
                Sign Up Now
              </Link>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
