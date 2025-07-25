import { useState, useEffect } from "react";
import { TokenContext } from "./TokenContext.js";
import { useNavigate } from "react-router-dom";


export function TokenProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/posts")
    } else {
      localStorage.removeItem("token");
      navigate("/login")
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
} 