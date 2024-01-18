import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

export const mkConnect = (ModelName) => {
  const { DB_PASSWORD, DB_NAME, MONGODB_URI } = dotenv.config({
    path: path.resolve(process.cwd(), ".env.local"),
  }).parsed;

  const url = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@${MONGODB_URI}/fullstack?retryWrites=true&w=majority`;

  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected to MongoDB", `/${ModelName}`);
    })
    .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
    });
  return 0;
};
