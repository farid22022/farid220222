import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import AppImage from "../common/AppImage";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Blog", href: "/blog" },
  {
    label: "More",
    children: [
      { label: "Stories", href: "/stories" },
      { label: "Research", href: "/research" },
      { label: "Uses", href: "/uses" },
      { label: "Links", href: "/links" }
    ]
  },
  { label: "Contact", href: "/contact" }
];

function DropdownMenu({ items, onClose }) {
  return (
    <div className="nav-glass absolute right-0 top-full mt-2 min-w-40 rounded-xl p-1.5 shadow-2xl">
      {items.map(({ label, href }) => (
        <NavLink
          key={href}
          to={href}
          onClick={onClose}
          className={({ isActive }) =>
            `block rounded-lg px-3.5 py-2.5 text-sm transition ${
              isActive
                ? "bg-(--card) text-(--text)"
                : "text-(--text-muted) hover:bg-(--card) hover:text-(--text)"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    function onClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [dropdown]);

  function toggleDropdown(label) {
    setDropdown((prev) => (prev === label ? null : label));
  }

  function closeMenus() {
    setOpen(false);
    setDropdown(null);
  }

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-7xl px-4">
      <nav className={`nav-glass flex items-center justify-between rounded-full px-4 py-2.5 transition-shadow duration-300 ${scrolled ? "navbar-scrolled" : ""}`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenus}>
          {theme.logo ? (
            <AppImage
              src={theme.logo}
              alt={theme.siteName}
              wrapperClassName="h-9 w-9 rounded-md"
              className="h-full w-full object-cover"
              eager
            />
          ) : (
            <span className="grid h-9 w-9 place-items-center rounded-full bg-(--text) text-sm font-black italic text-(--background)">
              FR
            </span>
          )}
          <span className="hidden text-sm font-semibold tracking-wide text-(--text) opacity-80 sm:block">
            {theme.siteName}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`nav-link relative flex items-center gap-1 overflow-hidden rounded-full px-3 py-2 text-sm transition hover:bg-(--card) ${
                    dropdown === item.label ? "text-(--text)" : "text-(--text-muted)"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${dropdown === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                {dropdown === item.label && (
                  <DropdownMenu items={item.children} onClose={() => setDropdown(null)} />
                )}
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `nav-link relative overflow-hidden rounded-full px-3 py-2 text-sm transition hover:bg-(--card) ${
                    isActive ? "text-(--text)" : "text-(--text-muted) hover:text-(--text)"
                  }`
                }
              >
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            )
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-full border border-(--border) p-2 text-(--text-muted) transition hover:bg-(--card) hover:text-(--text)"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="mailto:mdfaridhossenrehad@gmail.com"
            className="hidden rounded-full border border-(--border) bg-(--card) px-4 py-2 text-sm font-semibold text-(--text) transition hover:bg-(--text) hover:text-(--background) lg:inline-flex"
          >
            Hire me
          </a>
          <button
            className="rounded-md border border-(--border) p-2 text-(--text) lg:hidden"
            onClick={() => { setOpen((v) => !v); setDropdown(null); }}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mt-2 grid rounded-xl p-3 lg:hidden">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <p className="mt-2 px-3 pb-1 text-xs font-semibold uppercase tracking-widest text-(--text-muted)">
                  {item.label}
                </p>
                {item.children.map(({ label, href }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm text-(--text-muted) hover:text-(--text)"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === "/"}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2.5 text-left ${
                    isActive ? "text-(--text)" : "text-(--text-muted) hover:text-(--text)"
                  }`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <div className="mt-2 border-t border-(--border) pt-3">
            <a
              href="mailto:mdfaridhossenrehad@gmail.com"
              className="block rounded-full bg-(--text) px-4 py-2.5 text-center text-sm font-semibold text-(--background)"
            >
              Hire me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
