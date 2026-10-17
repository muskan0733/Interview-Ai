const userController = require("../controllers/user/userController");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/profile", authMiddleware, userController.profileUser);

module.exports = router;