import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { socials } from "../../data/socials";
import { useTheme } from "../../context/ThemeContext";
import AppImage from "../common/AppImage";

const footerLinks = {
  Work: [
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Certificates", href: "/certificates" },
    { label: "Stories", href: "/stories" }
  ],
  Explore: [
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Uses", href: "/uses" },
    { label: "Links", href: "/links" }
  ],
  Connect: [
    { label: "Contact", href: "/contact" },
    { label: "Hire me", href: "mailto:mdfaridhossenrehad@gmail.com", external: true },
    { label: "GitHub", href: "https://github.com/mdfaridhossenrehad", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/mdfaridhossenrehad", external: true }
  ]
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="relative z-10 mt-10 border-t border-(--border) px-4 pt-14 pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Top */}
        <div className="flex flex-col gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-3">
              {theme.logo ? (
                <AppImage src={theme.logo} alt={theme.siteName} wrapperClassName="h-10 w-10 rounded-md" className="h-full w-full object-cover" />
              ) : (
                <span className="grid h-10 w-10 place-items-center rounded-md bg-(--text) text-sm font-black text-(--background)">FR</span>
              )}
              <span className="font-semibold text-(--text)">{theme.siteName}</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-(--text-muted)">
              Full Stack Developer & AI/ML enthusiast from Khulna, Bangladesh. Building fast, resilient, human-centered digital products.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-2">
              {socials.filter((s) => s.href.startsWith("http") || s.href.startsWith("mailto")).map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-(--border) text-(--text-muted) transition hover:text-(--text)"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-col gap-8">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="mb-4 text-sm font-semibold text-(--text)">{group}</h4>
                <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
                  {links.map(({ label, href, external }) => (
                    <li key={label}>
                      {external ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm text-(--text-muted) transition hover:text-(--text)"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link to={href} className="text-sm text-(--text-muted) transition hover:text-(--text)">
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex items-center justify-between border-t border-(--border) pt-6 text-sm text-(--text-muted)">
          <span>© {new Date().getFullYear()} {theme.siteName}. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) text-(--text-muted) transition hover:text-(--text)"
            aria-label="Back to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
