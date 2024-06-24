declare global {
  type NoteType = { id: number, content: string, important: boolean }
  type InitNoteType = { id?: number, content: string, important: boolean }
  type UserType = { id: number, username: string, name: string, token: string }
  type BlogType = { author: string, url: string, likes: number, title: string, users: number }
  type PersonType = { name: string, number: string, id: number }
}
export { }