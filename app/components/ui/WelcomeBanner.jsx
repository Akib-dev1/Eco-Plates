// components/dashboard/WelcomeBanner.jsx

export default function WelcomeBanner({ userData }) {
  return (
    <section className="rounded-2xl shadow-md p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-nav-panel">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-lime-400 to-lime-600 text-xl font-semibold text-white">
        {userData.name.charAt(0)}
      </div>
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl text-neutral-900 mb-1 font-oswald">
          Welcome Back, {userData.name}!
        </h1>
        <p className="text-sm sm:text-base text-neutral-700">
          Let&apos;s keep track of your food and stay healthy.
        </p>
      </div>
    </section>
  );
}
