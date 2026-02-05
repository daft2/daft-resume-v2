import React from "react";
import ReactDOM from "react-dom/client";
import { initLenis } from "./lib/useLenis";
import "./index.css";
import App from "./app/app";

// Initialize Lenis smooth scroll
initLenis();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
