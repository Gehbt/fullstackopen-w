import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Note from "./components/Note";
import Blog from "./components/Blog";
import Notification from "./components/middleware/Notification";
import Footer from "./components/Footer";
import LoginForm from "./components/Login";
import Togglable from "./components/middleware/Togglable";

import noteService from "./services/notes.js";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import "./App.css";

/**
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props
 * @returns
 */
const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(
    /** @type {string | null} */ ("")
  );

  const [blogs, setBlogs] = useState(/** @type {BlogType[]} */ ([]));
  const [notes, setNotes] = useState(/** @type {NoteType[]} */ ([]));
  const [user, setUser] = useState(/** @type {UserType | null} TODO */ (null));

  const noteFormRef = useRef(
    /** @type {{toggleVisibility: () => void} | undefined} */ (undefined)
  );
  /**
   * @param {React.FormEvent<HTMLFormElement>} event
   * @param {object} param
   * @param {string} param.username
   * @param {string} param.password
   */
  const handleLogin = async (event, { username, password }) => {
    event.preventDefault();
    try {
      /**
       * @type {{token: string} & UserType}
       */
      const loginUser = await loginService.login({
        username,
        password,
      });
      /*#__PURE__*/ console.log("loginUser", loginUser);
      window.localStorage.setItem(
        "loggedNoteappUser",
        JSON.stringify(loginUser ?? "")
      );
      noteService.setToken(loginUser.token);
      blogService.setToken(loginUser.token);
      setUser(loginUser);
    } catch (/** @type {*} */ e) {
      setErrorMessage("Wrong credentials");
      console.error("error: " + e.message);
      window.setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  /**
   * if event is undefined which mean `jwt expired`
   * @param {React.MouseEvent<HTMLButtonElement>} [event]
   */
  const handleLogout = (event) => {
    event?.preventDefault();
    window.localStorage.setItem("loggedNoteappUser", "");
    noteService.setToken(null);
    blogService.setToken(null);
    setUser(null);
  };

  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      /**
       * @type {UserType}
       */
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
      blogService.setToken(user.token);
    } else {
      console.log("no user");
    }
  };
  const notesHook = () => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const blogHook = () => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  };
  /**
   * @param {number} id
   */
  const toggleImportanceOf = (id) => {
    const importNotes = notes.find((n) => n.id === id);
    if (!importNotes) return;
    const changedNote = { ...importNotes, important: !importNotes?.important };

    noteService
      .update(id, changedNote)
      .then((returnNotes) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnNotes)));
      })
      .catch((e) => {
        console.error("e", e);
        if (e.response.status === 401) {
          handleLogout();
          return;
        }
        setErrorMessage(
          `Note '${importNotes?.content}' was already removed from server`
        );
        window.setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  useLayoutEffect(userHook, []);
  useEffect(notesHook, [user]);
  useEffect(blogHook, []);
  // TODO2: addBlog
  /**
   * @param {InitNoteType} newNote
   * @returns {void}
   */
  const addNote = (newNote) => {
    noteFormRef.current?.toggleVisibility();
    noteService.create(newNote).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };
  /**
   * @param {BlogType} blogObject
   * @returns {void}
   */
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };
  /**
   * @param {string} url
   */
  const removeBlog = (url) => {
    blogService.remove(url).then(() => {
      setBlogs(blogs.filter((blog) => blog.url !== url));
    });
  };
  /**
   * @param {keyof BlogType} keys
   * @param {BlogType} newBlog
   */
  const updateBlog = (keys, newBlog) => {
    blogService.update(keys, newBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) =>
          blog.url !== returnedBlog.url || blog.author !== returnedBlog.author
            ? blog
            : returnedBlog
        )
      );
    });
  };
  // TODO3: split notes & blogs -> half, split pure-component
  return (
    <div style={props.style}>
      <h1>Notes & Blogs</h1>
      <Notification message={errorMessage} isError />
      <h2>
        {user === null ? (
          "no user"
        ) : (
          <>
            <p>hello `{user.username}`</p>
            <p>
              <button onClick={handleLogout}>logout</button>
            </p>
          </>
        )}
      </h2>
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <Note.NoteComponent
          notes={notes}
          toggleImportanceOf={toggleImportanceOf}
        >
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <Note.NoteForm createNote={addNote} />
          </Togglable>
        </Note.NoteComponent>
      )}
      <hr />
      <Blog.BlogComponent
        blogs={blogs}
        deleteBlog={removeBlog}
        likeBlog={updateBlog}
      >
        {user && (
          <Togglable buttonLabel="new blog">
            <Blog.BlogForm createBlog={addBlog} user={user} />
          </Togglable>
        )}
      </Blog.BlogComponent>
      <Footer />
    </div>
  );
};
export default App;
