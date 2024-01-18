import Note from "./models.js";
/**
 * @param {import("express").Express} app
 */
export function createNotesServer(app) {
  // Get all
  app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => {
      response.json(notes);
    });
  });
  // Get one
  app.get("/api/notes/:id", (request, response, next) => {
    Note.findOne({ id: Number(request.params.id) })
      .then((note) => {
        if (note) {
          response.json(note);
        } else {
          response.status(404).end();
        }
      })
      .catch((error) => {
        console.log(error);
        next(error);
        // response.status(400).send({ error: "malformatted id" });
      });
  });
  // Delete
  // 对于在资源不存在的情况下应该向 DELETE 请求返回什么状态码，目前还没有达成共识。实际上，唯一的两个选择是 204 和 404。
  app.delete("/api/notes/:id", (request, response, next) => {
    Note.findOneAndDelete({ id: Number(request.params.id) })
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  });
  // Post
  app.post("/api/notes", async (request, response, next) => {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({ error: "content missing" });
    }
    const newNote = new Note({
      id: await Note.find({}).then((notes) => notes.length),
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    newNote
      .save()
      .then((savedNote) => {
        response.json(savedNote);
      })
      .catch((error) => next(error));
  });
  // Put
  app.put("/api/notes/:id", (request, response, next) => {
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
      .catch((error) => next(error));
  });
}
