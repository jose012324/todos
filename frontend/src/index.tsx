import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

// This is the entry point - it renders our App component into the HTML
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
