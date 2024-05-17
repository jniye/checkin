import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  integrity="sha512-d5a6e6c57c6cce1f0b67a5bc8f5a8b3e8e5a3d7a5645d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d5a5d"
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
