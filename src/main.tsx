import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ToggleColorMode } from "./context/ColorModeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToggleColorMode>
      <CssBaseline />
      <App />
    </ToggleColorMode>
  </React.StrictMode>
);
