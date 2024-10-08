/* v8 ignore next 40 */
// 是启动用的脚本文件
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import stylex from "@stylexjs/stylex";
import { Counter } from "./trash/status";
/**
 * @type {Record<string,React.CSSProperties>}
 */
const appStyle = {
  app: {
    padding: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
};
const root = document.getElementById("root");
if (!root) {
  throw new Error("root not found");
}
createRoot(root).render(
  <StrictMode>
    <App style={appStyle.app} />
    <Counter />
  </StrictMode>
);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// /*#__PURE__*/ reportWebVitals();
