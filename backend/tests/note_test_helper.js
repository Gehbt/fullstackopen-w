import Note from "~/notes/models.js";

const initialNotes = [
  {
    id: 101,
    content: "HTML is easy",
    date: new Date(),
    important: false,
  },
  {
    id: 102,
    content: "Browser can execute only Javascript",
    date: new Date(),
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({
    content: "willremovethissoon",
    date: new Date(),
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
const wrapper = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
export default wrapper;
