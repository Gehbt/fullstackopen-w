/**
 * @typedef {(...args: any[]) => any} AnyFunction
 * @typedef {(...args: any[]) => void} VoidFunction
 */
/**
 * @param {object} props
 * @param {{id: string, content: string, important: boolean}} props.note
 * @param {() => void)} props.toggleImportance
 */
const NoteList = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li
      className="note"
      style={{
        // textAlign: "left",
        display: "flex",
        justifyContent: "space-between",
        content: ">",
      }}
    >
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};
/**
 * @param {object} props - The properties passed to the component.
 * @param {React.FormEventHandler<HTMLFormElement>} props.addNote - The function to add a new note.
 * @param {string} props.newNote - The current value of the new note.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setNewNote - The function to set the new note value.
 */
const NoteForm = ({ addNote, newNote, setNewNote }) => {
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
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
 *
 * @param {{
 *    notes: {id: string,content: string,important: boolean}[],
 *    toggleImportanceOf: (id: any) => void,
 *    showAll: boolean,
 *    setShowAll: () => boolean,
 *    children: React.ReactNode, }} props
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
