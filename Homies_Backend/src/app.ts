import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./router/userRoutes";

const app: express.Application = express();

// cors
app.use(cors({
  credentials:true,
}));

// express json data
app.use(express.json());

// express url data
app.use(express.urlencoded({ extended: true }));

// cookie parse
app.use(cookieParser());

// routes declaration
app.use("/users", userRoutes)

export { app };
