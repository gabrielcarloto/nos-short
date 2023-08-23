import "./index.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
