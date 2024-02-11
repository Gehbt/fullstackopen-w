import logger from "~/utils/logger.js";
/** @type {import("express").RequestHandler} */
export const requestLogger = (request, _, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("-----");
  next();
};
export default console;
