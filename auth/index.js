import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database";
import { JWT_SECRET } from "../environment";
import { registerHandler, loginHandler } from "./authHandlers.js";

const auth = express.Router();
auth.post("/register", registerHandler);
auth.post("/login", loginHandler);

export default auth;
