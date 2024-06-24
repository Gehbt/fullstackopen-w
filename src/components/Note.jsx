import { useState } from "react";
/**
 * @param {object} props
 * @param {NoteType} props.note
 * @param {(id: number) => void} props.toggleImportance
 */
const NoteList = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li
      className="note"
      style={{
        // textAlign: "left",
        width: "95%",
        display: "flex",
        justifyContent: "space-between",
        textOverflow: "ellipsis",
        content: ">",
        whiteSpace: "pre-wrap",
      }}
    >
      <span>
        {note.id} | <span>{note.content}</span>
      </span>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  );
};

/**
 * @param {object} props
 * @param {(noteObject: InitNoteType)=> void} props.createNote
 * @returns
 */
const NoteForm = ({ createNote }) => {
  const [newNoteContent, setNewNoteContent] = useState("");
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleNoteChange = (event) => {
    setNewNoteContent(event.target.value);
  };
  /**
   * @type {React.FormEventHandler<HTMLFormElement>}
   */
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNoteContent,
      important: Math.random() > 0.5,
    });

    setNewNoteContent("");
  };
  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        {/* TODO: important radio */}
        <input
          id="note-input"
          value={newNoteContent}
          placeholder="a new note..."
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

/**
 * @param {object} props
 * @param {NoteType[]} props.notes
 * @param {(id: number) => void} props.toggleImportanceOf
 * @param {React.ReactNode} [props.children]
 */
const NoteComponent = ({ notes, toggleImportanceOf, children }) => {
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <>
      <h2>Notes</h2>
      <div style={{ marginBottom: "12px" }}>{children}</div>
      <div>
        <button className="show" onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow &&
          notesToShow.map((note) => (
            <NoteList
              key={note.id}
              note={note}
              toggleImportance={toggleImportanceOf}
            />
          ))}
      </ul>
    </>
  );
};

const Comp = {
  NoteComponent,
  NoteForm,
};
export default Comp;
