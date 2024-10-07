/**
 * @jsx React.createElement
 * @jsxFrag React.Fragment
 */

import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";

test("loads and displays greeting", async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />);
  // ACT
  await userEvent.click(screen.getByText("Load Greeting"));
  await screen.findByRole("heading");
  // ASSERT
  expect(screen.getByRole("heading")).toHaveTextContent("hello there");
  expect(screen.getByRole("button")).toBeDisabled();
  expect(true).toBe(true);
});

const initialState = {
  error: null,
  greeting: null,
};

function greetingReducer(
  state: {
    error: unknown;
    greeting: any;
  },
  action: {
    type: "SUCCESS" | "ERROR" | (Record<string, unknown> & string);
    error: any;
    greeting: any;
  }
) {
  switch (action.type) {
    case "SUCCESS": {
      return {
        error: null,
        greeting: action.greeting,
      };
    }

    case "ERROR": {
      return {
        error: action.error,
        greeting: null,
      };
    }

    default: {
      const _: string = action.type;
      return state;
    }
  }
}

function Fetch({ url }: { url: string }) {
  const [{ error, greeting }, dispatch] = React.useReducer(
    greetingReducer,
    initialState
  );
  const [buttonClicked, setButtonClicked] = React.useState(false);

  // const fetchGreeting = async (url) =>
  fetch(url, {
    method: "GET",
  })
    .then(async (response) => response.json())
    .then(async (json: { data: any }) => {
      const { data } = json;
      const { greeting } = data;
      dispatch({ type: "SUCCESS", greeting, error: null });
      setButtonClicked(true);
    })
    .catch((error: unknown) => {
      dispatch({ type: "ERROR", error, greeting: null });
    });

  const buttonText = buttonClicked ? "Ok" : "Load Greeting";

  return (
    <div>
      <button disabled={buttonClicked}>{buttonText}</button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
}
