import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import stylex from "@stylexjs/stylex";

const appStyle = stylex.create({
  app: {
    padding: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App {...stylex.props(appStyle.app)} />
  </StrictMode>
);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
