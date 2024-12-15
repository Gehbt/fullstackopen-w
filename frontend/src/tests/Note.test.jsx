import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "../components/Note";
// import "data:text/javascript,console.log('hello!'');";

describe("renders content", () => {
  /**
   * @type {NoteType[]}
   */
  const notes = [
    {
      id: 1,
      content: "Component testing is done with react-testing-library",
      important: true,
    },
    {
      id: 2,
      content: "Component testing is done with react-testing-library2",
      important: false,
    },
  ];
  test("content to not important", async () => {
    const mockHandler = vi.fn();
    render(
      <Note.NoteComponent notes={notes} toggleImportanceOf={mockHandler} />
    );

    // 对象 screen 具有方法 debug: 可用于将组件的 HTML 打印到终端
    // screen.debug(container);

    // const div = container.querySelector(".note");
    // expect(div).toHaveTextContent(
    //   "Component testing is done with react-testing-library"
    // );

    // 开启交互
    const user = userEvent.setup();
    const button = screen.getByText("make not important");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });
  test("content to important", async () => {
    const mockHandler = vi.fn();
    const { container } = render(
      <Note.NoteComponent notes={notes} toggleImportanceOf={mockHandler} />
    );
    const user = userEvent.setup();
    const button = /** @type {HTMLButtonElement} */ (
      container.querySelector("button.show")
    );
    expect(button).toBeDefined();

    await user.click(button);
    const importantNotes = screen.getAllByRole("listitem");
    expect(importantNotes).toHaveLength(1);
  });
});

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<Note.NoteForm createNote={createNote} />);

  // 当 input 为多个时候，screen.getByRole 会报错
  // const input = screen.getByRole("textbox");

  // 查找多个
  const input = screen.getAllByRole("textbox")[0];

  // 通过 Placeholder 查找单个
  // const input = screen.getByPlaceholderText("a new note...");

  // 通过 dom 查找。ps: 只有 document 上才有 getElementById 方法
  // const input = container.querySelector("#note-input");

  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  // calls[0][0] 代表 spy 第 1 次接收的第 1 个参数
  expect(createNote.mock.calls[0][0].content).toMatchInlineSnapshot(
    `"testing a form..."`
  );
});
test("renders content", async () => {
  /**
   * @type {NoteType[]}
   */
  const notes = [
    {
      id: 1,
      content: "Does not work anymore :(",
      important: true,
    },
  ];
  const _mockHandler = vi.fn();

  render(
    <Note.NoteComponent notes={notes} toggleImportanceOf={_mockHandler} />
  );

  const element = screen.getByText("Does not work anymore :(");
  expect(element).toBeDefined();

  const element2 = await screen.findByText("Does not work anymore :(");
  expect(element2).toBeDefined();

  const element3 = screen.queryByText("do not want this thing to be rendered");
  expect(element3).toBeNull();
});
