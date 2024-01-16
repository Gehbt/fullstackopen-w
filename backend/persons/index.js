import express from "express";
import cors from "cors";
const app = express();

// 接收数据
app.use(express.json());
app.use(cors());
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.get("/info", (request, response) => {
  response.send(
    `PhoneBook Has ${persons.length} person\n${new Date().toISOString()}`
  );
});
// get all
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
// get one
app.get("/api/person/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((note) => {
    return note.id === id;
  });
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
// DELETE
// 对于在资源不存在的情况下应该向 DELETE 请求返回什么状态码，目前还没有达成共识。实际上，唯一的两个选择是 204 和 404。
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);
  // 这里都使用204
  response.status(204).end();
});
// limitation
const generateId = () => {
  const randomId = parseInt(Math.random() * 10000);
  if (!persons.find((person) => person.id === randomId)) {
    return randomId;
  } else {
    return generateId();
  }
};
// post one
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // 如果无内容则报错
  if (!persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

/// fin.
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
