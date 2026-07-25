import { Sparkles } from "lucide-react";

export default function AnnouncementPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--card) px-4 py-2 text-sm text-(--text-muted) backdrop-blur">
      <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs font-black text-white">New</span>
      <Sparkles className="h-4 w-4 text-(--text-muted)" />
      Portfolio orbit is live
    </div>
  );
}
