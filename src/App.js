import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home"; 
import Ai from "./pages/AI";
import SEO from "./components/Seo";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <GlobalStyles />
        <SEO title="Henrik Sturcz" description="Showcasing my best development projects." />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<Ai />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};


export default App;
