import { useState } from "react";
/**
 * @param {object} props
 * @param {BlogType} props.blog
 * @param {(url: "likes", newBlog: BlogType) => void} props.likeBlog
 * @param {(url: string) => void} props.deleteBlog
 */
const BlogList = ({ blog, deleteBlog, likeBlog }) => {
  return (
    <li
      className="blog"
      style={{ border: "1px solid black", listStyle: "none" }}
    >
      <h3 style={{ marginBottom: "0" }}>{blog.title}</h3>
      <div>author: {blog.author || "unknown"}</div>
      <div>url: /{blog.url}</div>
      <button
        className="like"
        onClick={() => likeBlog("likes", { ...blog, likes: blog.likes + 1 })}
        style={{ marginBottom: "10px", marginRight: "10px" }}
      >
        like {blog.likes}
      </button>
      <button
        className="delete"
        onClick={() => deleteBlog(blog.url)}
        style={{ marginBottom: "10px" }}
      >
        delete
      </button>
    </li>
  );
};
/**
 * @param {object} props - The properties passed to the component.
 * @param {(blogObject: BlogType) => void} props.createBlog - The function to handle the form submission.
 * @param {UserType} props.user - The username of the blog author.
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
    if (!newBlog.title || !newBlog.url) {
      alert("title and url are required");
      return;
    }
    /**
     * @type {BlogType}
     */
    const blogObject = {
      title: newBlog.title,
      author: user.username,
      url: newBlog.url,
      users: user.id,
      likes: 0,
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
      <p className="title" style={{ margin: "0" }}>
        title:
        <input
          className="title"
          value={newBlog.title}
          placeholder="title"
          onInput={handleTitleChange}
        />
      </p>
      <p className="author" style={{ margin: "0" }}>
        author: {user.username}
      </p>
      <p className="url" style={{ margin: "0" }}>
        url:
        <input
          className="url"
          value={newBlog.url}
          placeholder="url"
          onChange={handleUrlChange}
        />
      </p>
      <p style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <button type="submit" className="add-blog">
          create blog
        </button>
      </p>
    </form>
  );
};
/**
 * Renders a component that displays a list of blogs.
 * @param {object} props
 * @param {BlogType[]} props.blogs
 * @param {React.ReactNode} [props.children]
 * @param {(url: "likes", newBlog: BlogType) => void} props.likeBlog
 * @param {(url: string) => void} props.deleteBlog
 */
const BlogComponent = ({ blogs, children = [], deleteBlog, likeBlog }) => (
  <>
    <h2>Blogs</h2>
    {children}
    <ul
      style={{
        width: "600px",
        display: "grid",
        gridTemplateColumns: "200px 200px 200px",
        gap: "2px",
        padding: "0",
      }}
    >
      {blogs.length === 0
        ? "No blogs"
        : blogs
            .toSorted((a, b) => b.likes - a.likes)
            .map((blog, i) => (
              <BlogList
                key={`${blog.url}-${i}`}
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
