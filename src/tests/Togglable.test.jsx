import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Togglable from "../components/middleware/Togglable";

describe("<Togglable />", () => {
  /**
   * @type {HTMLElement}
   */
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container;
  });
  // 子代被渲染
  test("renders its children", async () => {
    await screen.findAllByText("togglable content");
  });
  // 开始时不显示子代
  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
  // 点击按钮后，子代显示
  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
