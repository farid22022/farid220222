import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Command, Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const commands = [
  { label: "Home", href: "/", group: "Public" },
  { label: "About", href: "/about", group: "Public" },
  { label: "Projects", href: "/projects", group: "Public" },
  { label: "Blog", href: "/blog", group: "Public" },
  { label: "Certificates", href: "/certificates", group: "Public" },
  { label: "Stories", href: "/stories", group: "Public" },
  { label: "Research", href: "/research", group: "Public" },
  { label: "Uses", href: "/uses", group: "Public" },
  { label: "Links", href: "/links", group: "Public" },
  { label: "Contact", href: "/contact", group: "Public" },
  { label: "Dashboard Overview", href: "/admin", group: "Dashboard" },
  { label: "Manage Projects", href: "/admin/projects", group: "Dashboard" },
  { label: "Add Project", href: "/admin/projects/add", group: "Dashboard" },
  { label: "Manage Blogs", href: "/admin/blogs", group: "Dashboard" },
  { label: "Add Blog", href: "/admin/blogs/add", group: "Dashboard" },
  { label: "Theme Settings", href: "/admin/theme", group: "Dashboard" },
  { label: "Logo Settings", href: "/admin/logo", group: "Dashboard" },
  { label: "Profile Settings", href: "/admin/profile", group: "Dashboard" }
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;
    return commands.filter((item) => `${item.group} ${item.label}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    let context;
    async function animate() {
      const { default: gsap } = await import("gsap");
      context = gsap.context(() => {
        gsap.fromTo(".command-backdrop", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });
        gsap.fromTo(
          panelRef.current,
          { autoAlpha: 0, y: 18, scale: 0.97, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.42, ease: "power3.out" }
        );
      });
    }

    animate();
    return () => context?.revert();
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [location.pathname]);

  function goTo(href) {
    navigate(href);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="command-trigger fixed bottom-5 right-5 z-50 hidden items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-white/70 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:border-white/25 hover:text-white md:flex"
      >
        <Command className="h-4 w-4" />
        Ctrl K
      </button>
      {open && (
        <div className="fixed inset-0 z-[80] grid place-items-start px-4 pt-24 md:pt-28">
          <button className="command-backdrop absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setOpen(false)} aria-label="Close command palette" />
          <div ref={panelRef} className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-lg border border-white/12 bg-[#07070a]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
              <Search className="h-5 w-5 text-white/35" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pages, dashboard actions..."
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/35"
              />
              <button onClick={() => setOpen(false)} className="rounded-md border border-white/10 p-2 text-white/50 hover:text-white" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[56vh] overflow-y-auto p-2">
              {filteredCommands.map((item) => (
                <button
                  key={`${item.group}-${item.href}`}
                  onClick={() => goTo(item.href)}
                  className="group flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition hover:bg-white/8"
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{item.label}</span>
                    <span className="text-xs text-white/38">{item.group}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-white" />
                </button>
              ))}
              {filteredCommands.length === 0 && (
                <div className="px-3 py-8 text-center text-sm text-white/45">No command found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
