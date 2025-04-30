// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { HelmetProvider } from 'react-helmet-async';

// createRoot(document.getElementById("root")).render(<App />);

import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
