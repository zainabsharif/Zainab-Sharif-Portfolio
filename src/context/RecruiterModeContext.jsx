import { createContext, useContext, useEffect, useState } from "react";

const RecruiterModeContext = createContext(null);
const STORAGE_KEY = "recruiterMode";

export function RecruiterModeProvider({ children }) {
  const [recruiterMode, setRecruiterMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(recruiterMode));
  }, [recruiterMode]);

  const toggle = () => setRecruiterMode((v) => !v);

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, setRecruiterMode, toggle }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const ctx = useContext(RecruiterModeContext);
  if (!ctx) throw new Error("useRecruiterMode must be used within RecruiterModeProvider");
  return ctx;
}
