import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async"; // SEO-hoz
import "./styles/GlobalStyles"; // Globális stílusok

// Gyökérelem kiválasztása
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderelés StrictMode-dal és HelmetProviderrel
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
