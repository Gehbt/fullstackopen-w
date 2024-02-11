import logger from "~/utils/logger.js";
import Note from "./models.js";
import express from "express";
import User from "~/users/models.js";
const notesRouter = express.Router();
// 一个路由器对象是一个孤立的中间件和路由实例。你可以把它看作是一个 "小型应用"，只能够执行中间件和路由功能。
// 每个Express应用都有一个内置的应用路由器。

// Get all
notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});
// Get one
notesRouter.get("/:id", (request, response, next) => {
  Note.findOne({ id: Number(request.params.id) })
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      logger.error("notes/controllers::notesRouter.get");
      next(error);
      // response.status(400).send({ error: "malformatted id" });
    });
});
// Delete
// 对于在资源不存在的情况下应该向 DELETE 请求返回什么状态码，目前还没有达成共识。实际上，唯一的两个选择是 204 和 404。
notesRouter.delete("/:id", (request, response, next) => {
  Note.findOneAndDelete({ id: Number(request.params.id) })
    .then((result) => {
      if (!result) {
        response.status(404).end();
      }
      response.status(204).end();
    })
    .catch((error) => {
      logger.error("notes/controllers::notesRouter.delete");
      next(error);
    });
});
// Post
notesRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    if (!body.content) {
      response.status(400).json({ error: "content missing" }).end();
    }
    const user = await User.findOne({ id: body.userId });
    const newNote = new Note({
      id: body.id ?? (await Note.find({}).then((notes) => notes.length)) + 1,
      content: body.content,
      important: body.important || false,
      date: new Date(),
      user: user.id,
    });

    const savedNote = await newNote.save();
    user.notes = user.notes.concat(savedNote.id);
    await user.save();
    response.status(201).json(savedNote);
  } catch (error) {
    logger.error("notes/controllers::notesRouter.post");
    next(error);
  }
});
// Put
notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;
  // 当findOneAndUpdate被执行时，默认不运行验证
  Note.findOneAndUpdate(
    { id: Number(request.params.id) },
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => {
      logger.error("notes/controllers::notesRouter.put");
      next(error);
    });
});
export default notesRouter;
