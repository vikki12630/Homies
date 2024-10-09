import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app";

// dotenv
dotenv.config({ path: "./.env" });

// dbconnection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server Started on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("unable to start server", error);
  });
