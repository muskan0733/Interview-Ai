import { useState } from "react";

function Interview() {
  const [started, setStarted] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const questions = [
    "Tell me about yourself.",
    "What are your strengths?",
    "Why should we hire you?",
    "Where do you see yourself in 5 years?",
    "Why do you want this job?",
  ];

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please write your answer first");
      return;
    }

    const newAnswers = [
      ...answers,
      {
        question: questions[questionNumber - 1],
        answer: answer,
      },
    ];

    setAnswers(newAnswers);
    setAnswer("");

    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1);
    } else {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first");
          return;
        }

        const response = await fetch("http://localhost:5000/interview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            answers: newAnswers,
          }),
        });

        const contentType = response.headers.get("content-type");
        let data = {};

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }

        if (!response.ok) {
          alert(data.message || "Failed to save interview");
          return;
        }

        alert("Interview Completed and Saved Successfully!");
      } catch (error) {
        console.error("Submit Error:", error);
        alert("Error: " + error.message);
      }
    }
  };

  const progress = (questionNumber / questions.length) * 100;

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
            🤖
          </div>

          <h1 className="text-3xl font-extrabold sm:text-4xl">
            AI Interview
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Practice your interview and improve your confidence.
          </p>
        </div>

        {!started ? (

          /* START SCREEN */
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl sm:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-4xl shadow-lg shadow-indigo-600/20">
              🎤
            </div>

            <h2 className="mt-7 text-2xl font-bold">
              Are you ready?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              You will be asked 5 common interview questions.
              Take your time and give your best answers.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xl font-bold text-indigo-400">5</p>
                <p className="mt-1 text-xs text-slate-500">Questions</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xl font-bold text-violet-400">AI</p>
                <p className="mt-1 text-xs text-slate-500">Feedback</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xl font-bold text-sky-400">100%</p>
                <p className="mt-1 text-xs text-slate-500">Practice</p>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              Start Interview →
            </button>

          </div>

        ) : (

          /* INTERVIEW SCREEN */
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-9">

            {/* PROGRESS */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">
                  Question {questionNumber} of {questions.length}
                </span>

                <span className="text-sm font-bold text-indigo-400">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* QUESTION */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-lg">
                  💬
                </span>

                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Interview Question
                </span>
              </div>

              <h2 className="text-xl font-bold leading-8 sm:text-2xl">
                {questions[questionNumber - 1]}
              </h2>
            </div>

            {/* ANSWER */}
            <div className="mt-7">
              <label className="mb-3 block text-sm font-semibold text-slate-300">
                Your Answer
              </label>

              <textarea
                placeholder="Type your answer here..."
                rows="8"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />

              <p className="mt-2 text-xs text-slate-600">
                Tip: Give a clear and detailed answer.
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3.5 text-sm font-bold shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500"
            >
              {questionNumber === questions.length
                ? "Finish Interview ✓"
                : "Submit Answer →"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Interview;