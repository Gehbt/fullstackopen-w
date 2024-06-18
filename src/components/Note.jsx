import { useState } from "react";
/**
 * @typedef {(...args: any[]) => any} AnyFunction
 * @typedef {(...args: any[]) => void} VoidFunction
 */
/**
 * @param {object} props
 * @param {{id?: string, content: string, important: boolean}} props.note
 * @param {() => void} props.toggleImportance
 */
const NoteList = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li
      className="note"
      style={{
        // textAlign: "left",
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
        textOverflow: "ellipsis",
        content: ">",
        whiteSpace: "pre-wrap",
      }}
    >
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

const NoteForm = (
  /** @type {{createNote: (props: object)=>void}} */ { createNote }
) => {
  const [newNote, setNewNote] = useState("");
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  /**
   * @type {React.FormEventHandler<HTMLFormElement>}
   */
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: Math.random() > 0.5,
    });

    setNewNote("");
  };
  return (
    <form onSubmit={addNote}>
      {/* TODO: important radio */}
      <input
        value={newNote}
        placeholder="a new note..."
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>
  );
};

/**
 * @param {object} props
 * @param {{id?: string,content: string,important: boolean}[]} props.notes
 * @param {(id: any) => void} props.toggleImportanceOf
 * @param {boolean} props.showAll
 * @param {(b:boolean) => void} props.setShowAll
 * @param {React.ReactNode} props.children
 */
const NoteComponent = ({
  notes,
  toggleImportanceOf,
  showAll,
  setShowAll,
  children,
}) => {
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);
  return (
    <>
      <h2>Notes</h2>
      <div style={{ marginBottom: "12px" }}>{children}</div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <NoteList
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
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
