import express from "express";
import cors from "cors";
import auth from "./auth/index.js";
import post from "./post/index.js";

const app = express();
app.use(express.json());
app.use(cors())

// app.use("/", (req,res) => res.send("home"));
app.use("/auth", auth);
app.use("/post", post);

app.listen(3000, () => console.log("application running on port 3000..."));
