const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const evaluateAnswers = async (answers) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("No API Key configured");
    }

    const prompt = `
    You are an AI interview evaluator.
    Analyze the following interview answers:
    ${JSON.stringify(answers, null, 2)}

    Return ONLY a valid JSON object:
    {
      "evaluatedAnswers": [
        {
          "question": "question text",
          "answer": "answer text",
          "score": 8,
          "feedback": "1-2 sentences feedback"
        }
      ],
      "overallScore": 8
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.log("AI Fallback Evaluator Active:", error.message);

    // Fallback scoring logic
    let totalScore = 0;
    const evaluatedAnswers = answers.map((item) => {
      const length = item.answer ? item.answer.trim().length : 0;
      let score = length > 50 ? 9 : length > 20 ? 7 : 4;
      let feedback = length > 50 
        ? "Excellent depth and clear explanation!" 
        : "Good answer, try adding more technical concepts.";

      totalScore += score;
      return {
        question: item.question,
        answer: item.answer,
        score,
        feedback,
      };
    });

    const overallScore = Math.round((totalScore / evaluatedAnswers.length) * 10) / 10;
    return { evaluatedAnswers, overallScore };
  }
};

module.exports = { evaluateAnswers };