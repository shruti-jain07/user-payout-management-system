const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// Create User
router.post("/", userController.createUser);

// Get User by ID
router.get("/:userId", userController.getUserById);

module.exports = router;