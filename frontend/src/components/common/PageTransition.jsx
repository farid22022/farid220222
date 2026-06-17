import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 36, scale: 0.985, filter: "blur(14px)", clipPath: "inset(8% 0 0 0 round 18px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0 0 0 round 0px)" }}
        exit={{ opacity: 0, y: -30, scale: 1.012, filter: "blur(12px)", clipPath: "inset(0 0 10% 0 round 18px)" }}
        transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
        className="route-stage relative z-10"
      >
        <motion.div
          aria-hidden="true"
          className="route-ambient pointer-events-none fixed inset-x-0 top-0 z-[-1] h-72 opacity-40 blur-3xl"
          initial={{ opacity: 0, scaleX: 0.72 }}
          animate={{ opacity: 0.44, scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "radial-gradient(circle at 50% 0%, var(--primary), transparent 60%)"
          }}
        />
        <motion.div
          aria-hidden="true"
          className="route-scanline pointer-events-none fixed inset-x-0 top-0 z-[1] h-px"
          initial={{ y: "-8vh", opacity: 0 }}
          animate={{ y: "108vh", opacity: [0, 0.9, 0] }}
          transition={{ duration: 1.15, ease: "easeInOut" }}
        />
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
