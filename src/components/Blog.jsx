import { useState } from "react";
/**
 * @typedef {(...args: any[]) => any} AnyFunction
 * @typedef {(...args: any[]) => void} VoidFunction
 * @typedef {{author: string, url: string, likes: number, title: string}} BlogType
 */

/**
 * @param {object} props
 * @param {BlogType} props.blog
 * @param {(url: string, oldBlog: BlogType) => void} props.deleteBlog
 * @param {(url: string, newBlog: BlogType) => void} props.likeBlog
 */
const BlogList = ({ blog, deleteBlog, likeBlog }) => {
  return (
    <li style={{ border: "1px solid black", listStyle: "none" }}>
      <h3 style={{ marginBottom: "0" }}>{blog.title}</h3>
      <div>author: {blog.author || "unknown"}</div>
      <div>url: {blog.url}</div>
      <button
        onClick={() => likeBlog(blog.url, { ...blog, likes: blog.likes + 1 })}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        like {blog.likes}
      </button>
      <button
        onClick={() => deleteBlog(blog.url, blog)}
        style={{ marginBottom: "10px" }}
      >
        delete
      </button>
    </li>
  );
};
/**
 * @param {object} props - The properties passed to the component.
 * @param {React.FormEventHandler<HTMLFormElement>} props.createBlog - The function to handle the form submission.
 * @param {{
 *  username: string;
 *  name: string;
 *  id: number;
 * }} props.user - The username of the blog author.
 */
const BlogForm = ({ createBlog, user }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    url: "",
  });
  /**
   * @type {React.FormEventHandler<HTMLFormElement>} event
   */
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: user.username,
      url: newBlog.url,
      users: user.id,
    };
    createBlog(blogObject);
    setNewBlog({ title: "", url: "" });
  };
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleTitleChange = (e) => {
    e.preventDefault();
    setNewBlog({ title: e.target.value, url: newBlog.url });
  };
  /**
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleUrlChange = (e) => {
    e.preventDefault();
    setNewBlog({ title: newBlog.title, url: e.target.value });
  };

  return (
    <form
      onSubmit={addBlog}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "baseline",
        justifyContent: "center",
      }}
    >
      <p style={{ margin: "0" }}>
        title:
        <input
          value={newBlog.title}
          placeholder="title"
          onInput={handleTitleChange}
        />
      </p>
      <p style={{ margin: "0" }}>author: {user.username}</p>
      <p style={{ margin: "0" }}>
        url:
        <input
          value={newBlog.url}
          placeholder="url"
          onChange={handleUrlChange}
        />
      </p>
      <p style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button type="submit">create blog</button>
      </p>
    </form>
  );
};
/**
 * Renders a component that displays a list of blogs.
 * @param {object} props
 * @param {BlogType[]} props.blogs
 * @param {React.ReactNode} props.children
 * @param {(url: string, oldBlog: BlogType) => void} props.deleteBlog
 * @param {(url: string, newBlog: BlogType) => void} props.likeBlog
 */
const BlogComponent = ({ blogs, children, deleteBlog, likeBlog }) => (
  <>
    <h2>Blogs</h2>
    {children}
    <ul
      style={{
        width: "600px",
        display: "grid",
        gridTemplateColumns: "200px 200px 200px",
        gap: "2px",
      }}
    >
      {blogs.length === 0
        ? "No blogs"
        : blogs.map((blog, i) => (
            <BlogList
              key={blog.url}
              blog={blog}
              deleteBlog={deleteBlog}
              likeBlog={likeBlog}
            />
          ))}
    </ul>
  </>
);

const Comp = {
  BlogComponent,
  BlogForm,
};
export default Comp;
