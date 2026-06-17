import { Menu, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ onMenuClick = () => {} }) {
  const { admin } = useAuth();

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#05050a]/80 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-md border border-white/10 p-2 lg:hidden" aria-label="Open sidebar">
          <Menu className="h-4 w-4" />
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/45 md:flex">
          <Search className="h-4 w-4" />
          Search content from each table
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold">{admin?.name || "Admin"}</p>
        <p className="text-xs text-white/45">{admin?.email}</p>
      </div>
    </div>
  );
}
