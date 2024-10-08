declare global {
  type NoteType = { id: number, content: string, important: boolean }
  type InitNoteType = { id?: number, content: string, important: boolean }
  type UserType = { id: number, username: string, name: string, token: string }
  type BlogType = { author: string, url: string, likes: number, title: string, users: number }
  type PersonType = { name: string, number: string, id: number }

  type NoteStore = {
    notes: NoteType[],
    // setNotes: (notes: NoteType) => void,
    createNote: (note: InitNoteType) => void,
    // toggleImportanceOf: (id: number) => void
  }
  interface StoreState {
    count: number;
    inc: () => void;
    dec: () => void;
    zero: () => void;
  }
}
export { }