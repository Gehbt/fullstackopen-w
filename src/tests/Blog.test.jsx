import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

test("renders blog no author", () => {
  const deleteBlog = vi.fn();
  const likeBlog = vi.fn();
  const blogsNoAuthor = [
    {
      likes: 0,
      title: "test title",
      url: "test url",
      users: 234,
    },
  ];
  render(
    <Blog.BlogComponent
      // @ts-expect-error 类型的问题直接忽略了
      blogs={blogsNoAuthor}
      deleteBlog={deleteBlog}
      likeBlog={likeBlog}
    />
  );
  expect(screen.getByText("author: unknown")).toBeInTheDocument();
});

describe("renders content", () => {
  /**
   * @type {BlogType[]}
   */
  const blogs = [
    {
      author: "test author",
      likes: 0,
      title: "test title",
      url: "test url",
      users: 234,
    },
    {
      author: "test author2",
      likes: 1,
      title: "test title2",
      url: "test url2",
      users: 234,
    },
  ];

  /**
   * @type {HTMLElement}
   */
  let container;
  const deleteBlog = vi.fn(
    /**
     * @param {string} url
     * @return {BlogType[]}
     */
    (url) => {
      return blogs.filter((blog) => blog.url !== url);
    }
  );
  const likeBlog = vi.fn(
    /**
     * @param {"likes"} keys
     * @param {BlogType} newBlog
     * @return {BlogType[]}
     */
    (keys, newBlog) => {
      return blogs.map((blog) => {
        if (blog.url === newBlog.url) {
          blog[keys] = newBlog[keys];
        }
        return blog;
      });
    }
  );

  beforeEach(() => {
    act(() => {
      container = render(
        <Blog.BlogComponent
          blogs={blogs}
          deleteBlog={deleteBlog}
          likeBlog={likeBlog}
        />
      ).container;
    });
  });

  test("renders all blogs", () => {
    const blogs = container.querySelectorAll("li.blog");
    expect(blogs.length).toBe(2);
  });

  test("like an blog", async () => {
    const firstBlog = screen.getAllByRole("listitem")[0];
    const button = /** @type {HTMLButtonElement} */ (
      firstBlog.querySelector("button.like")
    );

    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(likeBlog.mock.calls).toHaveLength(1);
    // 按钮 like + 1
    expect(
      /**@type {BlogType} */ (likeBlog.mock.results[0].value[0]).likes
    ).toBe(1);

    // double like
    await userEvent.click(button);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });

  test("delete an blog", async () => {
    const blogs = screen.getAllByRole("listitem")[1];
    const button = /** @type {HTMLButtonElement} */ (
      blogs.querySelector("button.delete")
    );

    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(deleteBlog.mock.calls).toHaveLength(1);
    expect(deleteBlog.mock.results[0].value.length).toBe(1);
  });
});

describe("renders none", () => {
  /**
   * @type {HTMLElement}
   */
  let container;
  beforeEach(() => {
    const deleteBlog = vi.fn();
    const likeBlog = vi.fn();
    container = render(
      <Blog.BlogComponent
        blogs={[]}
        deleteBlog={deleteBlog}
        likeBlog={likeBlog}
      />
    ).container;
  });

  test("add blog", () => {
    const blogs = container.querySelectorAll("li.blog");

    expect(blogs.length).toBe(0);
  });
  // MORE?
});

describe("<NoteForm /> with render, change, add", () => {
  window.alert = vi.fn();
  const addBlog = vi.fn();
  /**
   * @type {HTMLElement}
   */
  let container;
  /**
   * @type {UserType}
   */
  const userData = {
    id: 212,
    name: "test name",
    username: "test username",
    token: "test token",
  };
  beforeEach(() => {
    container = render(
      <Blog.BlogForm createBlog={addBlog} user={userData} />
    ).container;
  });
  test("render", async () => {
    const username = /** @type {HTMLParagraphElement} */ (
      container.querySelector("p.author")
    );

    expect(username).toBeDefined();
    expect(username.innerHTML).toBe(`author: ${userData.username}`);
  });
  const user = userEvent.setup();

  test("new blog add title & url", async () => {
    const inputTitle = screen.getByPlaceholderText("title");
    const inputUrl = screen.getByPlaceholderText("url");
    const sendButton = screen.getByText("create blog");

    const inputQueue = ["test title", "test url"];
    await user.type(inputTitle, inputQueue[0]);
    await user.type(inputUrl, inputQueue[1]);
    await user.click(sendButton);

    expect(window.alert).not.toHaveBeenCalled();

    const newBlog = /** @type {BlogType} */ (addBlog.mock.calls[0][0]);
    expect(newBlog.title).toBe(inputQueue[0]);
    expect(newBlog.url).toBe(inputQueue[1]);
  });

  test("new blog not input url", async () => {
    const inputTitle = screen.getByPlaceholderText("title");
    const sendButton = screen.getByText("create blog");
    await user.type(inputTitle, "only title");
    await user.click(sendButton);

    expect(window.alert).toHaveBeenCalled();
  });
});
