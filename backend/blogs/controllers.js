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
    const blogs = await Blog.find({});
    // .populate(
    //   "users",
    //   { username: 1, id: 1, name: 1 },
    //   User
    // );
    // ?TODO 1: 修改列出所有博客，使创建者的用户信息与博客一起显示。]
    // ?TODO 2: 列出所有用户，同时显示每个用户创建的博客。
    response.json(blogs);
  } catch (err) {
    console.log("err :>> ", err);
    next();
  }
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }
  if (!blog.title || !blog.url) {
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
    const url = request.params.url;
    const author = request.author;
    // 找用户是否有这个博客
    const authorBlogs = await Blog.find({ author });
    const deleteBlog = authorBlogs.find((blog) => {
      return blog.url === url;
    });
    if (!deleteBlog) {
      return response
        .status(401)
        .json({ error: `author ${author} don't have blog/${url}` });
    }
    const result = await Blog.findOneAndDelete(
      { url, author },
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

// 注：put 的 body 传入了 一个 blog 对象
blogsRouter.put("/:key", userExtractor, async (request, response, next) => {
  const { url } = request.body;
  const author = request.author;
  const key = request.params.key;
  try {
    const authorBlogs = await Blog.find({ author });
    // 找到那篇原 blog
    const putBlog = authorBlogs.find((blog) => {
      return blog.url === url;
    });
    console.log("putBlog :>> ", putBlog);
    if (!putBlog) {
      return response
        .status(401)
        .json({ error: `author ${author} don't have blog/${url}` });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { url, author },
      {
        [key]: request.body[key],
      },
      { context: "query" }
    );
    response.status(201).json(updatedBlog);
  } catch (e) {
    next(e);
  }
});
export default blogsRouter;
