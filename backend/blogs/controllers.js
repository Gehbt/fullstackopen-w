import express from "express";
import Blog from "./model.js";
import env from "~/utils/env.js";
import jwt from "jsonwebtoken";
import User from "~/users/models.js";
import { userExtractor } from "~/middleware/token.js";

const { SECRET } = env;
const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate(
      "users",
      { username: 1, id: 1, name: 1 },
      User
    );
    // ?TODO 1: 修改列出所有博客，使创建者的用户信息与博客一起显示。]
    // ?TODO 2: 列出所有用户，同时显示每个用户创建的博客。
    response.json(blogs);
  } catch (err) {
    console.log("err :>> ", err);
    next();
  }
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  if (blog.title === undefined && blog.url === undefined) {
    return response.status(400);
  }

  const decodedToken = jwt.verify(request.token, SECRET);
  // Blog.author 对应 User.username
  if (
    !decodedToken.username ||
    !Blog.findOne({ author: decodedToken.username })
  ) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const result = await blog.save();
  response.status(201).json(result);
});
blogsRouter.delete("/:url", userExtractor, async (request, response, next) => {
  try {
    const author = request.author;
    const deleteBlog = await Blog.findOne({ author });
    if (!deleteBlog.url || deleteBlog.url !== request.params.url) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
    const result = await Blog.findOneAndDelete(
      {
        url: "/" + request.params.url,
      },
      { context: "query" }
    );
    if (!result) {
      response.status(404).end();
    }
    response.status(204).end();
  } catch (e) {
    next(e);
  }
});
blogsRouter.put("/:url", userExtractor, async (request, response, next) => {
  const { title } = request.body;
  try {
    const author = request.author;
    const putBlog = await Blog.findOne({ author });
    if (!putBlog.url || putBlog.url !== request.params.url) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { url: "/" + request.params.url },
      {
        title,
      },
      { context: "query" }
    );
    response.status(201).json(updatedBlog);
  } catch (e) {
    next(e);
  }
});
export default blogsRouter;
