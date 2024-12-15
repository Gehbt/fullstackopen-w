import { create } from "zustand";

const useNoteStore = create(
  /**
   * @param {(partial: ((state: NoteStore) => Partial<NoteStore>)) => void} set
   */
  (set) => ({
    notes: /** @type {NoteType[]} */ ([]),
    createNote: (note) =>
      set((state) => ({
        notes: [...state.notes, { ...note, id: state.notes.length + 1 }],
      })),
  })
);
/**
 * @param {object} props
 * @param {NoteType[]} props.notes
 * @returns {React.JSX.Element}
 */
const App = ({ notes }) => {
  const noteStore = useNoteStore(() => ({ notes }));
  return (
    <div>
      <ul>
        {noteStore.notes.map((note) => (
          <li key={note.id}>
            {note.content}
            <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
