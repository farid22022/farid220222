import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import AnnouncementPill from "./AnnouncementPill";

const words = ["scalable systems", "AI-powered solutions", "beautiful interfaces", "research-driven products"];

export default function Hero() {
  return (
    <section className="space-hero relative mx-auto grid min-h-[calc(100vh-40px)] max-w-7xl place-items-center px-4 pb-28 pt-16 md:pt-24">
      <div className="hero-orbit-system" aria-hidden="true">
        <span data-float />
        <span data-float />
        <span data-float />
      </div>
      <motion.div
        data-gsap="hero"
        initial={{ opacity: 0, y: 34 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <AnnouncementPill />
        <h1 className="mt-8 max-w-6xl text-balance text-5xl font-black leading-[1.06] tracking-normal text-white md:text-7xl lg:text-8xl">
          I design and build products that deliver <span className="impact-script">real impact</span>
        </h1>
        <div className="mx-auto mt-6 h-10 overflow-hidden text-xl font-semibold text-white/70 md:text-2xl">
          <motion.div
            animate={{ y: ["0%", "-25%", "-50%", "-75%", "0%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            {words.map((word) => (
              <div key={word} className="h-10 bg-gradient-to-r from-[var(--gradient-one)] to-[var(--gradient-two)] bg-clip-text text-transparent">
                {word}
              </div>
            ))}
          </motion.div>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/56 md:text-xl">
          Hello, I am <span className="font-bold text-white/80">Md. Farid Hossen Rehad</span>
        </p>
        <div className="mx-auto mt-3 w-fit rounded-md bg-[var(--accent)] px-4 py-2 text-lg font-black text-white shadow-[0_0_34px_rgba(255,48,48,0.34)]">
          Full Stack Developer + AI/ML Enthusiast
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3 motion-stagger">
          <Link to="/contact" className="hero-action motion-magnetic inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white">
            Let's Connect <ArrowRight className="h-4 w-4 rounded-full bg-white p-0.5 text-black" />
          </Link>
          <Link to="/projects" className="motion-magnetic inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white/70">
            <Mail className="h-4 w-4" />
            Explore work
          </Link>
        </div>
      </motion.div>
      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
