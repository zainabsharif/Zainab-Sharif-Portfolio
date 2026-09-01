import { useEffect, useState } from "react";

export function useTypewriter(text, { speed = 18, start = true } = {}) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!start) return;
    setOutput("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOutput(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);

  return output;
}
