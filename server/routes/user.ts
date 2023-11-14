import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const SECRET = "krish"; 

const prisma = new PrismaClient();
const router = express.Router();

//1.Signup at the root
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user && user.password === password) {
      const payload = { userId: user.id, Username: user.username };
      const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
      
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
