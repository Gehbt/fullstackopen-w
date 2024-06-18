/**
 * @typedef {{author: string, url: string, likes: number, title: string}} BlogType
 * @typedef {{id?: string,content: string,important: boolean}} NoteType
 * @typedef {{id: number, username: string, name: string, }} UserType
 * */

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Note from "./components/Note";
import Blog from "./components/Blog";
import Notification from "./components/middleware/Notification.jsx";
import Footer from "./components/Footer";
import LoginForm from "./components/Login";
import Togglable from "./components/middleware/Togglable";

import noteService from "./services/notes.js";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import "./App.css";

const App = (/** @type {React.HTMLAttributes<HTMLDivElement>} */ props) => {
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    /** @type {string | null} */ ("")
  );

  const [blogs, setBlogs] = useState(/** @type {BlogType[]} */ ([]));
  const [notes, setNotes] = useState(/** @type {NoteType[]} TODO */ ([]));
  const [user, setUser] = useState(/** @type {UserType | null} TODO */ (null));

  const noteFormRef = useRef(
    /** @type {{toggleVisibility: () => void} | undefined} | undefined} */ (
      undefined
    )
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
        JSON.stringify(loginUser)
      );
      noteService.setToken(loginUser.token);
      setUser(loginUser);
    } catch (e) {
      setErrorMessage("Wrong credentials");
      console.log("error: ", e);
      window.setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  /**
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem("loggedNoteappUser", null);
    setUser(null);
  };

  const userHook = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (
      loggedUserJSON &&
      loggedUserJSON !== "null" &&
      loggedUserJSON !== "undefined"
    ) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user?.token);
      blogService.setToken(user?.token);
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
      .then((/** @type {NoteType} */ returnNotes) => {
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
  useLayoutEffect(userHook, []);
  useEffect(notesHook, []);
  useEffect(blogHook, []);
  // TODO2: addBlog
  /**
   * @param {NoteType} noteObject
   */
  const addNote = (noteObject) => {
    noteFormRef.current?.toggleVisibility();
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };
  /**
   * @param {BlogType} blogObject
   */
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((/** @type {BlogType[]} */ returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });
  };
  /**
   * @param {string} blogUrl
   * @param {BlogType} blogObject
   */
  const removeBlog = (blogUrl, blogObject) => {
    blogService.remove(blogUrl, blogObject).then(() => {
      setBlogs(blogs.filter((blog) => blog.url !== blogUrl));
    });
  };
  /**
   * @param {string} blogUrl
   * @param {BlogType} blogObject
   */
  const updateBlog = (blogUrl, blogObject) => {
    blogService
      .update(blogUrl, blogObject)
      .then((/** @type {BlogType} */ returnedBlog) => {
        setBlogs(
          blogs.map((blog) => (blog.url !== blogUrl ? blog : returnedBlog))
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
          showAll={showAll}
          setShowAll={setShowAll}
        >
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <Note.NoteForm createNode={addNote} />
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
