import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/index.js";
import { JWT_SECRET } from "../environment/index.js";

export async function registerHandler(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({ message: "Missing fields" });
  }
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (user) {
      return res.status(409).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      function (err) {
        if (err) return res.status(500).send({ message: "DB error" });
        res.send({ message: "User created successfully" });
      },
    );
  });
}

export function loginHandler(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: "Missing fields" });
  }
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (!user) {
      return res.status(403).send({ message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(403).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ message: "Login successful", token });
  });
} 