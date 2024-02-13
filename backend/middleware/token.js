import env from "~/utils/env.js";
import { getTokenFrom } from "~/utils/getToken.js";
import jwt from "jsonwebtoken";

const { SECRET } = env;
/** @type {import("express").RequestHandler} */
export const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};
/** @type {import("express").RequestHandler} */
export const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, SECRET);
  if (!decodedToken.username) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  // Blog.author 对应 User.username
  request.author = decodedToken.username;
  next();
};
