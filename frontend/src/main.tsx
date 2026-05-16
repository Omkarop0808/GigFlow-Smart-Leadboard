import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock: This module has been deprecated")) return;
  originalWarn(...args);
};

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.WebGLRenderer: Context Lost")) return;
  originalError(...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
