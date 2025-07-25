import express from "express";
import cors from "cors";
import auth from "./auth/index.js";
import post from "./post/index.js";
import { requestLogHandler } from "./utils/index.js";

const app = express();
app.use(express.json());
app.use(cors())

// Logger and timer middleware
app.use(requestLogHandler);

// app.use("/", (req,res) => res.send("home"));
app.use("/auth", auth);
app.use("/post", post);

app.listen(3000, () => console.log("application running on port 3000..."));
