import { useEffect, useState } from "react";

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (!ids.length) return;

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestId = ids[0];
      let bestDistance = Number.POSITIVE_INFINITY;
      let bestVisible = -1;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visibleHeight > bestVisible || (visibleHeight === bestVisible && distance < bestDistance)) {
          bestVisible = visibleHeight;
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
