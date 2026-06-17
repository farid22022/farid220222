import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringCursorX = useMotionValue(0);
  const ringCursorY = useMotionValue(0);
  const dotCursorX = useMotionValue(0);
  const dotCursorY = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 22 });
  const springY = useSpring(y, { stiffness: 90, damping: 22 });
  const ringX = useSpring(ringCursorX, { stiffness: 420, damping: 34 });
  const ringY = useSpring(ringCursorY, { stiffness: 420, damping: 34 });
  const dotX = useSpring(dotCursorX, { stiffness: 700, damping: 28 });
  const dotY = useSpring(dotCursorY, { stiffness: 700, damping: 28 });

  useEffect(() => {
    function move(event) {
      setVisible(true);
      x.set(event.clientX - 220);
      y.set(event.clientY - 220);
      ringCursorX.set(event.clientX - 18);
      ringCursorY.set(event.clientY - 18);
      dotCursorX.set(event.clientX - 4);
      dotCursorY.set(event.clientY - 4);
    }

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [dotCursorX, dotCursorY, ringCursorX, ringCursorY, x, y]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-0 hidden h-[440px] w-[440px] rounded-full blur-3xl md:block"
        style={{
          x: springX,
          y: springY,
          opacity: visible ? 0.28 : 0,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--primary) 52%, transparent), transparent 68%)"
        }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed z-[78] hidden h-9 w-9 rounded-full md:block"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0
        }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed z-[78] hidden h-2 w-2 rounded-full md:block"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0
        }}
      />
    </>
  );
}
