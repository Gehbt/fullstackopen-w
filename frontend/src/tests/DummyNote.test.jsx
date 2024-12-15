import { create } from "zustand";
import DN from "../components/DummyNote.jsx";
import deepFreeze from "deep-freeze-es6";
import { render } from "@testing-library/react";
describe("noteReducer", () => {
  test("returns new state with action NEW_NOTE", () => {
    /**
     * @type {NoteType[]} type - description
     */
    const noteInit = [
      {
        content: "the app state is in redux store",
        important: true,
        id: 1,
      },
      {
        content: "state changes are made with actions",
        important: false,
        id: 2,
      },
    ];
    /**
     * @type {NoteType} type - description
     */
    const dummyAction = {
      content: "state changes are made with actions",
      important: false,
      id: 3,
    };

    // deepFreeze(noteInit);

    const { container } = render(<DN notes={noteInit} />);
    expect(container.querySelectorAll("li").length).toMatchInlineSnapshot(`2`);
    noteInit.push(dummyAction);
    expect(container.querySelectorAll("li").length).toMatchInlineSnapshot(`2`);
  });
});
