import logger from "~/utils/logger.js";
import Person from "./models.js";
import express from "express";
const personsRouter = express.Router();

personsRouter.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(
      `PhoneBook Has ${persons.length} person<br/>${new Date().toISOString()}`
    );
  });
});
// get all
personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
// get one
personsRouter.get("/:id", (request, response, next) => {
  Person.findOne({ id: Number(request.params.id) })
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      logger.error("persons/controllers::personsRouter.get");
      next(error);
      // response.status(400).send({ error: "malformatted id" });
    });
});
// DELETE
// 对于在资源不存在的情况下应该向 DELETE 请求返回什么状态码，目前还没有达成共识。实际上，唯一的两个选择是 204 和 404。
personsRouter.delete("/:id", (request, response, next) => {
  Person.findOneAndDelete({ id: Number(request.params.id) })
    .then((result) => {
      if (!result) {
        response.status(404).end();
      }
      response.status(204).end();
    })
    .catch((error) => {
      logger.error("persons/controllers::personsRouter.delete");
      next(error);
    });
});
// post one
personsRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!body.content) {
    response.status(400).json({ error: "content missing" }).end();
  }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
    id: await Person.find({}).then((persons) => persons.length),
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch(logger.error);
});

export default personsRouter;
