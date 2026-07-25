import {
  Award,
  BookOpen,
  X,
  FolderKanban,
  Home,
  Image,
  LogOut,
  MessageSquare,
  Sparkles,
  User
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AppImage from "../common/AppImage";

const links = [
  ["Overview", "/admin", Home],
  ["Projects", "/admin/projects", FolderKanban],
  ["Blogs", "/admin/blogs", BookOpen],
  ["Certificates", "/admin/certificates", Award],
  ["Stories", "/admin/stories", Sparkles],
  ["Messages", "/admin/messages", MessageSquare],
  ["Site", "/admin/logo", Image],
  ["Profile", "/admin/profile", User]
];

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { logout } = useAuth();
  const { theme } = useTheme();

  return (
    <>
      {mobileOpen && <button className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={onClose} aria-label="Close sidebar" />}
      <aside className={`dashboard-sidebar fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-black/70 p-4 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="mb-8 flex items-center gap-3">
          {theme.logo ? (
            <AppImage src={theme.logo} alt={theme.siteName} wrapperClassName="h-10 w-10 rounded-md" className="h-full w-full object-cover" eager />
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-sm font-black text-black">FR</span>
          )}
          <div>
            <p className="font-semibold">Portfolio Admin</p>
            <p className="text-xs text-white/45">Content command center</p>
          </div>
          <button onClick={onClose} className="ml-auto rounded-md border border-white/10 p-2 text-white/60 lg:hidden" aria-label="Close sidebar">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="grid gap-1">
          {links.map(([label, href, Icon]) => (
            <NavLink
              end={href === "/admin"}
              key={href}
              to={href}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition ${
                  isActive ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </div>
        <button
          onClick={logout}
          className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md border border-white/10 px-3 py-3 text-sm text-white/65"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>
    </>
  );
}
