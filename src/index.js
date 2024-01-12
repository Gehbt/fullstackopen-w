import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./PhoneBook";
import reportWebVitals from "./reportWebVitals";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App
      style={{
        padding: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    />
  </React.StrictMode>
);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
