import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LoaderScene from "./LoaderScene";
import NameReveal from "./NameReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SESSION_KEY = "introPlayed";

export default function Loader({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [skipVisible, setSkipVisible] = useState(false);
  const stateRef = useRef({ progress: 0 });
  const nameRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "true");
      setVisible(false);
      onComplete?.();
    };

    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      finish();
      return;
    }

    if (reducedMotion) {
      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;
      tl.set(nameRef.current, { clipPath: "inset(0 0% 0 0)", opacity: 0 })
        .to(nameRef.current, { opacity: 1, duration: 0.6 })
        .to({}, { duration: 0.6 })
        .to(panelRef.current, { autoAlpha: 0, duration: 0.5 });
      return () => tl.kill();
    }

    const skipTimer = setTimeout(() => setSkipVisible(true), 500);

    const tl = gsap.timeline({ onComplete: finish, delay: 0.15 });
    tlRef.current = tl;
    tl.to(
      stateRef.current,
      { progress: 1, duration: 1.8, ease: "power2.inOut" },
      0
    )
      .fromTo(
        nameRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power2.inOut" },
        0
      )
      .to({}, { duration: 0.8 })
      .to(stateRef.current, { progress: 1.3, duration: 0.7, ease: "power1.in" }, ">-0.1")
      .to(panelRef.current, { yPercent: -100, duration: 0.7, ease: "power3.inOut" }, "<");

    return () => {
      clearTimeout(skipTimer);
      tl.kill();
    };
  }, [reducedMotion, onComplete]);

  const skip = () => {
    tlRef.current?.kill();
    sessionStorage.setItem(SESSION_KEY, "true");
    finishedRef.current = true;
    setVisible(false);
    onComplete?.();
  };

  if (!visible) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {!reducedMotion && <LoaderScene stateRef={stateRef} />}
      <NameReveal nameRef={nameRef} />
      {skipVisible && !reducedMotion && (
        <button
          onClick={skip}
          className="absolute bottom-6 right-6 z-20 font-mono text-xs tracking-wide text-text-secondary transition-colors hover:text-accent-secondary sm:bottom-8 sm:right-8"
        >
          Skip →
        </button>
      )}
    </div>
  );
}
