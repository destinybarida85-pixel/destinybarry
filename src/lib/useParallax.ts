"use client";
import { useEffect } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Smoothed -0.5..0.5 pointer position relative to the viewport. */
export function usePointer() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });
  return { x: sx, y: sy };
}
