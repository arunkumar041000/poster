import { useContext } from "react";
import { TokenContext } from "./TokenContext";

export function useToken() {
  return useContext(TokenContext);
} 