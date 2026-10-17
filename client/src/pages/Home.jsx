import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-slate-950 px-6 text-white">

        {/* Background Glow */}
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute left-10 bottom-10 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center text-center">

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-bold tracking-wide text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            AI-POWERED INTERVIEW PLATFORM
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Prepare Smarter.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Interview Better.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Practice realistic interviews, receive AI-powered feedback,
            and build the confidence you need to succeed.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/interview"
              className="group rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-600/20 transition duration-200 hover:-translate-y-1 hover:from-indigo-500 hover:to-violet-500"
            >
              Start Interview
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <a
              href="#features"
              className="rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 text-sm font-bold text-slate-200 transition duration-200 hover:-translate-y-1 hover:bg-slate-800"
            >
              Explore Features
            </a>

          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 divide-x divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 backdrop-blur sm:px-10">

            <div className="px-4 sm:px-10">
              <p className="text-xl font-extrabold">AI</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                Powered
              </p>
            </div>

            <div className="px-4 sm:px-10">
              <p className="text-xl font-extrabold">24/7</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                Practice
              </p>
            </div>

            <div className="px-4 sm:px-10">
              <p className="text-xl font-extrabold">10/10</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
                Feedback
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="bg-slate-950 px-6 py-24 text-white"
      >
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
              FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Everything you need to improve
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Practice interviews, analyze your answers and track your
              performance from one simple platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Feature 1 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                🤖
              </div>

              <h3 className="mt-6 text-xl font-bold">
                AI Mock Interviews
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Practice realistic interview questions and prepare yourself
                for real-world interview situations.
              </p>

            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-500/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 text-2xl">
                💡
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Instant Feedback
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Get useful feedback on your answers and understand where
                you can improve.
              </p>

            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:-translate-y-2 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/10 text-2xl">
                📊
              </div>

              <h3 className="mt-6 text-xl font-bold">
                Performance Tracking
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Track your interview scores and monitor your progress
                over multiple practice sessions.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="border-t border-slate-900 bg-slate-950 px-6 py-24 text-center text-white"
      >
        <div className="mx-auto max-w-3xl">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            ABOUT INTERVIEWAI
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Your personal interview practice partner.
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
            InterviewAI gives you a simple environment to practice
            interviews, review your answers and understand your
            performance before facing the real interview.
          </p>

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-800 bg-slate-950 px-6 py-10 text-center">

        <div className="mx-auto max-w-6xl">

          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🤖</span>

            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-xl font-extrabold text-transparent">
              InterviewAI
            </span>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            AI-powered interview preparation platform.
          </p>

          <p className="mt-4 text-xs text-slate-600">
            © 2026 InterviewAI. All rights reserved.
          </p>

        </div>

      </footer>
    </>
  );
}

export default Home;