const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");

const router = express.Router();

router.get("/users", UsersController.index);
router.post("/users", UsersController.store);
router.get("/users/:id", UsersController.show);
router.post("/login", AuthentificationController.login);
router.post("/signup", AuthentificationController.signup);
router.get("/getMyProfile", authenticateToken, AuthentificationController.getMyProfile);

module.exports = router;

