import React from "react";
import ViewPage from "./pages/ViewPage";
import UpdatePage from "./pages/UpdatePage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Links to other pages */}
      <Link to="/">Home Page</Link>
      <Link to="/view-page">View Page</Link>
      <Link to="/update-page">Update Page</Link>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-page" element={<ViewPage />} />
        <Route path="/update-page/:id" element={<UpdatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
