import { Sparkles } from "lucide-react";

export default function AnnouncementPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur">
      <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-black text-white">New</span>
      <Sparkles className="h-4 w-4 text-white/45" />
      Portfolio orbit is live
    </div>
  );
}
