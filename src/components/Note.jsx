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

const NoteForm = ({ addNote, newNote, setNewNote }) => {
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
