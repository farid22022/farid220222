import { Link } from "react-router-dom";
import { socials } from "../../data/socials";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            {theme.logo ? (
              <img src={theme.logo} alt={theme.siteName} className="h-10 w-10 rounded-md object-cover" />
            ) : (
              <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-sm font-black text-black">FR</span>
            )}
            <span className="font-semibold">{theme.siteName}</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/55">
            Full Stack Web Developer and AI/ML enthusiast from Khulna, building fast, resilient, human-centered digital products.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">General</h4>
          <div className="grid gap-2 text-sm text-white/55">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Connect</h4>
          <div className="flex gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} className="rounded-md border border-white/10 p-2 text-white/65 transition hover:text-white">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl text-sm text-white/40">© 2026 {theme.siteName}. All rights reserved.</div>
    </footer>
  );
}
