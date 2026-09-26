import { useEffect, useState } from "react";

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!ids.length) return;

    const updateActiveSection = () => {
      const viewportMid = window.scrollY + window.innerHeight * 0.45;
      let bestId = ids[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const bottom = top + rect.height;

        if (viewportMid >= top && viewportMid < bottom) {
          setActive(id);
          return;
        }

        const distance = Math.min(Math.abs(top - viewportMid), Math.abs(bottom - viewportMid));
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      setActive(bestId);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [ids.join(",")]);

  return active;
}
