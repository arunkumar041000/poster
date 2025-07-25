// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import "./index.css";
import { TokenProvider } from "./TokenContext.jsx";

function App() {
  const token = "";

  return (
    <Router>
       <TokenProvider>
        <nav className="flex justify-center gap-4 p-4 bg-gray-200">
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          {token && <Link to="/posts" className="text-blue-600 hover:underline">Posts</Link>}
          
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Navigate to={"/posts"} />} />
        </Routes>
      </TokenProvider>
    </Router>
  );
}

export default App;
