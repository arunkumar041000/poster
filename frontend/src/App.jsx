// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import { TokenProvider } from "./TokenContext.jsx";

function App() {
  return (
    <Router>
      <TokenProvider>
        <nav className="p-4 bg-gray-100 flex gap-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/posts">My Posts</Link>
          {/* <Link to="/login">Login</Link>
          <Link to="/register">Register</Link> */}
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to={"/posts"} />} />
        </Routes>
      </TokenProvider>
    </Router>
  );
}

export default App;
