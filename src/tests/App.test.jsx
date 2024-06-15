import { render, screen } from "@testing-library/react";
import App from "../App";
import { act } from "react";
import { jest, test, expect } from "@jest/globals";

jest.useFakeTimers();

test("renders learn react link", () => {
  act(() => {
    render(<App />);
  });
  const linkElement = screen.getByText(/no user/i);
  expect(linkElement).toMatchInlineSnapshot``;
});
