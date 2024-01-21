import { connection } from "mongoose";
import supertest from "supertest";
import app from "~/app/index.js";
import Note from "~/notes/models.js";

const api = supertest(app);
const initialNotes = [
  {
    id: 100,
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    id: 101,
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

beforeEach(async () => {
  await Note.deleteMany({});
  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();
  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});

// .
test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/notes");

  expect(response.body).toHaveLength(initialNotes.length);
});

test("a specific note is within the returned notes", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((r) => r.content);
  expect(contents).toContain("Browser can execute only Javascript");
});

afterAll(() => {
  connection.close();
});
