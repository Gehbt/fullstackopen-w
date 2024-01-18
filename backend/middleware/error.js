/** @type {import("express").ErrorRequestHandler} */
export const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
/** @type {import("express").RequestHaErrorRequestHandlerndler} */
export const unknownEndpoint = (error, request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
