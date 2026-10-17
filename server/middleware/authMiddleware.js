const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized, No Token",
    });
  }

  // Get token from Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify token (Added fallback secret key to match userController)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_jwt_secret"
    );

    // Store verified user information
    req.user = decoded;

    // Continue to next function
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;