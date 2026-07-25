import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", text = "Create your first item from the dashboard." }) {
  return (
    <div className="rounded-lg border border-(--border) bg-(--card) p-8 text-center">
      <Inbox className="mx-auto mb-3 h-8 w-8 text-(--text-muted)" />
      <h3 className="text-lg font-semibold text-(--text)">{title}</h3>
      <p className="mt-2 text-sm text-(--text-muted)">{text}</p>
    </div>
  );
}
