import Note from "~/notes/models.js";
import User from "~/users/models.js";
import { faker } from "@faker-js/faker/locale/zh_CN";
const initialNotes = [
  {
    id: 101,
    content: "HTML is easy",
    date: faker.date.anytime(),
    important: false,
    user: 123456,
  },
  {
    id: 207,
    content: "Browser can execute only Javascript",
    date: faker.date.anytime(),
    important: true,
    user: 123456,
  },
  {
    content: "A proper dinosaur codes with Java",
    important: false,
    id: 221244,
    date: faker.date.anytime(),
    user: 141414,
  },
];

const nonExistingId = async () => {
  const note = new Note({
    content: "willremovethissoon",
    date: faker.date.anytime(),
    id: 102123,
    important: false,
  });
  try {
    // await note.save();
    //  note.remove();
  } catch (err) {
    console.log("note :>> ", note.save);
    console.log("err :>> ", err);
  }

  return note.id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const wrapper = {
  initialNotes,
  nonExistingId,
  usersInDb,
  notesInDb,
};
export default wrapper;
