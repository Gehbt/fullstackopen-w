const BlogList = ({ blog }) => {
  return (
    <li>
      <h3 style={{ marginBottom: "0" }}>{blog.title}</h3>
      <div>author: {blog.author || "unknown"}</div>
      <div>url: {blog.url}</div>
      <div>likes: {blog.likes}</div>
    </li>
  );
};

const BlogForm = ({ addBlog, newBlog, setNewBlog, username }) => {
  const handleTitleChange = (e) => {
    e.preventDefault();
    setNewBlog({ title: e.target.value, url: newBlog.url });
  };
  const handleUrlChange = (e) => {
    e.preventDefault();
    setNewBlog({ title: newBlog.title, url: e.target.value });
  };

  return (
    <form onSubmit={addBlog} style={{ display: "flex", flexDirection: "row" }}>
      title:
      <input
        value={newBlog.title}
        placeholder="title"
        onInput={handleTitleChange}
      />
      author: {username}
      url:
      <input value={newBlog.url} placeholder="url" onChange={handleUrlChange} />
      <button type="submit">create blog</button>
    </form>
  );
};

const BlogComponent = ({ blogs, children }) => (
  <>
    <h2>Blogs</h2>
    {children}
    <ul>
      {blogs.length === 0
        ? "No blogs"
        : blogs.map((blog, index) => <BlogList key={index} blog={blog} />)}
    </ul>
  </>
);

const Comp = {
  BlogComponent,
  BlogForm,
};
export default Comp;
