import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message);
          return;
        }

        setUser(data.user);

        console.log("PROFILE DATA:", data);
      } catch (error) {
        setMessage("Something went wrong");
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-indigo-400">
            ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage and view your InterviewAI account details.
          </p>
        </div>

        {/* ERROR */}
        {message && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300">
            {message}
          </div>
        )}

        {/* PROFILE CARD */}
        {user && (
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">

            {/* TOP */}
            <div className="bg-gradient-to-r from-indigo-600/20 via-violet-600/10 to-transparent p-8">
              <div className="flex flex-col items-center gap-5 sm:flex-row">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-4xl font-bold shadow-lg shadow-indigo-600/20">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {user.email}
                  </p>

                  <span className="mt-3 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                    InterviewAI Member
                  </span>
                </div>

              </div>
            </div>

            {/* DETAILS */}
            <div className="p-8">

              <h3 className="mb-5 text-lg font-bold">
                Account Information
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* NAME */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Full Name
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    {user.name}
                  </p>
                </div>

                {/* EMAIL */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-white">
                    {user.email}
                  </p>
                </div>

                {/* USER ID */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    User ID
                  </p>

                  <p className="mt-2 break-all font-mono text-xs text-slate-300">
                    {user._id}
                  </p>
                </div>

              </div>

              {/* FOOTER INFO */}
              <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">
                <div className="flex gap-3">
                  <span className="text-xl">🤖</span>

                  <div>
                    <p className="text-sm font-semibold text-indigo-300">
                      Keep practicing!
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Use InterviewAI regularly to improve your interview
                      confidence and performance.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* LOADING */}
        {!user && !message && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500"></div>

            <p className="text-sm text-slate-400">
              Loading profile...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;