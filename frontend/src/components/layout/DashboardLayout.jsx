import { Outlet } from "react-router-dom";
import { useState } from "react";
import CommandPalette from "../common/CommandPalette";
import GsapMotionLayer from "../common/GsapMotionLayer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dashboard-shell min-h-screen bg-[#05050a] text-white">
      <GsapMotionLayer mode="dashboard" />
      <CommandPalette />
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <div className="dashboard-content p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
