import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", text = "Create your first item from the dashboard." }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
      <Inbox className="mx-auto mb-3 h-8 w-8 text-white/40" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/55">{text}</p>
    </div>
  );
}
