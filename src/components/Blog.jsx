/**
 * @typedef {(...args: any[]) => any} AnyFunction
 * @typedef {(...args: any[]) => void} VoidFunction
 */

/**
 * @param {object} props
 * @param {{author: string,url: string,likes: number}} props.blog - description
 * @returns
 */
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
/**
 * @param {object} props - The properties passed to the component.
 * @param {React.FormEventHandler<HTMLFormElement>} props.addBlog - The function to handle the form submission.
 * @param {{ id:string,url:string,title:string }} props.newBlog - The object containing the new blog data.
 * @param {({ id:string,url:string,title:string }) => void} props.setNewBlog - The function to update the new blog data.
 * @param {string} props.username - The username of the blog author.
 */
const BlogForm = ({ addBlog, newBlog, setNewBlog, username }) => {
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
/**
 * Renders a component that displays a list of blogs.
 * @param {{ blogs: any[],children: React.ReactNode}} props - The properties passed to the component.
 */
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
