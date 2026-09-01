import { useEffect, useState } from "react";

export function useTypeLoop(
  text,
  { typeSpeed = 22, deleteSpeed = 14, pauseAfterType = 1800, pauseAfterDelete = 500, start = true } = {}
) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (!start) return;
    let cancelled = false;
    let timeoutId;
    let i = 0;

    const typeStep = () => {
      if (cancelled) return;
      i += 1;
      setOutput(text.slice(0, i));
      timeoutId = setTimeout(i < text.length ? typeStep : deleteStep, i < text.length ? typeSpeed : pauseAfterType);
    };

    const deleteStep = () => {
      if (cancelled) return;
      i -= 1;
      setOutput(text.slice(0, i));
      timeoutId = setTimeout(i > 0 ? deleteStep : typeStep, i > 0 ? deleteSpeed : pauseAfterDelete);
    };

    setOutput("");
    timeoutId = setTimeout(typeStep, pauseAfterDelete);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [text, start, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  return output;
}
