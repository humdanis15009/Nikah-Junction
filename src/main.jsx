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

const originalError = console.error;
console.error = (...args) => {
  const errorString = args[0]?.toString() || '';
  
  if (
    errorString.includes('ERR_BLOCKED_BY_CLIENT') ||
    errorString.includes('firestore.googleapis.com') ||
    errorString.includes('firebase')
  ) {
    return;
  }
  
  originalError.apply(console, args);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
