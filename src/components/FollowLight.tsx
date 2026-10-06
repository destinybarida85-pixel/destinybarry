"use client";
import { motion, useTransform } from "framer-motion";
import { usePointer } from "@/lib/useParallax";

export function FollowLight() {
  const { x, y } = usePointer();
  const tx = useTransform(x, [-0.5, 0.5], [-90, 90]);
  const ty = useTransform(y, [-0.5, 0.5], [-70, 70]);
  return (
    <motion.div aria-hidden style={{ x: tx, y: ty }} className="pointer-events-none fixed left-[62%] top-[40%] -ml-[350px] -mt-[350px] h-[700px] w-[700px] sm:-ml-[500px] sm:-mt-[500px] sm:h-[1000px] sm:w-[1000px] rounded-full opacity-30 blur-[60px]">
      <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle at 50% 42%, rgba(250,203,14,.55), rgba(240,107,168,.42) 32%, rgba(120,186,230,.38) 60%, rgba(229,228,224,0) 74%)" }} />
    </motion.div>
  );
}
