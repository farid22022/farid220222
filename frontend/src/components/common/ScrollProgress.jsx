import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[80] h-1 origin-left"
      style={{
        scaleX,
        width: "100%",
        background: "linear-gradient(90deg, var(--gradient-one), var(--gradient-two), var(--accent))"
      }}
    />
  );
}
