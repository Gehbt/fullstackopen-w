import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import noteService from "./services/notes.js";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import "./App.css";

/**
 * @param {{ handleLogin: (
 *  e: React.FormEvent<HTMLFormElement>,
 *  userData: { username: string; password: string }
 * ) => void}} props
 */
const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        handleLogin(e, { username, password });
        setUsername("");
        setPassword("");
      }}
    >
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="Username"
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
const App = (/** @type {React.HTMLAttributes<HTMLDivElement>} */ props) => {
  const [showAll, setShowAll] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    /** @type {string | null} */ ("")
  );

  const [blogs, setBlogs] = useState(/** @type {unknown[]} TODO */ ([]));
  const [notes, setNotes] = useState(/** @type {unknown[]} TODO */ ([]));
  const [user, setUser] = useState(/** @type {{} | null} TODO */ (null));
  const [newBlog, setNewBlog] = useState({
    title: "",
    url: "",
  });
  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {object} param
   * @param {string} param.username
   * @param {string} param.password
   */
  const handleLogin = async (event, { username, password }) => {
    event.preventDefault();
    try {
      const loginUser = await loginService.login({
        username,
        password,
      });
      /*#__PURE__*/ console.log("loginUser", loginUser);
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(loginUser)
      );
      noteService.setToken(loginUser.token);
      setUser(loginUser);
    } catch {
      setErrorMessage("Wrong credentials");
      window.setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  /**
   * @param {React.ClickEvent<HTMLButtonElement>} event
   */
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem("loggedNoteappUser", null);
    setUser(null);
  };

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
  /**
   * @param {string} id
   */
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
  useEffect(userHook, [window.localStorage]);
  useEffect(notesHook, []);
  useEffect(blogHook, []);
  // TODO2: addBlog
  /**
   * @type {React.FormEventHandler<HTMLFormElement>} event
   */
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
  /**
   * @type {React.FormEventHandler<HTMLFormElement>} event
   */
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
        <LoginForm handleLogin={handleLogin} />
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
