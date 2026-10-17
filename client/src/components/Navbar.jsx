import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 text-slate-200 shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-lg shadow-indigo-500/20 transition duration-300 group-hover:scale-105">
            🤖
          </div>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-violet-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">
                InterviewAI
              </span>

              <span className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-indigo-300">
                PRO
              </span>
            </div>

            <p className="text-[10px] font-medium text-slate-500">
              Smart Interview Preparation
            </p>
          </div>

          {/* Mobile logo text */}
          <span className="sm:hidden bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-lg font-extrabold text-transparent">
            InterviewAI
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            to="/"
            className={`relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              isActive("/")
                ? "bg-indigo-500/10 text-indigo-300"
                : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
            }`}
          >
            Home

            {isActive("/") && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-indigo-400" />
            )}
          </Link>

          <a
            href="/#features"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-slate-800/70 hover:text-white"
          >
            Features
          </a>

          <a
            href="/#about"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-slate-800/70 hover:text-white"
          >
            About
          </a>
        </div>

        {/* ================= AUTH DESKTOP ================= */}
        <div className="hidden items-center gap-2 md:flex">
          {token ? (
            <>
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "border border-indigo-400/20 bg-indigo-500/15 text-indigo-300 shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>📊</span>
                Dashboard
              </Link>

              <Link
                to="/profile"
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive("/profile")
                    ? "border border-indigo-400/20 bg-indigo-500/15 text-indigo-300 shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span>👤</span>
                Profile
              </Link>

              <div className="mx-1 h-7 w-px bg-slate-800" />

              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-300"
              >
                <span>↪</span>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/30"
              >
                Get Started →
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-lg text-slate-300 transition hover:bg-slate-800 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 pb-5 pt-3 md:hidden">
          <div className="space-y-1">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                isActive("/")
                  ? "bg-indigo-500/10 text-indigo-300"
                  : "text-slate-300 hover:bg-slate-900"
              }`}
            >
              🏠 Home
            </Link>

            <a
              href="/#features"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900"
            >
              ✨ Features
            </a>

            <a
              href="/#about"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900"
            >
              ℹ️ About
            </a>

            <div className="my-3 h-px bg-slate-800" />

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive("/dashboard")
                      ? "bg-indigo-500/10 text-indigo-300"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive("/profile")
                      ? "bg-indigo-500/10 text-indigo-300"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  👤 Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-1 block w-full cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-semibold text-rose-300 hover:bg-rose-500/10"
                >
                  ↪ Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-900"
                >
                  🔐 Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 block rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;