import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      setMessage(data.message);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }

      console.log(data);
    } catch (error) {
      setMessage("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-150px)] max-w-5xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:grid-cols-2">

          {/* LEFT SIDE */}
          <div className="hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-10 md:flex md:flex-col md:justify-between">

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl backdrop-blur">
                🤖
              </div>

              <h2 className="mt-8 text-3xl font-extrabold leading-tight">
                Welcome back to
                <br />
                InterviewAI
              </h2>

              <p className="mt-4 text-sm leading-6 text-indigo-100">
                Continue your interview preparation and improve your
                performance with AI-powered feedback.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold">
                "Practice today. Perform better tomorrow."
              </p>

              <p className="mt-2 text-xs text-indigo-200">
                Your interview preparation starts here.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="p-7 sm:p-10">

            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl md:hidden">
                🤖
              </div>

              <h1 className="text-3xl font-extrabold text-white">
                Welcome Back 👋
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Login to continue your interview preparation.
              </p>
            </div>

            {/* EMAIL */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleLogin();
                  }
                }}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              onClick={handleLogin}
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              Login →
            </button>

            {/* MESSAGE */}
            {message && (
              <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-center text-sm text-slate-300">
                {message}
              </div>
            )}

            {/* REGISTER */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-400 transition hover:text-indigo-300"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;