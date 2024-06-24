import { render, screen, act } from "@testing-library/react";
import App from "../App";
import { StrictMode } from "react";

vi.useFakeTimers();

test.skip("renders learn react link", async () => {
  await act(() =>
    render(
      <StrictMode>
        <App />
      </StrictMode>
    )
  );

  const linkElement = screen.getByText(/no user/i);
  expect(linkElement).toBeDefined();
});
