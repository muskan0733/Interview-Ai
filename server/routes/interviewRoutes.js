const express = require("express");
const Interview = require("../models/Interview");
const authMiddleware = require("../middleware/authMiddleware");

// AI Service Safe Import
let evaluateAnswers;
try {
  const aiModule = require("../services/aiservices");
  evaluateAnswers = aiModule.evaluateAnswers || aiModule;
} catch (err) {
  console.log("AI Service import bypass mode:", err.message);
}

const router = express.Router();

// Save Interview (Endpoint: POST /interview)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: "No interview answers provided" });
    }

    const userId = req.user._id || req.user.id;

    // AI Evaluation with Safety Net
    let finalAnswers = answers;
    let overallScore = 7;

    if (typeof evaluateAnswers === "function") {
      try {
        const aiResult = await evaluateAnswers(answers);
        if (aiResult && aiResult.evaluatedAnswers) {
          finalAnswers = aiResult.evaluatedAnswers;
          overallScore = aiResult.overallScore || 7;
        }
      } catch (aiErr) {
        console.log("AI Calculation error (using default save):", aiErr.message);
      }
    }

    const interview = await Interview.create({
      user: userId,
      answers: finalAnswers,
      overallScore: overallScore,
    });

    res.status(201).json({
      message: "Interview saved successfully",
      interview,
    });
  } catch (error) {
    console.error("Save Interview Error:", error);
    res.status(500).json({ message: error.message || "Failed to save interview" });
  }
});

// Get Interview History (Endpoint: GET /interview)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;

    const interviews = await Interview.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Interviews fetched successfully",
      interviews,
    });
  } catch (error) {
    console.error("Fetch Interviews Error:", error);
    res.status(500).json({ message: error.message || "Failed to fetch interviews" });
  }
});

module.exports = router;