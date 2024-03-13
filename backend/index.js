import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.route.js";
import accountRouter from "./routes/account.route.js";

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.get("/", (req, res) => {
  res.send("All good");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Running on port " + process.env.PORT);
});
