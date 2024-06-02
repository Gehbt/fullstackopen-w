import { useState, useEffect } from "react";
import Note from "./components/Note.jsx";
import Blog from "./components/Blog.jsx";
import noteService from "./services/notes.mjs";
import blogService from "./services/blogs.mjs";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";
import loginService from "./services/login.mjs";
import "./App.css";
const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    url: "",
  });
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({
        username,
        password,
      });
      console.log("loginUser", loginUser);
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(loginUser)
      );
      noteService.setToken(loginUser.token);
      setUser(loginUser);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      window.setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem("loggedNoteappUser", null);
    setUser(null);
  };
  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user?.token);
      blogService.setToken(user?.token);
    }
  };
  const notesHook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const blogHook = () => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(Array.from(initialBlogs));
    });
  };
  const toggleImportanceOf = (id) => {
    const importNotes = notes.find((n) => n.id === id);
    const changedNote = { ...importNotes, important: !importNotes.important };

    noteService
      .update(id, changedNote)
      .then((returnNotes) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnNotes)));
      })
      .catch(() => {
        setErrorMessage(
          `Note '${importNotes.content}' was already removed from server`
        );
        window.setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  useEffect(userHook, []);
  useEffect(notesHook, []);
  useEffect(blogHook, []);
  // TODO2: addBlog
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };
  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: user.username,
      url: newBlog.url,
      users: user.id,
    };
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setNewBlog({
        title: "",
        url: "",
      });
    });
  };
  // TODO3: split notes & blogs -> half, split pure-component
  return (
    <div style={props.style}>
      <h1>Notes & Blogs</h1>
      <Notification message={errorMessage} isError={true} />
      <h2>
        {user === null ? (
          "no user"
        ) : (
          <span>
            hello {user.username} <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </h2>

      {user === null ? (
        <LoginForm />
      ) : (
        <Note.NoteComponent
          notes={notes}
          toggleImportanceOf={toggleImportanceOf}
          showAll={showAll}
          setShowAll={setShowAll}
        >
          <Note.NoteForm
            addNote={addNote}
            newNote={newNote}
            setNewNote={setNewNote}
          />
        </Note.NoteComponent>
      )}

      <hr />
      <Blog.BlogComponent blogs={blogs}>
        {user && (
          <Blog.BlogForm
            addBlog={addBlog}
            newBlog={newBlog}
            setNewBlog={setNewBlog}
            username={user.username}
          />
        )}
      </Blog.BlogComponent>
      <Footer />
    </div>
  );
};
export default App;
