import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const res = await fetch("http://127.0.0.1:5000/interview", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setInterviews(data.interviews || []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) {
      return {
        text: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        bar: "bg-emerald-500",
      };
    }

    if (score >= 5) {
      return {
        text: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        bar: "bg-amber-500",
      };
    }

    return {
      text: "text-rose-600",
      bg: "bg-rose-50",
      border: "border-rose-200",
      bar: "bg-rose-500",
    };
  };

  const totalInterviews = interviews.length;

  const avgScore =
    totalInterviews > 0
      ? (
          interviews.reduce(
            (total, interview) =>
              total + Number(interview.overallScore || 7),
            0
          ) / totalInterviews
        ).toFixed(1)
      : "0.0";

  const totalQuestions = interviews.reduce(
    (total, interview) => total + (interview.answers?.length || 0),
    0
  );

  const latestScore =
    interviews.length > 0 ? Number(interviews[0].overallScore || 7) : 0;

  const latestScoreStyle = getScoreColor(latestScore);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                <span>🤖</span>
                INTERVIEWAI
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Welcome to your Dashboard
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Track your interview performance, review your answers and
                improve with AI-powered feedback.
              </p>
            </div>

            <button
              onClick={() => navigate("/interview")}
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-600 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              🚀 Start New Interview
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Interviews */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                🎤
              </div>

              <span className="text-xs font-semibold text-slate-400">
                ALL TIME
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Total Interviews
            </p>

            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {totalInterviews}
            </p>
          </div>

          {/* Average Score */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-xl">
                ⭐
              </div>

              <span className="text-xs font-semibold text-slate-400">
                AVERAGE
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Average Score
            </p>

            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {avgScore}
              <span className="ml-1 text-base font-semibold text-slate-400">
                / 10
              </span>
            </p>
          </div>

          {/* Questions */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                📝
              </div>

              <span className="text-xs font-semibold text-slate-400">
                PRACTICE
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Questions Practiced
            </p>

            <p className="mt-1 text-3xl font-extrabold text-slate-900">
              {totalQuestions}
            </p>
          </div>

          {/* Latest Score */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${latestScoreStyle.bg} text-xl`}
              >
                📈
              </div>

              <span className="text-xs font-semibold text-slate-400">
                LATEST
              </span>
            </div>

            <p className="text-sm font-medium text-slate-500">
              Latest Score
            </p>

            <p className={`mt-1 text-3xl font-extrabold ${latestScoreStyle.text}`}>
              {latestScore || "--"}
              {latestScore > 0 && (
                <span className="ml-1 text-base font-semibold text-slate-400">
                  / 10
                </span>
              )}
            </p>
          </div>
        </div>

        {/* ================= PERFORMANCE ================= */}
        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Performance Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your current interview performance
                </p>
              </div>

              <div
                className={`rounded-xl px-4 py-2 text-sm font-bold ${latestScoreStyle.bg} ${latestScoreStyle.text}`}
              >
                {latestScore > 0 ? `${latestScore}/10` : "No Score"}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">
                  Average Performance
                </span>

                <span className="text-sm font-bold text-indigo-600">
                  {avgScore}/10
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                  style={{
                    width: `${Math.min(Number(avgScore) * 10, 100)}%`,
                  }}
                />
              </div>

              <div className="mt-4 flex justify-between text-xs text-slate-400">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* AI Card */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-md">
              🤖
            </div>

            <h2 className="mt-5 text-lg font-bold text-slate-900">
              AI Evaluation
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Your interview answers are evaluated to help you understand
              your strengths and improve weak areas.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/80 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-slate-700">
                Evaluation Active
              </span>
            </div>
          </div>
        </div>

        {/* ================= HISTORY HEADER ================= */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Interview History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review your previous interview sessions.
            </p>
          </div>

          {interviews.length > 0 && (
            <span className="text-sm font-semibold text-slate-400">
              {interviews.length} session
              {interviews.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <p className="text-sm font-medium text-slate-500">
              Loading your interviews...
            </p>
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && interviews.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl">
              🎤
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              No interviews yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Start your first interview to practice your answers and receive
              AI-powered feedback.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-indigo-700"
            >
              🚀 Start Your First Interview
            </button>
          </div>
        )}

        {/* ================= INTERVIEW CARDS ================= */}
        {!loading && interviews.length > 0 && (
          <div className="space-y-5">
            {interviews.map((item, index) => {
              const score = Number(item.overallScore || 7);
              const scoreStyle = getScoreColor(score);
              const isOpen = selectedId === item._id;

              return (
                <div
                  key={item._id || index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:shadow-lg"
                >
                  {/* Card Header */}
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                          🎯
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            Interview #{interviews.length - index}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(item.createdAt).toLocaleDateString()}{" "}
                            •{" "}
                            {new Date(item.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>

                      {/* Score */}
                      <div
                        className={`inline-flex w-fit items-center gap-2 rounded-xl border px-4 py-2 ${scoreStyle.bg} ${scoreStyle.border}`}
                      >
                        <span className="text-sm">⭐</span>

                        <span
                          className={`text-sm font-extrabold ${scoreStyle.text}`}
                        >
                          {score}/10
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Questions Answered
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-800">
                          {item.answers?.length || 0}
                        </p>
                      </div>

                      <div className="rounded-xl bg-indigo-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-400">
                          AI Evaluation
                        </p>

                        <p className="mt-1 text-lg font-bold text-indigo-700">
                          Completed ✓
                        </p>
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between">
                        <span className="text-xs font-semibold text-slate-500">
                          Interview Score
                        </span>

                        <span className={`text-xs font-bold ${scoreStyle.text}`}>
                          {score * 10}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${scoreStyle.bar} transition-all duration-700`}
                          style={{
                            width: `${Math.min(score * 10, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Feedback Button */}
                    <button
                      onClick={() =>
                        setSelectedId(isOpen ? null : item._id)
                      }
                      className={`mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition ${
                        isOpen
                          ? "bg-slate-800 hover:bg-slate-900"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {isOpen
                        ? "Hide AI Feedback ↑"
                        : "View AI Feedback →"}
                    </button>
                  </div>

                  {/* ================= FEEDBACK ================= */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6">
                      <div className="mb-5">
                        <h3 className="text-lg font-bold text-slate-900">
                          🤖 AI Feedback
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Detailed evaluation of your interview answers.
                        </p>
                      </div>

                      <div className="space-y-4">
                        {item.answers?.map((ans, i) => {
                          const answerScore = Number(ans.score || 7);
                          const answerStyle = getScoreColor(answerScore);

                          return (
                            <div
                              key={i}
                              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                                <div>
                                  <span className="text-xs font-bold uppercase tracking-wide text-indigo-500">
                                    Question {i + 1}
                                  </span>

                                  <p className="mt-1 text-sm font-bold leading-6 text-slate-900">
                                    {ans.question}
                                  </p>
                                </div>

                                <span
                                  className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${answerStyle.bg} ${answerStyle.text} ${answerStyle.border}`}
                                >
                                  Score {answerScore}/10
                                </span>
                              </div>

                              {/* Answer */}
                              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                                  Your Answer
                                </p>

                                <p className="text-sm leading-6 text-slate-600">
                                  {ans.answer}
                                </p>
                              </div>

                              {/* AI Feedback */}
                              <div className="mt-4 rounded-xl border border-violet-100 bg-violet-50 p-4">
                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-violet-500">
                                  AI Feedback
                                </p>

                                <p className="text-sm leading-6 text-violet-900">
                                  💡{" "}
                                  {ans.feedback ||
                                    "Good response. Try adding more technical details."}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <div className="mt-10 pb-4 text-center">
          <p className="text-xs text-slate-400">
            Keep practicing. Every interview makes you better. 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;