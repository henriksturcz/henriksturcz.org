import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyles from "./styles/GlobalStyles";
import Ai from "./pages/AI";
import Home from "./pages/Home";
import SEO from "./components/Seo";
import APps from "./pages/Apps";
import WEbpages from "./pages/Webpages"; 
const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <GlobalStyles />
        <SEO title="Henrik Sturcz" description="Showcasing my best development projects." />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/webpages" element={<WEbpages />} />
          <Route path="/ai" element={<Ai />} />
          <Route path="/apps" element={<APps />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
