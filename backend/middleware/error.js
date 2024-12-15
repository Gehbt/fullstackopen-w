import logger from "~/utils/logger.js";

/** @type {import("express").ErrorRequestHandler} */
export const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" }).end();
    return;
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message }).end();
    return;
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  logger.error("error.js::errorHandler");
  next(error);
};
/** @type {import("express").ErrorRequestHandler} */
export const unknownEndpoint = (error, request, response, next) => {
  response.status(404).send({ error: "unknown endpoint" }).end();
};
