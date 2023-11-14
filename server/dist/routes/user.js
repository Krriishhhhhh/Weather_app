"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "krish"; // add this in env file.
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
//1.Signup at the root
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        const existingUser = yield prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });
        res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// 2. Login route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user && user.password === password) {
            const payload = { userId: user.id, Username: user.username };
            const token = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: "1h" });
            res.status(200).json({ message: "Login successful", token });
        }
        else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = router;
