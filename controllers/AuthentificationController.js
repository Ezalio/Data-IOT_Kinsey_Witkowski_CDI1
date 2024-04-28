const prisma = require("../config/prisma");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      const isSamePassword = await comparePassword(
        body.password,
        user.password
      );

      if (!isSamePassword)
        return res.status(401).json({ message: "Invalid password" });

      const token = generateAccessToken(body.email);

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getMyProfile(req, res) {
    console.log("MY CONTROLLER");

    return res.status(200).json({ user: req.user });
  }

  async signup(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).send("User already exists with the given email");
      }

      // Use the hashPassword function from your utilities
      const hashedPassword = await hashPassword(password);

      await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      res.status(201).send("User created successfully");
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).send("Error creating user");
    }
  }
}

module.exports = new AuthentificationController();
