import express from "express";
import Note from "../notes/models.js";
import User from "../users/models.js";

const testingRouter = express.Router();
testingRouter.get("/reset", async (request, response) => {
  response.send("<h1>test env</h1>").status(200).end();
});
testingRouter.post("/reset", async (request, response) => {
  await Note.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

export default testingRouter;
