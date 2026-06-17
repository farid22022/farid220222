import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Work", "/projects"],
  ["Blog", "/blog"],
  ["Share", "/share-text"],
  ["More", "/links"],
  ["Contact", "/contact"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4">
      <nav className="nav-glass flex items-center justify-between rounded-full px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          {theme.logo ? (
            <img src={theme.logo} alt={theme.siteName} className="h-9 w-9 rounded-md object-cover" />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black italic text-black">FR</span>
          )}
          <span className="hidden text-sm font-semibold tracking-wide text-white/82 sm:block">{theme.siteName}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `motion-magnetic nav-link relative overflow-hidden rounded-full px-3 py-2 text-sm transition hover:bg-white/10 ${
                  isActive ? "is-active text-white" : "text-white/58"
                }`
              }
            >
              <span className="relative z-10">{label}</span>
            </NavLink>
          ))}
        </div>

        <Link to="/admin" className="motion-magnetic hidden rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/82 md:block">
          Admin
        </Link>
        <button className="rounded-md border border-white/10 p-2 lg:hidden" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass mt-2 grid rounded-lg p-3 lg:hidden"
          >
            {navItems.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-white/70">
                {label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
