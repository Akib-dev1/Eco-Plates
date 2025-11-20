import { BarChart3, BookOpen, CheckCheck, Package } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-main-bg dark:bg-[#2F362D] text-primary-accent dark:text-[#FFFFFF] font-plus-jakarta-sans min-h-screen">
      <main>
        {/* Hero */}
        <section className="pattern-bg">
          <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-12 sm:py-16 md:py-20">
            <div className="bg-nav-panel dark:bg-[#1A1A1A] rounded-3xl shadow-md px-6 sm:px-10 md:px-16 py-10 sm:py-14 md:py-16 text-center">
              <h1 className="font-oswald text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                Turn Your Leftovers into a Legacy.
              </h1>
              <p className="text-sm sm:text-base text-primary-accent/80 dark:text-[#FFFFFFCC] max-w-xl mx-auto mb-8">
                Join Eco plates to track your food, learn sustainable recipes,
                and help build a zero-hunger future.
              </p>
              <Link
                href="/how-it-works"
                className="px-6 py-3 hover:bg-main-bg hover:text-black tracking-wider cursor-pointer  rounded-full bg-primary-btn-bg text-primary-btn-text duration-150 ease-in dark:bg-[#FFFFFF] dark:text-[#1A1A1A] text-sm sm:text-base font-medium"
              >
                Learn How to Reduce Waste
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-nav-panel dark:bg-[#1A1A1A]">
          <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-12 sm:py-16">
            <div className="text-center mb-10">
              <h2 className="font-oswald text-2xl sm:text-3xl mb-3">
                A simple path to sustainable eating.
              </h2>
              <p className="text-sm sm:text-base text-primary-accent/75 dark:text-[#FFFFFFB3] max-w-xl mx-auto">
                Our platform makes it easy to reduce food waste and make a
                positive impact, one meal at a time.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-input-text dark:bg-[#2F362D] rounded-2xl shadow-sm px-6 py-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nav-panel dark:bg-[#1A1A1A]">
                  <Package className="text-lg" />
                </div>
                <h3 className="font-oswald text-base sm:text-lg mb-2">
                  1. Track Your Pantry
                </h3>
                <p className="text-sm text-primary-accent/75 dark:text-[#FFFFFFB3]">
                  Easily log the food you have to minimize waste and know what
                  you need.
                </p>
              </div>

              <div className="bg-input-text dark:bg-[#2F362D] rounded-2xl shadow-sm px-6 py-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nav-panel dark:bg-[#1A1A1A]">
                  <BookOpen className="text-lg" />
                </div>
                <h3 className="font-oswald text-base sm:text-lg mb-2">
                  2. Discover Recipes
                </h3>
                <p className="text-sm text-primary-accent/75 dark:text-[#FFFFFFB3]">
                  Get delicious recipes based on the ingredients you already
                  own.
                </p>
              </div>

              <div className="bg-input-text dark:bg-[#2F362D] rounded-2xl shadow-sm px-6 py-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-nav-panel dark:bg-[#1A1A1A]">
                  <BarChart3 className="text-lg" />
                </div>
                <h3 className="font-oswald text-base sm:text-lg mb-2">
                  3. Measure Your Impact
                </h3>
                <p className="text-sm text-primary-accent/75 dark:text-[#FFFFFFB3]">
                  See your progress and understand your contribution to a
                  zero-hunger future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="pattern-bg">
          <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-12 sm:py-16 md:py-20">
            <div className="grid gap-10 md:grid-cols-2 items-center">
              <div>
                <h2 className="font-oswald text-2xl sm:text-3xl mb-4">
                  Our Mission &amp; Your Impact
                </h2>
                <p className="text-sm sm:text-base text-primary-accent/75 dark:text-[#FFFFFFB3] mb-6">
                  One-third of all food produced globally is wasted. This
                  isn&apos;t just a waste of food, but of the resources used to
                  grow and transport it. By joining Eco plates, you&apos;re not
                  just organizing your kitchen—you&apos;re contributing to a
                  global movement.
                </p>

                <div className="space-y-4 text-sm sm:text-base">
                  <div className="flex gap-3">
                    <CheckCheck
                      size={35}
                      className="text-green-600 bg-white rounded-full p-1"
                    />
                    <div>
                      <p className="font-medium">Support SDG 12</p>
                      <p className="text-xs sm:text-sm text-primary-accent/75 dark:text-[#FFFFFFB3]">
                        Promote responsible consumption and production by
                        reducing your food waste at home.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <CheckCheck
                      size={35}
                      className="text-green-600 bg-white rounded-full p-1"
                    />
                    <div>
                      <p className="font-medium">Achieve SDG 2</p>
                      <p className="text-xs sm:text-sm text-primary-accent/75 dark:text-[#FFFFFFB3]">
                        Help build a zero-hunger future by valuing food
                        resources and inspiring a more sustainable food system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-nav-panel dark:bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-md">
                <div className="aspect-4/3 w-full bg-cover bg-center bg-[url('https://i.ibb.co.com/mrmxf6Jh/image.png')]" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-nav-panel dark:bg-[#1A1A1A]">
          <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-12 sm:py-16 md:py-20 text-center">
            <h2 className="font-oswald text-2xl sm:text-3xl mb-2">
              What Our Users Say
            </h2>
            <p className="text-sm sm:text-base text-primary-accent/75 dark:text-[#FFFFFFB3] mb-10 max-w-xl mx-auto">
              We&apos;re helping people everywhere to eat smarter and waste
              less.
            </p>

            <figure className="max-w-2xl mx-auto">
              <blockquote className="text-sm sm:text-base italic mb-6 text-primary-accent/85 dark:text-[#FFFFFFCC]">
                &quot;Eco plates has completely changed how my family shops and
                cooks. We&apos;re saving money, eating healthier, and I feel
                great knowing we&apos;re reducing our carbon footprint.
                It&apos;s so easy to use!&quot;
              </blockquote>
              <figcaption className="text-sm font-medium">
                Sarah J. – Home Cook &amp; Eco-Warrior
              </figcaption>
            </figure>
          </div>
        </section>

        {/* CTA */}
        <section className="pattern-bg">
          <div className="mx-auto max-w-11/12 md:max-w-10/12 lg:max-w-9/12 py-12 sm:py-16 md:py-20 text-center">
            <h2 className="font-oswald text-2xl sm:text-3xl mb-3">
              Ready to Make a Difference?
            </h2>
            <p className="text-sm sm:text-base text-primary-accent/75 dark:text-[#FFFFFFB3] max-w-xl mx-auto mb-8">
              Join thousands of others on the journey to a zero-waste kitchen.
              It&apos;s free, simple, and impactful.
            </p>
            <Link
              href={"/register"}
              className="tracking-wider border border-primary-btn-bg hover:bg-inherit hover:text-primary-btn-bg cursor-pointer duration-150 ease-in px-6 py-3 rounded-full bg-primary-btn-bg text-primary-btn-text dark:bg-[#FFFFFF] dark:text-[#1A1A1A] text-sm sm:text-base font-medium"
            >
              Register for Free
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
