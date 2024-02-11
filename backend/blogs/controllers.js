import express from "express";
import Blog from "./model.js";
const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  }
  if (blog.title === undefined && blog.url === undefined) {
    response.status(400).end();
    return;
  }
  const result = await blog.save();
  response.status(201).json(result);
});
blogsRouter.delete("/:url", async (request, response, next) => {
  try {
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
blogsRouter.put("/:url", async (request, response, next) => {
  const { title } = request.body;
  try {
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
