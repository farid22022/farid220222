import { motion } from "framer-motion";

export default function SectionReveal({ children, className = "" }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`gsap-reveal ${className}`}
    >
      {children}
    </motion.section>
  );
}
