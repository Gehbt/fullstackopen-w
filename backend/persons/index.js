import Person from "./models.js";
/**
 * @param {import("express").Express} app
 */
export function createPersonServer(app) {
  app.get("/api/persons/info", (request, response) => {
    Person.find({}).then((persons) => {
      response.send(
        `PhoneBook Has ${persons.length} person<br/>${new Date().toISOString()}`
      );
    });
  });
  // get all
  app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
      response.json(persons);
    });
  });
  // get one
  app.get("/api/persons/:id", (request, response, next) => {
    Person.findOne({ id: Number(request.params.id) })
      .then((person) => {
        if (person) {
          response.json(person);
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
  // DELETE
  // 对于在资源不存在的情况下应该向 DELETE 请求返回什么状态码，目前还没有达成共识。实际上，唯一的两个选择是 204 和 404。
  app.delete("/api/persons/:id", (request, response, next) => {
    Person.findOneAndDelete({ id: Number(request.params.id) })
      .then((result) => {
        response.status(204).end();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  });
  // post one
  app.post("/api/persons", async (request, response) => {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({ error: "content missing" });
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
      .catch(console.error);
  });
}
