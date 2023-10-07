import express from "express";
import pkg from 'body-parser';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Declaring constants
const app = express();
const { urlencoded, json } = pkg;
dotenv.config();

//API security
app.use(helmet());

//handle CORS error
app.use(cors());

//MongoDB Connection Setup
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});


if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("MongoDB is conneted");
  });

  mDb.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });  
}


//Logger
app.use(morgan("tiny"));

// Set body bodyParser
app.use(urlencoded({ extended: true }));
app.use(json());

const port = process.env.PORT || 5000;

//Load routers
import userRouter from "./src/routers/user.router.js";
import ticketRouter from "./src/routers/ticket.router.js";
import tokenRouter from "./src/routers/token.router.js";

//Use Routers
app.use("/api/user", userRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/tokens", tokenRouter)

//Error handler
import handleError from "./src/utils/errorHandler.js";

app.use((req, res, next) => {
  const error = new Error("Resources not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});