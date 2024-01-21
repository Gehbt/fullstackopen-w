import mongoose from "mongoose";
import env from "~/utils/env.js";
import logger from "~/utils/logger.js";

export const mkConnect = () => {
  const url = `mongodb+srv://${env.DB_NAME}:${env.DB_PASSWORD}@${env.MONGODB_URI}/fullstack?retryWrites=true&w=majority`;

  mongoose
    .connect(url)
    .then((result) => {
      logger.info("connected to MongoDB");
    })
    .catch((error) => {
      logger.error("error connecting to MongoDB:", error.message);
    });
  return 0;
};
