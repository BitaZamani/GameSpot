import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <div className="sticky bottom-0 text-center text-orange-950">
      Created By{" "}
      <a href="https://github.com/BitaZamani" className="text-orange-400">
        Bita Zamani
      </a>
    </div>
  </StrictMode>
);
